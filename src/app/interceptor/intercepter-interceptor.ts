import { HttpInterceptorFn } from '@angular/common/http';
import { Authentication } from '../Service/Auth/authentication';
import { inject, Inject } from '@angular/core';

export const intercepterInterceptor: HttpInterceptorFn = (req, next) => {
  
  var auth = inject(Authentication);
  var token = localStorage.getItem("token")



  // Agar token exist karta ho tabhi header append karein
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};