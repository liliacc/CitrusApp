import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-sign',
  templateUrl: './login.html',
  styleUrls: ['./login.styl']
})
export class LoginComponent implements OnInit {

  loginFormActive = true;
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
  navigateBack() {
    this.createUserFormActive = false;
    this.loginFormActive = false;
  }
}
