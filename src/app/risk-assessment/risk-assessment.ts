import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RiskAssessmentFormComponent } from '../components/risk-assessment/risk-assessment-form/risk-assessment-form';
import { RiskMatrixComponent } from '../components/risk-assessment/risk-matrix/risk-matrix';
import { RiskCategoriesComponent } from '../components/risk-assessment/risk-categories/risk-categories';

@Component({
  selector: 'app-risk-assessment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RiskMatrixComponent,
    RiskCategoriesComponent,
    RiskAssessmentFormComponent,
  ],
  templateUrl: './risk-assessment.html',
})
export class RiskAssessmentComponent {
  selectedSupplier: any | null = null;

  onSelectSupplier(s: any) {
    this.selectedSupplier = s;
  }

  onClose() {
    this.selectedSupplier = null;
  }
}