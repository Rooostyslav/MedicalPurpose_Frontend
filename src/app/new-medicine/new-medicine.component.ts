import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateMedicine } from 'src/models/medicine/create.medicine';
import { AuthService } from 'src/services/auth.service';
import { MedicineService } from 'src/services/medicine.service';

@Component({
  selector: 'app-new-medicine',
  templateUrl: './new-medicine.component.html',
  styleUrls: ['./new-medicine.component.css']
})
export class NewMedicineComponent implements OnInit {

  medicine: CreateMedicine = {
    name: '',
    description: '',
    instruction: '',
    priceForOne: 0
  };

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
  }

  onSubmit() {
    this.medicineService.createMedicine(this.medicine)
      .subscribe(res => {
        alert("Success create new medicine!");
        this.router.navigate(['/medicines']);
      });
  }
}
