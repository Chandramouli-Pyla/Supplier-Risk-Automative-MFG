import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersTable } from './suppliers-table';

describe('SuppliersTable', () => {
  let component: SuppliersTable;
  let fixture: ComponentFixture<SuppliersTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
