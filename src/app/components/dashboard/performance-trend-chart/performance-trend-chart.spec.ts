import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceTrendChart } from './performance-trend-chart';

describe('PerformanceTrendChart', () => {
  let component: PerformanceTrendChart;
  let fixture: ComponentFixture<PerformanceTrendChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceTrendChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceTrendChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
