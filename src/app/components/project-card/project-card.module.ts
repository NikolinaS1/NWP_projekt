import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [ProjectCardComponent],
  imports: [CommonModule, MatPaginatorModule],
  exports: [ProjectCardComponent],
})
export class ProjectCardModule {}
