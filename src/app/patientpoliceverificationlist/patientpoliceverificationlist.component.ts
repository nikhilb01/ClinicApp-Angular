import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-patientpoliceverificationlist',
  templateUrl: './patientpoliceverificationlist.component.html',
  styleUrls: ['./patientpoliceverificationlist.component.css']
})
export class PatientpoliceverificationlistComponent implements OnInit {

  p: number=1

  patientList : any={};

  constructor(private authService : AuthService,private toastr: ToastrService) { }

  ngOnInit(): void {
    var userId= +localStorage.getItem('UserId');

    this.getPatientPoliceVerificationDetails(userId);
  }

  getPatientPoliceVerificationDetails(userId)
  {
    this.authService.GetPatientPoliceVerificationDetails(userId).subscribe((response:any)=>{
      this.patientList = response.Data;
    },
    error=>{
      this.toastr.error("Something went wrong");
    }
    );
  }

}
