import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface Supplier {
  id: string;
  name: string;
  code: string;
  location: string;
  category: string;
  tier: number;
  riskScore: number;
  riskLevel: RiskLevel;
  qualityScore: number;
  deliveryScore: number;
  costScore: number;
  complianceScore: number;
  lastAuditDate: string;
  nextAuditDate: string;
  activeAlerts: number;
  status: "active" | "under-review" | "suspended";
  contactName: string;
  contactEmail: string;
  annualVolume: number;
  defectRate: number;
  onTimeDelivery: number;
  leadTime: number;
  certifications: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/suppliers';

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }
}