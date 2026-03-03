import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, TrendingUp, Shield, AlertTriangle, 
  Users, FileText, Download, Eye, Calendar 
} from 'lucide-angular';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './reports.html'
})
export class ReportsComponent {
  readonly TrendingUp = TrendingUp;
  readonly Shield = Shield;
  readonly AlertTriangle = AlertTriangle;
  readonly Users = Users;
  readonly FileText = FileText;
  readonly Download = Download;
  readonly Eye = Eye;
  readonly Calendar = Calendar;

  chartBars = [
    { label: '', title: 'Powertrain' },
    { label: 'Raw', title: 'Raw' },
    { label: '', title: 'Electronics' },
    { label: 'Safety', title: 'Safety' },
    { label: '', title: 'Interior' },
    { label: 'Plastic', title: 'Plastic' },
    { label: '', title: 'Cast' },
    { label: 'Instrumentation', title: 'Instrumentation' }
  ];

  templates = [
    { icon: TrendingUp, title: 'Monthly Performance Summary', desc: 'Comprehensive overview of all supplier KPIs for the month', freq: 'Monthly', last: '1/31/2026' },
    { icon: Shield, title: 'Risk Assessment Report', desc: 'Detailed analysis of supplier risk scores and trends', freq: 'Weekly', last: '2/23/2026' },
    { icon: AlertTriangle, title: 'Alert Summary Report', desc: 'Summary of all alerts, resolutions, and pending actions', freq: 'Weekly', last: '2/23/2026' },
    { icon: Users, title: 'Supplier Scorecard', desc: 'Individual supplier performance scorecards', freq: 'Quarterly', last: '1/14/2026' },
    { icon: FileText, title: 'Compliance Audit Report', desc: 'Certification status and compliance tracking', freq: 'Quarterly', last: '12/31/2025' }
  ];

  recentReports = [
    { title: 'Feb 2026 Performance Summary', meta: 'PDF • 2.4 MB' },
    { title: 'Week 8 Risk Assessment', meta: 'PDF • 1.8 MB' },
    { title: 'Alert Summary - Feb W4', meta: 'PDF • 856 KB' },
    { title: 'Q1 Supplier Scorecards', meta: 'XLSX • 4.2 MB' },
    { title: 'Week 7 Risk Assessment', meta: 'PDF • 1.7 MB' }
  ];
}