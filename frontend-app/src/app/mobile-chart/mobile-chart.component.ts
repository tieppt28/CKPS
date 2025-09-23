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

@Component({
  selector: 'app-tabs-chart',
  templateUrl: './mobile-chart.component.html',
  styleUrls: ['./mobile-chart.component.scss']
})
export class MobileChartComponent implements OnInit {
  @ViewChild('container', {static: true, read: ViewContainerRef}) _container: ViewContainerRef | any;
  title = 'client';
  active: any;
  styleTabChartPopup: any;
  styleChartTab: any;
  styleTabPopupActive: any;
  interval: any;
  theme: any;
  foods: any = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor(injector: Injector, public chartService: ChartFinboxService, private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) {
    this.active = {};
    this.interval = this.getIntervalParam();
    this.styleTabChartPopup = { display: "none"};
    this.styleChartTab = {
      height: 'calc(100vh - 73px)'
    };
    this.theme = this.getThemeChart();
  }

  ngOnInit() {
    this.chartService.subsVar = this.chartService.invokeMobileChartStudyFunction.subscribe(() => {
      this.cd.detectChanges();
    })
    if (this.styleTabPopupActive !== 'active') {
    }
    this.chartService.indicator['Moving Average'] = true;
  }
  getThemeChart() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    if (url.searchParams.get("dark") && url.searchParams.get("dark") === 'true') {
      return 'dark';
    } else {
      return '';
    }
  }

  getIntervalParam() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const paramInterval = url.searchParams.get("interval");
    if (paramInterval) {
      return paramInterval;
    } else {
      return '1D';
    }
  }
  eventChart(data: string, isStudy: boolean){
    if (isStudy) {
      if (this.chartService.indicator[data]) {
        this.chartService.indicator[data] = false;
      } else {
        this.chartService.indicator[data] = true;
      }
    }
    this.chartService.onMobileChartFunctionButtonClick(data, isStudy);
  }

  selectTime(interval: string){
    this.interval = interval;
    this.eventChart(interval, false);
  }

  receiveMessage(ticker: string) {
    if (ticker === 'reset') {
      this.cd.detectChanges();
      return;
    }
    this.chartService.tickers[this.chartService.tabSelect].ticker = ticker;
    this.cd.detectChanges();
  }

}
