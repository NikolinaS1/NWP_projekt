import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ProjectCardComponent],
  imports: [CommonModule, MatPaginatorModule, MatSnackBarModule],
  exports: [ProjectCardComponent],
})
export class ProjectCardModule {}
