import { HttpInterceptorFn } from '@angular/common/http';
import { inject, NgZone } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, from, of, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const zone = inject(NgZone);

  if (!authService.isAuthenticated()) {
    return next(req);
  }

  return new Observable(observer => {
    from(authService.getToken()).pipe(
      catchError(() => of('')),
      switchMap(token => {
        if (!token) return next(req);
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next(authReq);
      })
    ).subscribe({
      next: (event) => zone.run(() => observer.next(event)),
      error: (err) => zone.run(() => observer.error(err)),
      complete: () => zone.run(() => observer.complete())
    });
  });
};
