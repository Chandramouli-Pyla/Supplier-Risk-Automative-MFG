import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

import { performanceHistory, riskTrends } from '../../../lib/data';

type TimeRange = '1m' | '3m' | '6m' | '1y';

@Component({
  selector: 'app-performance-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './performance-charts.html',
})
export class PerformanceChartsComponent implements OnChanges {
  @Input() timeRange: TimeRange = '6m';

  trendType: ChartType = 'line';
  riskType: ChartType = 'bar';

  trendData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  riskData: ChartConfiguration['data'] = { labels: [], datasets: [] };

  private readonly dashedGrid = {
    color: 'rgba(255,255,255,0.08)',
    borderDash: [3, 3],
  } as any;

  trendOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },

    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#9ca3af', boxWidth: 10, boxHeight: 10 },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#0b0f14',
        borderColor: '#27272a',
        borderWidth: 1,
        titleColor: '#e5e7eb',
        bodyColor: '#e5e7eb',
        cornerRadius: 10,
        padding: 12,
        displayColors: false,
        callbacks: {
          title(items: any) {
            return items?.[0]?.label ?? '';
          },
          label(item: any) {
            const name = item?.dataset?.label ?? '';
            const val = item?.formattedValue ?? '';
            return `${name} : ${val}`;
          },
          labelTextColor(item: any) {
            const label = item?.dataset?.label;
            if (label === 'Quality') return '#3b82f6';
            if (label === 'Delivery') return '#10b981';
            return '#f59e0b'; // Overall
          },
        } as any,
      } as any,
    },

    scales: {
      x: {
        ticks: { color: '#9ca3af', font: { size: 12 } },
        grid: this.dashedGrid,
      },
      y: {
        min: 70,
        max: 100,
        ticks: { color: '#9ca3af', font: { size: 12 } },
        grid: this.dashedGrid,
      },
    },

    elements: {
      line: { tension: 0.4 },
      point: { radius: 0 }, 
    },
  };

  riskOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#9ca3af', boxWidth: 10, boxHeight: 10 },
      },
      tooltip: {
        backgroundColor: '#0b0f14',
        borderColor: '#27272a',
        borderWidth: 1,
        titleColor: '#e5e7eb',
        bodyColor: '#e5e7eb',
        cornerRadius: 10,
        padding: 12,
      } as any,
    },
    scales: {
      x: {
        stacked: true,
        ticks: { color: '#9ca3af', font: { size: 12 } },
        grid: this.dashedGrid,
      },
      y: {
        stacked: true,
        ticks: { color: '#9ca3af', font: { size: 12 } },
        grid: this.dashedGrid,
      },
    },
  };

  ngOnChanges(): void {
    this.rebuild();
  }

  private getCount(range: TimeRange): number {
    if (range === '1m') return 1;
    if (range === '3m') return 3;
    if (range === '6m') return 6;
    return 12;
  }

  private rebuild(): void {
    const count = this.getCount(this.timeRange);

    const ph = performanceHistory.slice(-count);
    const rt = riskTrends.slice(-count);

    this.trendData = {
      labels: ph.map((p) => p.month),
      datasets: [
        {
          label: 'Quality',
          data: ph.map((p) => p.qualityScore),
          borderColor: '#3b82f6',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: '#0b0f14',
          pointBorderColor: '#3b82f6',
          pointBorderWidth: 2,
          backgroundColor: (ctx: any) =>
            this.makeGradient(ctx, 'rgba(59,130,246,0.35)'),
        },
        {
          label: 'Delivery',
          data: ph.map((p) => p.deliveryScore),
          borderColor: '#10b981',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: '#0b0f14',
          pointBorderColor: '#10b981',
          pointBorderWidth: 2,
          backgroundColor: (ctx: any) =>
            this.makeGradient(ctx, 'rgba(16,185,129,0.65)'),
        },
        {
          label: 'Overall',
          data: ph.map((p) => p.overallScore),
          borderColor: '#f59e0b',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: '#0b0f14',
          pointBorderColor: '#f59e0b',
          pointBorderWidth: 2,
          backgroundColor: (ctx: any) =>
            this.makeGradient(ctx, 'rgba(245,158,11,0.30)'),
        },
      ],
    };

    this.riskData = {
      labels: rt.map((r) => r.date),
      datasets: [
        {
          label: 'Low Risk',
          data: rt.map((r) => r.lowRisk),
          backgroundColor: '#10b981',
          stack: 'a',
          borderRadius: 0,
        },
        {
          label: 'Medium Risk',
          data: rt.map((r) => r.mediumRisk),
          backgroundColor: '#f59e0b',
          stack: 'a',
          borderRadius: 0,
        },
        {
          label: 'High Risk',
          data: rt.map((r) => r.highRisk),
          backgroundColor: '#ef4444',
          stack: 'a',
          borderRadius: 0,
        },
        {
          label: 'Critical',
          data: rt.map((r) => r.criticalRisk),
          backgroundColor: '#dc2626',
          stack: 'a',
          borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 } as any,
        },
      ],
    };
  }

  private makeGradient(ctxArg: any, topColor: string): CanvasGradient | string {
    const chart = ctxArg?.chart;
    const chartArea = chart?.chartArea;
    const ctx = chart?.ctx;

    if (!ctx || !chartArea) return topColor;

    const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    g.addColorStop(0.05, topColor);
    g.addColorStop(0.80, 'rgba(0,0,0,0)');
    return g;
  }
}