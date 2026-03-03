import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { suppliers } from '../../../lib/data';

@Component({
  selector: 'app-risk-matrix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risk-matrix.html',
})
export class RiskMatrixComponent {
  @Output() selectSupplier = new EventEmitter<any>();
  @Input() selectedSupplierId?: string;

  suppliers = suppliers;

  avgPerformance(s: any): number {
    return (
      (s.qualityScore + s.deliveryScore + s.costScore + s.complianceScore) / 4
    );
  }

  yInverted(s: any): number {
    return 100 - (s.riskScore ?? 0);
  }

  leftPct(s: any): string {
    return `${this.avgPerformance(s)}%`;
  }

  topPct(s: any): string {
    return `${100 - this.yInverted(s)}%`;
  }

  riskColorClass(riskScore: number): string {
    if (riskScore >= 70) return 'bg-red-600';
    if (riskScore >= 50) return 'bg-red-500';
    if (riskScore >= 30) return 'bg-amber-500';
    return 'bg-emerald-500';
  }

  selectedClass(s: any): string {
    return this.selectedSupplierId === s.id ? 'ring-2 ring-blue-500 scale-125' : '';
  }

  onPick(s: any) {
    this.selectSupplier.emit(s);
  }
}