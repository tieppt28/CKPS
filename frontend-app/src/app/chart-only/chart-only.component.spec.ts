import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOnlyComponent } from './chart-only.component';

describe('ChartOnlyComponent', () => {
  let component: ChartOnlyComponent;
  let fixture: ComponentFixture<ChartOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
