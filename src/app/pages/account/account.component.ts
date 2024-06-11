import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../authorization.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  userName: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private authService: AuthorizationService) {}

  ngOnInit(): void {
    this.userName = this.authService.userName;
    this.firstName = this.authService.firstName;
    this.lastName = this.authService.lastName;
  }
}
