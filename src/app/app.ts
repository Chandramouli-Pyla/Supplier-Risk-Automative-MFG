import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar';
import { AppHeaderComponent } from './components/app-header/app-header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppSidebarComponent, AppHeaderComponent],
  templateUrl: './app.html',
})
export class AppComponent {}