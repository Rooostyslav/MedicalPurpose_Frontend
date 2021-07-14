import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prescription } from 'src/models/prescription/prescription';
import { AuthService } from 'src/services/auth.service';
import { PrescriptionService } from 'src/services/prescription.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {

  isDoctor: boolean = false;
  prescriptions: Prescription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private prescriptionService: PrescriptionService
  ) {
    if (!this.authService.isLoggedIn) {
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.prescriptionService.getMyPrescriptions()
      .subscribe(result => {
        this.prescriptions = result;
      });

    if (this.authService.isLoggedIn) {
      this.authService.getAuthUser()
        .subscribe(res => {
          if (res.position != undefined) {
            this.isDoctor = true;
          }
        });
    }
  }
}
