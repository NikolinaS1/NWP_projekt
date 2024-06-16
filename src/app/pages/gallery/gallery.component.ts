import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../authorization.service';
import { GalleryService } from '../../gallery.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  imageNames: string[] = [];
  images: any[] = [];
  pageSlice: any[] = [];

  get isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

  constructor(
    private readonly authorizationService: AuthorizationService,
    private galleryService: GalleryService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadImages();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (file) {
      if (!validImageTypes.includes(file.type)) {
        this.snackBar.open(
          'Invalid file format. Please upload an image file (JPEG, PNG, GIF).',
          'OK',
          {
            duration: 5000,
          }
        );
        return;
      }

      this.galleryService.uploadImage(file).subscribe(() => {
        this.snackBar.open('Image uploaded successfully.', 'OK', {
          duration: 5000,
        });
        this.loadImages();
      });
    }
  }

  loadImages(): void {
    this.galleryService.getAllImages().subscribe((data) => {
      this.imageNames = data;
      const imageRequests = this.imageNames.map((name) =>
        this.galleryService.getImage(name).toPromise()
      );
      Promise.all(imageRequests)
        .then((imageBlobs) => {
          this.images = imageBlobs
            .filter((blob) => blob !== undefined)
            .map((imageBlob) =>
              this.sanitizer.bypassSecurityTrustUrl(
                URL.createObjectURL(imageBlob as Blob)
              )
            );
          this.updatePageSlice(0, 10);
        })
        .catch((error) => {
          console.error('Error loading images:', error);
        });
    });
  }

  onPageChange(event: PageEvent) {
    this.updatePageSlice(event.pageIndex, event.pageSize);
  }

  updatePageSlice(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = Math.min(startIndex + pageSize, this.images.length);
    this.pageSlice = this.images.slice(startIndex, endIndex);
  }

  openModal(imageUrl: any): void {
    const modal = document.getElementById('myModal') as HTMLElement;
    const modalImg = document.getElementById('img01') as HTMLImageElement;
    modal.style.display = 'block';
    modalImg.src = imageUrl.changingThisBreaksApplicationSecurity;

    modal.onclick = () => {
      modal.style.display = 'none';
    };
  }

  closeModal(): void {
    const modal = document.getElementById('myModal') as HTMLElement;
    modal.style.display = 'none';
  }
}
