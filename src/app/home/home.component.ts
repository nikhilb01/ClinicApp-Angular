import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  user = '';
  // levelNum:number;

  constructor() { }

  ngOnInit(): void {
  }

    registerToggle()
  {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode : boolean)
  {
    this.registerMode = registerMode;
  }

  
  loggedInUser()
  {
    this.user = localStorage.getItem('loggedUser');
    return !!this.user;
  }
}
