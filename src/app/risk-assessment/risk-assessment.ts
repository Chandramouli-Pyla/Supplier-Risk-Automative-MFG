import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RiskAssessmentFormComponent } from '../components/risk-assessment/risk-assessment-form/risk-assessment-form';
import { RiskMatrixComponent } from '../components/risk-assessment/risk-matrix/risk-matrix';
import { RiskCategoriesComponent } from '../components/risk-assessment/risk-categories/risk-categories';
import { RiskAssessmentService, RiskCategory, SupplierAssessment } from '../services/risk-assessment.service';

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
export class RiskAssessmentComponent implements OnInit {
  private riskService = inject(RiskAssessmentService);
  private cdr = inject(ChangeDetectorRef);

  riskCategories: RiskCategory[] = [];
  recentAssessments: SupplierAssessment[] = [];
  isLoading = true;

  selectedSupplier: any | null = null;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    const categories$ = this.riskService.getRiskCategories();
    const assessments$ = this.riskService.getRecentAssessments();

    let loadCount = 0;
    const checkDone = () => {
      loadCount++;
      if (loadCount === 2) {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    };

    categories$.subscribe(data => {
      this.riskCategories = data;
      checkDone();
    });

    assessments$.subscribe(data => {
      this.recentAssessments = data;
      checkDone();
    });
  }

  onSelectSupplier(s: any) {
    this.selectedSupplier = s;
  }

  onClose() {
    this.selectedSupplier = null;
  }
}