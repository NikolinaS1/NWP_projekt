import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from './image.interface';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private apiUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<Image> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    return this.http.post<Image>(`${this.apiUrl}/gallery`, formData);
  }

  getAllImages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/gallery/images`);
  }

  getImage(imageName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/gallery/image/${imageName}`, {
      responseType: 'blob',
    });
  }
}
