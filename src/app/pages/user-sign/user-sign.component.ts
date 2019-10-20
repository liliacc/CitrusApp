import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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
  navigateBack() {
    this.createUserFormActive = false;
    this.loginFormActive = false;
  }
}
