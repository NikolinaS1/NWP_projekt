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

  save(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.projectUrl}`, project);
  }

  public findById(id: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projectUrl}/${id}`);
  }

  update(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.projectUrl}/${id}`, project);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.projectUrl}/${id}`);
  }
}
