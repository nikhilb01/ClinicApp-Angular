import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  
})
export class PatientComponent implements OnInit {
  model :any = {};
  CoordinatingPerson :any = {};
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  levelNum:number;

  users : any = {};

  constructor(private authService : AuthService, private toastr : ToastrService, private router : Router) { }

  ngOnInit(): void {
    this.model.gender = "male";
    this.model.ispoliceverificationrequired = "false";
    this.model.consultdoctor = null;
    //this.prescriptions.forEach(p=>p.morning ="false");
    this.getAllUsers();
  }

  addPatient(){
    //this.model.prescriptions = this.prescriptions;
    this.model.CoordinatingPerson = this.CoordinatingPerson;
    console.log(this.model);
    this.authService.addPatient(this.model).subscribe(next=> {
      this.toastr.success('Patient added successfully!');
      this.router.navigate(['/patientlist']);
    },
    error => {
      this.toastr.error('Issue while adding patient');
    } )
    //console.log(this.prescriptions);

  }
 
  getAllUsers()
  {
return this.authService.getAllUsers().subscribe((data)=>{
  this.users = data;
});
  }
  
  toNumber(id : number){
    
  }

  cancel()
  {
    this.router.navigate(['/patientlist']);
  }

  // public prescriptions: any[] = [{
  //   id: 1,
  //   medicinename :'',
  //   morning: "false",
  //   afternoon: "false",
  //   night: "false",
  //   beforeeat: "false"
  // }];

  // addAddress() {
  //   this.prescriptions.push({
  //     id: this.prescriptions.length + 1,
  //     medicinename :'',
  //     morning: "false",
  //     afternoon: "false",
  //     night: "false",
  //     beforeeat: "false"
  //   });
  // }

  // removeAddress(i: number) {
  //   this.prescriptions.splice(i, 1);
  // }

  // logValue() {
  //   console.log(this.prescriptions);
  // }

}
