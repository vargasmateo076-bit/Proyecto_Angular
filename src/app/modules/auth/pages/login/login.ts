import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- VITAL para el [(ngModel)]
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth'; // Revisa que la ruta sea correcta

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // <--- Agregamos FormsModule aquí
  templateUrl: './login.html',
  styleUrl: './login.less'
})
export class LoginComponent {
  // Inyectamos las herramientas
  private authService = inject(AuthService);
  private router = inject(Router);

  // Variables para capturar lo que el usuario escribe
  userInput = '';
  passInput = '';
  errorMessage = signal(''); // Usamos un signal para el error

  onLogin() {
    // Llamamos al método login de nuestro servicio
    const success = this.authService.login(this.userInput, this.passInput);

    if (success) {
      // Si todo sale bien, lo mandamos al Dashboard
      this.router.navigate(['/admin/dashboard']);
    } else {
      // Si falla, mostramos el error
      this.errorMessage.set('Usuario o clave incorrectos (admin / 1234)');
    }
  }
}