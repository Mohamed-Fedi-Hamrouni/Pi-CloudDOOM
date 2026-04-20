import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { APP_INITIALIZER } from "@angular/core";
import { routes } from "./app/app.routes";
import { AuthService } from "./app/core/auth/auth.service";
import { authInterceptor } from "./app/core/interceptors/auth.interceptor";

function initializeKeycloak(authService: AuthService) {
    return () => authService.init();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(withInterceptors([authInterceptor])),
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            deps: [AuthService],
            multi: true,
        },
    ],
}).catch((err) => console.error(err));
