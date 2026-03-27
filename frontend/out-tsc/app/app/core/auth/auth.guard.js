import { inject } from '@angular/core';
import { AuthService } from './auth.service';
export const authGuard = async (route, state) => {
    const authService = inject(AuthService);
    if (authService.isAuthenticated()) {
        return true;
    }
    authService.login();
    return false;
};
//# sourceMappingURL=auth.guard.js.map