import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Injector, Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import {ChartFinboxService} from "../tv-chart-container/chart-finbox.service";
import {TvChartContainerComponent} from "../tv-chart-container/tv-chart-container.component";
import {ChartingLibraryWidgetOptions} from "../../assets/charting_library";

@Component({
  selector: 'app-chart-only',
  templateUrl: './chart-only.component.html',
  styleUrls: ['./chart-only.component.scss']
})
export class ChartOnlyComponent implements OnInit {
  @ViewChild('container', {static: true, read: ViewContainerRef}) _container: ViewContainerRef | any;
  title = 'client';
  active: any;
  ticker: string;
  layouts: any;
  listLayout: any;
  containerId: any;

  @Input()
  set containerIds(containerId: any) {
    this.containerId = containerId || this.containerId;
  }

  constructor(injector: Injector, public chartService: ChartFinboxService, private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) {
    this.active = {};
    this.active['0'] = 'active';
    this.active['ticker'] = this.chartService.tickers[0];
    this.ticker = 'VHM';
    this.layouts = this.getDefaultData()['layout32Horizontal'];
    this.listLayout = Object.values(this.getDefaultData());
  }

  ngOnInit() {
    // this.createChart();
  }

  onChangeTicker(index: any) {
    this.active = {};
    this.active[index] = 'active';
    this.active['ticker'] = this.chartService.tickers[index];
    this.createChart();
    this.chartService.tabSelect = index;
  }

  createChart() {
    this.removeChart();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TvChartContainerComponent);
    const componentRef = this._container.createComponent(componentFactory);
    // componentRef.instance.symbol = this.active['ticker'];
    componentRef.instance.symbol = this.ticker;
    componentRef.instance.messageEvent.subscribe((ticker: any) => {
      this.receiveMessage(ticker);
    })
  }

  receiveMessage(ticker: string) {
    if (ticker === 'reset') {
      this.removeChart();
      this.createChart();
      this.cd.detectChanges();
      return;
    }
    // this.chartService.tickers[this.chartService.tabSelect] = ticker;
    // this.cd.detectChanges();
    // this.saveLocalStorage();
  }

  addTicker() {
    this.chartService.tickers.push('VHM');
    this.active = {};
    this.active[this.chartService.tickers.length - 1] = 'active';
    this.active['ticker'] = this.chartService.tickers[this.chartService.tickers.length - 1];
    this.chartService.tabSelect = this.chartService.tickers.length - 1;
    this.removeChart();
    this.createChart();
    this.saveLocalStorage();
  }

  removeChart() {
    const chart = document.getElementsByTagName('app-tv-chart-container')[0];
    if (chart) {
      document.getElementsByTagName('app-tv-chart-container')[0].remove();
    }
  }

  removeTicker(index: any) {
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
    this.active['ticker'] = this.chartService.tickers[indexAfter];
    if (index === indexActive && index !== this.chartService.tickers.length - 1) {
      this.active['ticker'] = this.chartService.tickers[indexAfter + 1];
    }
    this.chartService.tabSelect = indexAfter;
    this.chartService.tickers.splice(index, 1);
    this.saveLocalStorage();
    if (index > indexActive) {
      return;
    }
    this.removeChart();
    this.createChart();
  }

  saveLocalStorage() {
    window.localStorage.setItem('tickers', JSON.stringify(this.chartService.tickers));
  }


  getDefaultData() {
    let layouts = {
      layout1Horizontal: {
        name: '1',
        orientation: 'Horizontal',
        panes: [
          {
            chartId: 'chart1',
          }
        ]
      },
      layout2Horizontal: {
        name: '2.1',
        orientation: 'Horizontal',
        panes: [
          {
            chartId: 'chart1',
          }, {
            chartId: 'chart2',
          }
        ]
      },
      layout31Horizontal: {
        name: '3.1',
        orientation: 'Horizontal',
        panes: [
          {
            chartId: 'chart1',
          }, {
            chartId: 'chart2',
          }, {
            chartId: 'chart3',
          }
        ]
      },
      layout32Horizontal: {
        name: '3.2',
        orientation: 'Horizontal',
        panes: [
          {
            chartId: 'chart1',
          }, {
            orientation: 'Vertical',
            panes: [
              {
                chartId: 'chart2',
              }, {
                chartId: 'chart3',
              }
            ]
          }
        ]
      },
      layout4Horizontal: {
        name: '4',
        orientation: 'Horizontal',
        panes: [
          {
            orientation: 'Vertical',
            panes: [
              {
                chartId: 'chart0',
              }, {
                chartId: 'chart1',
              }
            ]
          }, {
            orientation: 'Vertical',
            panes: [
              {
                chartId: 'chart2',
              }, {
                chartId: 'chart3',
              }
            ]
          }
        ]
      },
      layout2Vertical: {
        name: '2.2',
        orientation: 'Vertical',
        panes: [
          {
            chartId: 'chart1',
          }, {
            chartId: 'chart2',
          }
        ]
      },
      layout31Vertical: {
        name: '3.3',
        orientation: 'Vertical',
        panes: [
          {
            orientation: 'Vertical',
            panes: [
              {
                chartId: 'chart2',
              }, {
                chartId: 'chart3',
              }
            ]
          },
          {
            chartId: 'chart1',
          }
        ]
      },
      layout32Vertical: {
        name: '3.4',
        orientation: 'Vertical',
        panes: [
          {
            chartId: 'chart1',
          }, {
            chartId: 'chart2',
          }, {
            chartId: 'chart3',
          }
        ]
      },
      layout6Vertical: {
        name: '6',
        orientation: 'Vertical',
        panes: [
          {
            orientation: 'Horizontal',
            panes: [
              {
                chartId: 'chart1',
              }, {
                chartId: 'chart2',
              }, {
                chartId: 'chart3',
              }
            ]
          }, {
            orientation: 'Horizontal',
            panes: [
              {
                chartId: 'chart4',
              }, {
                chartId: 'chart5',
              }, {
                chartId: 'chart6',
              }
            ]
          }
        ]
      },
      layout8Vertical: {
        name: '8',
        orientation: 'Vertical',
        panes: [
          {
            orientation: 'Horizontal',
            panes: [
              {
                chartId: 'chart0',
              },
              {
                chartId: 'chart1',
              }, {
                chartId: 'chart2',
              }, {
                chartId: 'chart3',
              }
            ]
          }, {
            orientation: 'Horizontal',
            panes: [
              {
                chartId: 'chart4',
              }, {
                chartId: 'chart5',
              }, {
                chartId: 'chart6',
              }, {
                chartId: 'chart7',
              }
            ]
          }
        ]
      },
    }
    return layouts;
  }
}
