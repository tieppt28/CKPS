import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { BackendApiService, PredictionSignal, TechnicalIndicators } from '../services/backend-api.service';

@Component({
  selector: 'app-market-analysis',
  templateUrl: './market-analysis.component.html',
  styleUrls: ['./market-analysis.component.scss']
})
export class MarketAnalysisComponent implements OnInit, OnDestroy {
  signals: PredictionSignal[] = [];
  technicalIndicators: TechnicalIndicators | null = null;
  private pollingSubscription: Subscription | null = null;

  constructor(private backendApi: BackendApiService) {}

  ngOnInit() {
    this.loadSignals();
    this.loadTechnicalIndicators();
    
    // Polling mỗi 8 giây để cập nhật dữ liệu
    this.pollingSubscription = interval(8000).subscribe(() => {
      this.loadSignals();
      this.loadTechnicalIndicators();
    });
  }

  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  loadSignals() {
    // Thử lấy tín hiệu cho VN30F1M trước, nếu không có thì lấy tín hiệu gần đây
    this.backendApi.getSignalsBySymbol('VN30F1M').subscribe({
      next: (data) => {
        this.signals = data;
        if (data.length === 0) {
          // Nếu không có tín hiệu cho VN30F1M, lấy tín hiệu gần đây
          this.backendApi.getRecentSignals().subscribe({
            next: (recentData) => {
              this.signals = recentData;
            },
            error: (error) => {}
          });
        }
      },
      error: (error) => {
        // Fallback: lấy tín hiệu gần đây
        this.backendApi.getRecentSignals().subscribe({
          next: (recentData) => {
            this.signals = recentData;
          },
          error: (fallbackError) => {}
        });
      }
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
