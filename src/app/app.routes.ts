import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent),
        data: { title: 'Dashboard', subtitle: 'Supplier Performance Risk Overview' },
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
    {
        path: 'reports',
        loadComponent: () => import('./reports/reports').then(m => m.ReportsComponent),
        data: { title: 'Reports & Analytics', subtitle: 'Generate and export supplier performance reports' },
    },

    {
        path: 'alerts',
        loadComponent: () => import('./alerts/alerts').then(m => m.AlertsComponent),
        data: { title: 'Alerts & Notifications', subtitle: 'Monitor and manage supplier risk alerts' },
    },
    { path: '**', redirectTo: 'dashboard' },
];