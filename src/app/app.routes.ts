import { Routes } from '@angular/router';
import { SuppliersComponent } from './suppliers/suppliers';
import { AlertsComponent } from './alerts/alerts';
import { ReportsComponent } from './reports/reports';

export const routes: Routes = [
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '', redirectTo: '/suppliers', pathMatch: 'full' }
];