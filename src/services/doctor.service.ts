import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MEDICAL_PURPOSE_API } from 'src/app/app-injection-tokens';
import { CreateDoctor } from 'src/models/doctor/create.doctor';
import { Doctor } from 'src/models/doctor/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctorApiUrl: string = this.baseApiUrl + '/api/doctors'; 

  constructor(
    private http: HttpClient,
    @Inject(MEDICAL_PURPOSE_API) private baseApiUrl: string
  ) { }

  createDoctor(doctor: CreateDoctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.doctorApiUrl, doctor);
  }
}
