import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';

import { UsuariosService } from './service/users/usuarios.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(UsuariosService).getToken();

  const authreq = req.clone({
    setHeaders: {
      Authorization: `Token ${token}`,
    },
  });
  return next(authreq);
};
