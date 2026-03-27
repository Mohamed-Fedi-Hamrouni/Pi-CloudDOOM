import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { from, switchMap } from 'rxjs';
export const authInterceptor = (req, next) => {
    const authService = inject(AuthService);
    if (!authService.isAuthenticated()) {
        return next(req);
    }
    return from(authService.getToken()).pipe(switchMap(token => {
        if (!token)
            return next(req);
        const authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next(authReq);
    }));
};
//# sourceMappingURL=auth.interceptor.js.map