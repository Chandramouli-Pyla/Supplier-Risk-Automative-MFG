import { Injectable, signal } from '@angular/core';
import { MOCK_CREDENTIALS } from '../lib/credentials';
import { UserCredentials } from '../models';

@Injectable({
  providedIn: 'root',
})

export class Auth {
  readonly isAuthenticated = signal(false);

  login(credentials: UserCredentials): boolean {
    const user = MOCK_CREDENTIALS.find(
      (c) => c.username === credentials.username && c.password === credentials.password
    );

    if (user) {
      this.isAuthenticated.set(true);
      return true;
    }

    this.isAuthenticated.set(false);
    return false;
  }

  logout(): void {
    this.isAuthenticated.set(false);
  }
}
