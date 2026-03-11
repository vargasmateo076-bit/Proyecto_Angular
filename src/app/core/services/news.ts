import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NewsService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/noticias';

  getNoticias() {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarNoticia(noticia: any) {
    return this.http.post(this.apiUrl, noticia);
  }

  eliminarNoticia(id: any) {
  const cleanId = String(id);
  return this.http.delete(`${this.apiUrl}/${cleanId}`);
}

  actualizarNoticia(noticia: any) {
  const id = String(noticia.id); 
  return this.http.put(`${this.apiUrl}/${id}`, noticia);
}

suscribirNewsletter(email: string) {
return this.http.post('http://localhost:3000/newsletter', { email });
}

getSuscriptores() {
return this.http.get('http://localhost:3000/newsletter');
}
}

