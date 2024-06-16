import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../authorization.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  userName: string = '';
  firstName: string = '';
  lastName: string = '';
  showProfileProjects: boolean = false;
  showActive: boolean = false;
  showArchive: boolean = false;
  activeButton: string = 'activeProjects';

  constructor(private authService: AuthorizationService) {}

  ngOnInit(): void {
    this.userName = this.authService.userName;
    this.firstName = this.authService.firstName;
    this.lastName = this.authService.lastName;

    this.showActiveProjects();
  }

  showActiveProjects() {
    this.showProfileProjects = true;
    this.showActive = true;
    this.showArchive = false;
    this.activeButton = 'activeProjects';
  }

  showArchiveProjects() {
    this.showProfileProjects = true;
    this.showActive = false;
    this.showArchive = true;
    this.activeButton = 'archiveProjects';
  }
}
