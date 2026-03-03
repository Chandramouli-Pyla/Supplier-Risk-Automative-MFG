import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

import { suppliers } from '../../../lib/data';

@Component({
  selector: 'app-risk-distribution-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  template: `
    <div class="w-full h-full min-h-[300px]">
      <div echarts [options]="chartOption" class="w-full h-full"></div>
    </div>
  `,
})
export class RiskDistributionChartComponent {
  private counts = {
    low: suppliers.filter((s: any) => s.riskLevel === 'low').length,
    medium: suppliers.filter((s: any) => s.riskLevel === 'medium').length,
    high: suppliers.filter((s: any) => s.riskLevel === 'high').length,
    critical: suppliers.filter((s: any) => s.riskLevel === 'critical').length,
  };

  chartOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#0b0f14',
      borderColor: '#27272a',
      textStyle: { color: '#e5e7eb' }
    },
    legend: {
      bottom: '0%',
      textStyle: { color: '#9ca3af' }
    },
    series: [
      {
        name: 'Risk Distribution',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: { borderRadius: 5, borderColor: '#0b0f14', borderWidth: 2 },
        label: { show: false },
        data: [
          { value: this.counts.low, name: 'Low Risk', itemStyle: { color: '#10b981' } },
          { value: this.counts.medium, name: 'Medium Risk', itemStyle: { color: '#f59e0b' } },
          { value: this.counts.high, name: 'High Risk', itemStyle: { color: '#ef4444' } },
          { value: this.counts.critical, name: 'Critical', itemStyle: { color: '#b91c1c' } }
        ]
      }
    ]
  };
}