import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MEDICAL_PURPOSE_API } from 'src/app/app-injection-tokens';
import { CreateVisit } from 'src/models/visit/create.visit';
import { Visit } from 'src/models/visit/visit';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private visitApiUrl: string = this.baseApiUrl + '/api/visits'; 

  constructor(
    private http: HttpClient,
    @Inject(MEDICAL_PURPOSE_API) private baseApiUrl: string
  ) { }

  createVisit(visit: CreateVisit): Observable<Visit> {
    return this.http.post<Visit>(this.visitApiUrl, visit);
  }

  getMyVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(this.visitApiUrl + '/my');
  }
}
