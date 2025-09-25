import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { BackendApiService, PredictionSignal, TechnicalIndicators, TrendForecast } from '../services/backend-api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-market-analysis',
  templateUrl: './market-analysis.component.html',
  styleUrls: ['./market-analysis.component.scss']
})
export class MarketAnalysisComponent implements OnInit, OnDestroy, OnChanges {
  @Input() symbol?: string;
  signals: PredictionSignal[] = [];
  technicalIndicators: TechnicalIndicators | null = null;
  forecast: TrendForecast | null = null;
  forecastHorizon: number = 3;
  private pollingSubscription: Subscription | null = null;
  loadingSignals: boolean = false;
  alertMessage: string | null = null;
  lastSignalId: number | null = null;
  lastSignalTimestamp: string | null = null;
  // Lọc mã tín hiệu
  symbolFilter: string = '';
  availableSymbols: string[] = ['VN30F1M']; // Chỉ giữ VN30F1M để tối ưu
  // close lấy trực tiếp từ datafeed để khớp chart
  latestCloseBySymbol: Record<string, number> = {};
  // Chỉ số tính tại FE để đồng nhất với chart
  rsiBySymbol: Record<string, number> = {};
  atrBySymbol: Record<string, number> = {};
  trendBySymbol: Record<string, 'UP' | 'DOWN' | 'NEUTRAL'> = {};
  actionBySymbol: Record<string, 'long' | 'short' | 'hold'> = {};
  reversalBySymbol: Record<string, number> = {};
  // Lưu lịch sử để suy ra xu hướng tại từng thời điểm tín hiệu
  historyBySymbol: Record<string, { t: number[]; c: number[]; h?: number[]; l?: number[] }> = {};
  // Quyết định xu hướng theo công thức người dùng
  decisionBySymbol: Record<string, { trend: 'UP'|'DOWN'|'NEUTRAL'; action: 'long'|'short'|'hold' }> = {};

  constructor(private backendApi: BackendApiService, private cdr: ChangeDetectorRef, private http: HttpClient) {}

  // === Forecast (ensemble) ===
  private computeStd(values: number[]): number {
    if (!values.length) return 0;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const varr = values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / values.length;
    return Math.sqrt(varr);
  }

  private makeEnsembleForecast(sym: string) {
    const hist = this.historyBySymbol[sym];
    if (!hist?.c?.length) return;
    const closes = hist.c;
    const highs = hist.h || [];
    const lows = hist.l || [];
    const n = closes.length;
    if (n < 60) return; // cần đủ dữ liệu

    // Sử dụng logic ensemble mới
    const ema20 = this.computeEMA(closes, 20);
    const ema50 = this.computeEMA(closes, 50);
    const ema20Prev = this.computeEMA(closes.slice(0, n - 1), 20);
    const ema50Prev = this.computeEMA(closes.slice(0, n - 1), 50);
    const rsi14 = this.computeRsi(closes.slice(-14), 14);
    const macdObj = this.computeMACD(closes);

    const decision = this.decideByFormula(ema20Prev, ema50Prev, ema20, ema50, rsi14, macdObj, closes, highs, lows);

    const summary = `Score-based ensemble: EMA20=${ema20.toFixed(2)} vs EMA50=${ema50.toFixed(2)}, RSI=${rsi14.toFixed(1)}, MACD=${macdObj.macd.toFixed(2)}/${macdObj.signal.toFixed(2)}, ATR=${this.computeAtr(highs, lows, closes, 14).toFixed(2)}`;

    this.forecast = {
      direction: decision.trend,
      confidence: decision.confidence || 60,
      targetPrice: decision.targetPrice || closes[n - 1],
      summary,
      horizonDays: this.forecastHorizon
    } as TrendForecast;
  }

  // replace forecast loader
  loadForecast() {
    // Khôi phục phần dự báo xu thế gần
    this.updateForecastFromFormula();
  }

  // Màu sắc theo kiểu tín hiệu (để template cũ dùng)
  getSignalColor(signalType: string): string {
    switch (signalType) {
      case 'LONG': return '#10b981';
      case 'SHORT': return '#ef4444';
      case 'REVERSAL': return '#f59e0b';
      default: return '#6b7280';
    }
  }

