import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../project.interface';
import { ProjectService } from '../../project.service';
import { ProjectDetailsDialogComponent } from '../project-details-dialog/project-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from '../../authorization.service';
import { AddProjectDialogComponent } from '../add-project-dialog/add-project-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnInit {
  @Input() isArchivePage: boolean = false;
  projects: Project[] = [];

  get isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.findAll().subscribe((data) => {
      const currentDate = new Date();
      this.projects = data
        .map((project) => ({
          ...project,
          startDate: new Date(project.startDate),
          endDate: new Date(project.endDate),
        }))
        .filter((project) => {
          if (this.isArchivePage) {
            return project.endDate < currentDate;
          } else {
            return project.endDate >= currentDate;
          }
        });
    });
  }

  showDetails(project: Project): void {
    const dialogRef = this.dialog.open(ProjectDetailsDialogComponent, {
      data: { project: project },
      width: '660px',
      height: 'auto',
    });
  }

  deleteProject(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: 'Are you sure you want to delete this project?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectService.delete(id).subscribe(() => {
          this.projects = this.projects.filter((project) => project.id !== id);
        });
      }
    });
  }

  handleProjectClick(project: Project): void {
    if (!this.isLoggedIn) {
      return;
    }
    this.showDetails(project);
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  update(project: Project): void {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '670px',
      height: 'auto',
      data: project,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectService.update(project.id, result).subscribe(() => {
          this.fetchProjects();
        });
      }
    });
  }
}
