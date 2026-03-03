import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LucideAngularModule, Search, Bell, User } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './app-header.html',
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  readonly Search = Search;
  readonly Bell = Bell;
  readonly User = User;

  title = 'SupplyRisk';
  subtitle = '';

  private sub?: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const setFromRoute = () => {
      let r = this.route;
      while (r.firstChild) r = r.firstChild;

      const data = r.snapshot.data as any;
      this.title = data?.title ?? 'SupplyRisk';
      this.subtitle = data?.subtitle ?? '';
    };

    setFromRoute(); 
    this.sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => setFromRoute());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}