import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from '../../Service/Auth/authentication';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export const baberGuard: CanActivateFn = (route, state) => {

  const auth = inject(Authentication);
  const router = inject(Router);

  // 1. Agar Server par chal raha hai toh page load hone dein (Crash nahi hoga)
 

  // 2. Browser par aane ke baad localStorage aur Routing check karein
  const token = localStorage.getItem('token');
  const role = auth.Role();

  if (token && role == 'Barber') {
    return true;
  }
  else if(token && role == 'Admin') {
    
    return true ;
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
