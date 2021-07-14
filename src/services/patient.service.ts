import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MEDICAL_PURPOSE_API } from 'src/app/app-injection-tokens';
import { CreatePatient } from 'src/models/patient/create.patient';
import { Patient } from 'src/models/patient/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientApiUrl: string = this.baseApiUrl + '/api/patients'; 

  constructor(
    private http: HttpClient,
    @Inject(MEDICAL_PURPOSE_API) private baseApiUrl: string
  ) { }

  createPatient(patient: CreatePatient): Observable<Patient> {
    return this.http.post<Patient>(this.patientApiUrl, patient);
  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientApiUrl);
  }
}
