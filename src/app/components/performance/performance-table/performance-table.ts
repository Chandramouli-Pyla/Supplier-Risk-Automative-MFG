import { Component, Input, OnChanges, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, TrendingUp, TrendingDown, Minus } from 'lucide-angular';

import { SupplierService, Supplier } from '../../../services/supplier.service';

@Component({
  selector: 'app-performance-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './performance-table.html',
})
export class PerformanceTableComponent implements OnInit, OnChanges {
  private supplierService = inject(SupplierService);
  private cdr = inject(ChangeDetectorRef);

  @Input() searchText = '';

  readonly TrendingUp = TrendingUp;
  readonly TrendingDown = TrendingDown;
  readonly Minus = Minus;

  suppliers: Supplier[] = [];
  rows: Supplier[] = [];

  ngOnInit() {
    this.supplierService.getSuppliers().subscribe((data) => {
      this.suppliers = data;
      this.updateRows();
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(): void {
    this.updateRows();
  }

  private updateRows() {
    const q = (this.searchText ?? '').trim().toLowerCase();

    const filtered = !q
      ? this.suppliers
      : this.suppliers.filter((s) => {
          return (
            (s.name ?? '').toLowerCase().includes(q) ||
            (s.category ?? '').toLowerCase().includes(q) ||
            (s.code ?? '').toLowerCase().includes(q)
          );
        });

    this.rows = [...filtered]
      .sort((a, b) => this.avg(b) - this.avg(a))
      .slice(0, 8);
  }

  avg(s: Supplier): number {
    return (
      (s.qualityScore + s.deliveryScore + s.costScore + s.complianceScore) / 4
    );
  }

  overallRounded(s: Supplier): number {
    return Math.round(this.avg(s));
  }

  scoreClass(score: number): string {
    if (score >= 90) return 'text-emerald-400 border-emerald-400';
    if (score >= 80) return 'text-amber-400 border-amber-400';
    return 'text-red-400 border-red-400';
  }

  trendIcon(index: number): any {
    if (index % 3 === 0) return this.TrendingUp;
    if (index % 3 === 1) return this.TrendingDown;
    return this.Minus;
  }

  trendColorClass(index: number): string {
    if (index % 3 === 0) return 'text-emerald-400';
    if (index % 3 === 1) return 'text-red-400';
    return 'text-neutral-500';
  }
}