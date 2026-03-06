import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

import { SupplierService, Supplier } from '../../../services/supplier.service';

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
  private supplierService = inject(SupplierService);
  private cdr = inject(ChangeDetectorRef);

  chartOption: EChartsOption = {};

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe((data) => {
      this.updateChart(data);
      this.cdr.detectChanges();
    });
  }

  private updateChart(suppliers: Supplier[]) {
    const topSuppliers = [...suppliers]
      .sort((a, b) => {
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
        data: topSuppliers.map((s, index) => ({
          value: [s.qualityScore, s.deliveryScore, s.costScore, s.complianceScore],
          name: s.name,
          itemStyle: { color: colors[index] },
          areaStyle: { color: colors[index], opacity: 0.2 }
        }))
      }]
    };
  }
}