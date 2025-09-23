import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import {ChartFinboxService} from "../tv-chart-container/chart-finbox.service";
import {TvChartContainerComponent} from "../tv-chart-container/tv-chart-container.component";
import {tick} from "@angular/core/testing";

@Component({
  selector: 'app-tabs-chart',
  templateUrl: './tabs-chart.component.html',
  styleUrls: ['./tabs-chart.component.scss']
})
export class TabsChartComponent implements OnInit {

  @ViewChild('container', {static: true, read: ViewContainerRef}) _container: ViewContainerRef | any;
  title = 'client';
  active: any;
  styleTabChartPopup: any;
  styleChartTab: any;
  styleTabPopupActive: any;

  constructor(injector: Injector, public chartService: ChartFinboxService, private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) {
    this.active = {};
    this.styleTabChartPopup = { display: "none"};
    this.styleChartTab = {
      height: 'calc(100vh - 42px)'
    };
    let indexActive = window.localStorage.getItem('active') || 0;
    if (indexActive !== 'popup') {
      if (indexActive >= this.chartService.tickers.length || isNaN(Number(indexActive)) || !indexActive) {
        indexActive = 0;
      }
      this.active[indexActive] = 'active';
      this.active['ticker'] = this.chartService.tickers[0].ticker;
    } else {
      this.openTabPopup();
    }
  }

  ngOnInit() {
    if (this.styleTabPopupActive !== 'active') {
      this.createChart();
    }
  }

  onChangeTicker(index: any) {
    this.hiddenChart();
    this.active = {};
    this.active[index] = 'active';
    this.styleTabChartPopup = { display: "none"};
    this.styleTabPopupActive = '';
    this.active['ticker'] = this.chartService.tickers[index].ticker;
    this.createChart();
    this.chartService.tabSelect = index;
    this.saveLocalStorage();
  }

  openTabPopup() {
    this.hiddenChart();
    this.active = {};
    this.styleTabChartPopup = {};
    this.styleTabPopupActive = 'active';
    window.localStorage.setItem('active', 'popup');
  }

  createChart() {
    // this.removeChart();
    const chartId = this.chartService.tickers[Number(Object.keys(this.active)[0])].id;
    let chart = document.getElementById(chartId);
    if (chart) {
      chart.style.display = 'block';
      return;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TvChartContainerComponent);
    const componentRef = this._container.createComponent(componentFactory);
    componentRef.instance.containerId = 'tvChart' + this.chartService.tickers[Number(Object.keys(this.active)[0])].id;
    componentRef.instance.symbol = this.active['ticker'];
    componentRef.instance.onlyChart = false;
    componentRef.location.nativeElement.id = this.chartService.tickers[Number(Object.keys(this.active)[0])].id;
    componentRef.location.nativeElement.style.display = 'block';
    componentRef.instance.idTabChart = this.chartService.tickers[Number(Object.keys(this.active)[0])].id;
    // componentRef.instance.symbol = this.ticker;
    componentRef.instance.styleChart = this.styleChartTab;
    componentRef.instance.messageEvent.subscribe((ticker: any) => {
      this.receiveMessage(ticker);
    })
  }

  receiveMessage(ticker: string) {
    if (ticker === 'reset') {
    this.removeChart(this.chartService.tickers[Number(Object.keys(this.active)[0])].id);
    this.createChart();
    this.cd.detectChanges();
    return;
    }
    this.chartService.tickers[this.chartService.tabSelect].ticker = ticker;
    this.cd.detectChanges();
    this.saveLocalStorage();
    // this.removeChart();
    // this.createChart();
  }

  hiddenChart() {
    if (Object.keys(this.active)[0]) {
      const chartId = this.chartService.tickers[Number(Object.keys(this.active)[0])].id;
      let chart = document.getElementById(chartId);
      chart?chart.style.display = 'none':'';
    }
  }

  addTicker() {
    this.hiddenChart();
    const dataTicker = {
      id: Date.now(),
      ticker: 'VHM'
    }
    this.chartService.tickers.push(dataTicker);
    this.active = {};
    this.active[this.chartService.tickers.length - 1] = 'active';
    this.active['ticker'] = this.chartService.tickers[this.chartService.tickers.length - 1].ticker;
    this.chartService.tabSelect = this.chartService.tickers.length - 1;
    // this.removeChart();
    this.createChart();
    this.saveLocalStorage();
  }

  removeChart(id: any) {
    const chart = document.getElementById(id);
    if (chart) {
      chart.remove();
    }
  }

  removeTicker(index: any) {
    const chartIdRemove = this.chartService.tickers[index].id;
    this.chartService.removeChartTickerToServe({userId: this.chartService.userId, chartId: chartIdRemove}).subscribe((data) => {
    });
    if (this.chartService.tickers.length === 1) {
      return;
    }
    let indexActive = Number(Object.keys(this.active)[0]);
    let indexAfter = 0;

    if (index < indexActive || (index === this.chartService.tickers.length - 1) && index === indexActive) {
      indexAfter = indexActive - 1;
    } else if (index === indexActive) {
      indexAfter = indexActive;
    } else if (index > indexActive && index !== indexActive) {
      indexAfter = index - 1;
    }
    if (index <= indexActive) {
      this.active = {};
      this.active[indexAfter] = 'active';
    }
    this.active['ticker'] = this.chartService.tickers[indexAfter].ticker;
    if (index === indexActive && index !== this.chartService.tickers.length - 1) {
      this.active['ticker'] = this.chartService.tickers[indexAfter + 1].ticker;
    }
    this.chartService.tabSelect = indexAfter;
    this.chartService.tickers.splice(index, 1);
    this.saveLocalStorage();
    if (index > indexActive) {
      return;
    }
    this.removeChart(chartIdRemove);
    this.createChart();
  }

  saveLocalStorage() {
    window.localStorage.setItem('tickers', JSON.stringify(this.chartService.tickers));
    window.localStorage.setItem('active', Number(Object.keys(this.active)[0]).toString());
  }

}
