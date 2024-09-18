import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { authInterceptor } from './auth.interceptor';
import { Socket, SocketIoConfig } from 'ngx-socket-io';

// Define el SocketIoConfig
const socketConfig: SocketIoConfig = {
  url: 'ws://localhost:8000/ws/chat/',
  options: {},
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor])),
    CookieService,
    // Proveedor manual del servicio de WebSocket
    {
      provide: Socket,
      useFactory: () => new Socket(socketConfig),
    },
  ],
};
