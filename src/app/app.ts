import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar';
import { AppHeaderComponent } from './components/app-header/app-header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class AppComponent {
  isSidebarOpen = false;

  onSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onSidebarClose(): void {
    this.isSidebarOpen = false;
  }
}