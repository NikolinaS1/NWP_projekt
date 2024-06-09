import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { HeaderModule } from '../../components/header/header.module';
import { ProjectCardModule } from '../../components/project-card/project-card.module';
import { FooterModule } from '../../components/footer/footer.module';

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
    FooterModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
