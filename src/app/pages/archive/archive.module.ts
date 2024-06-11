import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveComponent } from './archive.component';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCardModule } from '../../components/project-card/project-card.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: ArchiveComponent,
  },
];

@NgModule({
  declarations: [ArchiveComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProjectCardModule,
    NavbarModule,
    FooterModule,
  ],
  exports: [ArchiveComponent],
})
export class ArchiveModule {}
