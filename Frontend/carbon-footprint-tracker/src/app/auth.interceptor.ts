
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = sessionStorage.getItem('tokenId');

  if (jwt) {
    req = req.clone(
      {
        setHeaders: { "Authorization": "Bearer " + jwt }
      }
    )
  }
  return next(req);
};
