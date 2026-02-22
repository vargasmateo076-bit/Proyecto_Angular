import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private _noticias = signal<any[]>(
    JSON.parse(localStorage.getItem('noticias') || '[]')
  );

  noticias = this._noticias.asReadonly();

  agregarNoticia(noticia: any) {

    const nuevaNoticia = {
      id: Date.now(),
      ...noticia,
      fecha: new Date(),
      autor: 'Admin'
    };

    this._noticias.update(prev => {
      const actualizadas = [nuevaNoticia, ...prev];
      localStorage.setItem('noticias', JSON.stringify(actualizadas));
      return actualizadas;
    });
  }
}