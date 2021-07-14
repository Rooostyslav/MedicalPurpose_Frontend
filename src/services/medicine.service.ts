import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MEDICAL_PURPOSE_API } from 'src/app/app-injection-tokens';
import { CreateMedicine } from 'src/models/medicine/create.medicine';
import { Medicine } from 'src/models/medicine/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private medicineApiUrl: string = this.baseApiUrl + '/api/medicines'; 

  constructor(
    private http: HttpClient,
    @Inject(MEDICAL_PURPOSE_API) private baseApiUrl: string
  ) { }

  createMedicine(medicine: CreateMedicine): Observable<Medicine> {
    return this.http.post<Medicine>(this.medicineApiUrl, medicine);
  }

  getAllMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.medicineApiUrl);
  }
}
