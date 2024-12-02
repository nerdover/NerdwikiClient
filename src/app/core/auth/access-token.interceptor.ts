import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs';

export const accessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  if (req.url === '/api/auth') {
    const token = auth.getAccessToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(req);
    }
  }

  if (auth.currentAccessToken() && auth.isAboutExpired()) {
    if (!auth.isRefreshing) {
      auth.isRefreshing = true;
      return auth.refresh().pipe(
        switchMap(() => {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${auth.currentAccessToken()}`,
            },
          });
          return next(req);
        })
      );
    }
  }

  if (auth.currentAccessToken()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.currentAccessToken()}`,
      },
    });
  }
  return next(req);
};
