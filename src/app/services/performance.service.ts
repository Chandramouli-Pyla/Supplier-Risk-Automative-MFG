import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PerformanceMetric {
  month: string;
  qualityScore: number;
  deliveryScore: number;
  costScore: number;
  overallScore: number;
}

export interface RiskTrend {
  date: string;
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
  criticalRisk: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/performance';

  getPerformanceHistory(): Observable<PerformanceMetric[]> {
    return this.http.get<PerformanceMetric[]>(`${this.apiUrl}/history`);
  }

  getRiskTrends(): Observable<RiskTrend[]> {
    return this.http.get<RiskTrend[]>(`${this.apiUrl}/risk-trends`);
  }
}