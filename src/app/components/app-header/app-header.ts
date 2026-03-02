import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, Bell, User } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './app-header.html',
})
export class AppHeaderComponent {
  // Declare icons for the template
  readonly Search = Search;
  readonly Bell = Bell;
  readonly User = User;
}