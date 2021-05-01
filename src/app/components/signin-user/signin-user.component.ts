import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.styl']
})
export class SigninUserComponent implements OnInit {

  constructor(public userAuthService: UserAuthService,
              public loginService: LoginService) { }
  // loginUser = this.userAuthService.signInForm;


  ngOnInit() {
  }
}


