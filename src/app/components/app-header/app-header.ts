import { Component, ElementRef, HostListener, OnDestroy, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LucideAngularModule, Search, Bell, User, Menu } from 'lucide-angular';
import { Alert, AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './app-header.html',
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter<void>();

  private alertService = inject(AlertService);

  readonly Search = Search;
  readonly Bell = Bell;
  readonly User = User;
  readonly Menu = Menu;

  title = 'SupplyRisk';
  subtitle = '';

  notifOpen = false;
  userOpen = false;

  alerts: Alert[] = [];
  unreadAlerts = 0;

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

    this.alertService.getAlerts().subscribe(allAlerts => {
      // Get latest 5 alerts for the dropdown
      this.alerts = allAlerts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
      // Get count of all 'new' alerts
      this.unreadAlerts = allAlerts.filter(a => a.status === 'new').length;
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
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
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}