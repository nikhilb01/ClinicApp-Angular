import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<any>(null);

  baseUrl = "http://localhost:53161/api/";
  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'Account/SignIn', model)
      .pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSubject.next(user.user);
          localStorage.setItem('UserId', user.user.Id);
          localStorage.setItem('RoleId', user.user.RoleId);

        }
      })
      )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'Account/SignUp', model)
  }

  getAllUsers() {
    return this.http.get(this.baseUrl + 'Account/GetAllUsers');
  }
  addPatient(model: any) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(this.baseUrl + 'Patient/AddPatient', model, { headers: reqHeader });
  }
  getAllPatients(model: any) {
    return this.http.post(this.baseUrl + 'Patient/GetPatient', model);
  }
  addPrescription(model: any) {
    return this.http.post(this.baseUrl + 'Patient/AddPrescription', model)
  }
  getPrescriptions(patientId: number) {
    return this.http.get(this.baseUrl + 'Patient/GetPrescriptions?patientId=' + patientId);
  }
  deletePatient(patientId: number) {
    return this.http.get(this.baseUrl + 'Patient/DeletePatient?patientId=' + patientId);
  }
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  getAllMedicines(isDelivered) {
    return this.http.get(this.baseUrl + 'Patient/GetMedicineDetails?isDelivered=' + isDelivered);
  }
  updateMedicineStatus(prescriptionId: number) {
    return this.http.get(this.baseUrl + 'Patient/UpdateMedicineStatus?prescriptionId=' + prescriptionId);
  }
  getPatientListForVerification() {
    return this.http.get(this.baseUrl + 'Patient/GetPatientListForVarification');
  }
  addPoliceRemark(model: any) {
    return this.http.post(this.baseUrl + 'Patient/AddPatientPoliceCommunicationDetails', model)

  }

  getMedicineDetails(isDelivered: boolean, userId: number) {
    return this.http.get(this.baseUrl + "Patient/GetMedicineDetails?isDelivered=" + isDelivered + "&userId=" + userId);

  }
  GetPatientPoliceVerificationDetails(userId: number) {
    return this.http.get(this.baseUrl + "Patient/GetPatientPoliceVerificationDetails?userId=" + userId);

  }

  isAuthorized(allowedRoles: string[]): boolean {
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    const token = localStorage.getItem('token');

    const decodeToken = this.jwtHelperService.decodeToken(token);

    if (!decodeToken) {
      console.log('Invalid token');
      return false;
    }
    return allowedRoles.includes(decodeToken['role']);

  }
}
