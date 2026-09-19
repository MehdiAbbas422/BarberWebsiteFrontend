import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
//For Intercepter
import { provideHttpClient , withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
//For Intercepter
import { intercepterInterceptor } from './interceptor/intercepter-interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    //For Intercepter
    provideHttpClient(withInterceptors([intercepterInterceptor])),
  ]
};
