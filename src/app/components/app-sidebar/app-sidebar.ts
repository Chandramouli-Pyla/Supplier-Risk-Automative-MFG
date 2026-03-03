import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  Shield,
  LayoutGrid,
  Users,
  ShieldAlert,
  TrendingUp,
  AlertTriangle,
  FileText,
  Settings,
  X
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './app-sidebar.html',
})
export class AppSidebarComponent {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  readonly Shield = Shield;
  readonly Settings = Settings;
  readonly X = X;
  navItems = [
	{ name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
	{ name: 'Suppliers', icon: Users, path: '/suppliers' },
{ name: 'Risk Assessment', icon: ShieldAlert, path: '/risk-assessment' },
	{ name: 'Performance', icon: TrendingUp, path: '/performance' },
	{ name: 'Alerts', icon: AlertTriangle, path: '/alerts' },
	{ name: 'Reports', icon: FileText, path: '/reports' },
  ];

  onClose(): void {
    this.closeSidebar.emit();
  }
}