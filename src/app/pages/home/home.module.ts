import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { HeaderModule } from '../../components/header/header.module';
import { ProjectCardModule } from '../../components/project-card/project-card.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavbarModule,
    HeaderModule,
    ProjectCardModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
