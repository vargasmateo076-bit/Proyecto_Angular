import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';
  private currentUser = signal<any>(null);

  constructor(private http: HttpClient) {

    const saved = localStorage.getItem('user');

    if (saved) {
      this.currentUser.set(JSON.parse(saved));
    }

  }

  // LOGIN SIMPLE
  login(user: string, pass: string, role: string): boolean {

    if (pass === '1234') {

      const data = {
        username: user,
        role: role
      };

      this.currentUser.set(data);
      localStorage.setItem('user', JSON.stringify(data));

      return true;
    }

    return false;
  }

  // NEWSLETTER
  getNewsletter(){
    return this.http.get<any>('http://localhost:3000/newsletter');
  }

  // ESTADO LOGIN
  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  getRole(): string {
    return this.currentUser()?.role || '';
  }

  getUsername(): string {
    return this.currentUser()?.username || 'Invitado';
  }

  // LOGOUT
  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

}