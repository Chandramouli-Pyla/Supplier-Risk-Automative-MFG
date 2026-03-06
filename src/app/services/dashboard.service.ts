import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
// import { Supplier, Alert, PerformanceMetric, RiskTrend } from '../lib/data';
export type RiskLevel = "low" | "medium" | "high" | "critical"

export interface Supplier {
  id: string
  name: string
  code: string
  location: string
  category: string
  tier: number
  riskScore: number
  riskLevel: RiskLevel
  qualityScore: number
  deliveryScore: number
  costScore: number
  complianceScore: number
  lastAuditDate: string
  nextAuditDate: string
  activeAlerts: number
  status: "active" | "under-review" | "suspended"
  contactName: string
  contactEmail: string
  annualVolume: number
  defectRate: number
  onTimeDelivery: number
  leadTime: number
  certifications: string[]
}

export interface Alert {
  id: string
  supplierId: string
  supplierName: string
  type: "quality" | "delivery" | "compliance" | "financial" | "capacity"
  severity: RiskLevel
  title: string
  description: string
  createdAt: string
  status: "new" | "acknowledged" | "in-progress" | "resolved"
}

export interface PerformanceMetric {
  month: string
  qualityScore: number
  deliveryScore: number
  costScore: number
  overallScore: number
}

export interface RiskTrend {
  date: string
  lowRisk: number
  mediumRisk: number
  highRisk: number
  criticalRisk: number
}

export interface DashboardStats {
  totalSuppliers: number;
  averageRiskScore: number;
  activeAlerts: number;
  criticalSuppliers: number;
  recentAlerts: Alert[];
  topRiskySuppliers: Supplier[];
  performanceHistory: PerformanceMetric[];
  riskTrends: RiskTrend[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/dashboard'; 

  getStats(): Observable<DashboardStats> {
    // Fetch as 'any' to handle the snake_case from the backend before mapping
    return this.http.get<any>(`${this.apiUrl}/stats`).pipe(
      tap(() => console.log(`📡 HTTP Request sent to: ${this.apiUrl}/stats`)),
      map(response => {
        // Map snake_case from backend to camelCase for frontend models
        const mappedPerformanceHistory = response.performanceHistory.map((metric: any) => ({
          month: metric.month,
          qualityScore: metric.quality_score,
          deliveryScore: metric.delivery_score,
          costScore: metric.cost_score,
          overallScore: metric.overall_score,
        }));

        // Return the fully transformed object, cast to the correct frontend type
        return { ...response, performanceHistory: mappedPerformanceHistory } as DashboardStats;
      })
    );
  }
}