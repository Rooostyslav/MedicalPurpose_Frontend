import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine } from 'src/models/medicine/medicine';
import { Patient } from 'src/models/patient/patient';
import { CreatePrescription } from 'src/models/prescription/create.prescription';
import { MedicineAmount } from 'src/models/prescription/medicine.amount';
import { Prescription } from 'src/models/prescription/prescription';
import { AuthService } from 'src/services/auth.service';
import { MedicineService } from 'src/services/medicine.service';
import { PatientService } from 'src/services/patient.service';
import { PrescriptionService } from 'src/services/prescription.service';

@Component({
  selector: 'app-new-prescription',
  templateUrl: './new-prescription.component.html',
  styleUrls: ['./new-prescription.component.css']
})
export class NewPrescriptionComponent implements OnInit {

  newMedicine: MedicineAmount = {
    id: 0,
    name: '',
    amount: 0
  };
  medicines: Medicine[] = [];
  patients: Patient[] = [];
  prescription: CreatePrescription = {
    doctorId: 0,
    patientId: 0,
    description: '',
    medicines: []
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private prescriptionService: PrescriptionService,
    private medicineService: MedicineService,
    private patientsService: PatientService
  ) { 
    if (!this.authService.isLoggedIn) {
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.medicineService.getAllMedicines()
      .subscribe(res => {
        this.medicines = res;
      });

    this.patientsService.getAllPatients()
      .subscribe(res => {
        this.patients = res;
      });

    this.authService.getAuthUser()
      .subscribe(res => {
        this.prescription.doctorId = res.id;
      });
  }

  addMedicine() {
    if (this.newMedicine.id == 0) {
      alert("Select medicine!");
      return;
    }

    if (this.newMedicine.amount == 0) {
      alert("The number must not be 0 or less!");
      return;
    }

    this.newMedicine.name = this.medicines.find(m => m.id == this.newMedicine.id)?.name ?? '';
    let index = this.prescription.medicines.findIndex(m => m.id == this.newMedicine.id);
    
    if (index > -1) {
      this.prescription.medicines[index].amount += this.newMedicine.amount;
    }
    else {
      this.prescription.medicines.push(this.newMedicine);
    }

    this.newMedicine = {
      id: 0,
      name: '',
      amount: 0
    };
  }

  onSubmit() {
    if (this.prescription.patientId == 0) {
      alert("Select patient!");
      return;
    }

    this.prescriptionService.createPrescription(this.prescription)
      .subscribe(res => {
        alert("Success create prescription!");
        this.router.navigate(['/prescriptions/my']);
      });
  }
}