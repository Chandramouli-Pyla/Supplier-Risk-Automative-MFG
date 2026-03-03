import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption, graphic } from 'echarts';

import { performanceHistory, riskTrends } from '../../../lib/data';

type TimeRange = '1m' | '3m' | '6m' | '1y';

@Component({
  selector: 'app-performance-charts',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './performance-charts.html',
})
export class PerformanceChartsComponent implements OnChanges {
  @Input() timeRange: TimeRange = '6m';

  trendOption: EChartsOption = {};
  riskOption: EChartsOption = {};

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

    // Common styles
    const axisLabel = { color: '#9ca3af', fontSize: 12 };
    const splitLine = { lineStyle: { color: 'rgba(255,255,255,0.08)', type: 'dashed' as const } };
    const tooltipStyle = {
      backgroundColor: '#0b0f14',
      borderColor: '#27272a',
      textStyle: { color: '#e5e7eb' },
      padding: 12
    };

    // 1. Trend Chart (Line)
    this.trendOption = {
      tooltip: { trigger: 'axis', ...tooltipStyle },
      legend: { bottom: 0, textStyle: { color: '#9ca3af' } },
      grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ph.map((p) => p.month),
        axisLabel,
        axisLine: { lineStyle: { color: '#374151' } }
      },
      yAxis: {
        type: 'value',
        min: 70,
        max: 100,
        axisLabel,
        splitLine
      },
      series: [
        {
          name: 'Quality',
          type: 'line',
          smooth: true,
          data: ph.map((p) => p.qualityScore),
          itemStyle: { color: '#3b82f6' },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(59,130,246,0.35)' },
              { offset: 1, color: 'rgba(59,130,246,0)' }
            ])
          }
        },
        {
          name: 'Delivery',
          type: 'line',
          smooth: true,
          data: ph.map((p) => p.deliveryScore),
          itemStyle: { color: '#10b981' },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(16,185,129,0.35)' },
              { offset: 1, color: 'rgba(16,185,129,0)' }
            ])
          }
        },
        {
          name: 'Overall',
          type: 'line',
          smooth: true,
          data: ph.map((p) => p.overallScore),
          itemStyle: { color: '#f59e0b' },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(245,158,11,0.30)' },
              { offset: 1, color: 'rgba(245,158,11,0)' }
            ])
          }
        }
      ]
    };

    // 2. Risk Chart (Stacked Bar)
    this.riskOption = {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, ...tooltipStyle },
      legend: { bottom: 0, textStyle: { color: '#9ca3af' } },
      grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
      xAxis: { type: 'category', data: rt.map((r) => r.date), axisLabel, axisLine: { lineStyle: { color: '#374151' } } },
      yAxis: { type: 'value', axisLabel, splitLine },
      series: [
        {
          name: 'Low Risk',
          type: 'bar',
          stack: 'total',
          data: rt.map((r) => r.lowRisk),
          itemStyle: { color: '#10b981' }
        },
        {
          name: 'Medium Risk',
          type: 'bar',
          stack: 'total',
          data: rt.map((r) => r.mediumRisk),
          itemStyle: { color: '#f59e0b' }
        },
        {
          name: 'High Risk',
          type: 'bar',
          stack: 'total',
          data: rt.map((r) => r.highRisk),
          itemStyle: { color: '#ef4444' }
        },
        {
          name: 'Critical',
          type: 'bar',
          stack: 'total',
          data: rt.map((r) => r.criticalRisk),
          itemStyle: { color: '#dc2626', borderRadius: [4, 4, 0, 0] }
        }
      ]
    };
  }
}