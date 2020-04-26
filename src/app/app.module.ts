import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PatientComponent } from './patient/patient.component';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { PatientlistComponent } from './patientlist/patientlist.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MedicinelistComponent } from './medicinelist/medicinelist.component';
import { VerificationlistComponent } from './verificationlist/verificationlist.component';
import { MedicalstoreComponent } from './medicalstore/medicalstore.component';
import { PatientpoliceverificationlistComponent } from './patientpoliceverificationlist/patientpoliceverificationlist.component';
import {JwtModule} from '@auth0/angular-jwt';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component'


export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'YYYY-MM-DD'
  });
}

export function getToken() {
  return localStorage.getItem('currentUser');
}


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent,
    PatientComponent,
    PatientlistComponent,
    MedicinelistComponent,
    VerificationlistComponent,
    MedicalstoreComponent,
    PatientpoliceverificationlistComponent,
    AccessdeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    NgxUiLoaderModule,
    JwtModule.forRoot({
      config: {
        throwNoTokenError: false,
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:53161']
      }
    }),
    ToastrModule.forRoot({ positionClass: 'toast-top-center',
                            timeOut: 2000,
                            preventDuplicates: true})

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
