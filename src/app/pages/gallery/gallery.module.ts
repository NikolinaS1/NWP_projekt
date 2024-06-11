import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from '../../components/footer/footer.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
  },
];

@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule,
    NavbarModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FooterModule,
    MatPaginatorModule,
    MatSnackBarModule,
  ],
})
export class GalleryModule {}
