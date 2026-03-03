import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { suppliers } from '../../../lib/data';
import { LucideAngularModule, TrendingUp, TrendingDown } from 'lucide-angular';

type KPI = {
  label: string;
  value: number;      
  change: number;     
  target: number;     
};

@Component({
  selector: 'app-performance-overview',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './performance-overview.html',
})
export class PerformanceOverviewComponent {
  private avg(nums: number[]): number {
    if (!nums.length) return 0;
    const sum = nums.reduce((a, b) => a + b, 0);
    return sum / nums.length;
  }

  private round1(n: number): number {
    return Math.round(n);
  }

  readonly TrendingUp = TrendingUp;
  readonly TrendingDown = TrendingDown;

  avgQuality = this.round1(this.avg(suppliers.map(s => s.qualityScore)));
  avgDelivery = this.round1(this.avg(suppliers.map(s => s.deliveryScore)));
  avgCost = this.round1(this.avg(suppliers.map(s => s.costScore)));
  avgCompliance = this.round1(this.avg(suppliers.map(s => s.complianceScore)));

  kpis: KPI[] = [
    { label: 'Avg Quality Score', value: this.avgQuality, change: 2.3, target: 90 },
    { label: 'Avg Delivery Score', value: this.avgDelivery, change: -1.2, target: 95 },
    { label: 'Avg Cost Score', value: this.avgCost, change: 0.8, target: 85 },
    { label: 'Avg Compliance Score', value: this.avgCompliance, change: 1.5, target: 95 },
  ];

  changeText(change: number): string {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change}%`;
  }

  progressWidth(value: number, target: number): string {
    if (!target) return '0%';
    const pct = Math.max(0, Math.min(100, (value / target) * 100));
    return `${pct}%`;
  }

  trendArrow(change: number): '↗' | '↘' {
    return change >= 0 ? '↗' : '↘';
  }
}