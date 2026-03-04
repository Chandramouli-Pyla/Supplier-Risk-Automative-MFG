import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  login() {
    this.error = '';

    if (!this.username || !this.password) {
      this.error = 'Username and Password are required';
      return;
    }

    const success = this.auth.login({
      username: this.username,
      password: this.password,
    });

    if (success) {
      this.router.navigate(['/dashboard'], { replaceUrl: true });
    } else {
      this.error = 'Invalid username or password';
    }
  }
}