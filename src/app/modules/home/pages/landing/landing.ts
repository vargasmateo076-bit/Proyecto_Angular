import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../../../core/services/news';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.less'
})

export class LandingComponent implements OnInit {

  private newsService = inject(NewsService);
  private router = inject(Router);
  public auth = inject(AuthService);
  emailNewsletter: string = '';

  noticias = signal<any[]>([]);

  public principal = computed(() => this.noticias()[0] || null);
  public secundarias = computed(() => this.noticias().slice(1));

  ngOnInit() {
    this.newsService.getNoticias().subscribe(data => {
      this.noticias.set(data);
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  verDetalle(id: number) {
    this.router.navigate(['/noticia', id]);
  }
suscribir() {
if (!this.emailNewsletter.endsWith('@gmail.com')) {
alert('Por seguridad, solo aceptamos correos @gmail.com');
return;
}
this.newsService.suscribirNewsletter(this.emailNewsletter).subscribe({
next: () => {
alert('¡Te has suscrito con éxito!');
this.emailNewsletter = '';
},
error: () => alert('Error al conectar con el servidor')
});
}

}
