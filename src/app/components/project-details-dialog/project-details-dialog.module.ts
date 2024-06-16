import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsDialogComponent } from './project-details-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ProjectDetailsDialogComponent],
  imports: [CommonModule, MatSnackBarModule, MatProgressSpinnerModule],
  exports: [ProjectDetailsDialogComponent],
})
export class ProjectDetailsDialogModule {}
