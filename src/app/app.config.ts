import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { AuthService } from './core/auth/auth.service';
import { accessTokenInterceptor } from './core/auth/access-token.interceptor';
import { cacheInterceptor } from './core/interceptors/cache.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([accessTokenInterceptor, cacheInterceptor])
    ),
    provideAppInitializer(() => {
      const auth = inject(AuthService);
      return auth.getStatus();
    }),
  ],
};
