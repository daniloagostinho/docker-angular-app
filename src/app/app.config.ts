import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestInterceptor } from './intercept';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    importProvidersFrom(HttpClientModule)
  ]
};
