import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {UserAuthService} from '../../services/user-auth.service';

@Component({
  selector: 'app-user-sign',
  templateUrl: './login.html',
  styleUrls: ['./login.styl']
})
export class LoginComponent implements OnInit {



  constructor(
    public loginService: LoginService,
    private userAuthService: UserAuthService
  ) { }

  ngOnInit() {
    this.userAuthService.currentPage = 'login';
  }

}
