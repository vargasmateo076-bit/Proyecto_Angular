import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === '1234') {
      localStorage.setItem('token', 'fake-jwt');
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }
}