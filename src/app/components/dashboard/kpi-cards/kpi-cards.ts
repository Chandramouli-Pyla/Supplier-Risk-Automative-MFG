import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Users, AlertTriangle, TrendingUp, ShieldCheck } from 'lucide-angular';

import { suppliers, alerts } from '../../../lib/data';

type ChangeType = 'neutral' | 'positive' | 'negative' | 'warning';

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './kpi-cards.html',
})
export class KpiCardsComponent {
  readonly Users = Users;
  readonly AlertTriangle = AlertTriangle;
  readonly TrendingUp = TrendingUp;
  readonly ShieldCheck = ShieldCheck;

  totalSuppliers = suppliers.length;
  activeAlerts = alerts.filter((a: any) => a.status !== 'resolved').length;
  avgRiskScore = Math.round(suppliers.reduce((acc: number, s: any) => acc + s.riskScore, 0) / Math.max(suppliers.length, 1));
  highRiskSuppliers = suppliers.filter((s: any) => s.riskLevel === 'high' || s.riskLevel === 'critical').length;

  kpis = [
    {
      title: 'Total Suppliers',
      value: this.totalSuppliers,
      change: '+2 this month',
      changeType: 'neutral' as ChangeType,
      icon: this.Users,
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Active Alerts',
      value: this.activeAlerts,
      change: '-3 from last week',
      changeType: 'positive' as ChangeType,
      icon: this.AlertTriangle,
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-400',
    },
    {
      title: 'Avg Risk Score',
      value: this.avgRiskScore,
      change: '+5 points',
      changeType: 'negative' as ChangeType,
      icon: this.TrendingUp,
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'High Risk Suppliers',
      value: this.highRiskSuppliers,
      change: 'Requires attention',
      changeType: 'warning' as ChangeType,
      icon: this.ShieldCheck,
      iconBg: 'bg-red-500/20',
      iconColor: 'text-red-400',
    },
  ];

  changeClass(t: ChangeType): string {
    if (t === 'positive') return 'text-emerald-400';
    if (t === 'negative') return 'text-red-400';
    if (t === 'warning') return 'text-amber-400';
    return 'text-neutral-500';
  }
}