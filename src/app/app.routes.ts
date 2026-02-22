import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  
  {
    path: 'auth/login',
    loadComponent: () => import('./modules/auth/pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
       import('./modules/home/pages/landing/landing')
         .then(m => m.LandingComponent)
  },
  {
    path: 'admin/dashboard',
    canActivate: [authGuard],
    data: { role: 'admin' },
    loadComponent: () => import('./modules/admin/pages/dashboard/dashboard').then(m => m.DashboardComponent)
  },

  { path: '**', redirectTo: 'auth/login' }
];