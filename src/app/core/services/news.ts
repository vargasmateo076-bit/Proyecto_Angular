import { Injectable, signal } from '@angular/core';

// Definimos cómo es una noticia
export interface Noticia {
  titulo: string;
  resumen: string;
  tag: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  // Iniciamos con las noticias que ya tenías
  private _noticias = signal<Noticia[]>([
    { titulo: 'IA 2026', resumen: 'El futuro de la web.', tag: 'IA' },
    { titulo: 'Angular 19', resumen: 'Rendimiento puro.', tag: 'Web' }
  ]);

  // Esto es lo que leerán los componentes
  noticias = this._noticias.asReadonly();

  agregarNoticia(nueva: Noticia) {
    // Agregamos la nueva noticia al principio de la lista
    this._noticias.update(lista => [nueva, ...lista]);
  }
}