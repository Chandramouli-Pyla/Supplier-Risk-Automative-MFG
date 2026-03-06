import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search } from 'lucide-angular';
import { PerformanceChartsComponent } from '../components/performance/performance-charts/performance-charts';
import { PerformanceOverviewComponent } from '../components/performance/performance-overview/performance-overview';
import { SupplierComparisonComponent } from '../components/performance/supplier-comparison/supplier-comparison';
import { PerformanceTableComponent } from '../components/performance/performance-table/performance-table';
import { PerformanceService, PerformanceMetric, RiskTrend } from '../services/performance.service';

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
export class PerformanceComponent implements OnInit {
  private performanceService = inject(PerformanceService);
  private cdr = inject(ChangeDetectorRef);

  performanceHistory: PerformanceMetric[] = [];
  riskTrends: RiskTrend[] = [];
  isLoading = true;

  searchText = '';
  timeRange: '1m' | '3m' | '6m' | '1y' = '6m';
  readonly Search = Search;

  ngOnInit() {
    this.loadPerformanceData();
  }

  loadPerformanceData() {
    this.isLoading = true;
    const history$ = this.performanceService.getPerformanceHistory();
    const trends$ = this.performanceService.getRiskTrends();

    // Using a counter to ensure both subscriptions complete before turning off loading spinner
    let loadCount = 0;
    const checkDone = () => {
      loadCount++;
      if (loadCount === 2) {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    };
  }
}