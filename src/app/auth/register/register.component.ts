import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/services/doctor.service';
import { PatientService } from 'src/services/patient.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: any;
  isDoctor: boolean = false;
  user: any = {
    fullName: '',
    email: '',
    password: '',
    position: '',
    kindOfActivity: ''
  };

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.isDoctor) {
      this.doctorService.createDoctor(this.user)
        .subscribe(result => {
          alert("Success register!");
          this.router.navigate(['/login']);
        }, (error) => {
          this.error = error.error;
          console.log(error);
        });
    }
    else {
      this.patientService.createPatient(this.user)
        .subscribe(result => {
          alert("Success register!");
          this.router.navigate(['/login']);
        }, (error) => {
          this.error = error.error;
          console.log(error);
        });
    }
  }
}
