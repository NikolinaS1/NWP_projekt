import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectUrl: string;

  constructor(private http: HttpClient) {
    this.projectUrl = 'http://localhost:8085/projects';
  }

  public findAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl);
  }

  public save(project: Project) {
    this.http
      .post<Project>(this.projectUrl, project)
      .subscribe((result) => console.log(result));
  }
}
