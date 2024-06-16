import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../project.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../project.service';
import { AuthorizationService } from '../../authorization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-project-details-dialog',
  templateUrl: './project-details-dialog.component.html',
  styleUrls: ['./project-details-dialog.component.css'],
})
export class ProjectDetailsDialogComponent implements OnInit {
  @ViewChild(ProjectCardComponent) projectCardComponent!: ProjectCardComponent;
  isLoggedIn: boolean = false;
  isAssigned: boolean = false;
  public hasAdminRole: boolean = false;
  public isArchivePage: boolean = false;
  public isArchive: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      project: Project;
      isArchivePage: boolean;
      isArchive: boolean;
    },
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private authorizationService: AuthorizationService,
    private readonly keycloak: KeycloakService
  ) {
    this.isLoggedIn = this.authorizationService.isLoggedIn();
    this.isArchivePage = data.isArchivePage;
    this.isArchive = data.isArchive;
    this.checkUserAssignment();
  }

  ngOnInit(): void {
    this.hasAdminRole = this.keycloak.getUserRoles().includes('admin');
  }

  async checkUserAssignment(): Promise<void> {
    if (this.isLoggedIn) {
      const userId = this.authorizationService.getUserId();
      const assignedProjects = await this.projectService
        .getUserProjects(userId)
        .toPromise();
      this.isAssigned = assignedProjects.some(
        (project: any) => project.id === this.data.project.id
      );
    }
  }

  async assignUserToProject(): Promise<void> {
    if (this.isLoggedIn) {
      const userId = this.authorizationService.getUserId();
      (
        await this.projectService.assignUserToProject(
          this.data.project.id,
          userId
        )
      ).subscribe(
        () => {
          console.log('User assigned successfully');
          this.snackBar.open('You assigned to project successfully.', 'OK', {
            duration: 5000,
          });
          this.isAssigned = true;
          this.dialogRef.close('refresh');
        },
        (error) => {
          this.snackBar.open(
            'Error assigning to project. Please try again.',
            'OK',
            {
              duration: 5000,
            }
          );
          console.error('Error assigning user to project', error);
        }
      );
    } else {
      console.error('User is not logged in');
    }
  }

  async unassignUserFromProject(): Promise<void> {
    if (this.isLoggedIn) {
      const userId = this.authorizationService.getUserId();
      (
        await this.projectService.unassignUserFromProject(
          this.data.project.id,
          userId
        )
      ).subscribe(
        () => {
          console.log('User unassigned successfully');
          this.snackBar.open(
            'You unassigned from project successfully.',
            'OK',
            {
              duration: 5000,
            }
          );
          this.isAssigned = false;
          this.dialogRef.close('refresh');
        },
        (error) => {
          this.snackBar.open(
            'Error unassigning from project. Please try again.',
            'OK',
            {
              duration: 5000,
            }
          );
          console.error('Error unassigning user from project', error);
        }
      );
    } else {
      console.error('User is not logged in');
    }
  }
}
