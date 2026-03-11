import { Component, inject, OnInit, signal } from '@angular/core';
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
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  public newsService = inject(NewsService);
  listaCorreos = signal<any[]>([]);
  emails: any[] = [];

  // Campos para nueva noticia
  titulo = '';
  tag = 'IA';
  resumen = '';

  noticias: any[] = [];
  noticiaEditando: any = null;

  ngOnInit() {
    this.cargarNoticias();
    this.emails = [];
    this.cargarCorreos();
  }

  cargarNoticias() {
    this.newsService.getNoticias().subscribe({
      next: (data) => {
        this.noticias = data;
        console.log('Noticias cargadas:', this.noticias); 
      },
      error: (err) => console.error('Error al cargar noticias', err)
    });
  }

postear() {
  if (this.titulo && this.resumen) {

    const nuevaNoticia = {
      titulo: this.titulo,
      descripcion: this.resumen
    };

    this.newsService.agregarNoticia(nuevaNoticia).subscribe({
      next: () => {
        alert('¡Noticia publicada!');
        this.titulo = '';
        this.resumen = '';
        this.cargarNoticias();
      },
      error: (err) => alert('Error al publicar')
    });

  }
}

  // --- CORRECCIÓN ELIMINAR ---
  eliminar(id: any) {
    if (!id) {
      alert('Esta noticia no tiene un ID asignado en la base de datos.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      this.newsService.eliminarNoticia(id).subscribe({
        next: () => {
          alert('Noticia eliminada correctamente');
          this.cargarNoticias();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('No se pudo eliminar la noticia.');
        }
      });
    }
  }

  iniciarEdicion(noticia: any) {
    this.noticiaEditando = { ...noticia }; 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  guardarEdicion() {
    if (this.noticiaEditando && this.noticiaEditando.id) {
      this.newsService.actualizarNoticia(this.noticiaEditando).subscribe({
        next: () => {
          alert('¡Cambios guardados con éxito!');
          this.noticiaEditando = null; 
          this.cargarNoticias();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al guardar los cambios.');
        }
      });
    } else {
      alert('Error: No se encontró el ID de la noticia para actualizar.');
    }
  }

  cancelarEdicion() {
    this.noticiaEditando = null;
  }

  cargarCorreos() {
  this.authService.getNewsletter().subscribe((data:any) => {
    this.emails = data;
  });
}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}