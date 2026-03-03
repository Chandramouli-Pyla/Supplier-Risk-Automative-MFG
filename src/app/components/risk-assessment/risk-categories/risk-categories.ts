import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Shield,
  Truck,
  DollarSign,
  ClipboardCheck,
  Factory,
  Briefcase,
} from 'lucide-angular';

import { suppliers } from '../../../lib/data';

type RiskLevel = { label: 'Low' | 'Medium' | 'High'; cls: string };

@Component({
  selector: 'app-risk-categories',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './risk-categories.html',
})
export class RiskCategoriesComponent implements OnInit {
  readonly Shield = Shield;
  readonly Truck = Truck;
  readonly DollarSign = DollarSign;
  readonly ClipboardCheck = ClipboardCheck;
  readonly Factory = Factory;
  readonly Briefcase = Briefcase;

  categories: Array<{
    name: string;
    description: string;
    icon: any;
    risk: number;
    color: string;
    level: RiskLevel;
  }> = [];

  ngOnInit(): void {
    const calcCategoryRisk = (getter: (s: any) => number): number => {
      const avg =
        suppliers.reduce((acc: number, s: any) => acc + getter(s), 0) /
        Math.max(suppliers.length, 1);
      return Math.round(100 - avg);
    };

    const raw = [
      {
        name: 'Quality Risk',
        description: 'Product defects, specifications compliance',
        icon: this.Shield,
        risk: calcCategoryRisk((s) => s.qualityScore),
        color: '#3b82f6',
      },
      {
        name: 'Delivery Risk',
        description: 'On-time delivery, lead time consistency',
        icon: this.Truck,
        risk: calcCategoryRisk((s) => s.deliveryScore),
        color: '#10b981',
      },
      {
        name: 'Cost Risk',
        description: 'Pricing stability, cost competitiveness',
        icon: this.DollarSign,
        risk: calcCategoryRisk((s) => s.costScore),
        color: '#f59e0b',
      },
      {
        name: 'Compliance Risk',
        description: 'Regulatory, certifications, audits',
        icon: this.ClipboardCheck,
        risk: calcCategoryRisk((s) => s.complianceScore),
        color: '#a855f7',
      },
      {
        name: 'Capacity Risk',
        description: 'Production capacity, scalability',
        icon: this.Factory,
        risk: 28,
        color: '#ef4444',
      },
      {
        name: 'Financial Risk',
        description: 'Financial stability, credit rating',
        icon: this.Briefcase,
        risk: 22,
        color: '#3b82f6',
      },
    ];

    this.categories = raw.map((c) => ({
      ...c,
      level: this.getRiskLevel(c.risk),
    }));
  }

  getRiskLevel(risk: number): RiskLevel {
    if (risk >= 40) return { label: 'High', cls: 'text-red-400' };
    if (risk >= 25) return { label: 'Medium', cls: 'text-amber-400' };
    return { label: 'Low', cls: 'text-emerald-400' };
  }

  progressStyle(color: string): any {
    return { backgroundColor: color };
  }
}