import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../services/dashboard.service';

import { KpiCardsComponent } from '../components/dashboard/kpi-cards/kpi-cards';
import { RiskDistributionChartComponent } from '../components/dashboard/risk-distribution-chart/risk-distribution-chart';
import { PerformanceTrendChartComponent } from '../components/dashboard/performance-trend-chart/performance-trend-chart';
import { TopRiskSuppliersComponent } from '../components/dashboard/top-risk-suppliers/top-risk-suppliers';
import { RecentAlertsComponent } from '../components/dashboard/recent-alerts/recent-alerts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    KpiCardsComponent,
    RiskDistributionChartComponent,
    PerformanceTrendChartComponent,
    TopRiskSuppliersComponent,
    RecentAlertsComponent
  ],
  templateUrl: './dashboard.html',
})
export class DashboardComponent  {

}