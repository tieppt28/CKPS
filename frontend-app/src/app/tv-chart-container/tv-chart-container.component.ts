import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  widget,
  IChartingLibraryWidget,
  ChartingLibraryWidgetOptions,
  LanguageCode,
  ResolutionString, StudyOverrides,
} from '../../assets/charting_library';
import { ChartFinboxService } from "./chart-finbox.service";
import { Router } from "@angular/router";
import { CustomDatafeed } from './custom-datafeed';

declare var indicators: any;

@Component({
  selector: 'app-tv-chart-container',
  templateUrl: './tv-chart-container.component.html',
  styleUrls: ['./tv-chart-container.component.css']
})
export class TvChartContainerComponent implements OnInit, OnDestroy {
  private messageHandler = this.onMessage.bind(this);
  private _symbol: ChartingLibraryWidgetOptions['symbol'] = 'VHM';
  private _interval: ChartingLibraryWidgetOptions['interval'] = 'D' as ResolutionString;
  // BEWARE: no trailing slash is expected in feed URL
  private _datafeedUrl = environment.data_feed_url;
  private _libraryPath: ChartingLibraryWidgetOptions['library_path'] = '/assets/charting_library/';
  private _timezone: ChartingLibraryWidgetOptions['timezone'] = 'Asia/Ho_Chi_Minh';
  private _chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'] = environment.save_load_url;
  private _chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'] = '1.1';
  private _clientId: ChartingLibraryWidgetOptions['client_id'] = 'tradingview.com';
  private _userId: ChartingLibraryWidgetOptions['user_id'] = '1281b84771fc9cf31874db24';
  private _fullscreen: ChartingLibraryWidgetOptions['fullscreen'] = false;
  private _autosize: ChartingLibraryWidgetOptions['autosize'] = true;
  public _container: ChartingLibraryWidgetOptions['container'] = 'tv_chart_container';
  private _theme: ChartingLibraryWidgetOptions['theme'] = 'light';
  private _locale: ChartingLibraryWidgetOptions['locale'] = 'vi';
  private _custom_css_url: ChartingLibraryWidgetOptions['custom_css_url'] = '../custom.css';
  private _version = '1.0'; // todo: v2 - ChartingLibraryWidgetOptions['version'];
  private _overrides: ChartingLibraryWidgetOptions['overrides'] = {};
  private _overridesTmp: ChartingLibraryWidgetOptions['overrides'] = {};
  private _actionEnable: boolean = false;
  private _actionSymbol?: string;
  private _actionType?: string | undefined;
  private _actionDate?: string | undefined;

  screenWidth: number;

  private _volume_overrides: any = {
    "volume.volume.color.0": "rgba(239, 83, 80, 0.5)",
    "volume.volume.color.1": "rgba(38, 166, 154, 0.5)",
    "volume.volume ma:plot.display": true,
    "volume.volume ma:plot.color": "rgba(33, 150, 243, 0.2)",
    "volume.volume ma:plot.transparency": "0.2",
    "volume.volume ma:plot.plottype": "area",
    "volume.volume ma:plot.linewidth": 2,
  }
  private _studies_overrides: ChartingLibraryWidgetOptions['studies_overrides'] = {
    ...this._volume_overrides,
    // "macd.signal.color": "rgb(244, 67, 54)",
    // "macd.macd.color.3": "rgba(244, 67, 54, 0.5)",
    // "rsi.rsiplot.color": "rgb(171, 71, 188)",
    // "rsi.rsi background.color": "rgba(171, 71, 188, 0.1)",
  };

  // private _overridesObject: StudyOverrides = {
  //   "scalesProperties.showStudyLastValue": true,
  // };


  private _studies_overrides_Object: any = {
    ...this._volume_overrides,
    // "macd.signal.color": "rgb(244, 67, 54)",
    // "macd.macd.color.3": "rgba(244, 67, 54, 0.5)",
    // "rsi.rsi plot.color": "rgb(171, 71, 188)",
    // "rsi.rsi background.color": "rgba(171, 71, 188, 0.1)",
  };
  private loadLastChart: ChartingLibraryWidgetOptions['load_last_chart'] = false;

  private isSave: boolean = false;
  private isHandSave: boolean = false;
  private udfDataFeed: any;
  private studyMobileActive: any = {};
  private _tvWidget: IChartingLibraryWidget | null = null;
  private _idTabChart: any;
  private _miniChart: boolean = false;
  private _derivative: boolean = false;
  private isDark: boolean = true;
  private updateFrequency: any = 10000;
  private symbolDerivative: any = ['VN30F1M', "VN30F2M", "VN30F1Q", "VN30F2Q"];
  private isIFrame = (input: Element | null): input is HTMLIFrameElement =>
    input !== null && input.tagName === 'IFRAME';
  private _onlyChart: any = true;
  _styleChart: any = {
    height: 'calc(100vh)',
    // margin: '-8px'
  };
  private _marksVisible = true;
  private _isVip = false;
  private _showMarkBtn: any = null;
  private _showMarkBtnMobile: any = null;


  constructor(private router: Router, public chartService: ChartFinboxService, private cd: ChangeDetectorRef) {
    // Initialize screenWidth on component load
    this.screenWidth = window.innerWidth;
  }

  @Input()

  set idTabChart(idTabChart: any) {
    this._idTabChart = idTabChart || this._idTabChart;
  }

  @Input()
  set miniChart(miniChart: boolean) {
    this._miniChart = miniChart || this._miniChart;
  }

  set onlyChart(onlyChart: any) {
    this._onlyChart = onlyChart;
  }

  @Input()
  set styleChart(styleChart: any) {
    this._styleChart = styleChart || this._styleChart;
  }

  @Input()
  set symbol(symbol: ChartingLibraryWidgetOptions['symbol']) {
    this._symbol = symbol || this._symbol;
  }

