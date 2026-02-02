import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../../../core/services/news'; // Importamos el servicio

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.less'
})
export class LandingComponent {
  // Inyectamos el servicio y obtenemos las noticias
  private newsService = inject(NewsService);
  articulos = this.newsService.noticias; // Ahora es un Signal
}