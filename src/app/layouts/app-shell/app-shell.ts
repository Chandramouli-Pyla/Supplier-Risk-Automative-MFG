import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { AppHeaderComponent } from '../../components/app-header/app-header';
import { AppSidebarComponent } from '../../components/app-sidebar/app-sidebar';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppHeaderComponent, AppSidebarComponent],
  templateUrl: './app-shell.html',
})
export class AppShellComponent {
  isSidebarOpen = false;

  onSidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onSidebarClose() {
    this.isSidebarOpen = false;
  }
}