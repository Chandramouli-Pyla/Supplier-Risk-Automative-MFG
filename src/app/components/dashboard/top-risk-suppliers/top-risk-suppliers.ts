import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';

import { suppliers, getRiskBgColor, getStatusColor } from '../../../lib/data';

@Component({
  selector: 'app-top-risk-suppliers',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './top-risk-suppliers.html',
})
export class TopRiskSuppliersComponent {
  readonly ArrowRight = ArrowRight;

  list = [...suppliers].sort((a: any, b: any) => b.riskScore - a.riskScore).slice(0, 5);

  getRiskBgColor = getRiskBgColor as any;
  getStatusColor = getStatusColor as any;

  progressColor(level: string): string {
    if (level === 'critical' || level === 'high') return '#ef4444';
    if (level === 'medium') return '#f59e0b';
    return '#10b981';
  }
}