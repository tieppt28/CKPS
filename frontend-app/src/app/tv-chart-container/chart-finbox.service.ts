import {Component, EventEmitter, Injectable} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiUtils} from "./api-url";
@Injectable()
export class ChartFinboxService {
  invokeMobileChartFunction = new EventEmitter<any>();
  invokeMobileChartStudyFunction = new EventEmitter<any>();
  subsVar: Subscription = new Subscription();

  public tickers: any;
  public tickerChartOnly: any = "VHM";
  public active: any;
  public userId: any = '1281b84771fc9cf31874db24';
  tickersObservable  = new Observable();
  tabSelect = 0;
  public indicator: any;
  constructor(private http: HttpClient) {
    this.indicator = {};
    this.userId = JSON.parse(localStorage.getItem("userData") || '{}').id || this.userId;
    const rawTickerChartOnly = localStorage.getItem("tickerChartOnly");

    if (rawTickerChartOnly != 'undefined') {
      this.tickerChartOnly = JSON.parse(localStorage.getItem("tickerChartOnly") || '{}');
      if (!this.tickerChartOnly || this.tickerChartOnly === '' || typeof this.tickerChartOnly === 'object') {
        this.tickerChartOnly = "VHM";
      }
    }

    const tickersDefault = [{ticker: 'BSR'}, {ticker: 'VHM'}, {ticker: 'CTG'}];
    tickersDefault.forEach( function (tickerInfo: any, index) {
        tickerInfo['id'] = Date.now() + index;
    })

    if (window.localStorage.getItem('tickers') && window.localStorage.getItem('tickers') !== null) {
      this.tickers = JSON.parse(window.localStorage.getItem('tickers') || JSON.stringify(tickersDefault));
      if (this.tickers.length === 0) {
        this.tickers = tickersDefault;
      } else {
        if (!this.tickers[0].id) {
          for (let i = 0; i < this.tickers.length; i++) {
            let dataTicker = {
              id: Date.now() + i,
              ticker: this.tickers[i].ticker?this.tickers[i].ticker: this.tickers[i]
            };
            this.tickers[i] = dataTicker;
          }
        }
      }
    } else {
      this.tickers = tickersDefault;
    }
    window.localStorage.setItem('tickers', JSON.stringify(this.tickers));

  }

  onMobileChartFunctionButtonClick(study: string, isStudy: boolean) {
    let data = {
      data: study,
      isStudy: isStudy
    }
    this.invokeMobileChartFunction.emit(data);
  }

  onChangeStudyChartFunction() {
    this.invokeMobileChartStudyFunction.emit();
  }

  public saveChartTickerToServe(dataChart: any): Observable<any> {
    return this.http.post(ApiUtils.getUrl('/api/saveChartTicker'), dataChart);
  }

  public removeChartTickerToServe(dataChart: any): Observable<any> {
    return this.http.post(ApiUtils.getUrl('/api/removeChartTicker'), dataChart);
  }

  public loadChartTickerFromServe(dataChart: any): Observable<any> {
    return this.http.post(ApiUtils.getUrl('/api/loadChartTicker'), dataChart);
  }

  public resetDefaultChartTickerUser(dataChart: any): Observable<any> {
    return this.http.post(ApiUtils.getUrl('/api/resetDefaultChartTicker'), dataChart);
  }

  public onChangeTickers (ticker: string) {
    this.tickers[this.tabSelect] = ticker;
  }
}
