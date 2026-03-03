import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LucideAngularModule, Search, Bell, User } from 'lucide-angular';

import { alerts } from '../../lib/data';

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

  notifOpen = false;
  userOpen = false;

  alerts = alerts as any[];
  unreadAlerts = (alerts as any[]).filter((a) => a.status === 'new').length;

  private sub?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elRef: ElementRef
  ) { }

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
      .subscribe(() => {
        setFromRoute();
        this.notifOpen = false;
        this.userOpen = false;
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleNotif(): void {
    this.notifOpen = !this.notifOpen;
    if (this.notifOpen) this.userOpen = false;
  }

  toggleUser(): void {
    this.userOpen = !this.userOpen;
    if (this.userOpen) this.notifOpen = false;
  }

  closeAll(): void {
    this.notifOpen = false;
    this.userOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(ev: MouseEvent): void {
    const clickedInside = this.elRef.nativeElement.contains(ev.target as Node);
    if (!clickedInside) this.closeAll();
  }

  goToAlerts(): void {
    this.router.navigateByUrl('/alerts');
  }

  onProfile(): void {
    this.closeAll();
  }

  onSettings(): void {
    this.closeAll();
  }

  onLogout(): void {
    this.closeAll();
  }
}