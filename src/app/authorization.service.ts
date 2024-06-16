import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private readonly keycloakService: KeycloakService) {}

  redirectToLoginPage(): Promise<void> {
    return this.keycloakService.login();
  }

  get userName(): string {
    return this.keycloakService.getUsername();
  }

  get firstName(): string {
    const idToken = this.keycloakService.getKeycloakInstance()?.idTokenParsed;
    return idToken?.['given_name'] ?? '';
  }

  get lastName(): string {
    const idToken = this.keycloakService.getKeycloakInstance()?.idTokenParsed;
    return idToken?.['family_name'] ?? '';
  }

  getToken(): Promise<string> {
    return this.keycloakService.getToken();
  }

  isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  getUserId(): string {
    const idToken = this.keycloakService.getKeycloakInstance()?.idTokenParsed;
    return idToken?.['sub'] ?? '';
  }

  logout(): void {
    this.keycloakService.logout(environment.keycloak.postLogoutRedirectUri);
  }
}
