import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent),
    data: { title: 'Dashboard', subtitle: 'Default landing page' },
  },
  {
    path: 'suppliers',
    loadComponent: () => import('./suppliers/suppliers').then(m => m.SuppliersComponent),
    data: { title: 'Suppliers', subtitle: 'Manage and monitor supplier performance' },
  },
{
    path: 'risk-assessment',
    loadComponent: () => import('./risk-assessment/risk-assessment').then(m => m.RiskAssessmentComponent),
    data: { title: 'Risk Assessment', subtitle: 'Evaluate and score supplier risk factors' },
  },
  {
    path: 'performance',
    loadComponent: () => import('./performance/performance').then(m => m.PerformanceComponent),
    data: { title: 'Performance Tracking', subtitle: 'Monitor supplier KPIs and trends' },
  },

  { path: '**', redirectTo: 'dashboard' },
];