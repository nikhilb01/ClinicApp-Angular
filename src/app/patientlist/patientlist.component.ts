import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
//import {  } from 'rxjs';


@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {

  user: any={};

  patientList: any = {};

  prescriptionList: any = {};

  submitted = false;

  patientId: number;

  modalRef: BsModalRef;

  p: number = 1;

  //editProfileForm: FormGroup;

  prescriptionModel: any = {};

  model: any =
    {
      PatientName: "",
      MobileNumber: "",
      Email: ""
    };

  constructor(private authService: AuthService, private modalService: NgbModal, private toastr: ToastrService, private deleteModalService: BsModalService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    //this.loggedInUser = localStorage.getItem('loggedUser');
    this.authService.getCurrentUser().subscribe(user => this.user = user)
    this.getAllPatients();
    this.prescriptionModel.morning = "true";
    this.prescriptionModel.afternoon = "true";
    this.prescriptionModel.night = "true";
    this.prescriptionModel.beforeeat = "true";

  }

  getAllPatients() { 
    //this.model.loggedInUser = this.user.Id;
    this.ngxLoader.start();
    this.model.loggedInUser = localStorage.getItem('UserId');;
    return this.authService.getAllPatients(this.model).subscribe((response: any) => {
      this.patientList = response.Data;
      this.ngxLoader.stop();
    }
    );
  }

  openModal(targetModal, patient, IsShowPrescription) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.patientId = patient.PatientId;
    if (IsShowPrescription) {
      this.authService.getPrescriptions(this.patientId).subscribe((response: any) => {
        this.prescriptionList = response.Data;

      })
    }
  }

  onSubmit() {
    this.prescriptionModel.PatientId = this.patientId;
    this.prescriptionModel.IsDelivered = false;
    this.authService.addPrescription(this.prescriptionModel).subscribe(
      next => {
        this.toastr.success("Prescription added successfully");
      },
      error => {
        this.toastr.error("Error while adding");

      }
    )
    console.log(this.prescriptionModel);

    this.modalService.dismissAll();

    this.clearAll();

  }

  clearAll() {
    this.prescriptionModel.medicineName = "";
    this.prescriptionModel.morning = "true";
    this.prescriptionModel.afternoon = "true";
    this.prescriptionModel.night = "true";
    this.prescriptionModel.beforeeat = "true";
  }

  deletePatient(patientId : number)
  {
    this.authService.deletePatient(patientId).subscribe(next=>
      {
        this.toastr.success("Patient deleted successfully");
        this.getAllPatients();
      },
      error=>{
        this.toastr.error("Error while deleting patient");
      })
  }

  openDeleteConfirmModal(template: TemplateRef<any>, id: any) {
    this.modalRef = this.deleteModalService.show(template, { class: 'modal-sm' });
    this.patientId = id;
  }

  confirm(): void {
    this.modalRef.hide();
    this.deletePatient(this.patientId);
  }

  decline(): void {
    this.modalRef.hide();

  }

}
