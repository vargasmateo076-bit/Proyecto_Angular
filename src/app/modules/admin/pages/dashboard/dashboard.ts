import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para el formulario
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { NewsService, Noticia } from '../../../../core/services/news';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html' // Usaremos el archivo HTML para que sea más limpio
})
export class DashboardComponent {
  private auth = inject(AuthService);
  private newsService = inject(NewsService);
  private router = inject(Router);

  // Modelo para la nueva noticia
  nuevaNoticia: Noticia = { titulo: '', resumen: '', tag: 'IA' };

  publicar() {
    if (this.nuevaNoticia.titulo && this.nuevaNoticia.resumen) {
      this.newsService.agregarNoticia({ ...this.nuevaNoticia });
      // Limpiamos el formulario
      this.nuevaNoticia = { titulo: '', resumen: '', tag: 'IA' };
      alert('¡Noticia publicada con éxito!');
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}