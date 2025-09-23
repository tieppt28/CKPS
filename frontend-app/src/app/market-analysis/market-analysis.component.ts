import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { BackendApiService, PredictionSignal, TechnicalIndicators } from '../services/backend-api.service';

@Component({
  selector: 'app-market-analysis',
  templateUrl: './market-analysis.component.html',
  styleUrls: ['./market-analysis.component.scss']
})
export class MarketAnalysisComponent implements OnInit, OnDestroy {
  @Input() symbol?: string;
  signals: PredictionSignal[] = [];
  technicalIndicators: TechnicalIndicators | null = null;
  private pollingSubscription: Subscription | null = null;
  alertMessage: string | null = null;
  lastSignalId: number | null = null;
  lastSignalTimestamp: string | null = null;

  constructor(private backendApi: BackendApiService) {}

  ngOnInit() {
    this.loadSignals();
    this.loadTechnicalIndicators();
    
    // Polling mỗi 8 giây để cập nhật dữ liệu
    this.pollingSubscription = interval(8000).subscribe(() => {
      this.loadSignals();
      this.loadTechnicalIndicators();
      this.checkNewSignal();
    });
  }

  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  loadSignals() {
    const loader = this.symbol
      ? this.backendApi.getSignalsBySymbol(this.symbol)
      : this.backendApi.getRecentSignals();
    loader.subscribe({
      next: (data) => {
        this.signals = data;
        // cập nhật điểm mốc so sánh
        const latest = this.getNewestSignal(data);
        if (latest) {
          this.lastSignalId = latest.id ?? this.lastSignalId;
          this.lastSignalTimestamp = latest.timestamp ?? this.lastSignalTimestamp;
        }
      },
      error: (error) => {
        console.error('Lỗi khi tải tín hiệu:', error);
      }
    });
  }

  loadTechnicalIndicators() {
    this.backendApi.getTechnicalIndicators().subscribe({
      next: (data) => {
        this.technicalIndicators = data;
      },
      error: (error) => {
        console.error('Lỗi khi tải chỉ số kỹ thuật:', error);
      }
    });
  }

  private getNewestSignal(list: PredictionSignal[]): PredictionSignal | null {
    if (!Array.isArray(list) || list.length === 0) return null;
    return list
      .slice()
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
  }

  private checkNewSignal() {
    const loader = this.symbol
      ? this.backendApi.getSignalsBySymbol(this.symbol)
      : this.backendApi.getLatestSignal(1);
    loader.subscribe({
      next: (list) => {
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
      error: (_) => {}
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
}
