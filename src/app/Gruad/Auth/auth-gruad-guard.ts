import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from '../../Service/Auth/authentication';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGruadGuard: CanActivateFn = (route, state) => {

   const platformId = inject(PLATFORM_ID);
  const auth = inject(Authentication);
  const router = inject(Router);
  // 1. Agar Server par chal raha hai toh page load hone dein (Crash nahi hoga)
  if (!isPlatformBrowser(platformId)) {
    return true; 
  }

  // 2. Browser par aane ke baad localStorage aur Routing check karein
  const token = localStorage.getItem('token');
  const role = auth.Role();

  if (!token) {
    return true;
  }
  else if(token && role == 'Baber') {
    router.navigate(['/baber/dashboard']);
    return false ;
  }
  else if(token && role == 'Admin') {
    router.navigate(['/admin/dashboard']);
    return false ;
  }
  else {
    router.navigate(['/']);
    return false;
  }
};
