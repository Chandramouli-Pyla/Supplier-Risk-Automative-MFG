import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierFilters } from './supplier-filters';

describe('SupplierFilters', () => {
  let component: SupplierFilters;
  let fixture: ComponentFixture<SupplierFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
