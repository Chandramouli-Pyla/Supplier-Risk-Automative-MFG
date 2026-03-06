import { Component, EventEmitter, Input, Output, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierService, Supplier } from '../../../services/supplier.service';

@Component({
  selector: 'app-risk-matrix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risk-matrix.html',
})
export class RiskMatrixComponent implements OnInit {
  private supplierService = inject(SupplierService);
  private cdr = inject(ChangeDetectorRef);

  @Output() selectSupplier = new EventEmitter<Supplier>();
  @Input() selectedSupplierId?: string;

  suppliers: Supplier[] = [];

  ngOnInit() {
    this.supplierService.getSuppliers().subscribe((data) => {
      this.suppliers = data;
      this.cdr.detectChanges();
    });
  }

  avgPerformance(s: Supplier): number {
    return (
      (s.qualityScore + s.deliveryScore + s.costScore + s.complianceScore) / 4
    );
  }

  yInverted(s: Supplier): number {
    return 100 - (s.riskScore ?? 0);
  }

  leftPct(s: Supplier): string {
    return `${this.avgPerformance(s)}%`;
  }

  topPct(s: Supplier): string {
    return `${100 - this.yInverted(s)}%`;
  }

  riskColorClass(riskScore: number): string {
    if (riskScore >= 70) return 'bg-red-600';
    if (riskScore >= 50) return 'bg-red-500';
    if (riskScore >= 30) return 'bg-amber-500';
    return 'bg-emerald-500';
  }

  selectedClass(s: Supplier): string {
    return this.selectedSupplierId === s.id ? 'ring-2 ring-blue-500 scale-125' : '';
  }

  onPick(s: Supplier) {
    this.selectSupplier.emit(s);
  }
}