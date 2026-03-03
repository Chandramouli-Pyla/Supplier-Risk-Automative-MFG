import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search } from 'lucide-angular';
import { PerformanceChartsComponent } from '../components/performance/performance-charts/performance-charts';
import { PerformanceOverviewComponent } from '../components/performance/performance-overview/performance-overview';
import { SupplierComparisonComponent } from '../components/performance/supplier-comparison/supplier-comparison';
import { PerformanceTableComponent } from '../components/performance/performance-table/performance-table';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,         
    LucideAngularModule,  
    PerformanceOverviewComponent,
    PerformanceChartsComponent,
    SupplierComparisonComponent,
    PerformanceTableComponent,
  ],
  templateUrl: './performance.html',
})
export class PerformanceComponent {
  searchText = '';
  timeRange: '1m' | '3m' | '6m' | '1y' = '6m';
  readonly Search = Search;
}