import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Location, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../authorization.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  isScrolled: boolean = false;
  currentRoute: string = '';
  public hasAdminRole: boolean = false;

  constructor(
    public location: Location,
    private element: ElementRef,
    private router: Router,
    private readonly authorizationService: AuthorizationService,
    private readonly keycloak: KeycloakService
  ) {
    this.sidebarVisible = false;
    this.router.events.subscribe((val) => {
      this.currentRoute = this.router.url;
    });
  }

  get isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

  ngOnInit(): void {
    this.hasAdminRole = this.keycloak.getUserRoles().includes('admin');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 50) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  redirectToLoginPage(): void {
    this.authorizationService.redirectToLoginPage();
  }

  logout() {
    this.authorizationService.logout();
  }

  sidebarToggle() {
    const navbarNav = document.getElementById('navbarNav');
    if (navbarNav) {
      if (navbarNav.classList.contains('show')) {
        navbarNav.classList.remove('show');
      } else {
        navbarNav.classList.add('show');
      }
    }
  }
}
