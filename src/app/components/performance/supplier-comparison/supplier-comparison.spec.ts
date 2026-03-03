import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierComparison } from './supplier-comparison';

describe('SupplierComparison', () => {
  let component: SupplierComparison;
  let fixture: ComponentFixture<SupplierComparison>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierComparison]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierComparison);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
