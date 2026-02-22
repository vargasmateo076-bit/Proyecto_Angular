import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../../../core/services/auth.service';
import { NewsService } from '../../../../core/services/news'; 


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.less'
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  public newsService = inject(NewsService);

  titulo = '';
  tag = 'IA';
  resumen = '';

  postear() {
  if (this.titulo && this.resumen) {

    this.newsService.agregarNoticia({
  titulo: this.titulo,
  resumen: this.resumen,
  tag: this.tag
});

    this.titulo = '';
    this.resumen = '';
    alert('¡Noticia publicada!');
  }
}

  logout() {
    console.log('Cerrando sesión...');
    this.authService.logout(); 
    this.router.navigate(['/auth/login']);
  }
}