  @Input()
  set interval(interval: ChartingLibraryWidgetOptions['interval']) {
    this._interval = interval || this._interval;
  }

  @Input()
  set datafeedUrl(datafeedUrl: string) {
    this._datafeedUrl = datafeedUrl || this._datafeedUrl;
  }

  @Input()
  set libraryPath(libraryPath: ChartingLibraryWidgetOptions['library_path']) {
    this._libraryPath = libraryPath || this._libraryPath;
  }

  @Input()
  set timeZone(timezone: ChartingLibraryWidgetOptions['timezone']) {
    this._timezone = timezone || this._timezone;
  }

  @Input()
  set chartsStorageUrl(chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']) {
    this._chartsStorageUrl = chartsStorageUrl || this._chartsStorageUrl;
  }

  @Input()
  set chartsStorageApiVersion(chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']) {
    this._chartsStorageApiVersion = chartsStorageApiVersion || this._chartsStorageApiVersion;
  }

  @Input()
  set clientId(clientId: ChartingLibraryWidgetOptions['client_id']) {
    this._clientId = clientId || this._clientId;
  }

  @Input()
  set userId(userId: ChartingLibraryWidgetOptions['user_id']) {
    this._userId = userId || this._userId;
  }

  @Input()
  set fullscreen(fullscreen: ChartingLibraryWidgetOptions['fullscreen']) {
    this._fullscreen = fullscreen || this._fullscreen;
  }

  @Input()
  set autosize(autosize: ChartingLibraryWidgetOptions['autosize']) {
    this._autosize = autosize || this._autosize;
  }

  @Input()
  set theme(theme: ChartingLibraryWidgetOptions['theme']) {
    this._theme = theme || this._theme;
  }

  @Input()
  set locale(locale: ChartingLibraryWidgetOptions['locale']) {
    this._locale = locale || this._locale;
  }


  @Input()
  set overrides(overrides: ChartingLibraryWidgetOptions['overrides']) {
    this._overrides = overrides || this._overrides;
  }

  @Input()
  set studies_overrides(_studies_overrides: ChartingLibraryWidgetOptions['studies_overrides']) {
    this._studies_overrides = _studies_overrides || this._studies_overrides;
  }

  @Input()
  set containerId(containerId: ChartingLibraryWidgetOptions['container']) {
    this._container = containerId || this._container;
    this.cd.detectChanges();
  }

  @Input()
  set customCssUrl(custom_css_url: ChartingLibraryWidgetOptions['custom_css_url']) {
    this._custom_css_url = custom_css_url || this._custom_css_url;
  }

  @Input()
  set version(version: string) {
    this._version = version || this._version;
  }

  @Output() messageEvent = new EventEmitter<string>();

  get isMiniChart() {
    return this._miniChart;
  }

  ngOnInit() {
    window.addEventListener('message', this.messageHandler);

    if (this._miniChart) {
      this._showMarkBtnMobile = document.getElementById('btn-show-mark-mobile');
      this._showMarkBtnMobile.addEventListener('click', () => {
        this.eventShowMarktBtn();
      });
      this._overrides = {
        "scalesProperties.fontSize": 9,
        "mainSeriesProperties.statusViewStyle.symbolTextSource": 'ticker',
        "show_marks": false // Tắt marks mặc định
      };

      this.chartService.invokeMobileChartFunction.subscribe((value: any) => {
        // try {
        //   this.saveChartAuto(tvWidget, true);
        // } catch(e) {
        //   console.log(e);
        // }
      })

      this.chartService.invokeMobileChartStudyFunction.subscribe((value: any) => {
        // try {
        //   this.saveChartAuto(tvWidget, true);
        // } catch(e) {
        //   console.log(e);
        // }
      })
    }
    const startTime = new Date().getTime();
    this._container = this._container;
    this.cd.detectChanges();

    function getUserId(): string | null {
      const url_string = window.location.href;
      const url = new URL(url_string);
      if (url.searchParams.get("userId")) {
        return url.searchParams.get("userId");
      } else {
        return JSON.parse(localStorage.getItem("userData") || '{}').id;
      }
    }

    this._userId = getUserId() || this._userId;

    const getActionInfo = () => {
      const url_string = window.location.href;
      const url = new URL(url_string);
      this._actionEnable = url.searchParams.get("actionEnable") == 'true';
      this._actionSymbol = url.searchParams.get("actionSymbol") ?? undefined;
      this._actionDate = url.searchParams.get("actionDate") ?? undefined;
      this._actionType = url.searchParams.get("actionType") ?? undefined;
    }

    getActionInfo();

    if (this._onlyChart) {
      this._symbol = this.getSymbolFromURL() || this._symbol;
      this._derivative = this.getTypeChartFromURL() || this._derivative;
      this._interval = this.getIntervalFromURL() || this._interval;
      this._theme = this.getThemeChart() || this._theme;
      this._version = this.getVersion() || this._version;
    }

    this.udfDataFeed = new CustomDatafeed(this._datafeedUrl, this.updateFrequency, this._actionEnable, this._actionSymbol, this._actionType, this._actionDate);
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: this._symbol,
      datafeed: this.udfDataFeed,
      interval: this._interval,
      container: this._container,
      library_path: this._libraryPath,
      timezone: this._timezone,
      theme: this._theme,
      overrides: this._overrides,
      studies_overrides: this._studies_overrides,
      locale: this.getLanguageFromURL() || this._locale,
      disabled_features: ['header_screenshot', 'vert_touch_drag_scroll',],
      // enabled_features: ['custom_resolutions', 'hide_last_na_study_output', 'hide_left_toolbar_by_default'],
      enabled_features: ['custom_resolutions', 'hide_last_na_study_output'],
      charts_storage_url: this._chartsStorageUrl,
      charts_storage_api_version: this._chartsStorageApiVersion,
      client_id: this._clientId,
      user_id: this._userId,
      fullscreen: this._fullscreen,
      numeric_formatting: { decimal_sign: ".", grouping_separator: "," },
      autosize: this._autosize,
      custom_css_url: this._custom_css_url,
      load_last_chart: false,
      auto_save_delay: 0.5,
    };
    if (this._miniChart) {
      widgetOptions.disabled_features?.push('header_widget');
      widgetOptions.disabled_features?.push('left_toolbar');
      widgetOptions.disabled_features?.push('timeframes_toolbar');
      widgetOptions.disabled_features?.push('volume_force_overlay');
    }

