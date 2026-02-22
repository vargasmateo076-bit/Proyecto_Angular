import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<any>(null);

  constructor() {
    const saved = localStorage.getItem('user');
    if (saved) this.currentUser.set(JSON.parse(saved));
  }

  // Soluciona el error en login.ts
  login(user: string, pass: string, role: string): boolean {
    if (pass === '1234') { 
      const data = { username: user, role: role };
      this.currentUser.set(data);
      localStorage.setItem('user', JSON.stringify(data));
      return true;
    }
    return false;
  }

  // Soluciona el error en landing.ts y user.ts
  getUsername(): string {
    return this.currentUser()?.username || 'Invitado';
  }

  isLoggedIn(): boolean { return this.currentUser() !== null; }
  getRole(): string { return this.currentUser()?.role || ''; }
  logout() { this.currentUser.set(null); localStorage.removeItem('user'); }
}