import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRiskSuppliers } from './top-risk-suppliers';

describe('TopRiskSuppliers', () => {
  let component: TopRiskSuppliers;
  let fixture: ComponentFixture<TopRiskSuppliers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRiskSuppliers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRiskSuppliers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
