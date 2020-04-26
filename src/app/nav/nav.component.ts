import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

enum Role {
  Doctor = 1,
  Police,
  Chemist
}


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model : any = {};
  userDisplayName = '';
  roleId = 0;
  user : any ={};

  get getEnum() { return Role; }


  constructor(private authService : AuthService, private toastr: ToastrService, private ngxLoader: NgxUiLoaderService ) { }

  ngOnInit(): void {
    //alert(Role.Doctor.valueOf());
    this.userDisplayName = localStorage.getItem('loggedUser');
    this.roleId = +localStorage.getItem('RoleId');

  }

  
  login() {
    this.ngxLoader.start();
    this.authService.login(this.model).subscribe((response : any) => {
      
      this.toastr.success('Logged in successfully')
      localStorage.setItem('loggedUser', this.model.username);
      this.userDisplayName = localStorage.getItem('loggedUser');
      this.roleId = +localStorage.getItem('RoleId');

      //delay(50000);
      this.ngxLoader.stop();
    },
      error => {
        alert(error)
        this.toastr.error('Failed to login');
        this.ngxLoader.stop();
      })
  }

  loggedIn()
  {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('RoleId');
    localStorage.removeItem('UserId');

    console.log('logged out');
    this.model.username = "";
    this.model.password = "";
  }

 

}
