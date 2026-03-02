import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, ChevronRight } from 'lucide-angular';
import { Supplier, getRiskBgColor, getStatusColor } from '../../../lib/data';

@Component({
  selector: 'app-suppliers-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './suppliers-table.html',
})
export class SuppliersTableComponent {
  @Input() suppliers: Supplier[] = [];
  @Input() selectedSupplierId?: string;
  @Output() selectSupplier = new EventEmitter<Supplier>();

  // Expose icons to the template
  readonly AlertTriangle = AlertTriangle;
  readonly ChevronRight = ChevronRight;

  // Expose utility functions to the template
  getRiskBgColor = getRiskBgColor;
  getStatusColor = getStatusColor;

  onRowClick(supplier: Supplier) {
    this.selectSupplier.emit(supplier);
  }
}