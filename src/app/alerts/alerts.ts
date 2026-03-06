import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { LucideAngularModule, Bell, AlertTriangle, Clock, CheckCircle2, ShieldAlert, Truck, ClipboardCheck, Briefcase, Factory, Eye, Play, Check, ChevronDown, X } from 'lucide-angular';
import { AlertService, Alert } from '../services/alert.service';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule], 
  templateUrl: './alerts.html'
})
export class AlertsComponent implements OnInit {
  private alertService = inject(AlertService);
  private cdr = inject(ChangeDetectorRef);
  allAlerts: Alert[] = [];
  isLoading = true;

  readonly Bell = Bell;
  readonly AlertTriangle = AlertTriangle;
  readonly Clock = Clock;
  readonly CheckCircle2 = CheckCircle2;
  
 
  readonly Eye = Eye;
  readonly Play = Play;
  readonly Check = Check;
  readonly ChevronDown = ChevronDown;
  readonly X = X; 

  
  selectedSeverity: string = '';
  selectedType: string = '';
  selectedStatus: string = '';

  ngOnInit() {
    this.alertService.getAlerts().subscribe({
      next: (data) => {
        this.allAlerts = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
  
  get newAlertsCount(): number {
    return this.allAlerts.filter(a => a.status === 'new').length;
  }

  get acknowledgedAlertsCount(): number {
    return this.allAlerts.filter(a => a.status === 'acknowledged').length;
  }

  get inProgressAlertsCount(): number {
    return this.allAlerts.filter(a => a.status === 'in-progress').length;
  }

  get resolvedAlertsCount(): number {
    return this.allAlerts.filter(a => a.status === 'resolved').length;
  }

  get filteredAlerts(): Alert[] {
    return this.allAlerts.filter(alert => {
      const matchSeverity = this.selectedSeverity ? alert.severity === this.selectedSeverity : true;
      const matchType = this.selectedType ? alert.type === this.selectedType : true;
      const matchStatus = this.selectedStatus ? alert.status === this.selectedStatus : true;
      return matchSeverity && matchType && matchStatus;
    });
  }

  
  get hasActiveFilters(): boolean {
    return this.selectedSeverity !== '' || this.selectedType !== '' || this.selectedStatus !== '';
  }

 
  clearFilters() {
    this.selectedSeverity = '';
    this.selectedType = '';
    this.selectedStatus = '';
  }

  
  
  getIconForType(type: string): any {
    switch (type) {
      case 'quality': return ShieldAlert;
      case 'delivery': return Truck;
      case 'compliance': return ClipboardCheck;
      case 'financial': return Briefcase;
      case 'capacity': return Factory;
      default: return Bell;
    }
  }

  getIconColorClass(severity: string): string {
    switch (severity) {
      case 'critical':
      case 'high': return 'text-red-500 border-red-500/20';
      case 'medium': return 'text-amber-500 border-amber-500/20';
      case 'low': return 'text-emerald-500 border-emerald-500/20';
      default: return 'text-neutral-500 border-neutral-500/20';
    }
  }

  getTagClass(type: string, value: string): string {
    if (!value) {
      return 'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20';
    }
    const val = value.toLowerCase();
    if (val === 'critical' || val === 'high' || val === 'new') {
      return 'bg-red-500/10 text-red-500 border border-red-500/20';
    }
    if (val === 'medium' || val === 'acknowledged') {
      return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
    }
    if (val === 'in-progress') {
      return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
    }
    if (val === 'low' || val === 'resolved') {
      return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
    }
    return 'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20';
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + 
           ', ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
}