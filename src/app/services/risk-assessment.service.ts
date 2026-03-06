import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RiskCategory {
  name: string;
  score: number;
  riskLevel: string;
}

export interface SupplierAssessment {
  id: number;
  supplierName: string;
  date: string;
  score: number;
  riskLevel: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class RiskAssessmentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/risk-assessment';

  getRiskCategories(): Observable<RiskCategory[]> {
    return this.http.get<RiskCategory[]>(`${this.apiUrl}/categories`);
  }

  getRecentAssessments(): Observable<SupplierAssessment[]> {
    return this.http.get<SupplierAssessment[]>(`${this.apiUrl}/recent`);
  }
}