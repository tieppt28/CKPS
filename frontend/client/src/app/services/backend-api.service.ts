import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PredictionSignal {
  id: number;
  timestamp: string;
  signalType: string;
  confidence: number;
  reason: string;
  price: number;
  symbol: string;
  rsi?: number;
  platform?: string;
  reversalPoint?: number;
}

export interface TechnicalIndicators {
  rsi: number;
  ema20: number;
  ema50: number;
  macd: number;
  macdSignal: number;
  macdHistogram: number;
  atr: number;
}

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Lấy danh sách tín hiệu gần đây
  getRecentSignals(): Observable<PredictionSignal[]> {
    return this.http.get<PredictionSignal[]>(`${this.apiUrl}/api/signals/recent`);
  }

  // Lấy tín hiệu theo symbol
  getSignalsBySymbol(symbol: string): Observable<PredictionSignal[]> {
    return this.http.get<PredictionSignal[]>(`${this.apiUrl}/api/signals/${symbol}`);
  }

  // Lấy chỉ số kỹ thuật
  getTechnicalIndicators(symbol?: string): Observable<TechnicalIndicators> {
    const url = symbol 
      ? `${this.apiUrl}/api/technical-indicators/${symbol}`
      : `${this.apiUrl}/api/technical-indicators`;
    return this.http.get<TechnicalIndicators>(url);
  }

  // Lấy dữ liệu giá cổ phiếu
  getStockData(symbol: string, timeframe: string = '1D'): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/stock-data/${symbol}?timeframe=${timeframe}`);
  }

  // Lấy danh sách symbols
  getSymbols(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/symbols`);
  }

  // Health check
  healthCheck(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }
}
