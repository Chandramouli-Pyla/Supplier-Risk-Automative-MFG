import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

import { suppliers } from '../../../lib/data';

@Component({
  selector: 'app-risk-distribution-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './risk-distribution-chart.html',
})
export class RiskDistributionChartComponent {
  type: ChartType = 'doughnut';

  private counts = {
    low: suppliers.filter((s: any) => s.riskLevel === 'low').length,
    medium: suppliers.filter((s: any) => s.riskLevel === 'medium').length,
    high: suppliers.filter((s: any) => s.riskLevel === 'high').length,
    critical: suppliers.filter((s: any) => s.riskLevel === 'critical').length,
  };

  data: ChartConfiguration['data'] = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical'],
    datasets: [
      {
        data: [this.counts.low, this.counts.medium, this.counts.high, this.counts.critical],
        // close enough to React colors
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#b91c1c'],
        borderColor: '#0b0f14',
        borderWidth: 2,
        hoverOffset: 6,
      } as any,
    ],
  };

options: any = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',   // ✅ works when options is any

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
    },
  },
};
}