    let tvWidget = new widget(widgetOptions);
    this._tvWidget = tvWidget;
    let vm = this;

    if (this._userId !== '1281b84771fc9cf31874db24') {
      vm.loadChartTicker(tvWidget);
    }

    // Chart Ready
    tvWidget.onChartReady(() => {
      this.toggleMarkVisibility(false);

      try {
        tvWidget.save((chartData: any) => {
          if (Array.isArray(chartData?.charts) && chartData.charts.length > 0) {
            var timeScale = chartData.charts[0].timeScale;
            if (typeof timeScale == 'object') {
              timeScale.m_rightOffset = 5;
              tvWidget.load(chartData);
            }
          }
        })
      } catch (e) {
      }

      if (this._miniChart) {
        this.showMA();

        tvWidget.changeTheme(this._theme || "light");

        // Auto show ma
        // tvWidget.activeChart().createStudy("Moving Average", false, false, [5, "close", 0], { "Plot.color": "rgb(61,160,222)"}).then(value => {
        // })
        //
        // tvWidget.activeChart().createStudy("Moving Average", false, false, [10, "close", 0], { "Plot.color": "rgb(18,114,74)"}).then(value => {
        // })
        //
        // tvWidget.activeChart().createStudy("Moving Average", false, false, [20, "close", 0], { "Plot.color": "rgb(236,208,98)"}).then(value => {
        // })

      }

      // Auto Save
      tvWidget.subscribe("onAutoSaveNeeded", () => {
        this.pendingSave();
        this.saveChartAuto(tvWidget);
      })

      tvWidget.subscribe("study_event", (id, studyEventType) => {
        tvWidget.applyStudiesOverrides(this._studies_overrides_Object);
      })


      tvWidget.headerReady().then(() => {
        // View indicator volume default
        tvWidget.activeChart().getAllStudies().forEach(function (study) {
          if (study.name === "Volume") {
            tvWidget.activeChart().getStudyById(study.id).unmergeDown();
          }
        })

        tvWidget.activeChart().onSymbolChanged().subscribe(null, () => {
          this._symbol = tvWidget.activeChart().symbol();
          window.localStorage.setItem('tickerChartOnly', JSON.stringify(this._symbol));
          // this.chartService.onChangeTickers(this._symbol);
          this.messageEvent.emit(this._symbol);


          try {
            var data = { 'ticker': this._symbol, 'type': 'chart_ticker' };
            window.parent.postMessage(JSON.stringify(data), '*');
          } catch (e) {
            console.log(e);
          }

          if (this.checkChartPopupFromURL()) {
            indicators(this._symbol);
          }
        });
        this.customButtonHeader(tvWidget);
        // tvWidget.applyOverrides(this._overridesObject);
        tvWidget.applyStudiesOverrides(this._studies_overrides_Object);
      });
      this.chartService.subsVar = this.chartService.invokeMobileChartFunction.subscribe((data: any) => {
        if (data) {
          if (data.isStudy) {
            if (!this.studyMobileActive[data.data]) {
              if (data.data === 'Moving Average' || data.data === 'Moving Average Exponential') {
                this.studyMobileActive[data.data] = [];
                tvWidget.activeChart().createStudy(data.data, false, true, { length: 5, source: "close", offset: 0 }).then(value => {
                  this.studyMobileActive[data.data].push(value);
                })
                tvWidget.activeChart().createStudy(data.data, false, true, { length: 10, source: "close", offset: 0 }, { "Plot.color": "rgb(252,108,6)" }).then(value => {
                  this.studyMobileActive[data.data].push(value);
                })
                tvWidget.activeChart().createStudy(data.data, false, true, { length: 20, source: "close", offset: 0 }, { "Plot.color": "rgb(245,6,33)" }).then(value => {
                  this.studyMobileActive[data.data].push(value);
                })
                if (data.data === 'Moving Average') {
                  // tvWidget.activeChart().createStudy(data.data, false, true, [50, "close", 0]).then(value => {
                  //   this.studyMobileActive[data.data].push(value);})
                  // tvWidget.activeChart().createStudy(data.data, false, true, [200, "close", 0]).then(value => {
                  //   this.studyMobileActive[data.data].push(value);})
                }

              } else {
                tvWidget.activeChart().createStudy(data.data, false, true, {}).then(value => {
                  this.studyMobileActive[data.data] = value;
                })
              }
            } else {
              if (data.data === 'Moving Average' || data.data === 'Moving Average Exponential') {
                this.studyMobileActive[data.data].forEach(function (id: any) {
                  tvWidget.activeChart().removeEntity(id);
                })
                this.studyMobileActive[data.data] = false;

              } else {
                tvWidget.activeChart().removeEntity(this.studyMobileActive[data.data]);
                this.studyMobileActive[data.data] = false;
              }
            }
          } else {
            tvWidget.activeChart().setResolution(data.data, () => {

            })
          }
        }
      });
    });
  }

  private onMessage(event: MessageEvent) {
    // TODO: Thêm nắng nghe message từ window
  }

  removeButtonToolBar() {
    let appChart;
    if (typeof this._container === "string") {
      appChart = document.getElementById(this._container);
    }
    const iframe = appChart ? appChart.getElementsByTagName('IFRAME')[0] : document.getElementsByTagName('IFRAME')[0];
    if (this.isIFrame(iframe) && iframe.contentWindow) {
      let buttonScreenshot = iframe.contentWindow.document.getElementById("header-toolbar-screenshot")?.parentElement as HTMLElement;
      buttonScreenshot.style.display = "none";
      iframe.contentWindow.document.getElementById("header-toolbar-screenshot")?.remove();
    }
  }

  showMA() {
    setTimeout(() => {
      this.chartService.indicator['Moving Average'] = true;
      this.chartService.onMobileChartFunctionButtonClick('Moving Average', true);
    }, 100)
  }

  showVolume() {
    setTimeout(() => {
      const studies = this._tvWidget?.activeChart().getAllStudies() ?? [];
      // studies.forEach(item => console.log('study: ', item));
      const volumeStudyExists = studies.some(study => study.name === "Volume");
      const chart = this._tvWidget?.activeChart();
      if (!volumeStudyExists) {
          this._tvWidget?.activeChart().createStudy("Volume", false, false, {}, {}).then((_) => {
            if (this.isMiniChart) {
              chart?.getAllStudies().forEach(function (study) {
                if (study.name === "Volume") {
                  chart?.getStudyById(study.id).unmergeDown();
                  chart?.setAllPanesHeight([85, 15]);
                }
              })
            }
          });
      } else {
        if (this.isMiniChart) {
          chart?.getAllStudies().forEach(function (study) {
            if (study.name === "Volume") {
              chart?.getStudyById(study.id).unmergeDown();
              chart?.setAllPanesHeight([85, 15]);
            }
          })
        }
      }



    }, 1500)
  }

  getSymbolFromURL() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    if (url.searchParams.get("symbol")) {
      return url.searchParams.get("symbol");
    } else if (this.chartService.tickerChartOnly) {
      return this.chartService.tickerChartOnly;
    } else {
      return false;
    }
  }

  get logoFinbox(): string {
    return this.getThemeChart() === 'dark' ? 'assets/images/logo-finbox-white.png' : 'assets/images/logo-full-blue-small.png';
  }
  getThemeChart() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    if (url.searchParams.get("dark") && url.searchParams.get("dark") === 'true') {
      return 'dark';
    } else {
      return 'light';
    }
  }

  getVersion() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    return url.searchParams.get("version");
  }

  getTypeChartFromURL() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    if (url.searchParams.get("derivative")) {
      return (url.searchParams.get("derivative") === 'true');
    } else {
      return false;
    }
  }

  getTypeTabChartFromURL() {
    return window.location.href.includes('tabs-chart');
  }

  getIntervalFromURL() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    if (url.searchParams.get("interval")) {
      return url.searchParams.get("interval") as ResolutionString;
    } else {
      return this._interval;
    }
  }

  checkChartPopupFromURL() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    if (url.searchParams.get("popup")) {
      return true;
    } else {
      return false;
    }
  }

  eventShowMarktBtn() {
    if (this._isVip) {
      const _marksVisibleFromStorage = window.localStorage.getItem('tradingview.BarsMarksContainer.visibile') == 'true';
      this.toggleMarkVisibility(!_marksVisibleFromStorage);
    } else {
      try {
        var data = { 'type': 'vip_requirement' };
        window.parent.postMessage(JSON.stringify(data), '*');
      } catch (e) {
      }
    }
  }

  customButtonHeader(tvWidget: any) {
    const tvChart = this;
    //Create button logo finbox
    if (!this.checkChartPopupFromURL()) {
      const finboxBtn = tvWidget.createButton({ align: 'right' });
      finboxBtn.setAttribute('Finbox', 'Finbox');
      const imgElm = document.createElement('IMG');
      imgElm.setAttribute('src', 'https://i.ibb.co/nkPkK9N/logo-full-blue-small.png');
      imgElm.className = 'imgLogo';
      finboxBtn.appendChild(imgElm);
      finboxBtn.classList.add('apply-common-tooltip');
      finboxBtn.addEventListener('click', () => tvWidget.showNoticeDialog({
        title: 'Finbox chào bạn',
        body: 'Chúng tôi là Finbox - Cố vấn đầu tư 4.0',
        callback: () => {
        },
      }));
    }

    // Create toggle mode
    const toggle = tvWidget.createButton({ align: 'left' });
    toggle.setAttribute('Toggle', 'Toggle');
    const label = document.createElement('LABEL');
    label.className = 'switch';
    toggle.appendChild(label);
    const input = document.createElement('INPUT');
    input.setAttribute("type", "checkbox");
    input.id = 'togBtn';

    input.addEventListener('click', () => {
      if (tvWidget.getTheme().toLowerCase() === 'dark') {
        tvWidget.changeTheme('Light');
        this._theme = 'light';
        setTimeout(function () {
          // tvWidget.applyOverrides({"scalesProperties.lineColor": "#888888"});
        }, 100)
      } else {
        tvWidget.changeTheme('Dark');
        this._theme = 'dark';
        setTimeout(function () {
          tvWidget.applyOverrides({ "scalesProperties.lineColor": "rgba(240, 243, 250, 0.12)" });
          tvWidget.applyOverrides({ "scalesProperties.textColor": "rgba(255, 255, 255, 1)" });
        }, 100)
      }
    });
    const slider = document.createElement('DIV');
    slider.className = 'slider';
    slider.className += ' round';
    label.appendChild(input);
    label.appendChild(slider);
    const dark = document.createElement('SPAN');
    dark.className = 'on';
    dark.innerText = 'Tối';
    const light = document.createElement('SPAN');
    light.className = 'off';
    light.innerText = 'Sáng';
    slider.appendChild(dark);
    slider.appendChild(light);

    // Create button setting
    const settingChartBtn = tvWidget.createButton({ align: 'left' });
    settingChartBtn.setAttribute('title', 'Lưu/Nạp biểu đồ');
    settingChartBtn.classList.add('apply-common-tooltip');
    settingChartBtn.classList.add('custom-toolbar-button-wrapper');
    settingChartBtn.addEventListener('click', () => {
      let appChart: any;
      if (typeof this._container === "string") {
        appChart = document.getElementById(this._container);
      }
      const iframe = appChart ? appChart.getElementsByTagName('IFRAME')[0] : document.getElementsByTagName('IFRAME')[0];
      if (this.isIFrame(iframe) && iframe.contentWindow) {
        iframe.contentWindow.postMessage({}, '*');
        iframe.contentWindow.addEventListener('click', (event) => {
          const target = event.target as HTMLTextAreaElement;
          if (target.className.indexOf('custom-toolbar') === -1) {
            const iframe2 = appChart ? appChart.getElementsByTagName('IFRAME')[0] : document.getElementsByTagName('IFRAME')[0];
            if (this.isIFrame(iframe2) && iframe2.contentWindow) {
              const customMenu = iframe2.contentWindow.document.getElementsByClassName('custom-toolbar-menu') as HTMLCollectionOf<HTMLElement>;
              customMenu[0] ? customMenu[0].remove() : '';
              iframe2.contentWindow.removeEventListener('click', () => {
              });
            }
          }
        })
        const customMenu = iframe.contentWindow.document.getElementsByClassName('custom-toolbar-menu') as HTMLCollectionOf<HTMLElement>;
        customMenu[0] ? customMenu[0].remove() : '';
      }
      const listItem = [
        // {
        //   text: 'Lưu biểu đồ',
        //   className: 'custom-toolbar-menu-item',
        //   handler: 'save'
        // },
        // {
        //   text: 'Lưu thành bản sao...',
        //   className: 'custom-toolbar-menu-item',
        //   handler: 'copy'
        // },
        // {
        //   text: 'Biểu đồ đã lưu',
        //   className: 'custom-toolbar-menu-item',
        //   handler: 'list'
        // },
        // {
        //   className: 'custom-toolbar-menu-sep'
        // },
        {
          text: 'Đặt lại biểu đồ',
          className: 'custom-toolbar-menu-item',
          handler: 'reset'
        }
      ]
      const customMenuSettingChart = document.createElement('DIV');
      customMenuSettingChart.className = 'custom-toolbar-menu';
      listItem.forEach(function (item) {
        const itemElement = document.createElement('DIV');
        itemElement.className = item.className;
        itemElement.textContent = item.text ? item.text : '';
        customMenuSettingChart.appendChild(itemElement);
        if (item.handler) {
          const eventChart = item.handler;
          itemElement.addEventListener('click', () => {
            if (eventChart === 'copy') {
              tvWidget.showSaveAsChartDialog();
            } else if (eventChart === 'list') {
              tvWidget.showLoadChartDialog();
            } else if (eventChart === 'reset') {
              const dataChart = {
                userId: tvChart._userId,
                ticker: tvChart._onlyChart ? 'ONLYCHART' : tvChart._idTabChart,
                ownerSource: tvChart._clientId
              };
              tvChart.chartService.resetDefaultChartTickerUser(dataChart).subscribe((data) => {
              });
              tvChart.messageEvent.emit('reset');
            }
            customMenuSettingChart.remove();
          });
        }
      })
      if (this.isIFrame(iframe) && iframe.contentWindow) {
        iframe.contentWindow.postMessage({}, '*');
        const toolbarDraw = iframe.contentWindow.document.getElementsByClassName('layout__area--left') as HTMLCollectionOf<HTMLElement>;
        const toolbarHeader = iframe.contentWindow.document.getElementsByClassName('layout__area--top') as HTMLCollectionOf<HTMLElement>;
        customMenuSettingChart.style.left = settingChartBtn.offsetLeft + 3 + toolbarDraw[0].offsetWidth + "px";
        customMenuSettingChart.style.top = 1 + toolbarHeader[0].offsetHeight + "px";
        iframe.contentWindow.document.getElementsByTagName('BODY')[0].appendChild(customMenuSettingChart);
      }
    });
    const divCustom = document.createElement('DIV');
    divCustom.className = 'custom-toolbar-button';
    settingChartBtn.appendChild(divCustom);
    const settingText = document.createElement('SPAN');
    settingText.className = 'custom-toolbar-button-text';
    settingText.innerText = 'Biểu đồ';
    divCustom.appendChild(settingText);
    const iconCustom = document.createElement('DIV');
    iconCustom.className = 'custom-toolbar-dropdown-icon';
    divCustom.appendChild(iconCustom);

    // Create button setting
    var link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    link.rel = 'stylesheet';
    let appChart: any;
    if (typeof this._container === "string") {
      appChart = document.getElementById(this._container);
    }
    const iframe = appChart ? appChart.getElementsByTagName('IFRAME')[0] : document.getElementsByTagName('IFRAME')[0];
    iframe.contentWindow.document.getElementsByTagName('head')[0].appendChild(link);
    const loadingSave = tvWidget.createButton({ align: 'left' });
    loadingSave.setAttribute('title', 'Lưu biểu đồ hiện tại');
    const divLoading = document.createElement('DIV');
    loadingSave.appendChild(divLoading);
    const divLoaded = document.createElement('DIV');
    divLoaded.className = 'loading-save-chart';
    divLoaded.id = 'loading-save-chart';
    loadingSave.appendChild(divLoaded);
    const statusLoaded = document.createElement('DIV');
    statusLoaded.id = 'text-loading-save-chart';
    statusLoaded.innerText = 'Chưa lưu';
    loadingSave.appendChild(statusLoaded);
    statusLoaded.style.float = 'left';
    statusLoaded.style.fontSize = '13px';
    statusLoaded.style.marginTop = '2px';
    const icon = document.createElement('I');
    icon.className = 'fa fa-check';
    icon.style.fontSize = "12px";
    icon.style.display = "none";
    divLoaded.appendChild(icon);
    loadingSave.addEventListener('click', () => {
      if (tvChart.isHandSave) {
        tvChart.saveChartAuto(tvWidget);
      }
    });

    this._showMarkBtn = tvWidget.createButton({ align: 'left' });
    this._showMarkBtn.id = 'btn-show-mark';
    this._showMarkBtn.setAttribute('title', this._isVip ? 'Hiển thị tín hiệu AI' : 'Nâng cấp tài khoản để sử dụng tính năng này');
    this._showMarkBtn.innerText = 'Tín hiệu AI';
    this._showMarkBtn.setAttribute('style', this._isVip ? (this._marksVisible ? 'color: #16447F; font-weight: bold; width: 80px; text-align: center; cursor: pointer;' : 'width: 80px; text-align: center; cursor: pointer;') : 'color: grey; width: 80px; text-align: center; cursor: pointer;');
    this._showMarkBtn.addEventListener('click', () => {
      this.eventShowMarktBtn();
    });

    // const showMarkBtnIcon = document.createElement('I');
    // showMarkBtnIcon.className = 'fa fa-check';
    // showMarkBtnIcon.style.fontSize = "12px";
    // showMarkBtnIcon.style.display = "none";
    // markBtnDiv.appendChild(showMarkBtnIcon);

  }

  toggleMarkVisibility(visibility: boolean) {
    const _marksVisibleFromStorage = window.localStorage.getItem('tradingview.BarsMarksContainer.visibile') == 'true';
    if (_marksVisibleFromStorage != visibility) {
      this._tvWidget?.activeChart().executeActionById('hideAllMarks');
    }

    this._marksVisible = visibility;
    if (this._showMarkBtn) {
      this._showMarkBtn.setAttribute('title', 'Hiển thị tín hiệu AI');
      this._showMarkBtn.setAttribute('style', this._marksVisible ? 'color: #16447F; font-weight: bold; width: 80px; text-align: center; cursor: pointer;' : 'width: 80px; text-align: center; cursor: pointer;');
    }
    if (this._showMarkBtnMobile) {
      this._showMarkBtnMobile.style.background = '#6B85AB';
      this._showMarkBtnMobile.style.color = this._marksVisible ? 'orange' : 'white';
    }
  }


  loadingSave() {
    this.isHandSave = false;
    let appChart: any;
    if (typeof this._container === "string") {
      appChart = document.getElementById(this._container);
    }
    const iframe = appChart ? appChart.getElementsByTagName('IFRAME')[0] : document.getElementsByTagName('IFRAME')[0];
    const divLoading = iframe.contentWindow.document.getElementById('loading-save-chart');
    const statusLoading = iframe.contentWindow.document.getElementById('text-loading-save-chart');
    if (divLoading) {
      divLoading.style.border = '1px solid #f3f3f3';
      divLoading.style.borderRadius = '50%';
      divLoading.style.borderTop = '1px solid grey';
      divLoading.style.animation = 'spin 1s linear infinite';
      divLoading.children[0].style.display = 'none';
      if (statusLoading) {
        statusLoading.innerText = 'Đang lưu...';
      }
    }
  }

  saveChartAuto(tvWidget: any, forcedSave: boolean = false) {
    if (this.isMiniChart) {
      return;
    }
    tvWidget.save((saveObject: any) => {
      if (this._userId !== '1281b84771fc9cf31874db24' && (this.isSave || forcedSave)) {
        if (Object.keys(saveObject).indexOf('name') === -1) {
          this.loadingSave();
          var nameChart = this._idTabChart;
          if (this._onlyChart) {
            if (this._derivative) {
              nameChart = 'DERIVATIVE';
            } else {
              nameChart = 'ONLYCHART';
            }
          }
          if (this._miniChart) {
            nameChart = 'MINICHART';
          }
          const dataChart = {
            chartObject: {
              chartObject: saveObject,
              theme: this._theme
            },
            userId: this._userId,
            ticker: nameChart,
            ownerSource: this._clientId
          }
          this.chartService.saveChartTickerToServe(dataChart).subscribe((success) => {
            if (success) {
              this.loadedSave();
            } else {
              this.pendingSave();
            }
          });
        }
      }
    })
  }

  loadedSave() {
    var vm = this;
    setTimeout(function () {
      vm.isHandSave = false;
      let appChart: any;
      if (typeof vm._container === "string") {
        appChart = document.getElementById(vm._container);
      }
      const iframe = appChart ? appChart.getElementsByTagName('IFRAME')[0] : document.getElementsByTagName('IFRAME')[0];
      const divLoading = iframe.contentWindow.document.getElementById('loading-save-chart');
      const statusLoading = iframe.contentWindow.document.getElementById('text-loading-save-chart');
      if (divLoading) {
        divLoading.style.animation = '';
        divLoading.style.borderRadius = '';
        divLoading.style.borderTop = '';
        divLoading.style.border = '1px solid grey';
        divLoading.children[0].style.display = '';
        if (statusLoading) {
          statusLoading.innerText = 'Đã lưu tự động';
        }
      }
    }, 1500)
  }

  pendingSave() {
    this.isHandSave = true;
    let appChart: any;
    if (typeof this._container === "string") {
      appChart = document.getElementById(this._container);
    }
    const iframe = appChart ? appChart.getElementsByTagName('IFRAME')[0] : document.getElementsByTagName('IFRAME')[0];
    const divLoading = iframe.contentWindow.document.getElementById('loading-save-chart');
    if (divLoading) {
      divLoading.style.animation = '';
      divLoading.style.borderRadius = '';
      divLoading.style.borderTop = '';
      divLoading.style.border = '1px dashed grey';
      divLoading.children[0].style.display = 'none';
    }
  }


  loadChartTicker(tvWidget: any) {
    this.isSave = false;
    var nameChart = this._idTabChart;
    if (this._onlyChart) {
      if (this._derivative) {
        nameChart = 'DERIVATIVE';
      } else {
        nameChart = 'ONLYCHART';
      }
    }
    if (this._onlyChart) {
      if (this._derivative) {
        nameChart = 'DERIVATIVE';
      } else {
        nameChart = 'ONLYCHART';
      }
    }
    if (this._miniChart) {
      nameChart = 'MINICHART';
    }
    const dataChartLoad = {
      userId: this._userId,
      ticker: nameChart,
      ownerSource: this._clientId
    }

    const convertV20toV29 = (oldLayout: any) => {
      if (Array.isArray(oldLayout?.chartObject?.charts)) {
        oldLayout.chartObject.charts = oldLayout?.chartObject?.charts?.map((chart: any) => {
          if (Array.isArray(chart.panes)) {
            chart.panes = chart.panes?.map((pane: any) => {
              if (Array.isArray(pane.sources)) {
                pane.sources = pane.sources.map((source: any) => {
                  const rawSymbol = source?.state?.symbol;
                  if (typeof rawSymbol == 'string') {
                    if (rawSymbol.includes(':')) {
                      const symbolParts = rawSymbol.split(':');
                      if (Array.isArray(symbolParts) && symbolParts.length > 1) {
                        source.state.symbol = symbolParts[1];
                      }
                      if (source?.state?.symbol?.includes(':')) {

                      }
                    }
                  }

                  return source;
                })
              }

              return pane;
            })
          }

          return chart;

        });
      }

      return oldLayout;
    }

    this.chartService.loadChartTickerFromServe(dataChartLoad).subscribe((data) => {
      if (data && data.isVip) {
        this._isVip = true;
        tvWidget.onChartReady(() => {
          setTimeout(() => this.toggleMarkVisibility(true), 500);
        });
      }

      if (data && data.success) {
        if (this._miniChart) {
          tvWidget.onChartReady(() => {
            tvWidget.activeChart().getAllStudies().forEach(function (study: any) {
              if (study.name === "Volume") {
                tvWidget.activeChart().getStudyById(study.id).unmergeDown();
              }
            });

            var chartData = JSON.parse(data.chartObject);
            chartData = convertV20toV29(chartData);

            try {
              if (Array.isArray(chartData?.charts) && chartData?.charts.length > 0) {
                var timeScale = chartData.charts[0].timeScale;
                if (typeof timeScale == 'object') {
                  timeScale.m_rightOffset = 5;
                }
              }
            } catch (e) {
              console.log(e);
            }

            if (chartData.theme) {
              if (chartData.theme?.toLowerCase() == 'dark') {
                setTimeout(function () {
                  tvWidget.applyOverrides({ "scalesProperties.textColor": "rgba(255, 255, 255, 1)" });
                }, 3000)
              }
              if (!this._miniChart) {
                tvWidget.changeTheme(chartData.theme);
                // this._theme = chartData.theme;
                if (chartData.theme === 'Dark') {
                  this.isDark = true;
                } else {
                  this.isDark = false;
                }
              }

              let isIFrame = this.isIFrame;
              let isDark = this.isDark;
              let chartId = this._container;
              setTimeout(function () {
                let appChart;
                if (typeof chartId === "string") {
                  appChart = document.getElementById(chartId);
                }
                const iframe = appChart ? appChart.getElementsByTagName('IFRAME')[0] : document.getElementsByTagName('IFRAME')[0];
                if (isIFrame(iframe) && iframe.contentWindow) {
                  let toggleTheme = iframe.contentWindow.document.getElementById('togBtn') as HTMLInputElement;
                  if (toggleTheme) {
                    toggleTheme.checked = isDark;
                  }
                }
              }, 1000)
            }
            let vm = this;
            if (chartData.chartObject) {
              let hasMainSeries = false;

              try {
                if (Array.isArray(chartData?.chartObject.charts) && chartData?.chartObject.charts.length > 0) {
                  var timeScale = chartData.chartObject.charts[0].timeScale;
                  if (typeof timeScale == 'object') {
                    timeScale.m_rightOffset = 5;
                  }
                }
              } catch (e) {
                console.log(e);
              }

              chartData.chartObject.charts[0].panes.forEach(function (pane: any) {
                pane.sources.forEach(function (source: any) {
                  if (source.type === "MainSeries") {
                    source.state.shortName = vm._symbol;
                    source.state.symbol = vm._symbol;
                    source.state.interval = vm._interval;
                    hasMainSeries = true;
                  }
                })
              })

              if (hasMainSeries) {
                tvWidget.load(chartData.chartObject.charts[0]);
                this.isSave = true;
              } else {
                tvWidget.load(chartData.charts[0]);
                this.isSave = true;
              }

            } else {
              chartData.charts[0].panes.forEach(function (pane: any) {
                pane.sources.forEach(function (source: any) {
                  if (source.type === "MainSeries") {
                    source.state.shortName = vm._symbol;
                    source.state.symbol = vm._symbol;
                    source.state.interval = vm._interval;
                  }
                })
              })
              tvWidget.load(chartData.charts[0]);
              this.isSave = true;
            }
            vm.studyMobileActive = {};
            tvWidget.activeChart().getAllStudies().forEach(function (item: any) {
              vm.chartService.indicator[item.name] = true;
              if (item.name === 'Moving Average' || item.name === 'Moving Average Exponential') {
                if (vm.studyMobileActive[item.name]) {
                  vm.studyMobileActive[item.name].push(item.id);
                } else {
                  vm.studyMobileActive[item.name] = [item.id];
                }
              } else {
                vm.studyMobileActive[item.name] = item.id;
              }
            })
            vm.chartService.onChangeStudyChartFunction();
          })
        } else {
          tvWidget.headerReady().then(() => {
            var chartData = JSON.parse(data.chartObject);
            chartData = convertV20toV29(chartData);
            if (chartData.theme?.toLowerCase() == 'dark') {
              setTimeout(function () {
                tvWidget.applyOverrides({ "scalesProperties.textColor": "rgba(255, 255, 255, 1)" });
              }, 3000)
            }
            if (chartData.theme || this._version == '2') {
              if (!this._miniChart) {
                if (this._version == '2') {
                  chartData.theme = this.getThemeChart();
                }

                setTimeout(function () {
                  tvWidget.changeTheme(chartData.theme);
                  tvWidget.applyOverrides({ "scalesProperties.lineColor": "rgba(240, 243, 250, 0.12)" });
                }, 1000)

                this._theme = chartData.theme;
                if (chartData.theme === 'Dark') {
                  this.isDark = true;
                } else {
                  this.isDark = false;
                }
              }
              let isIFrame = this.isIFrame;
              let isDark = this.isDark;
              let chartId = this._container;

              setTimeout(function () {
                let appChart;
                if (typeof chartId === "string") {
                  appChart = document.getElementById(chartId);
                }
                const iframe = appChart ? appChart.getElementsByTagName('IFRAME')[0] : document.getElementsByTagName('IFRAME')[0];
                if (isIFrame(iframe) && iframe.contentWindow) {
                  let toggleTheme = iframe.contentWindow.document.getElementById('togBtn') as HTMLInputElement;
                  if (toggleTheme) {
                    toggleTheme.checked = isDark;
                  }
                }
              }, 1000)
            }
            let vm = this;
            if (chartData.chartObject) {
              chartData.chartObject.charts[0].panes.forEach(function (pane: any) {
                pane.sources.forEach(function (source: any) {
                  if (source.type === "MainSeries") {
                    source.state.shortName = vm._symbol;
                    source.state.symbol = vm._symbol;
                    // source.state.interval = vm._interval;
                  }

                  // Override hiển thị đường Volume.MA
                  if (source.type === "study_Volume") {
                    if (source.state && source.state.styles && source.state.styles.vol_ma) {
                      source.state.styles.vol_ma.visible = true;
                    }
                  }

                })
              })

              tvWidget.load(chartData.chartObject.charts[0]);
              this.flatten(chartData.chartObject.charts[0].chartProperties);
              setTimeout(function () {
                tvWidget.applyOverrides(vm._overridesTmp)
              }, 500)
              this.isSave = true;
            } else {
              chartData.charts[0].panes.forEach(function (pane: any) {
                pane.sources.forEach(function (source: any) {
                  if (source.type === "MainSeries") {
                    source.state.shortName = vm._symbol;
                    source.state.symbol = vm._symbol;
                    // source.state.interval = vm._interval;
                  }
                })
              })
              tvWidget.load(chartData.charts[0]);
              this.flatten(chartData.charts[0].chartProperties);
              setTimeout(function () {
                tvWidget.applyOverrides(vm._overridesTmp);
              }, 500)
              this.isSave = true;
            }
          })
        }
      } else {
        this.isSave = true;
        this.isHandSave = true;
      }

      // Auto show volume in every chart
      tvWidget.onChartReady(() => this.showVolume());
    });
  }

  traverseAndFlatten(currentNode: any, target: any, flattenedKey: any) {
    for (var key in currentNode) {
      if (currentNode.hasOwnProperty(key)) {
        var newKey;
        if (flattenedKey === undefined) {
          newKey = key;
        } else {
          newKey = flattenedKey + '.' + key;
        }

        var value = currentNode[key];
        if (typeof value === "object") {
          this.traverseAndFlatten(value, target, newKey);
        } else {
          target[newKey.toString()] = value;
        }
      }
    }
  }

  flatten(obj: any) {
    this.traverseAndFlatten(obj, this._overridesTmp, undefined);
  }

  getLanguageFromURL(): LanguageCode | null {
    const regex = new RegExp('[\\?&]lang=([^&#]*)');
    const results = regex.exec(location.search);

    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode;
  }

  resetConfigChart() {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: this._symbol,
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(this._datafeedUrl, this.updateFrequency),
      interval: this._interval,
      container: this._container,
      library_path: this._libraryPath,
      timezone: this._timezone,
      theme: this._theme,
      overrides: this._overrides,
      studies_overrides: this._studies_overrides,
      locale: this.getLanguageFromURL() || this._locale,
      disabled_features: ['header_screenshot'],
      enabled_features: ['custom_resolutions', 'hide_last_na_study_output',],
      charts_storage_url: this._chartsStorageUrl,
      charts_storage_api_version: this._chartsStorageApiVersion,
      client_id: this._clientId,
      user_id: this._userId,
      fullscreen: this._fullscreen,
      numeric_formatting: { decimal_sign: ".", grouping_separator: "," },
      autosize: this._autosize,
      custom_css_url: this._custom_css_url,
      load_last_chart: this.loadLastChart,
      auto_save_delay: 4,
    };

    return new widget(widgetOptions);
  }

  ngOnDestroy() {
    // Hủy listener khi component bị destroy
    window.removeEventListener('message', this.messageHandler);

    if (this._tvWidget !== null) {
      this._tvWidget.remove();
      this._tvWidget = null;
    }
  }
}
