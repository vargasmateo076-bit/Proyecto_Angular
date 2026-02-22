import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.less']
})
export class LoginComponent {

  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  error = signal('');

  loginMode: 'admin' | 'user' = 'admin';

  cambiarModo() {
    this.loginMode = this.loginMode === 'admin' ? 'user' : 'admin';
    this.error.set('');
    this.username = '';
    this.password = '';
  }

  login() {

    const success = this.auth.login(
      this.username,
      this.password,
      this.loginMode
    );

    if (success) {

      if (this.loginMode === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/home']); 
      }

      return;
    }

    this.error.set('Credenciales incorrectas');
  }

}