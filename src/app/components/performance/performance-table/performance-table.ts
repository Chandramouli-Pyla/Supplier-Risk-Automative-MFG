import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, TrendingUp, TrendingDown, Minus } from 'lucide-angular';

import { suppliers } from '../../../lib/data';

@Component({
  selector: 'app-performance-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './performance-table.html',
})
export class PerformanceTableComponent implements OnChanges {
  @Input() searchText = '';

  readonly TrendingUp = TrendingUp;
  readonly TrendingDown = TrendingDown;
  readonly Minus = Minus;

  rows: any[] = [];

  ngOnChanges(): void {
    const q = (this.searchText ?? '').trim().toLowerCase();

    const filtered = !q
      ? suppliers
      : suppliers.filter((s: any) => {
          return (
            (s.name ?? '').toLowerCase().includes(q) ||
            (s.category ?? '').toLowerCase().includes(q) ||
            (s.code ?? '').toLowerCase().includes(q)
          );
        });

    this.rows = [...filtered]
      .sort((a: any, b: any) => this.avg(b) - this.avg(a))
      .slice(0, 8);
  }

  avg(s: any): number {
    return (
      (s.qualityScore + s.deliveryScore + s.costScore + s.complianceScore) / 4
    );
  }

  overallRounded(s: any): number {
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