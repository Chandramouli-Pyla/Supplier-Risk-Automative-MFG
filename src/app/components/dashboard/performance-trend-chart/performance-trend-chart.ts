import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

import { performanceHistory } from '../../../lib/data';

@Component({
  selector: 'app-performance-trend-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './performance-trend-chart.html',
})
export class PerformanceTrendChartComponent {
  type: ChartType = 'line';

  data: ChartConfiguration['data'] = {
    labels: performanceHistory.map((p: any) => p.month),
    datasets: [
      {
        label: 'Quality',
        data: performanceHistory.map((p: any) => p.qualityScore),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.15)',
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: 'Delivery',
        data: performanceHistory.map((p: any) => p.deliveryScore),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16,185,129,0.15)',
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: 'Overall',
        data: performanceHistory.map((p: any) => p.overallScore),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245,158,11,0.15)',
        tension: 0.4,
        pointRadius: 4,
      },
    ] as any,
  };

  options: ChartConfiguration['options'] = {
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
      } as any,
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af', font: { size: 12 } },
        grid: { color: 'rgba(255,255,255,0.08)', borderDash: [3, 3] } as any,
      },
      y: {
        min: 70,
        max: 100,
        ticks: { color: '#9ca3af', font: { size: 12 } },
        grid: { color: 'rgba(255,255,255,0.08)', borderDash: [3, 3] } as any,
      },
    },
  };
}