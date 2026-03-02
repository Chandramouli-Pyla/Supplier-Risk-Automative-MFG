import { Component } from '@angular/core';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar';
import { AppHeaderComponent } from './components/app-header/app-header';
import { SuppliersComponent } from './suppliers/suppliers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppSidebarComponent, AppHeaderComponent, SuppliersComponent],
  templateUrl: './app.html',
})
export class AppComponent {
  title = 'supply-risk-angular';
}