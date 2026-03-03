import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

import { suppliers } from '../../../lib/data';

@Component({
  selector: 'app-supplier-comparison',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './supplier-comparison.html',
})
export class SupplierComparisonComponent implements OnInit {
  radarType: ChartType = 'radar';

  radarData: ChartConfiguration['data'] = { labels: [], datasets: [] };

  radarOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#9ca3af',
          font: { size: 11 },
          boxWidth: 10,
          boxHeight: 10,
        },
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
  r: {
    min: 0,
    max: 100,

    ticks: {
      stepSize: 25,
      color: '#9ca3af',
      font: { size: 10 },
      align: 'start',
      crossAlign: 'far',

      backdropColor: 'transparent' as any,
      showLabelBackdrop: false as any,
    },

    grid: {
      color: 'rgba(255,255,255,0.08)',
    } as any,

    angleLines: {
      color: 'rgba(255,255,255,0.08)',
    } as any,

    pointLabels: {
      color: '#9ca3af',
      font: { size: 12 },
      padding: 6,
    } as any,
  },
},
  };

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

    const labels = ['Quality', 'Delivery', 'Cost', 'Compliance'];

    const colors = ['#3b82f6', '#10b981', '#f59e0b'];

    this.radarData = {
      labels,
      datasets: topSuppliers.map((s: any, index: number) => ({
        label: s.name, 
        data: [s.qualityScore, s.deliveryScore, s.costScore, s.complianceScore],
        borderColor: colors[index],
        backgroundColor: this.withAlpha(colors[index], 0.20), 
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 3,
      })),
    };
  }

  private withAlpha(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
}