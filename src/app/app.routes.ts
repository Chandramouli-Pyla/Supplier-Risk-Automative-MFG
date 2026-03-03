import { Routes } from '@angular/router';
import { SuppliersComponent } from './suppliers/suppliers';
import { AlertsComponent } from './alerts/alerts'; 

export const routes: Routes = [
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: '', redirectTo: '/suppliers', pathMatch: 'full' }
];