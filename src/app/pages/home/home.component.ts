import { Component, ViewChild } from '@angular/core';
import { AddProjectDialogComponent } from '../../components/add-project-dialog/add-project-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from '../../authorization.service';
import { ProjectService } from '../../project.service';
import { Project } from '../../project.interface';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild(ProjectCardComponent) projectCardComponent!: ProjectCardComponent;

  get isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

  constructor(
    private dialog: MatDialog,
    private readonly authorizationService: AuthorizationService,
    private projectService: ProjectService
  ) {}

  add(): void {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '660px',
      height: '510px',
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
        this.projectService.save(result).subscribe(() => {
          this.projectCardComponent.fetchProjects();
        });
      }
    });
  }
}
