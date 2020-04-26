import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { VerificationlistComponent } from './verificationlist/verificationlist.component';
import { MedicinelistComponent } from './medicinelist/medicinelist.component';
import { PatientlistComponent } from './patientlist/patientlist.component';
import { PatientComponent } from './patient/patient.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicalstoreComponent } from './medicalstore/medicalstore.component';
import { PatientpoliceverificationlistComponent } from './patientpoliceverificationlist/patientpoliceverificationlist.component';
import { AuthorizationGuard } from './authorization.guard';


const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthorizationGuard],
    children: [
      { path: 'patientlist', component: PatientlistComponent, data : { allowedRoles:['Doctor'] } },
      { path: 'addpatient', component: PatientComponent,
      data: {
        allowedRoles: ['Doctor']
      } },
      { path: 'medicinelist', component: MedicinelistComponent, data : { allowedRoles:['Chemist'] } },
      { path: 'verificationlist', component: VerificationlistComponent, data : { allowedRoles:['Police'] } },
      { path: 'medicalstore', component: MedicalstoreComponent, data : { allowedRoles:['Doctor'] } },
      { path: 'patientpoliceverificationlist', component: PatientpoliceverificationlistComponent, data : { allowedRoles:['Doctor'] } },
      { path: 'accessdenied', component: AccessdeniedComponent },
    
    ]
  },
  // { path: 'patientlist', component: PatientlistComponent },
  // { path: 'addpatient', component: PatientComponent,
  // data: {
  //   allowedRoles: ['Doctor']
  // } },
  // { path: 'medicinelist', component: MedicinelistComponent },
  // { path: 'verificationlist', component: VerificationlistComponent },
  // { path: 'medicalstore', component: MedicalstoreComponent },
  // { path: 'patientpoliceverificationlist', component: PatientpoliceverificationlistComponent },
  // { path: 'accessdenied', component: AccessdeniedComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
