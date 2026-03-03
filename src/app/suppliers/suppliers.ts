import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierFiltersComponent } from '../components/suppliers/supplier-filters/supplier-filters';
import { SuppliersTableComponent } from '../components/suppliers/suppliers-table/suppliers-table';
import { SupplierDetailPanelComponent } from '../components/suppliers/supplier-detail-panel/supplier-detail-panel';
import { Supplier, suppliers } from '../lib/data';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    SupplierFiltersComponent,
    SuppliersTableComponent,
    SupplierDetailPanelComponent
  ],
  templateUrl: './suppliers.html',
})
export class SuppliersComponent {
  
  allSuppliers: Supplier[] = suppliers;
  
  
  filteredSuppliers: Supplier[] = suppliers;
  
  
  selectedSupplier: Supplier | null = null;


  onSelectSupplier(supplier: Supplier) {
    this.selectedSupplier = supplier;
  }

  
  onClosePanel() {
    this.selectedSupplier = null;
  }

  
  onFilterChange(filters: { search: string, category: string, risk: string, status: string }) {
    this.filteredSuppliers = this.allSuppliers.filter(supplier => {
      
      
      const matchesSearch = filters.search === '' || 
        supplier.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        supplier.code.toLowerCase().includes(filters.search.toLowerCase()) ||
        supplier.location.toLowerCase().includes(filters.search.toLowerCase());

      
      const matchesCategory = filters.category === '' || supplier.category === filters.category;

      
      const matchesRisk = filters.risk === '' || supplier.riskLevel === filters.risk;

    
      const matchesStatus = filters.status === '' || supplier.status === filters.status;

      return matchesSearch && matchesCategory && matchesRisk && matchesStatus;
    });
  }
}