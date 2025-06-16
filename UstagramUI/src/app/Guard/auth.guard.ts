import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';


// auth.guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  const token = localStorage.getItem('ustagram_token');
  if (!token) {
    console.log('No token found, redirecting to login');
    return router.createUrlTree(['/login']);
  }
  
  return true;
};