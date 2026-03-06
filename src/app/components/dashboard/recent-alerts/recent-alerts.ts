import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, AlertTriangle, ArrowRight } from 'lucide-angular';

import { getRiskBgColor } from '../../../lib/data';
import { AlertService, Alert } from '../../../services/alert.service';

@Component({
  selector: 'app-recent-alerts',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './recent-alerts.html',
})
export class RecentAlertsComponent implements OnInit {
  private alertService = inject(AlertService);
  private cdr = inject(ChangeDetectorRef);

  readonly AlertTriangle = AlertTriangle;
  readonly ArrowRight = ArrowRight;

  list: Alert[] = [];

  getRiskBgColor = getRiskBgColor;

  ngOnInit() {
    this.alertService.getAlerts().subscribe((data) => {
      this.list = data.slice(0, 5);
      this.cdr.detectChanges();
    });
  }

  formatDate(value: string): string {
    try {
      const d = new Date(value);
      return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return value;
    }
  }
}