import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../project.interface';
import { ProjectService } from '../../project.service';
import { ProjectDetailsDialogComponent } from '../project-details-dialog/project-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from '../../authorization.service';
import { AddProjectDialogComponent } from '../add-project-dialog/add-project-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnInit {
  @Input() isArchivePage: boolean = false;
  @Input() isProfilePage: boolean = false;
  @Input() isArchive: boolean = false;
  @Input() isActive: boolean = false;
  projects: Project[] = [];
  pageSlice: Project[] = [];

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
    if (this.isProfilePage) {
      this.projectService
        .getUserProjects(this.authorizationService.getUserId())
        .subscribe((projects) => {
          const currentDate = new Date();
          this.projects = projects
            .map((project: any) => ({
              ...project,
              startDate: new Date(project.startDate),
              endDate: new Date(project.endDate),
            }))
            .filter((project: any) => {
              if (this.isArchive) {
                return project.endDate < currentDate;
              } else if (this.isActive) {
                return project.endDate >= currentDate;
              }
              return false;
            });
          this.pageSlice = this.projects.slice(0, 6);
        });
    } else {
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
        this.pageSlice = this.projects.slice(0, 6);
      });
    }
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
          this.fetchProjects();
        });
      }
    });
  }

  handleProjectClick(project: Project): void {
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

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.projects.length) {
      endIndex = this.projects.length;
    }
    this.pageSlice = this.projects.slice(startIndex, endIndex);
  }
}
