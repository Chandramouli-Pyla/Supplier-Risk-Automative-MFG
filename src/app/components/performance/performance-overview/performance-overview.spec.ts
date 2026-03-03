import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceOverview } from './performance-overview';

describe('PerformanceOverview', () => {
  let component: PerformanceOverview;
  let fixture: ComponentFixture<PerformanceOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
