import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './app-sidebar.html',
})
export class AppSidebarComponent {
  // Expose specific standalone icons to the template
  readonly Shield = Shield;
  readonly Settings = Settings;

  // Navigation items array to keep the HTML clean
  navItems = [
    { name: 'Dashboard', icon: LayoutGrid, active: false },
    { name: 'Suppliers', icon: Users, active: true },
    { name: 'Risk Assessment', icon: ShieldAlert, active: false },
    { name: 'Performance', icon: TrendingUp, active: false },
    { name: 'Alerts', icon: AlertTriangle, active: false },
    { name: 'Reports', icon: FileText, active: false },
  ];
}