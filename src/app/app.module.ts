import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from 'src/interseptors/auth-interceptor';
import { AuthService } from 'src/services/auth.service';
import { DoctorService } from 'src/services/doctor.service';
import { MedicineService } from 'src/services/medicine.service';
import { PatientService } from 'src/services/patient.service';
import { PrescriptionService } from 'src/services/prescription.service';
import { VisitService } from 'src/services/visit.service';
import { MEDICAL_PURPOSE_API, MEDICAL_PURPOSE_AUTH_API } from './app-injection-tokens';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NewPrescriptionComponent } from './new-prescription/new-prescription.component';
import { NewVisitComponent } from './new-visit/new-visit.component';
import { NewMedicineComponent } from './new-medicine/new-medicine.component';
import { ViewPrescriptionComponent } from './view-prescription/view-prescription.component';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { VisitListComponent } from './visit-list/visit-list.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    NewPrescriptionComponent,
    NewVisitComponent,
    NewMedicineComponent,
    ViewPrescriptionComponent,
    PrescriptionListComponent,
    VisitListComponent,
    MedicineListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    DoctorService,
    MedicineService,
    PatientService,
    PrescriptionService,
    VisitService,
    { provide: MEDICAL_PURPOSE_API, useValue: environment.medicalPurposeApi },
    { provide: MEDICAL_PURPOSE_AUTH_API, useValue: environment.medicalPurposeAuthApi },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
