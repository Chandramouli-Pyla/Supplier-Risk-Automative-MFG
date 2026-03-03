import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCategories } from './risk-categories';

describe('RiskCategories', () => {
  let component: RiskCategories;
  let fixture: ComponentFixture<RiskCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
