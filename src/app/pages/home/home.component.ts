import { Component, OnInit, ViewChild } from '@angular/core';
import { AddProjectDialogComponent } from '../../components/add-project-dialog/add-project-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from '../../authorization.service';
import { ProjectService } from '../../project.service';
import { Project } from '../../project.interface';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(ProjectCardComponent) projectCardComponent!: ProjectCardComponent;
  public hasAdminRole: boolean = false;

  get isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

  constructor(
    private dialog: MatDialog,
    private readonly authorizationService: AuthorizationService,
    private projectService: ProjectService,
    private readonly keycloak: KeycloakService
  ) {}

  ngOnInit(): void {
    this.hasAdminRole = this.keycloak.getUserRoles().includes('admin');
  }

  add(): void {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '670px',
      height: 'auto',
      data: {
        title: '',
        location: '',
        startDate: null,
        endDate: null,
        volunteers: '',
        description: '',
        skills: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectCardComponent.fetchProjects();
      }
    });
  }
}
