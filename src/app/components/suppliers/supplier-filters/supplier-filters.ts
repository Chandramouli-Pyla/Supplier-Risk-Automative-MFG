import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search } from 'lucide-angular';
import { supplierCategories } from '../../../lib/data';

@Component({
  selector: 'app-supplier-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './supplier-filters.html', 
})
export class SupplierFiltersComponent {
  @Input() searchQuery: string = '';
  @Input() categoryFilter: string = 'All Categories';
  @Input() riskFilter: string = 'All Risk Levels';
  @Input() statusFilter: string = 'All Statuses';

  
  @Output() searchQueryChange = new EventEmitter<string>();
  @Output() categoryFilterChange = new EventEmitter<string>();
  @Output() riskFilterChange = new EventEmitter<string>();
  @Output() statusFilterChange = new EventEmitter<string>();


  readonly Search = Search;
  readonly categories = supplierCategories;

  onSearchChange(value: string) {
    this.searchQueryChange.emit(value);
  }

  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.categoryFilterChange.emit(select.value);
  }

  onRiskChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.riskFilterChange.emit(select.value);
  }

  onStatusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.statusFilterChange.emit(select.value);
  }
}