1. El Arranque
Cuando ejecutas ng serve y abres el navegador:
NOTA**** tienes que ejecutar el npm install sobre la carpeta***

main.ts: Es la llave de encendido. Arranca la aplicación usando el componente AppComponent

app.routes.ts: Actúa como el mapa.

app.html: Tiene el <router-outlet>, que es el marco vacío donde Angular "pega" la Landing.

2. La Visualización (Landing Page)
El usuario ve las noticias.

El Servicio (NewsService): Es el cerebro central. Nace cuando arranca la app y guarda la lista de noticias en un Signal (una caja fuerte reactiva).

La Landing (LandingComponent):

Inyecta el servicio (inject(NewsService)).

Pide la lista de noticias (this.service.noticias).

En el HTML, el bucle (@for o *ngFor) abre la caja fuerte (articulos()) y "pinta" una tarjeta por cada noticia.

3. La Navegación y Seguridad (Auth Guard)
El usuario intenta entrar a la administración.

Clic en el botón "Login" -> El Router cambia la URL a /auth/login.

El Login: El usuario escribe "admin" y "1234".

AuthService: Verifica la clave. Si es correcta:

Pone su señal isLoggedIn en true.

Guarda un token falso en el navegador (localStorage).

El Router: Intenta llevarte a /admin/dashboard.

authGuard: Es el guardia de seguridad. Antes de dejarte entrar al Dashboard, corre y le pregunta al AuthService: "¿Este usuario está logueado?". Como ahora es true, levanta la barrera y te deja pasar.

4. La Creación (Dashboard)
El administrador escribe una nueva noticia sobre "Robótica".

El Formulario: Usaste [(ngModel)], lo que crea un puente bidireccional. Lo que escribes en el input se guarda instantáneamente en la variable nuevaNoticia del archivo .ts.

El botón "Publicar": Al hacer clic, ejecuta la función publicar().

La Magia del Servicio:

El componente Dashboard llama a NewsService.agregarNoticia(datos).

El Servicio toma el Signal de noticias y lo actualiza (update), poniendo la nueva noticia al principio de la lista.

5. La Reactividad (El cierre del ciclo)
Aquí es donde Angular brilla.

El administrador cierra sesión y vuelve a la Landing.

Sin recargar la página, la Landing (que sigue "escuchando" al mismo NewsService) nota que el Signal cambió.

Automáticamente, Angular repinta el HTML y  La noticia de "Robótica" aparece ahí.
