import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Authentication } from '../../Service/Auth/authentication';

export const userGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const auth = inject(Authentication);
  const router = inject(Router);



  // 2. Browser par aane ke baad localStorage aur Routing check karein
  const token = localStorage.getItem('token');
  const role = auth.Role();

  if (token && (role === 'User' || role === 'Admin')) {
    return true;
  }

  if (token && role === 'Barber') {
    router.navigate(['barber/dashboard']);
    return false;
  }

  router.navigate(['/sigin']);
  return false;
};