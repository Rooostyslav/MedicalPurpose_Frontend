import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/models/patient/patient';
import { CreateVisit } from 'src/models/visit/create.visit';
import { AuthService } from 'src/services/auth.service';
import { PatientService } from 'src/services/patient.service';
import { VisitService } from 'src/services/visit.service';

@Component({
  selector: 'app-new-visit',
  templateUrl: './new-visit.component.html',
  styleUrls: ['./new-visit.component.css']
})
export class NewVisitComponent implements OnInit {

  patients: Patient[] = [];
  visit: CreateVisit = {
    doctorId: 0,
    patientId: 0,
    dateTime: new Date()
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private visitService: VisitService,
    private patientService: PatientService
  ) {
    if (!this.authService.isLoggedIn) {
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.patientService.getAllPatients()
      .subscribe(res => {
        this.patients = res;
      });

    this.authService.getAuthUser()
      .subscribe(result => {
        this.visit.doctorId = result.id;
      });
  }

  onSubmit() {
    if (this.visit.patientId == 0) {
      alert("Select patient!");
      return;
    }

    this.visitService.createVisit(this.visit)
      .subscribe(res => {
        alert("Success created new visit!");
        this.router.navigate(['/visits/my']);
      });
  }
}
