import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
  },
];

@NgModule({
  declarations: [GalleryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class GalleryModule {}
