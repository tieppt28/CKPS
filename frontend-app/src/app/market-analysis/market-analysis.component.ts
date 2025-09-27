import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { BackendApiService, PredictionSignal, TechnicalIndicators, TrendForecast } from '../services/backend-api.service';

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

  constructor(private backendApi: BackendApiService) {}

  ngOnInit() {
    this.loadSignals();
    this.loadTechnicalIndicators();
    this.loadForecast();
    
    // Polling nhanh (2 giây) để cập nhật realtime
    this.pollingSubscription = interval(2000).subscribe(() => {
      this.loadSignals();
      this.loadTechnicalIndicators();
      this.loadForecast();
      this.checkNewSignal();
    });
  }

  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Khi symbol thay đổi, chỉ reload tín hiệu và dự báo
    if (changes['symbol']) {
      // Clear dữ liệu cũ trước khi load mới
      this.signals = [];
      this.forecast = null;
      // Load dữ liệu mới cho symbol mới
      this.loadSignals();
      this.loadForecast();
      // Reset tracking để nhận tín hiệu mới cho symbol mới
      this.lastSignalId = null;
      this.lastSignalTimestamp = null;
    }
  }

  loadSignals() {
    this.loadingSignals = true;
    
    // Chỉ lấy tín hiệu cho VN30F1M
    this.backendApi.getSignalsBySymbol('VN30F1M').subscribe({
      next: (data) => {
        this.signals = Array.isArray(data) ? data : [];
        const latest = this.getNewestSignal(data);
        if (latest) {
          this.lastSignalId = latest.id ?? this.lastSignalId;
          this.lastSignalTimestamp = latest.timestamp ?? this.lastSignalTimestamp;
        }
        this.loadingSignals = false;
      },
      error: (error) => {
        this.signals = [];
        this.loadingSignals = false;
      }
    });
  }

  private loadRecentFallback() {
    this.backendApi.getRecentSignals().subscribe({
      next: (recent) => {
        // Luôn cập nhật dữ liệu fallback
        this.signals = Array.isArray(recent) ? recent : [];
        const latest = this.getNewestSignal(recent);
        if (latest) {
          this.lastSignalId = latest.id ?? this.lastSignalId;
          this.lastSignalTimestamp = latest.timestamp ?? this.lastSignalTimestamp;
        }
        this.loadingSignals = false;
      },
      error: (_) => { this.loadingSignals = false; }
    });
  }

  loadTechnicalIndicators() {
    this.backendApi.getTechnicalIndicators().subscribe({
      next: (data) => {
        this.technicalIndicators = data;
      },
      error: (error) => {}
    });
  }

  loadForecast() {
    const symbol = this.symbol || 'FPT';
    this.backendApi.forecastShortTerm(symbol, this.forecastHorizon).subscribe({
      next: (data) => {
        this.forecast = data;
      },
      error: (_: any) => {}
    });
  }

  private getNewestSignal(list: PredictionSignal[]): PredictionSignal | null {
    if (!Array.isArray(list) || list.length === 0) return null;
    return list
      .slice()
      .sort((a, b) => {
        // Ưu tiên createdAt nếu có, fallback sang timestamp
        const tb = new Date(b.createdAt || b.timestamp).getTime();
        const ta = new Date(a.createdAt || a.timestamp).getTime();
        return tb - ta;
      })[0];
  }

  private checkNewSignal() {
    const loader = this.symbol
      ? this.backendApi.getSignalsBySymbol(this.symbol)
      : this.backendApi.getRecentSignals();
    loader.subscribe({
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
          const color = this.getSignalColor(latest.signalType);
          const price = this.formatPrice(latest.price);
          const sym = latest.symbol;
          const conf = latest.confidence?.toFixed(1) ?? '';
          const text = `${label} ${sym} @ ${price} (độ tin cậy ${conf}%)`;

          this.alertMessage = text;

          // Tự ẩn sau 10s
          setTimeout(() => {
            this.alertMessage = null;
          }, 10000);
        }
      },
      error: (_: any) => {}
    });
  }

  getSignalTypeLabel(signalType: string): string {
    switch (signalType) {
      case 'LONG': return 'TĂNG';
      case 'SHORT': return 'GIẢM';
      case 'REVERSAL': return 'ĐẢO CHIỀU';
      default: return 'GIỮ';
    }
  }

  getSignalColor(signalType: string): string {
    switch (signalType) {
      case 'LONG': return '#10b981';
      case 'SHORT': return '#ef4444';
      case 'REVERSAL': return '#f59e0b';
      default: return '#6b7280';
    }
  }

  getConfidenceColor(confidence: number): string {
    if (confidence >= 80) return '#10b981';
    if (confidence >= 60) return '#f59e0b';
    return '#ef4444';
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }

  formatDateTime(timestamp: string): string {
    return new Date(timestamp).toLocaleString('vi-VN');
  }

  // Hiển thị mốc thời gian trong ngày: HH:mm:ss (chuẩn hóa GMT+7 nếu dữ liệu là UTC)
  formatShortTime(timestamp: string): string {
    let dt = new Date(timestamp);
    // Nếu chuỗi có ký tự 'Z' (UTC) thì cộng bù GMT+7 để hiển thị theo giờ VN
    if (typeof timestamp === 'string' && timestamp.endsWith('Z')) {
      dt = new Date(dt.getTime() + 7 * 60 * 60 * 1000);
    }
    const hh = dt.getHours().toString().padStart(2, '0');
    const mm = dt.getMinutes().toString().padStart(2, '0');
    const ss = dt.getSeconds().toString().padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }

  getReversalPointDisplay(signal: PredictionSignal): string {
    if (signal.reversalPoint) {
      const price = signal.price || 0;
      const reversal = signal.reversalPoint;
      const type = signal.signalType;

      if (type === 'LONG' || (type === 'REVERSAL' && reversal <= price)) {
        return `Đảo long ${this.formatPrice(reversal)}`;
      }
      if (type === 'SHORT' || (type === 'REVERSAL' && reversal > price)) {
        return `Đảo short ${this.formatPrice(reversal)}`;
      }
      return this.formatPrice(reversal);
    }
    return '—';
  }

  getPlatformName(signal: PredictionSignal): string {
    // Hiển thị tên mã sàn giao dịch (symbol)
    return signal.symbol || 'UNKNOWN';
  }
}
