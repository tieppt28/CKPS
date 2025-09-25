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
  createdAt?: string;
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

export interface TrendForecast {
  direction: string;
  confidence: number;
  targetPrice: number;
  summary: string;
  horizonDays: number;
  // Thêm thông tin dễ hiểu
  directionText?: string;
  confidenceLevel?: string;
  confidenceText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Lấy danh sách tín hiệu gần đây
  getRecentSignals(): Observable<PredictionSignal[]> {
    return this.http.get<PredictionSignal[]>(`${this.apiUrl}/signals/recent`);
  }

  // Lấy tín hiệu theo symbol
  getSignalsBySymbol(symbol: string): Observable<PredictionSignal[]> {
    return this.http.get<PredictionSignal[]>(`${this.apiUrl}/signals/${symbol}`);
  }

  // Lấy chỉ số kỹ thuật
  getTechnicalIndicators(symbol?: string): Observable<TechnicalIndicators> {
    const url = symbol 
      ? `${this.apiUrl}/technical-indicators/${symbol}`
      : `${this.apiUrl}/technical-indicators`;
    return this.http.get<TechnicalIndicators>(url);
  }

  // Lấy dữ liệu giá cổ phiếu
  getStockData(symbol: string, timeframe: string = '1D'): Observable<any> {
    return this.http.get(`${this.apiUrl}/stock-data/${symbol}?timeframe=${timeframe}`);
  }

  // Lấy danh sách symbols
  getSymbols(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/symbols`);
  }

  // Dự báo xu hướng ngắn hạn
  forecastShortTerm(symbol: string, horizonDays: number): Observable<TrendForecast> {
    return this.http.get<TrendForecast>(`${this.apiUrl}/forecast/${symbol}?horizonDays=${horizonDays}`);
  }

  // Health check
  healthCheck(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }
}
