import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsChartComponent } from './tabs-chart.component';

describe('TabsChartComponent', () => {
  let component: TabsChartComponent;
  let fixture: ComponentFixture<TabsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
