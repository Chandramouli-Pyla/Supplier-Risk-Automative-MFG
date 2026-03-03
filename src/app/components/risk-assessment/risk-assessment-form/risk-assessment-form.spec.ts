import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAssessmentForm } from './risk-assessment-form';

describe('RiskAssessmentForm', () => {
  let component: RiskAssessmentForm;
  let fixture: ComponentFixture<RiskAssessmentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskAssessmentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAssessmentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
