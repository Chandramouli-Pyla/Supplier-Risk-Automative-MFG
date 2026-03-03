import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { LucideAngularModule, Search, Bell, User } from 'lucide-angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './app-header.html',
})
export class AppHeaderComponent implements OnInit {
  readonly Search = Search;
  readonly Bell = Bell;
  readonly User = User;

 
  pageTitle = 'Suppliers';
  pageSubtitle = 'Manage and monitor supplier performance';

  constructor(private router: Router) {}

  ngOnInit() {
    
    this.updateHeaderTexts(this.router.url);

    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateHeaderTexts(event.urlAfterRedirects);
    });
  }

  
  private updateHeaderTexts(url: string) {
    if (url.includes('/alerts')) {
      this.pageTitle = 'Alerts & Notifications';
      this.pageSubtitle = 'Monitor and manage supplier risk alerts';
    } else {
      this.pageTitle = 'Suppliers';
      this.pageSubtitle = 'Manage and monitor supplier performance';
    }
  }
}