  ngOnInit() {
    this.loadSignals();
    this.loadForecast();
    
    // Polling chậm hơn (5 giây) để tối ưu performance
    this.pollingSubscription = interval(5000).subscribe(() => {
      this.loadSignals();
      this.loadForecast();
      // Chỉ cập nhật cho VN30F1M
      this.updateComputedFromDatafeed(['VN30F1M']);
      this.updateTechFromDatafeed('VN30F1M');
      // Kiểm tra tín hiệu mới chỉ khi có nến mới
      this.checkNewSignalWithCandleCheck();
    });
  }

  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['symbol']) {
      const current = this.getCurrentSymbolForIndicators();
      if (current) this.updateTechFromDatafeed(current);
      this.loadForecast();
    }
  }

  loadSignals() {
    this.loadingSignals = true;
    this.backendApi.getRecentSignals().subscribe({
      next: (data) => {
        // Chỉ lọc tín hiệu VN30F1M để tối ưu
        this.signals = Array.isArray(data) ? data.filter(s => s.symbol === 'VN30F1M') : [];
        this.availableSymbols = ['VN30F1M']; // Chỉ giữ VN30F1M
        const latest = this.getNewestSignal(data);
        if (latest) {
          this.lastSignalId = latest.id ?? this.lastSignalId;
          this.lastSignalTimestamp = latest.timestamp ?? this.lastSignalTimestamp;
        }
        this.loadingSignals = false;
        this.cdr.detectChanges();
        // Chỉ cập nhật cho VN30F1M
        this.updateComputedFromDatafeed(['VN30F1M']);
        this.updateTechFromDatafeed('VN30F1M');
      },
      error: () => {
        this.signals = [];
        this.loadingSignals = false;
        this.cdr.detectChanges();
      }
    });
  }

  // TÍNH CHỈ SỐ KỸ THUẬT Ở FE
  private getCurrentSymbolForIndicators(): string | null {
    const current = this.symbolFilter || this.symbol || (this.availableSymbols[0] ?? null);
    return current || null;
  }

  private updateTechFromDatafeed(symbol: string) {
    const nowSec = Math.floor(Date.now() / 1000);
    const fromSec = nowSec - 60 * 240; // 240 phút (4 giờ) để tối ưu performance
    const params = new HttpParams()
      .set('symbol', symbol)
      .set('resolution', '1')
      .set('from', String(fromSec))
      .set('to', String(nowSec));
    this.http.get<any>(`${environment.data_feed_url}/history`, { params }).subscribe({
      next: async (res) => {
        if (!res || !Array.isArray(res.c) || res.c.length === 0) return;
        const closes: number[] = res.c;
        const highs: number[] = res.h || [];
        const lows: number[] = res.l || [];
        const times: number[] = res.t || [];

        // 1. Lấy dữ liệu giá và khối lượng (đã có từ datafeed)
        // 2. Tính các chỉ báo kỹ thuật theo yêu cầu:

        // Đường trung bình động (MA/EMA): lấy giá đóng cửa của 20 cây nến gần nhất
        const ema20_now = this.computeEMA(closes, 20);
        const ema50_now = this.computeEMA(closes, 50);
        
        // RSI (Chỉ số sức mạnh tương đối): lấy từ TradingView chart
        const rsi = await this.getRsiFromChart(symbol, times[times.length - 1]) || this.computeRsi(closes, 14);

        // MACD: so sánh 2 đường trung bình để phát hiện lực tăng/giảm
        const macdObj = this.computeMACD(closes);
        
        // ATR cho tính toán điểm đảo chiều
        const atr = (highs.length && lows.length) ? this.computeAtr(highs, lows, closes, 14) : 0;

        this.technicalIndicators = {
          rsi,
          ema20: ema20_now,
          ema50: ema50_now,
          macd: macdObj.macd,
          macdSignal: macdObj.signal,
          macdHistogram: macdObj.histogram,
          atr
        };

        // 3. Đặt điều kiện ra dự đoán theo logic ensemble
        const ema20_prev = this.computeEMA(closes.slice(0, closes.length - 1), 20);
        const ema50_prev = this.computeEMA(closes.slice(0, closes.length - 1), 50);
        const decision = this.decideByFormula(ema20_prev, ema50_prev, ema20_now, ema50_now, rsi, macdObj, closes, highs, lows);
        this.decisionBySymbol[symbol] = decision;
        this.actionBySymbol[symbol] = decision.action;
        this.trendBySymbol[symbol] = decision.trend;
        
        // Tính điểm đảo chiều theo ATR (sửa lại logic)
        const close = closes[closes.length - 1];
        if (decision.action === 'long') {
          // Long: điểm đảo chiều = giá hiện tại + ATR (điểm dừng lỗ)
          this.reversalBySymbol[symbol] = close + 0.5 * atr;
        } else if (decision.action === 'short') {
          // Short: điểm đảo chiều = giá hiện tại - ATR (điểm dừng lỗ)
          this.reversalBySymbol[symbol] = close - 0.5 * atr;
        } else {
          // Hold: điểm đảo chiều = giá hiện tại
          this.reversalBySymbol[symbol] = close;
        }

        // Cập nhật forecast theo công thức
        this.loadForecast();

        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  private decideByFormula(ema20Prev: number, ema50Prev: number, ema20Now: number, ema50Now: number, rsiNow: number, macdObj?: any, closes?: number[], highs?: number[], lows?: number[]): { trend: 'UP'|'DOWN'|'NEUTRAL'; action: 'long'|'short'|'hold'; confidence?: number; targetPrice?: number } {
    // 3. Đặt điều kiện ra dự đoán theo yêu cầu
    let direction: 'UP'|'DOWN'|'NEUTRAL' = 'NEUTRAL';
    let action: 'long'|'short'|'hold' = 'hold';
    let confidence = 60;
    let targetPrice = closes ? closes[closes.length - 1] : 0;
    
    console.log(`Decision logic: ema20Now=${ema20Now.toFixed(2)}, ema50Now=${ema50Now.toFixed(2)}, rsi=${rsiNow.toFixed(2)}`);
    console.log(`EMA previous: ema20Prev=${ema20Prev.toFixed(2)}, ema50Prev=${ema50Prev.toFixed(2)}`);
    
    // Kiểm tra EMA cross
    const emaCrossUp = ema20Prev <= ema50Prev && ema20Now > ema50Now; // EMA20 cắt lên EMA50
    const emaCrossDown = ema20Prev >= ema50Prev && ema20Now < ema50Now; // EMA20 cắt xuống EMA50
    
    console.log(`EMA cross check: emaCrossUp=${emaCrossUp}, emaCrossDown=${emaCrossDown}`);
    console.log(`EMA cross conditions: ema20Prev<=ema50Prev=${ema20Prev <= ema50Prev}, ema20Now>ema50Now=${ema20Now > ema50Now}`);
    console.log(`EMA cross conditions: ema20Prev>=ema50Prev=${ema20Prev >= ema50Prev}, ema20Now<ema50Now=${ema20Now < ema50Now}`);
    
    // Điều kiện 1: EMA 20 cắt lên EMA 50 và RSI > 55 => LONG
    if (emaCrossUp && rsiNow > 55) {
      direction = 'UP';
      action = 'long';
      confidence = 85;
      console.log(`LONG signal: EMA cross up + RSI > 55`);
    }
    // Điều kiện 2: EMA 20 cắt xuống EMA 50 và RSI < 45 => SHORT
    else if (emaCrossDown && rsiNow < 45) {
      direction = 'DOWN';
      action = 'short';
      confidence = 85;
      console.log(`SHORT signal: EMA cross down + RSI < 45`);
    }
    // Điều kiện bổ sung: RSI mạnh + EMA trend
    else if (rsiNow > 60 && ema20Now > ema50Now) {
      direction = 'UP';
      action = 'long';
      confidence = 75;
      console.log(`LONG signal: RSI > 60 + EMA20 > EMA50`);
    }
    else if (rsiNow < 40 && ema20Now < ema50Now) {
      direction = 'DOWN';
      action = 'short';
      confidence = 75;
      console.log(`SHORT signal: RSI < 40 + EMA20 < EMA50`);
    }
    // Điều kiện linh hoạt: RSI trung bình + EMA trend rõ ràng
    else if (rsiNow > 50 && ema20Now > ema50Now && (ema20Now - ema50Now) > 0.3) {
      direction = 'UP';
      action = 'long';
      confidence = 65;
      console.log(`LONG signal: RSI > 50 + EMA20 > EMA50 + gap > 0.3`);
    }
    else if (rsiNow < 50 && ema20Now < ema50Now && (ema50Now - ema20Now) > 0.3) {
      direction = 'DOWN';
      action = 'short';
      confidence = 65;
      console.log(`SHORT signal: RSI < 50 + EMA20 < EMA50 + gap > 0.3`);
    }
    // Điều kiện cơ bản: RSI + EMA trend (không cần gap lớn)
    else if (rsiNow > 55 && ema20Now > ema50Now) {
      direction = 'UP';
      action = 'long';
      confidence = 60;
      console.log(`LONG signal: RSI > 55 + EMA20 > EMA50`);
    }
    else if (rsiNow < 45 && ema20Now < ema50Now) {
      direction = 'DOWN';
      action = 'short';
      confidence = 60;
      console.log(`SHORT signal: RSI < 45 + EMA20 < EMA50`);
    }
    // Điều kiện 3: Giá chạm vùng kháng cự mạnh hoặc RSI > 70 (quá mua) => Tiệm cận đảo chiều
    else if (rsiNow > 70) {
      direction = 'NEUTRAL';
      action = 'hold';
      confidence = 70;
      console.log(`Reversal warning: RSI > 70 (overbought)`);
    }
    // Điều kiện 4: RSI < 30 (quá bán) => Tiệm cận đảo chiều
    else if (rsiNow < 30) {
      direction = 'NEUTRAL';
      action = 'hold';
      confidence = 70;
      console.log(`Reversal warning: RSI < 30 (oversold)`);
    }
    // Điều kiện 5: Kiểm tra vùng kháng cự mạnh (Bollinger Bands)
    else if (closes && closes.length >= 20) {
      const win20 = closes.slice(-20);
      const sma20 = win20.reduce((a, b) => a + b, 0) / 20;
      const std20 = this.computeStd(win20);
      const upper = sma20 + 2 * std20;
      const lower = sma20 - 2 * std20;
      const close = closes[closes.length - 1];
      const bandWidth = upper - lower || 1;
      
      // Chạm vùng kháng cự mạnh (gần upper band)
      if (close >= upper - 0.1 * bandWidth) {
        direction = 'NEUTRAL';
        action = 'hold';
        confidence = 75;
        console.log(`Reversal warning: Price near resistance (upper band)`);
      }
      // Chạm vùng hỗ trợ mạnh (gần lower band)
      else if (close <= lower + 0.1 * bandWidth) {
        direction = 'NEUTRAL';
        action = 'hold';
        confidence = 75;
        console.log(`Reversal warning: Price near support (lower band)`);
      }
      // Trường hợp khác: NEUTRAL
      else {
        direction = 'NEUTRAL';
        action = 'hold';
        confidence = 60;
        console.log(`Neutral: No clear signal`);
      }
    }
    else {
      direction = 'NEUTRAL';
      action = 'hold';
      confidence = 60;
      console.log(`Neutral: No clear signal`);
    }
    
    // Tính target price
    if (highs && lows && closes && closes.length >= 14) {
      const atr = this.computeAtr(highs, lows, closes, 14);
      const close = closes[closes.length - 1];
      const k = confidence >= 80 ? 0.7 : confidence >= 60 ? 0.5 : 0.4;
      
      if (direction === 'UP') {
        targetPrice = close + k * atr;
      } else if (direction === 'DOWN') {
        targetPrice = close - k * atr;
      } else {
        targetPrice = close;
      }
    }
    
    console.log(`Final decision: ${direction} (${action}), confidence: ${confidence.toFixed(1)}%`);
    
    return { trend: direction, action, confidence, targetPrice };
  }

  // ===================== Dự báo xu thế (ENHANCED) =====================
  private updateForecastFromFormula() {
    const sym = this.getCurrentSymbolForIndicators();
    if (!sym) return;
    const hist = this.historyBySymbol[sym];
    if (!hist?.c?.length) return;

    const closes = hist.c;
    const highs = hist.h || [];
    const lows = hist.l || [];
    const close = closes[closes.length - 1];

    // Tính các chỉ báo
    const rsi14 = this.computeRsi(closes.slice(-14), 14);
    const ema20 = this.computeEMA(closes, 20);
    const ema50 = this.computeEMA(closes, 50);
    const ema20Prev = this.computeEMA(closes.slice(0, closes.length - 1), 20);
    const ema50Prev = this.computeEMA(closes.slice(0, closes.length - 1), 50);
    const macdObj = this.computeMACD(closes);
    const atr14 = (highs.length && lows.length) ? this.computeAtr(highs, lows, closes, 14) : 0;

    // Bỏ phiếu tín hiệu
    let upVotes = 0, downVotes = 0;
    // EMA cross
    if (ema20Prev <= ema50Prev && ema20 > ema50) upVotes++; else if (ema20Prev >= ema50Prev && ema20 < ema50) downVotes++;
    // RSI
    if (rsi14 > 55) upVotes++; else if (rsi14 < 45) downVotes++;
    // Price vs EMA
    if (close > ema20 && ema20 > ema50) upVotes++; else if (close < ema20 && ema20 < ema50) downVotes++;
    // MACD
    if (macdObj.macd > macdObj.signal && macdObj.histogram > 0) upVotes++; else if (macdObj.macd < macdObj.signal && macdObj.histogram < 0) downVotes++;

    let direction: 'UP'|'DOWN'|'NEUTRAL' = 'NEUTRAL';
    if (upVotes - downVotes >= 2) direction = 'UP';
    else if (downVotes - upVotes >= 2) direction = 'DOWN';

    // Độ tin cậy = tỉ lệ phiếu/ tổng chỉ báo tham gia
    const totalVotes = 4;
    const confidence = Math.round((Math.max(upVotes, downVotes) / totalVotes) * 100);
    
    // Thêm mô tả độ tin cậy dễ hiểu
    const confidenceLevel = confidence >= 75 ? 'CAO' : confidence >= 50 ? 'TRUNG BÌNH' : 'THẤP';

    // Mục tiêu giá: dùng ATR x multiplier theo horizonDays
    // Thay đổi multiplier rõ ràng hơn cho từng ngày
    let atrMult: number;
    switch (this.forecastHorizon) {
      case 1: atrMult = 1.0; break;    // 1 ngày: 1x ATR
      case 2: atrMult = 1.3; break;    // 2 ngày: 1.3x ATR
      case 3: atrMult = 1.6; break;    // 3 ngày: 1.6x ATR
      case 5: atrMult = 1.8; break;    // 5 ngày: 1.8x ATR
      case 7: atrMult = 2.0; break;    // 7 ngày: 2.0x ATR
      default: atrMult = 1.0; break;
    }
    
    let target = close;
    if (direction === 'UP') target = close + atr14 * atrMult;
    else if (direction === 'DOWN') target = close - atr14 * atrMult;
    
    console.log(`Forecast calculation: horizon=${this.forecastHorizon} days, atrMult=${atrMult.toFixed(2)}, target=${target.toFixed(2)}`);

    // Tạo summary dễ hiểu hơn cho người dùng
    const emaTrend = ema20 > ema50 ? 'TĂNG' : 'GIẢM';
    const rsiStatus = rsi14 > 70 ? 'QUÁ MUA' : rsi14 < 30 ? 'QUÁ BÁN' : rsi14 > 50 ? 'TÍCH CỰC' : 'TIÊU CỰC';
    const macdTrend = macdObj.macd > macdObj.signal ? 'TĂNG' : 'GIẢM';
    const priceTrend = close > ema20 ? 'TRÊN EMA20' : 'DƯỚI EMA20';
    
    const summary = `📈 Xu hướng EMA: ${emaTrend} | 📊 RSI: ${rsiStatus} (${rsi14.toFixed(1)}) | 📉 MACD: ${macdTrend} | 💰 Giá: ${priceTrend} | 🎯 Tín hiệu: ${upVotes > downVotes ? 'TÍCH CỰC' : upVotes < downVotes ? 'TIÊU CỰC' : 'TRUNG TÍNH'} (${upVotes}/${downVotes}) | ⏰ Dự báo ${this.forecastHorizon} ngày (ATR x${atrMult.toFixed(1)})`;

    // Tạo mô tả hướng dễ hiểu
    const directionText = direction === 'UP' ? 'TĂNG' : direction === 'DOWN' ? 'GIẢM' : 'TRUNG TÍNH';
    const directionIcon = direction === 'UP' ? '📈' : direction === 'DOWN' ? '📉' : '➡️';
    
    this.forecast = {
      direction,
      confidence,
      targetPrice: target,
      summary,
      horizonDays: this.forecastHorizon,
      // Thêm thông tin dễ hiểu
      directionText: `${directionIcon} ${directionText}`,
      confidenceLevel: confidenceLevel,
      confidenceText: `${confidence}% (${confidenceLevel})`
    } as TrendForecast;
  }

  // ===================== END Forecast =====================

  private getNewestSignal(list: PredictionSignal[]): PredictionSignal | null {
    if (!Array.isArray(list) || list.length === 0) return null;
    return list
      .slice()
      .sort((a, b) => {
        const tb = new Date(b.createdAt || b.timestamp).getTime();
        const ta = new Date(a.createdAt || a.timestamp).getTime();
        return tb - ta;
      })[0];
  }

  private checkNewSignal() {
    this.backendApi.getRecentSignals().subscribe({
      next: (list: PredictionSignal[]) => {
        const latest = this.getNewestSignal(list);
        if (!latest) return;
        const latestTime = latest.timestamp;
        const latestId = latest.id;
        const isNewById = typeof latestId === 'number' && latestId !== this.lastSignalId;
        const isNewByTime = !!latestTime && latestTime !== this.lastSignalTimestamp;
        if (isNewById || isNewByTime) {
          this.lastSignalId = latestId ?? this.lastSignalId;
          this.lastSignalTimestamp = latestTime ?? this.lastSignalTimestamp;
          const label = this.getSignalTypeLabel(latest.signalType);
          const price = this.formatPrice(latest.price);
          const sym = latest.symbol;
          const conf = latest.confidence?.toFixed(1) ?? '';
          const text = `${label} ${sym} @ ${price} (độ tin cậy ${conf}%)`;
          this.alertMessage = text;
          setTimeout(() => { this.alertMessage = null; }, 10000);
        }
      },
      error: (_: any) => {}
    });
  }

  // Kiểm tra tín hiệu mới chỉ khi có nến mới
  checkNewSignalWithCandleCheck() {
    const hist = this.historyBySymbol['VN30F1M'];
    if (!hist?.t?.length) return;
    
    // Lấy timestamp của nến cuối cùng
    const lastCandleTime = hist.t[hist.t.length - 1];
    const now = Math.floor(Date.now() / 1000);
    
    // Kiểm tra xem có nến mới trong 2 phút gần đây không
    const timeDiff = now - lastCandleTime;
    
    if (timeDiff <= 120) { // Có nến mới trong 2 phút
      console.log(`Có nến mới: ${timeDiff}s trước, kiểm tra tín hiệu`);
      this.checkNewSignal();
    } else {
      console.log(`Không có nến mới: ${timeDiff}s trước, tạm dừng tạo tín hiệu`);
    }
  }

  // Nhãn xu hướng: Tăng/Giảm/Trung lập
  getSignalTypeLabel(signalType: string): string {
    switch (signalType) {
      case 'LONG': return 'Tăng';
      case 'SHORT': return 'Giảm';
      default: return 'Trung lập';
    }
  }

  // Danh sách tín hiệu sau khi áp dụng lọc theo mã
  get filteredSignals(): PredictionSignal[] {
    if (!this.symbolFilter) return this.signals;
    const q = this.symbolFilter.trim().toUpperCase();
    return this.signals.filter(s => (s.symbol || '').toUpperCase().includes(q));
  }

  onSelectSymbolFilter(sym: string) {
    this.symbolFilter = sym || '';
    const current = this.getCurrentSymbolForIndicators();
    if (current) this.updateTechFromDatafeed(current);
  }

  // Lấy dữ liệu history và tính các chỉ số ở FE (khớp chart) cho bảng tín hiệu
  private updateComputedFromDatafeed(symbols: string[]) {
    const nowSec = Math.floor(Date.now() / 1000);
    const fromSec = nowSec - 60 * 240; // 240 phút (4 giờ) để tối ưu performance
    symbols.forEach(symbol => {
      const params = new HttpParams()
        .set('symbol', symbol)
        .set('resolution', '1')
        .set('from', String(fromSec))
        .set('to', String(nowSec));
      this.http.get<any>(`${environment.data_feed_url}/history`, { params }).subscribe({
        next: (res) => {
          if (res && Array.isArray(res.c) && res.c.length > 0) {
            const closes: number[] = res.c;
            const highs: number[] = res.h || [];
            const lows: number[] = res.l || [];
            const times: number[] = res.t || [];
            if (times.length) this.historyBySymbol[symbol] = { t: times, c: closes, h: highs, l: lows };
            this.latestCloseBySymbol[symbol] = closes[closes.length - 1];
            
            // Tính RSI trực tiếp với dữ liệu từ history API (tạm thời)
            const rsi = this.computeRsi(closes, 14);
            this.rsiBySymbol[symbol] = rsi;
            // Giảm debug logs để tối ưu performance
            // console.log(`[${symbol}] RSI calculated:`, rsi);
            
            if (highs.length && lows.length) this.atrBySymbol[symbol] = this.computeAtr(highs, lows, closes, 14);

            // Tính quyết định theo công thức ensemble với RSI đã tính
            const ema20_now = this.computeEMA(closes, 20);
            const ema50_now = this.computeEMA(closes, 50);
            const ema20_prev = this.computeEMA(closes.slice(0, closes.length - 1), 20);
            const ema50_prev = this.computeEMA(closes.slice(0, closes.length - 1), 50);
            
            const macdObj = this.computeMACD(closes);
            const decision = this.decideByFormula(ema20_prev, ema50_prev, ema20_now, ema50_now, rsi, macdObj, closes, highs, lows);
            this.decisionBySymbol[symbol] = decision;
            this.actionBySymbol[symbol] = decision.action;
            this.trendBySymbol[symbol] = decision.trend;

            const close = closes[closes.length - 1];
            const atr = this.atrBySymbol[symbol] || 0;
            
            // Tính điểm đảo chiều theo ATR (sửa lại logic)
            if (decision.action === 'long') {
              // Long: điểm đảo chiều = giá hiện tại + ATR (điểm dừng lỗ)
              this.reversalBySymbol[symbol] = close + 0.5 * atr;
            } else if (decision.action === 'short') {
              // Short: điểm đảo chiều = giá hiện tại - ATR (điểm dừng lỗ)
              this.reversalBySymbol[symbol] = close - 0.5 * atr;
            } else {
              // Hold: điểm đảo chiều = giá hiện tại
              this.reversalBySymbol[symbol] = close;
            }

            this.cdr.detectChanges();
          }
        },
        error: () => {}
      });
    });
  }

  // Lấy RSI trực tiếp từ TradingView chart
  private async getRsiFromChart(symbol: string, timestamp: number): Promise<number | null> {
    try {
      // Gọi API để lấy RSI từ TradingView chart
      const params = new HttpParams()
        .set('symbol', symbol)
        .set('timestamp', String(timestamp))
        .set('indicator', 'rsi');
      
      console.log(`Requesting RSI from chart: ${environment.data_feed_url}/indicator`, params.toString());
      
      const response = await this.http.get<any>(`${environment.data_feed_url}/indicator`, { params }).toPromise();
      
      console.log(`RSI API response for ${symbol}:`, response);
      
      if (response && response.rsi !== undefined && response.rsi !== null) {
        console.log(`RSI from chart for ${symbol}: ${response.rsi}`);
        return Number(response.rsi);
      }
      
      console.log(`No RSI from chart API, using fallback calculation for ${symbol}`);
      
      // Fallback: nếu không có RSI từ chart, tính toán với dữ liệu hiện có
      const hist = this.historyBySymbol[symbol];
      if (hist && hist.c && hist.c.length >= 15) {
        const calculatedRsi = this.computeRsi(hist.c, 14);
        console.log(`Calculated RSI for ${symbol}: ${calculatedRsi}`);
        return calculatedRsi;
      }
      
      console.log(`Not enough data for RSI calculation for ${symbol}`);
      return null;
    } catch (error) {
      console.log(`Error getting RSI from chart for ${symbol}:`, error);
      
      // Fallback: tính toán với dữ liệu hiện có
      const hist = this.historyBySymbol[symbol];
      if (hist && hist.c && hist.c.length >= 15) {
        const calculatedRsi = this.computeRsi(hist.c, 14);
        console.log(`Fallback calculated RSI for ${symbol}: ${calculatedRsi}`);
        return calculatedRsi;
      }
      
      return null;
    }
  }

  // ======= Khớp đúng cây nến: chọn nến có thời điểm close <= ts và chênh lệch < 60s =======
  private findIndexForTimestamp(symbol: string, tsSec: number): number {
    const hist = this.historyBySymbol[symbol];
    if (!hist || !hist.t?.length) return -1;

    const bucket = Math.floor(tsSec / 60) * 60;
    const tzOffset = new Date().getTimezoneOffset() * 60; // seconds (VN: -25200)

    const candidates = new Set<number>([
      bucket,
      bucket - 60,
      bucket + 60,
      bucket - tzOffset,
      bucket - tzOffset - 60,
      bucket - tzOffset + 60,
      bucket + tzOffset,
      bucket + tzOffset - 60,
      bucket + tzOffset + 60,
    ]);

    const binFind = (target: number) => {
      let l = 0, r = hist.t.length - 1;
      while (l <= r) {
        const m = (l + r) >> 1;
        if (hist.t[m] === target) return m;
        if (hist.t[m] < target) l = m + 1; else r = m - 1;
      }
      return -1;
    };

    for (const t of candidates) {
      const idx = binFind(t);
      if (idx !== -1) return idx;
    }

    // Chọn phần tử có |diff| <= 60 nhỏ nhất nếu vẫn không match tuyệt đối
    let bestIdx = -1;
    let bestDiff = 61; // only accept <= 60s
    for (let i = 0; i < hist.t.length; i++) {
      const d = Math.abs(hist.t[i] - bucket);
      const d2 = Math.abs(hist.t[i] - (bucket - tzOffset));
      const diff = Math.min(d, d2);
      if (diff < bestDiff) { bestDiff = diff; bestIdx = i; }
    }
    return bestIdx;
  }

  private getCloseAt(signal: PredictionSignal): number | null {
    const hist = this.historyBySymbol[signal.symbol];
    if (!hist?.c?.length) return null;
    const ts = new Date(signal.createdAt || signal.timestamp).getTime() / 1000;
    const idx = this.findIndexForTimestamp(signal.symbol, ts);
    if (idx === -1) return null;
    return hist.c[idx] ?? null;
  }

  private getRsiAt(signal: PredictionSignal, period: number = 14): number | null {
    const hist = this.historyBySymbol[signal.symbol];
    if (!hist?.c?.length) return null;
    const ts = new Date(signal.createdAt || signal.timestamp).getTime() / 1000;
    const idx = this.findIndexForTimestamp(signal.symbol, ts);
    if (idx < period) {
      console.log(`RSI calculation for ${signal.symbol} at ${new Date(ts * 1000).toISOString()}: Not enough data (idx=${idx}, need ${period})`);
      return null;
    }
    
    // Tính RSI với dữ liệu từ đầu đến thời điểm tín hiệu
    const closesForRsi = hist.c.slice(0, idx + 1);
    const rsi = this.computeRsi(closesForRsi, period);
    
    // Giảm debug logs để tối ưu performance
    // console.log(`RSI calculation for ${signal.symbol} at ${new Date(ts * 1000).toISOString()}: ${rsi.toFixed(2)} (from ${closesForRsi.length} closes)`);
    return rsi;
  }

  private getAtrAt(signal: PredictionSignal, period: number = 14): number {
    const hist = this.historyBySymbol[signal.symbol];
    if (!hist?.h?.length || !hist?.l?.length || !hist?.c?.length) return 0;
    const ts = new Date(signal.createdAt || signal.timestamp).getTime() / 1000;
    const idx = this.findIndexForTimestamp(signal.symbol, ts);
    const start = Math.max(1, idx - period + 1);
    let sumTR = 0;
    let n = 0;
    for (let i = start; i <= idx; i++) {
      const h = hist.h![i];
      const l = hist.l![i];
      const prevClose = hist.c[i - 1];
      const tr = Math.max(h - l, Math.abs(h - prevClose), Math.abs(l - prevClose));
      sumTR += tr; n++;
    }
    return n > 0 ? sumTR / n : 0;
  }

  private getDecisionAt(signal: PredictionSignal): { trend: 'UP'|'DOWN'|'NEUTRAL'; action: 'long'|'short'|'hold' } {
    const hist = this.historyBySymbol[signal.symbol];
    if (!hist?.c?.length) return { trend: 'NEUTRAL', action: 'hold' };
    const ts = new Date(signal.createdAt || signal.timestamp).getTime() / 1000;
    const idx = this.findIndexForTimestamp(signal.symbol, ts);
    if (idx < 50) return { trend: 'NEUTRAL', action: 'hold' };
    
    // 1. Lấy dữ liệu giá và khối lượng tại thời điểm tín hiệu
    const closes = hist.c.slice(0, idx + 1);
    
    // 2. Tính các chỉ báo kỹ thuật tại thời điểm đó
    const rsi = this.computeRsi(closes.slice(-14), 14);
    const ema20_now = this.computeEMA(closes, 20);
    const ema50_now = this.computeEMA(closes, 50);
    const ema20_prev = this.computeEMA(closes.slice(0, closes.length - 1), 20);
    const ema50_prev = this.computeEMA(closes.slice(0, closes.length - 1), 50);
    
    // 3. Đặt điều kiện ra dự đoán theo logic ensemble
    const macdObj = this.computeMACD(closes);
    return this.decideByFormula(ema20_prev, ema50_prev, ema20_now, ema50_now, rsi, macdObj, closes, hist.h, hist.l);
  }

  // Chỉ tính NHÃN xu hướng theo logic thực tế: EMA + RSI
  private getTrendOnlyAt(signal: PredictionSignal): 'UP'|'DOWN'|'NEUTRAL' {
    // Tính toán chính xác cho từng thời điểm tín hiệu
    const hist = this.historyBySymbol[signal.symbol];
    if (!hist?.c?.length) return 'NEUTRAL';
    const ts = new Date(signal.createdAt || signal.timestamp).getTime() / 1000;
    const idx = this.findIndexForTimestamp(signal.symbol, ts);
    if (idx < 50) return 'NEUTRAL';

    // 1. Lấy dữ liệu giá và khối lượng tại thời điểm tín hiệu
    const closes = hist.c.slice(0, idx + 1);

    // 2. Tính các chỉ báo kỹ thuật tại thời điểm đó
    const rsi = this.computeRsi(closes, 14);
    const ema20_now = this.computeEMA(closes, 20);
    const ema50_now = this.computeEMA(closes, 50);
    const ema20_prev = this.computeEMA(closes.slice(0, closes.length - 1), 20);
    const ema50_prev = this.computeEMA(closes.slice(0, closes.length - 1), 50);
    
    // 3. Đặt điều kiện ra dự đoán theo logic ensemble
    const macdObj = this.computeMACD(closes);
    const decision = this.decideByFormula(ema20_prev, ema50_prev, ema20_now, ema50_now, rsi, macdObj, closes, hist.h, hist.l);
    
    // Giảm debug logs để tối ưu performance
    // console.log(`Trend calculation for ${signal.symbol} at ${new Date(ts * 1000).toISOString()}: ${decision.trend} (rsi=${rsi.toFixed(2)}, ema20=${ema20_now.toFixed(2)}, ema50=${ema50_now.toFixed(2)})`);
    return decision.trend;
  }

  // ===== Render theo từng tín hiệu =====
  getDisplayedPrice(signal: PredictionSignal): string {
    const price = this.getCloseAt(signal);
    if (price === null || price === undefined) return '—';
    return this.formatPrice(Number(price));
  }

  getDisplayedRsi(signal: PredictionSignal): string {
    // Tính RSI chính xác cho từng thời điểm tín hiệu
    const rsi = this.getRsiAt(signal);
    if (rsi !== null && rsi !== undefined) {
      return Number(rsi).toFixed(1);
    }
    
    // Fallback: sử dụng RSI từ signal hoặc rsiBySymbol
    const fallbackRsi = signal.rsi ?? this.rsiBySymbol[signal.symbol];
    return fallbackRsi !== undefined && fallbackRsi !== null ? (Number(fallbackRsi).toFixed(1)) : '—';
  }

  getDisplayedTrendLabel(signal: PredictionSignal): string {
    const trend = this.getTrendOnlyAt(signal);
    return trend === 'UP' ? 'Tăng' : trend === 'DOWN' ? 'Giảm' : 'Trung lập';
  }

  getDisplayedTrendColor(signal: PredictionSignal): string {
    const trend = this.getTrendOnlyAt(signal);
    return trend === 'UP' ? '#10b981' : trend === 'DOWN' ? '#ef4444' : '#6b7280';
  }

  getDisplayedAction(signal: PredictionSignal): string {
    // Để cột lệnh rỗng
    return '';
  }

  getDisplayedReversal(signal: PredictionSignal): string {
    // Tính điểm đảo chiều riêng cho từng tín hiệu
    const revBase = this.getCloseAt(signal);
    if (revBase === null) return '—';
    const atr = this.getAtrAt(signal);
    
    // Tính xu hướng và action cho tín hiệu này
    const trend = this.getTrendOnlyAt(signal);
    let dir: 'long'|'short'|'hold' = 'hold';
    
    if (trend === 'UP') {
      dir = 'long';
    } else if (trend === 'DOWN') {
      dir = 'short';
    }
    
    // Tính điểm đảo chiều theo xu hướng
    let rev: number;
    let label: string;
    
    if (dir === 'long') {
      rev = revBase + 0.5 * atr; // Long: điểm dừng lỗ = giá + ATR
      label = 'Đảo long ';
    } else if (dir === 'short') {
      rev = revBase - 0.5 * atr; // Short: điểm dừng lỗ = giá - ATR
      label = 'Đảo short ';
    } else {
      rev = revBase; // Hold: điểm đảo chiều = giá hiện tại
      label = '';
    }
    
    console.log(`Reversal calculation for ${signal.symbol} at ${new Date(signal.createdAt || signal.timestamp).toISOString()}: trend=${trend}, dir=${dir}, revBase=${revBase.toFixed(2)}, atr=${atr.toFixed(2)}, rev=${rev.toFixed(2)}`);
    
    return label + this.formatPrice(rev);
  }

  // ===== Tính toán chỉ số cơ bản =====
  private computeRsi(closes: number[], period: number): number {
    if (!closes || closes.length < period + 1) {
      console.log(`RSI: Not enough data. Closes length: ${closes?.length}, Required: ${period + 1}`);
      return 50;
    }
    
    // Tính changes (price differences)
    const changes: number[] = [];
    for (let i = 1; i < closes.length; i++) {
      changes.push(closes[i] - closes[i - 1]);
    }
    
    // Tính gains và losses
    const gains: number[] = changes.map(change => change > 0 ? change : 0);
    const losses: number[] = changes.map(change => change < 0 ? -change : 0);
    
    // Tính initial average gain và loss (SMA cho period đầu tiên)
    let avgGain = 0, avgLoss = 0;
    for (let i = 0; i < period; i++) {
      avgGain += gains[i];
      avgLoss += losses[i];
    }
    avgGain /= period;
    avgLoss /= period;
    
    // Tính RSI với Wilder's smoothing cho các period tiếp theo
    for (let i = period; i < gains.length; i++) {
      avgGain = (avgGain * (period - 1) + gains[i]) / period;
      avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
    }
    
    // Tính RSI
    if (avgLoss === 0) {
      console.log(`RSI: avgLoss is 0, returning 100`);
      return 100;
    }
    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));
    
    // Giảm debug logs để tối ưu performance
    // console.log(`RSI calculation: avgGain=${avgGain.toFixed(4)}, avgLoss=${avgLoss.toFixed(4)}, RS=${rs.toFixed(4)}, RSI=${rsi.toFixed(2)} (from ${closes.length} closes)`);
    
    return Math.max(0, Math.min(100, rsi));
  }

  private computeAtr(highs: number[], lows: number[], closes: number[], period: number): number {
    const n = Math.min(highs.length, lows.length, closes.length);
    if (n < period + 1) return 0;
    let sumTR = 0;
    for (let i = n - period + 1; i < n; i++) {
      const h = highs[i];
      const l = lows[i];
      const prevClose = closes[i - 1];
      const tr = Math.max(h - l, Math.abs(h - prevClose), Math.abs(l - prevClose));
      sumTR += tr;
    }
    return sumTR / (period);
  }

  private computeEMA(closes: number[], period: number): number {
    if (closes.length < period) {
      console.log(`EMA${period}: Not enough data. Closes length: ${closes.length}, Required: ${period}`);
      return 0;
    }
    
    // Lấy đúng period cây nến gần nhất (không xét thời gian cách ra)
    const recentCloses = closes.slice(-period);
    const k = 2 / (period + 1);
    
    // Bắt đầu với SMA của period đầu tiên
    let ema = recentCloses.slice(0, period).reduce((sum, price) => sum + price, 0) / period;
    
    // Tính EMA cho các cây nến còn lại
    for (let i = 1; i < recentCloses.length; i++) {
      ema = recentCloses[i] * k + ema * (1 - k);
    }
    
    // Giảm debug logs để tối ưu performance
    // console.log(`EMA${period} calculated: ${ema.toFixed(2)} from ${recentCloses.length} recent closes`);
    return ema;
  }

  private computeMACD(closes: number[]): { macd: number; signal: number; histogram: number } {
    if (closes.length < 35) return { macd: 0, signal: 0, histogram: 0 };
    const emaArr = (arr: number[], p: number, upto: number): number => {
      const k = 2 / (p + 1);
      let ema = arr[upto - p + 1];
      for (let i = upto - p + 2; i <= upto; i++) {
        ema = arr[i] * k + ema * (1 - k);
      }
      return ema;
    };
    const last = closes.length - 1;
    const ema12 = emaArr(closes, 12, last);
    const ema26 = emaArr(closes, 26, last);
    const macd = ema12 - ema26;

    const macdSeries: number[] = [];
    for (let i = last - 26 - 9 + 1; i <= last; i++) {
      const e12 = emaArr(closes, 12, i);
      const e26 = emaArr(closes, 26, i);
      macdSeries.push(e12 - e26);
    }
    const k = 2 / (9 + 1);
    let signal = macdSeries[0];
    for (let i = 1; i < macdSeries.length; i++) {
      signal = macdSeries[i] * k + signal * (1 - k);
    }
    const histogram = macd - signal;
    return { macd, signal, histogram };
  }

  // Dùng dữ liệu FE cho hiển thị
  formatPrice(price?: number): string {
    if (price === undefined || price === null || Number.isNaN(price)) {
      return '—';
    }
    return Number(price).toFixed(2);
  }

  formatDateTime(timestamp: string): string {
    return new Date(timestamp).toLocaleString('vi-VN');
  }

  formatShortTime(timestamp: string): string {
    let dt = new Date(timestamp);
    if (typeof timestamp === 'string' && timestamp.endsWith('Z')) {
      dt = new Date(dt.getTime() + 7 * 60 * 60 * 1000);
    }
    const hh = dt.getHours().toString().padStart(2, '0');
    const mm = dt.getMinutes().toString().padStart(2, '0');
    const ss = dt.getSeconds().toString().padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }

  getPlatformName(signal: PredictionSignal): string {
    return signal.symbol || 'UNKNOWN';
  }
}
