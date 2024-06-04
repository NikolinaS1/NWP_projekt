import { Component, ElementRef, OnInit } from '@angular/core';
import { Location, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(
    public location: Location,
    private element: ElementRef,
    private router: Router,
    private readonly authorizationService: AuthorizationService
  ) {
    this.sidebarVisible = false;
  }

  get isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
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
