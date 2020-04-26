import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-medicalstore',
  templateUrl: './medicalstore.component.html',
  styleUrls: ['./medicalstore.component.css']
})
export class MedicalstoreComponent implements OnInit {

  p:number=1;

  medicineList : any = {};

  userId : number;

  constructor(private authService : AuthService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userId = +localStorage.getItem('UserId');
    this.getMedicineDetails(false,this.userId)
  }

  onChange(isDelivered)
  {
    //var userId = localStorage.getItem('UserId');;

this.getMedicineDetails(isDelivered,this.userId)
//alert(this.medicineList?.length)

  }

  getMedicineDetails(isDelivered, userId)
  {
    this.authService.getMedicineDetails(isDelivered, userId).subscribe((response : any)=>{
this.medicineList = response.Data;
//alert(this.medicineList?.length)
    },
    error=>{
      this.toastr.error("Something went wrong");

    })
  }

}
