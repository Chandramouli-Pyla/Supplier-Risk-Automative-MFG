import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierFiltersComponent } from '../components/suppliers/supplier-filters/supplier-filters';
import { SuppliersTableComponent } from '../components/suppliers/suppliers-table/suppliers-table';
import { SupplierDetailPanelComponent } from '../components/suppliers/supplier-detail-panel/supplier-detail-panel';
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
  searchQuery = '';
  categoryFilter = 'All Categories';
  riskFilter = 'All Risk Levels';
  statusFilter = 'All Statuses';

  ngOnInit() {
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
  applyFilters() {
    this.filteredSuppliers = this.allSuppliers.filter(supplier => {
      const matchesSearch = this.searchQuery === '' ||
        supplier.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        supplier.code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        supplier.location.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.categoryFilter === 'All Categories' ||
        supplier.category === this.categoryFilter;
      const matchesRisk = this.riskFilter === 'All Risk Levels' ||
        supplier.riskLevel === this.riskFilter.toLowerCase();
      const matchesStatus = this.statusFilter === 'All Statuses' ||
        supplier.status === this.statusFilter.toLowerCase().replace(' ', '-');

      return matchesSearch && matchesCategory && matchesRisk && matchesStatus;
    });
  }
}