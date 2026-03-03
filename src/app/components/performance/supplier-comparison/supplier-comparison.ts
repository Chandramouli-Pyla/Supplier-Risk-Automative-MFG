import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

import { suppliers } from '../../../lib/data';

@Component({
  selector: 'app-supplier-comparison',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  template: `
    <div class="w-full h-full min-h-[300px]">
      <div echarts [options]="chartOption" class="w-full h-full"></div>
    </div>
  `,
})
export class SupplierComparisonComponent implements OnInit {
  chartOption: EChartsOption = {};

  ngOnInit(): void {
    const topSuppliers = [...suppliers]
      .sort((a: any, b: any) => {
        const bTotal =
          b.qualityScore + b.deliveryScore + b.costScore + b.complianceScore;
        const aTotal =
          a.qualityScore + a.deliveryScore + a.costScore + a.complianceScore;
        return bTotal - aTotal;
      })
      .slice(0, 3);

    const colors = ['#3b82f6', '#10b981', '#f59e0b'];

    this.chartOption = {
      tooltip: { trigger: 'item', backgroundColor: '#0b0f14', borderColor: '#27272a', textStyle: { color: '#e5e7eb' } },
      legend: { bottom: 0, textStyle: { color: '#9ca3af' } },
      radar: {
        indicator: [
          { name: 'Quality', max: 100 },
          { name: 'Delivery', max: 100 },
          { name: 'Cost', max: 100 },
          { name: 'Compliance', max: 100 }
        ],
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
        splitArea: { show: false },
        axisName: { color: '#9ca3af' }
      },
      series: [{
        type: 'radar',
        data: topSuppliers.map((s: any, index: number) => ({
          value: [s.qualityScore, s.deliveryScore, s.costScore, s.complianceScore],
          name: s.name,
          itemStyle: { color: colors[index] },
          areaStyle: { color: colors[index], opacity: 0.2 }
        }))
      }]
    };
  }
}