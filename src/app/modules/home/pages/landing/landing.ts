import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../../../core/services/news';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.html',
  styleUrl: './landing.less' 
})

export class LandingComponent {

  private newsService = inject(NewsService);
  private router = inject(Router);
  public auth = inject(AuthService);

  public principal = computed(() => this.newsService.noticias()[0] || null);
  public secundarias = computed(() => this.newsService.noticias().slice(1));

  logout() {
  this.auth.logout();
  this.router.navigate(['/auth/login']);
}
  verDetalle(id: number) {
    this.router.navigate(['/noticia', id]);
  }
}
