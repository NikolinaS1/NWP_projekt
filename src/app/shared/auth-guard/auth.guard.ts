import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthorizationService } from '../../authorization.service';

export const AuthGuard: CanActivateFn = (): boolean => {
  const authorizationService = inject(AuthorizationService);
  if (authorizationService.isLoggedIn()) {
    return true;
  }
  authorizationService.redirectToLoginPage();
  return false;
};
