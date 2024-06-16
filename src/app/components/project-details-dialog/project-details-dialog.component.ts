import { Component, Inject } from '@angular/core';
import { Project } from '../../project.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../project.service';
import { AuthorizationService } from '../../authorization.service';

@Component({
  selector: 'app-project-details-dialog',
  templateUrl: './project-details-dialog.component.html',
  styleUrl: './project-details-dialog.component.css',
})
export class ProjectDetailsDialogComponent {
  get isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

  projectDetails: Project[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project },
    private projectService: ProjectService,
    private authorizationService: AuthorizationService
  ) {}

  fetchProjects(id: number): void {
    this.projectService.findById(id).subscribe((details) => {
      this.projectDetails = details;
      console.log(this.projectDetails);
    });
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
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error assigning user to project', error);
        }
      );
    } else {
      console.error('User is not logged in');
    }
  }
}
