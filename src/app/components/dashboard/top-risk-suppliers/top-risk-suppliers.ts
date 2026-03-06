import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';

import { getRiskBgColor, getStatusColor } from '../../../lib/data';
import { SupplierService, Supplier } from '../../../services/supplier.service';

@Component({
  selector: 'app-top-risk-suppliers',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './top-risk-suppliers.html',
})
export class TopRiskSuppliersComponent implements OnInit {
  private supplierService = inject(SupplierService);
  private cdr = inject(ChangeDetectorRef);

  readonly ArrowRight = ArrowRight;

  list: Supplier[] = [];

  getRiskBgColor = getRiskBgColor;
  getStatusColor = getStatusColor;

  ngOnInit() {
    this.supplierService.getSuppliers().subscribe((data) => {
      this.list = [...data].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);
      this.cdr.detectChanges();
    });
  }

  progressColor(level: string): string {
    if (level === 'critical' || level === 'high') return '#ef4444';
    if (level === 'medium') return '#f59e0b';
    return '#10b981';
  }
}