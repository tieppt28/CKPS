import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TvChartContainerComponent } from './tv-chart-container/tv-chart-container.component';
import {ChartFinboxService} from "./tv-chart-container/chart-finbox.service";
import {HttpClientModule} from "@angular/common/http";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import { TabsChartComponent } from './tabs-chart/tabs-chart.component';
import { ChartOnlyComponent } from './chart-only/chart-only.component';
import {SplitterAllModule} from "@syncfusion/ej2-angular-layouts";
import {ChartLayoutComponent} from "./chart-layout/chart-layout.component";
// import {AngularPaneManagerModule} from '@openopus/angular-pane-manager';
import {MobileChartComponent} from "./mobile-chart/mobile-chart.component";
import {ChartWithAnalysisComponent} from "./chart-with-analysis/chart-with-analysis.component";
import {MarketAnalysisComponent} from "./market-analysis/market-analysis.component";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TvChartContainerComponent,
    TabsChartComponent,
    ChartOnlyComponent,
    ChartLayoutComponent,
    MobileChartComponent,
    ChartWithAnalysisComponent,
    MarketAnalysisComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatTabsModule,
        MatIconModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatCardModule,
        FormsModule,

        // SplitterAllModule,
        // AngularPaneManagerModule
    ],
  providers: [ChartFinboxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
