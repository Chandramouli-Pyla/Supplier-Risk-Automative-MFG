import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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