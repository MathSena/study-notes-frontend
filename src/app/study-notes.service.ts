import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudyNotesService {
  private apiUrl = 'http://localhost:8080/api/v1/topics';

  constructor(private http: HttpClient) {}

  getStudyNotes(topic: string): Observable<{ topics: string[] }> {
    const body = { topic };
    return this.http.post<{ topics: string[] }>(this.apiUrl, body);
  }
}
