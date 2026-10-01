import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
export const superGuardGuard: CanActivateFn = (route, state) => {
  
  var router = inject(Router);
  var token = localStorage.getItem('token')

  if(token == null)
  {
    router.navigate(['/sigin'])
    return false;
  }
  else{
    return true;
  }

};
