import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, AlertTriangle, ArrowRight } from 'lucide-angular';

import { alerts, getRiskBgColor } from '../../../lib/data';

@Component({
  selector: 'app-recent-alerts',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './recent-alerts.html',
})
export class RecentAlertsComponent {
  readonly AlertTriangle = AlertTriangle;
  readonly ArrowRight = ArrowRight;

  list = (alerts as any[]).slice(0, 5);

  getRiskBgColor = getRiskBgColor as any;

  formatDate(value: string): string {
    try {
      const d = new Date(value);
      return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return value;
    }
  }
}