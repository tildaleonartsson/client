import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  return !!localStorage.getItem('token');
};