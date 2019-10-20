import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sign',
  templateUrl: './user-sign.component.html',
  styleUrls: ['./user-sign.component.styl']
})
export class UserSignComponent implements OnInit {

  loginFormActive = false;
  createUserFormActive = false;

  constructor() { }

  ngOnInit() {
  }


  showLogInForm() {
    this.loginFormActive = true;
  }

  showCreateUserForm() {
    this.createUserFormActive = true;
  }
}
