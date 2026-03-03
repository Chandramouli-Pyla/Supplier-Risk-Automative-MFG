import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, ChevronDown, X } from 'lucide-angular';
import { supplierCategories } from '../../../lib/data';

@Component({
  selector: 'app-supplier-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './supplier-filters.html'
})
export class SupplierFiltersComponent {
  readonly Search = Search;
  readonly ChevronDown = ChevronDown;
  readonly X = X; 

  categories = supplierCategories;

  searchTerm = '';
  selectedCategory = '';
  selectedRisk = '';
  selectedStatus = '';

  @Output() filterChange = new EventEmitter<{search: string, category: string, risk: string, status: string}>();

 
  get hasActiveFilters(): boolean {
    return this.searchTerm !== '' || this.selectedCategory !== '' || this.selectedRisk !== '' || this.selectedStatus !== '';
  }

  onFilterChange() {
    this.filterChange.emit({
      search: this.searchTerm,
      category: this.selectedCategory,
      risk: this.selectedRisk,
      status: this.selectedStatus
    });
  }

  
  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedRisk = '';
    this.selectedStatus = '';
    this.onFilterChange();
  }
}