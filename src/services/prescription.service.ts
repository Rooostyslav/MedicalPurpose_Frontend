import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MEDICAL_PURPOSE_API } from 'src/app/app-injection-tokens';
import { CreatePrescription } from 'src/models/prescription/create.prescription';
import { Prescription } from 'src/models/prescription/prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private prescriptionApiUrl: string = this.baseApiUrl + '/api/prescriptions'; 

  constructor(
    private http: HttpClient,
    @Inject(MEDICAL_PURPOSE_API) private baseApiUrl: string
  ) { }

  createPrescription(prescription: CreatePrescription): Observable<Prescription> {
    return this.http.post<Prescription>(this.prescriptionApiUrl, prescription);
  }

  getPrescriptionById(prescriptionId: number): Observable<Prescription> {
    return this.http.get<Prescription>(this.prescriptionApiUrl + '/' + prescriptionId);
  }

  getMyPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(this.prescriptionApiUrl + '/my');
  }

  getQRCodeImage(prescriptionId: number) {
    return this.http.get(this.prescriptionApiUrl + '/qrcode/' + prescriptionId, { responseType: 'blob' });
  }
}
