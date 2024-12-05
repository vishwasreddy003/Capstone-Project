
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return sessionStorage.getItem('tokenId') !== null;
  state.url = '/home';
};