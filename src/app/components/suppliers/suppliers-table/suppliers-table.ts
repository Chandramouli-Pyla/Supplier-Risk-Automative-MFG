import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, ChevronRight } from 'lucide-angular';
import { getRiskColor, getStatusColor } from '../../../lib/data';
import { Supplier } from '../../../services/supplier.service';

@Component({
  selector: 'app-suppliers-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './suppliers-table.html'
})
export class SuppliersTableComponent {
  @Input() suppliers: Supplier[] = [];
  @Input() selectedSupplierId?: string;
  @Output() selectSupplier = new EventEmitter<Supplier>();

  readonly AlertTriangle = AlertTriangle;
  readonly ChevronRight = ChevronRight;

  getRiskColor(level: any): string {
    return getRiskColor(level);
  }

  getStatusColor(status: any): string {
    return getStatusColor(status);
  }
}