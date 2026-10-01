import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from '../../Service/Auth/authentication';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export const adminGuard: CanActivateFn = (route, state) => {
   const platformId = inject(PLATFORM_ID);
  const auth = inject(Authentication);
  const router = inject(Router);

  

  // 2. Browser par aane ke baad localStorage aur Routing check karein
  const token = localStorage.getItem('token');
  const role = auth.Role();
  
  if (token && role == 'Admin') {
    return true;
  }
  else if(token && role == 'Baber') {
    router.navigate(['/barber/dashboard']);
    return false ;
  }
  else if(token && role == 'User') {
    router.navigate(['/']);
    return false ;
  }
  else {
    router.navigate(['/sigin']);
    return false;
  } 
};
