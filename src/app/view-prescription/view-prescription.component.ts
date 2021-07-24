import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { PrescriptionService } from 'src/services/prescription.service';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.css']
})
export class ViewPrescriptionComponent implements OnInit {

  qrCodeImage: string = '';
  prescription: any = {
    id: 0,
    doctorId: 0,
    doctor: {
      id: 0,
      fullName: '',
      email: '',
      position: '',
      kindOfActivity: ''
    },
    patientId: 0,
    patient: {
      id: 0,
      fullName: '',
      email: ''
    },
    description: '',
    medicines: []
  };
  totalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private prescriptionService: PrescriptionService
  ) { 
    if (!this.authService.isLoggedIn) {
      router.navigate(['/login']);
    }

    this.route.params.subscribe(p => {
      this.prescription.id = +p['id'];
    });
  }

  ngOnInit(): void {
    this.prescriptionService.getPrescriptionById(this.prescription.id)
      .subscribe(res => {
        this.prescription = res;
        for(let m of res.medicines) {
          this.totalPrice += m.totalPrice;
        }
        this.getQRCodeImage();
      });
  }

  getQRCodeImage() {
    this.prescriptionService.getQRCodeImage(this.prescription.id)
      .subscribe(res => {
        var reader:FileReader = new FileReader();
          reader.onloadend = (e) => {
            if (reader.result != null) {
              this.qrCodeImage = reader.result.toString();
            }
          }
        reader.readAsDataURL(res);
      });
  }

}
