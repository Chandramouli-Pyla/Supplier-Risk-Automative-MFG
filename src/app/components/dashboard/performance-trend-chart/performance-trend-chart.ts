import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption, graphic } from 'echarts';

import { performanceHistory } from '../../../lib/data';

@Component({
  selector: 'app-performance-trend-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  template: `
    <div class="w-full h-full min-h-[300px]">
      <div echarts [options]="chartOption" class="w-full h-full"></div>
    </div>
  `,
})
export class PerformanceTrendChartComponent {
  chartOption: EChartsOption = {};

  constructor() {
    const ph = performanceHistory;
    const axisLabel = { color: '#9ca3af', fontSize: 12 };
    const splitLine = { lineStyle: { color: 'rgba(255,255,255,0.08)', type: 'dashed' as const } };

    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#0b0f14',
        borderColor: '#27272a',
        textStyle: { color: '#e5e7eb' },
        padding: 12,
      },
      legend: {
        bottom: 0,
        textStyle: { color: '#9ca3af' },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '5%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ph.map((p) => p.month),
        axisLabel,
        axisLine: { lineStyle: { color: '#374151' } },
      },
      yAxis: {
        type: 'value',
        min: 70,
        max: 100,
        axisLabel,
        splitLine,
      },
      series: [
        {
          name: 'Quality',
          type: 'line',
          smooth: true,
          data: ph.map((p) => p.qualityScore),
          itemStyle: { color: '#3b82f6' },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(59,130,246,0.15)' }, { offset: 1, color: 'rgba(59,130,246,0)' }])
          }
        },
        {
          name: 'Delivery',
          type: 'line',
          smooth: true,
          data: ph.map((p) => p.deliveryScore),
          itemStyle: { color: '#10b981' },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(16,185,129,0.15)' }, { offset: 1, color: 'rgba(16,185,129,0)' }])
          }
        },
        {
          name: 'Overall',
          type: 'line',
          smooth: true,
          data: ph.map((p) => p.overallScore),
          itemStyle: { color: '#f59e0b' },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(245,158,11,0.15)' }, { offset: 1, color: 'rgba(245,158,11,0)' }])
          }
        },
      ],
    };
  }
}