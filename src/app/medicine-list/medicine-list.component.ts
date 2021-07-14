import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicine } from 'src/models/medicine/medicine';
import { AuthService } from 'src/services/auth.service';
import { MedicineService } from 'src/services/medicine.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {

  isDoctor: boolean = false;
  medicines: Medicine[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private medicineService: MedicineService
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
    
    this.authService.getAuthUser()
    .subscribe(result => {
      if (result.position != undefined) {
        this.isDoctor = true;
      }
    });
  }
}
