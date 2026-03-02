import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDetailPanel } from './supplier-detail-panel';

describe('SupplierDetailPanel', () => {
  let component: SupplierDetailPanel;
  let fixture: ComponentFixture<SupplierDetailPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierDetailPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierDetailPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
