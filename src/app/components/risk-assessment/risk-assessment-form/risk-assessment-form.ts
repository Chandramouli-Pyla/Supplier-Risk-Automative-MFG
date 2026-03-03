import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, AlertTriangle, CheckCircle2, X } from 'lucide-angular';

@Component({
  selector: 'app-risk-assessment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './risk-assessment-form.html',
})
export class RiskAssessmentFormComponent {
  @Input() supplier: any | null = null;
  @Output() close = new EventEmitter<void>();

  readonly AlertTriangle = AlertTriangle;
  readonly CheckCircle2 = CheckCircle2;
  readonly X = X;

  // React defaults: [50]
  qualityRisk = 50;
  deliveryRisk = 50;
  costRisk = 50;
  complianceRisk = 50;
  notes = '';

  onClose(): void {
    this.close.emit();
  }

  get avgRisk(): number {
    return Math.round(
      (this.qualityRisk + this.deliveryRisk + this.costRisk + this.complianceRisk) / 4
    );
  }

  get riskLevel(): 'low' | 'medium' | 'high' | 'critical' {
    const score = this.avgRisk;
    if (score >= 70) return 'critical';
    if (score >= 50) return 'high';
    if (score >= 30) return 'medium';
    return 'low';
  }

  riskBadgeClass(level: string): string {
    if (level === 'low') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (level === 'medium') return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    if (level === 'high') return 'bg-red-500/10 text-red-400 border-red-500/30';
    return 'bg-red-700/20 text-red-300 border-red-700/30';
  }

  reset(): void {
    this.qualityRisk = 50;
    this.deliveryRisk = 50;
    this.costRisk = 50;
    this.complianceRisk = 50;
    this.notes = '';
  }
}