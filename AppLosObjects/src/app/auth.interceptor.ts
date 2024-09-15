import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsuariosService } from './service/users/usuarios.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authreq = req.clone({
  });

  if (req.url !== "http://127.0.0.1:8000/login") {
    const token = inject(UsuariosService).getToken();

  authreq = req.clone({
    setHeaders: {
      Authorization: `Token ${token}`
    }
  });
  

  }
  
  return next(authreq);
};
