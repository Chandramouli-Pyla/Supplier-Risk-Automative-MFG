import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import child components
import { SupplierFiltersComponent } from '../components/suppliers/supplier-filters/supplier-filters';
import { SuppliersTableComponent } from '../components/suppliers/suppliers-table/suppliers-table';
import { SupplierDetailPanelComponent } from '../components/suppliers/supplier-detail-panel/supplier-detail-panel';

// Import data
import { Supplier, suppliers as initialSuppliers } from '../lib/data';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    SupplierFiltersComponent,
    SuppliersTableComponent,
    SupplierDetailPanelComponent
  ],
  templateUrl: './suppliers.html', // Update to .component.html if needed
})
export class SuppliersComponent implements OnInit {
  allSuppliers: Supplier[] = initialSuppliers;
  filteredSuppliers: Supplier[] = [];
  selectedSupplier: Supplier | null = null;
  selectedSupplierId?: string;

  // Filter states
  searchQuery = '';
  categoryFilter = 'All Categories';
  riskFilter = 'All Risk Levels';
  statusFilter = 'All Statuses';

  ngOnInit() {
    // Initialize the table with all suppliers
    this.applyFilters();
  }

  onSelectSupplier(supplier: Supplier) {
    this.selectedSupplier = supplier;
    this.selectedSupplierId = supplier.id;
  }

  closePanel() {
    this.selectedSupplier = null;
    this.selectedSupplierId = undefined;
  }

  // Handle updates from the filter component
  onSearchChange(query: string) {
    this.searchQuery = query;
    this.applyFilters();
  }

  onCategoryChange(category: string) {
    this.categoryFilter = category;
    this.applyFilters();
  }

  onRiskChange(risk: string) {
    this.riskFilter = risk;
    this.applyFilters();
  }

  onStatusChange(status: string) {
    this.statusFilter = status;
    this.applyFilters();
  }

  // The main filtering logic
  applyFilters() {
    this.filteredSuppliers = this.allSuppliers.filter(supplier => {
      // 1. Search Filter
      const matchesSearch = this.searchQuery === '' || 
        supplier.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        supplier.code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        supplier.location.toLowerCase().includes(this.searchQuery.toLowerCase());

      // 2. Category Filter
      const matchesCategory = this.categoryFilter === 'All Categories' || 
        supplier.category === this.categoryFilter;

      // 3. Risk Filter
      const matchesRisk = this.riskFilter === 'All Risk Levels' || 
        supplier.riskLevel === this.riskFilter.toLowerCase();

      // 4. Status Filter
      const matchesStatus = this.statusFilter === 'All Statuses' || 
        supplier.status === this.statusFilter.toLowerCase().replace(' ', '-');

      return matchesSearch && matchesCategory && matchesRisk && matchesStatus;
    });
  }
}