import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { NewMedicineComponent } from './new-medicine/new-medicine.component';
import { NewPrescriptionComponent } from './new-prescription/new-prescription.component';
import { NewVisitComponent } from './new-visit/new-visit.component';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { ViewPrescriptionComponent } from './view-prescription/view-prescription.component';
import { VisitListComponent } from './visit-list/visit-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'prescriptions/my', component: PrescriptionListComponent },
  { path: 'prescriptions/new', component: NewPrescriptionComponent },
  { path: 'prescriptions/:id', component: ViewPrescriptionComponent },

  { path: 'visits/my', component: VisitListComponent },
  { path: 'visits/new', component: NewVisitComponent },

  { path: 'medicines', component: MedicineListComponent },
  { path: 'medicines/new', component: NewMedicineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
