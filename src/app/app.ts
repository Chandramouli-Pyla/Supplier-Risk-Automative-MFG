import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar';
import { AppHeaderComponent } from './components/app-header/app-header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppSidebarComponent, AppHeaderComponent],
  template: `
    <div class="flex h-screen w-full bg-black overflow-hidden font-sans text-white">
      <app-sidebar class="w-64 h-full shrink-0 border-r border-neutral-800 bg-[#0a0a0a] z-20"></app-sidebar>

      <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <app-header class="shrink-0 w-full z-10"></app-header>

        <main class="flex-1 overflow-y-auto overflow-x-hidden bg-black">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class AppComponent {}