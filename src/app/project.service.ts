import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Project } from './project.interface';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectUrl: string;

  constructor(
    private http: HttpClient,
    private authService: AuthorizationService
  ) {
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

  private getHeaders(): Observable<HttpHeaders> {
    return from(this.authService.getToken()).pipe(
      switchMap(
        (token) =>
          new Observable<HttpHeaders>((observer) => {
            observer.next(
              new HttpHeaders({
                Authorization: `Bearer ${token}`,
              })
            );
            observer.complete();
          })
      )
    );
  }

  assignUserToProject(projectId: number, userId: string): Observable<any> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.put(
          `${this.projectUrl}/${projectId}/assign/${userId}`,
          {},
          { headers }
        )
      )
    );
  }

  getUserProjects(userId: string): Observable<any> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.get(`${this.projectUrl}/user/${userId}`, { headers })
      )
    );
  }

  unassignUserFromProject(projectId: number, userId: string): Observable<any> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.delete(`${this.projectUrl}/${projectId}/unassign/${userId}`, {
          headers,
        })
      )
    );
  }
}
