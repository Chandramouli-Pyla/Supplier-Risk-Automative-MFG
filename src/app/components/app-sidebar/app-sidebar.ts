import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { 
  LucideAngularModule, 
  Shield, 
  LayoutGrid, 
  Users, 
  ShieldAlert, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Settings 
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule], 
  templateUrl: './app-sidebar.html',
})
export class AppSidebarComponent {
  readonly Shield = Shield;
  readonly Settings = Settings;

  navItems = [
    { name: 'Dashboard', icon: LayoutGrid, route: '/dashboard' },
    { name: 'Suppliers', icon: Users, route: '/suppliers' },
    { name: 'Risk Assessment', icon: ShieldAlert, route: '/risk' },
    { name: 'Performance', icon: TrendingUp, route: '/performance' },
    { name: 'Alerts', icon: AlertTriangle, route: '/alerts' },
    { name: 'Reports', icon: FileText, route: '/reports' },
  ];
}