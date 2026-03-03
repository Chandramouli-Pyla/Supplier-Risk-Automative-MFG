import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, MapPin, Mail, User, Award, Calendar, ShieldCheck, Truck, DollarSign, ClipboardCheck } from 'lucide-angular';
import { Supplier, getRiskBgColor, getStatusColor, getRiskColor } from '../../../lib/data';

@Component({
  selector: 'app-supplier-detail-panel',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './supplier-detail-panel.html',
})
export class SupplierDetailPanelComponent {
  @Input() supplier: Supplier | null = null;
  @Output() closePanel = new EventEmitter<void>();

  readonly X = X;
  readonly MapPin = MapPin;
  readonly User = User;
  readonly Mail = Mail;
  readonly Award = Award;
  readonly Calendar = Calendar;
  readonly ShieldCheck = ShieldCheck;
  readonly Truck = Truck;
  readonly DollarSign = DollarSign;
  readonly ClipboardCheck = ClipboardCheck;

  getRiskBgColor = getRiskBgColor;
  getRiskColor = getRiskColor;
  getStatusColor = getStatusColor;

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
  }
}