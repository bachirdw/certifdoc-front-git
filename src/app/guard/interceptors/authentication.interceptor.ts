import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);
  const token = authenticationService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};