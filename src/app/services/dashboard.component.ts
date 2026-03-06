import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../services/dashboard.service';
import { getRiskColor, getStatusColor } from '../lib/data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6" *ngIf="stats; else loadingOrError">
      <h1 class="text-2xl font-bold mb-6">Dashboard <span class="text-sm font-normal text-white bg-blue-600 px-2 py-1 rounded ml-2">Live DB Data</span></h1>
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="text-gray-500">Total Suppliers</div>
          <div class="text-2xl font-bold">{{ stats.totalSuppliers }}</div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="text-gray-500">Avg Risk Score</div>
          <div class="text-2xl font-bold">{{ stats.averageRiskScore }}</div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="text-gray-500">Active Alerts</div>
          <div class="text-2xl font-bold">{{ stats.activeAlerts }}</div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="text-gray-500">Critical Suppliers</div>
          <div class="text-2xl font-bold text-red-600">{{ stats.criticalSuppliers }}</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Alerts -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Recent Alerts</h2>
          <div class="space-y-4">
            <div *ngFor="let alert of stats.recentAlerts" class="flex items-start p-3 bg-gray-50 rounded-lg">
              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <h3 class="font-medium text-gray-900">{{ alert.title }}</h3>
                  <span [class]="'px-2 py-1 text-xs rounded-full ' + getStatusColor($any(alert.status))">
                    {{ alert.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ alert.description }}</p>
                <div class="mt-2 text-xs text-gray-500">
                  {{ alert.supplierName }} • {{ alert.createdAt | date }}
                </div>
              </div>
            </div>
            <div *ngIf="stats.recentAlerts.length === 0" class="text-gray-500 text-center py-4">
              No active alerts
            </div>
          </div>
        </div>

        <!-- Top Risky Suppliers -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Top Risky Suppliers</h2>
          <div class="space-y-4">
            <div *ngFor="let supplier of stats.topRiskySuppliers" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 class="font-medium text-gray-900">{{ supplier.name }}</h3>
                <p class="text-sm text-gray-500">{{ supplier.category }}</p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-gray-900">{{ supplier.riskScore }}</div>
                <span [class]="'px-2 py-1 text-xs rounded-full ' + getRiskColor($any(supplier.riskLevel))">
                  {{ supplier.riskLevel }}
                </span>
              </div>
            </div>
            <div *ngIf="stats.topRiskySuppliers.length === 0" class="text-gray-500 text-center py-4">
              No risky suppliers found
            </div>
          </div>
        </div>
      </div>
    </div>

    <ng-template #loadingOrError>
      <div class="flex items-center justify-center h-64">
        <div *ngIf="error; else loadingSpinner" class="text-center">
          <div class="text-xl text-red-600 font-bold mb-2">Connection Error</div>
          <p class="text-gray-600">{{ error }}</p>
        </div>
        <ng-template #loadingSpinner>
          <div class="text-lg text-gray-600">Loading dashboard data...</div>
        </ng-template>
      </div>
    </ng-template>
  `
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  
  constructor() {
    console.log('🔍 CHECK: DashboardComponent initialized');
  }

  stats: DashboardStats | null = null;
  error: string | null = null;
  
  // Expose helper functions to template
  getRiskColor = getRiskColor;
  getStatusColor = getStatusColor;

  ngOnInit() {
    console.log('📡 FETCH: Requesting data from Database...');
    this.dashboardService.getStats().subscribe({
      next: (data: DashboardStats) => {
        console.log('✅ SUCCESS: Dashboard Data received from Database:', data);
        this.stats = data;
        this.error = null;
      },
      error: (err: any) => {
        console.error('❌ ERROR: Failed to load dashboard stats from DB', err);
        this.error = 'Failed to fetch data from API. Is the backend running at port 8080?';
      }
    });
  }
}