import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Users, AlertTriangle, TrendingUp, ShieldCheck } from 'lucide-angular';
import { forkJoin } from 'rxjs';

import { AlertService } from '../../../services/alert.service';
import { SupplierService } from '../../../services/supplier.service';

type ChangeType = 'neutral' | 'positive' | 'negative' | 'warning';

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './kpi-cards.html',
})
export class KpiCardsComponent implements OnInit {
  private alertService = inject(AlertService);
  private supplierService = inject(SupplierService);
  private cdr = inject(ChangeDetectorRef);

  readonly Users = Users;
  readonly AlertTriangle = AlertTriangle;
  readonly TrendingUp = TrendingUp;
  readonly ShieldCheck = ShieldCheck;

  kpis: any[] = [];

  ngOnInit() {
    forkJoin({
      suppliers: this.supplierService.getSuppliers(),
      alerts: this.alertService.getAlerts()
    }).subscribe(({ suppliers, alerts }) => {
      const totalSuppliers = suppliers.length;
      const activeAlerts = alerts.filter(a => a.status !== 'resolved').length;
      const avgRiskScore = Math.round(suppliers.reduce((acc, s) => acc + s.riskScore, 0) / Math.max(suppliers.length, 1));
      const highRiskSuppliers = suppliers.filter(s => s.riskLevel === 'high' || s.riskLevel === 'critical').length;

      this.kpis = [
        {
          title: 'Total Suppliers',
          value: totalSuppliers,
          change: '+2 this month',
          changeType: 'neutral' as ChangeType,
          icon: this.Users,
          iconBg: 'bg-blue-600/20',
          iconColor: 'text-blue-400',
        },
        {
          title: 'Active Alerts',
          value: activeAlerts,
          change: '-3 from last week',
          changeType: 'positive' as ChangeType,
          icon: this.AlertTriangle,
          iconBg: 'bg-amber-500/20',
          iconColor: 'text-amber-400',
        },
        {
          title: 'Avg Risk Score',
          value: avgRiskScore,
          change: '+5 points',
          changeType: 'negative' as ChangeType,
          icon: this.TrendingUp,
          iconBg: 'bg-emerald-500/20',
          iconColor: 'text-emerald-400',
        },
        {
          title: 'High Risk Suppliers',
          value: highRiskSuppliers,
          change: 'Requires attention',
          changeType: 'warning' as ChangeType,
          icon: this.ShieldCheck,
          iconBg: 'bg-red-500/20',
          iconColor: 'text-red-400',
        },
      ];
      this.cdr.markForCheck();
    });
  }

  changeClass(t: ChangeType): string {
    if (t === 'positive') return 'text-emerald-400';
    if (t === 'negative') return 'text-red-400';
    if (t === 'warning') return 'text-amber-400';
    return 'text-neutral-500';
  }
}