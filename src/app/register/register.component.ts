import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { 
  @Output() cancelRegister = new EventEmitter();
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 

  user = '';
  
  model : any = {

  };

  constructor(private authService : AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.model.IsSuperAdmin = false;
    this.model.CreatedOn = new Date();
    this.model.RoleId = 1;
  }

  register() 
  {
    if(this.model.IsSuperAdmin)
    {
      this.model.RoleId = 4;
    }
    this.authService.register(this.model).subscribe(()=> {
      this.toastr.success('Registration Successful!');
      this.cancelRegister.emit(false);
    },
    error => {
      this.toastr.error(error);
    }
    );
  }

  cancel()
  {
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }

}
