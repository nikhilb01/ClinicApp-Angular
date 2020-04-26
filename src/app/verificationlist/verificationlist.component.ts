import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verificationlist',
  templateUrl: './verificationlist.component.html',
  styleUrls: ['./verificationlist.component.css']
})
export class VerificationlistComponent implements OnInit {
  p: number =1;

  patientList : any ={};

  patientId: number;

  policeRemarkModel : any={};

  //disableRemark: boolean = false;


  constructor(private authService : AuthService,private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPatientListForVerification();
    this.policeRemarkModel.status = "true";
  }

  getPatientListForVerification()
  {
    this.authService.getPatientListForVerification().subscribe((response: any)=>{
this.patientList = response.Data;
    },
    error => {
      this.toastr.error("Something went wrong");
    })
  }

  openModal(targetModal, patient) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.patientId = patient.PatientId;
  }

  onSubmit() {
    this.policeRemarkModel.PatientId = this.patientId;
    this.authService.addPoliceRemark(this.policeRemarkModel).subscribe(
      next => {
        this.toastr.success("Remark added successfully");
        this.getPatientListForVerification();
        //this.disableRemark= true;

      },
      error => {
        this.toastr.error("Error while adding");

      }
    )
    //console.log(this.prescriptionModel);

    this.modalService.dismissAll();

    this.clearAll();

  }

  clearAll() {
    this.policeRemarkModel.policeremark = "";
    this.policeRemarkModel.status = "true";
  }

}
