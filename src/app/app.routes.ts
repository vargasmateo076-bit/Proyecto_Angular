import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    // Cargamos el componente directamente, no el módulo
    loadComponent: () => import('./modules/home/pages/landing/landing').then(m => m.LandingComponent)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./modules/auth/pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'admin/dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/admin/pages/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  { path: '**', redirectTo: '' }
];