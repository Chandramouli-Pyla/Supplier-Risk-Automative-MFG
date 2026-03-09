import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Alert {
  id: string;
  supplierId: string;
  supplierName: string;
  type: 'quality' | 'delivery' | 'compliance' | 'financial' | 'capacity';
  severity: string;
  title: string;
  description: string;
  createdAt: string;
  status: 'new' | 'acknowledged' | 'in-progress' | 'resolved';
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private http = inject(HttpClient);
  private apiUrl = 'https://supply-chain-backend-795019603251.us-central1.run.app/api/alerts';

  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.apiUrl);
  }
}