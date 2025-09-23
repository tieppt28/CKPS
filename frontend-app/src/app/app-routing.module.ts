import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsChartComponent} from "./tabs-chart/tabs-chart.component";
import {ChartOnlyComponent} from "./chart-only/chart-only.component";
import {ChartLayoutComponent} from "./chart-layout/chart-layout.component";
import {MobileChartComponent} from "./mobile-chart/mobile-chart.component";
import {ChartWithAnalysisComponent} from "./chart-with-analysis/chart-with-analysis.component";

const routes: Routes = [
  {path: 'tabs-chart', component: TabsChartComponent},
  {path: 'mobile-chart', component: MobileChartComponent}, 
  {path: 'chart-with-analysis', component: ChartWithAnalysisComponent},
  {path: '', component: ChartWithAnalysisComponent}, // Mặc định hiển thị chart với phân tích
  {path: 'tabs-layout', component: ChartLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
