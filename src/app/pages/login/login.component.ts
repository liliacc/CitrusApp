import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-user-sign',
  templateUrl: './login.html',
  styleUrls: ['./login.styl']
})
export class LoginComponent implements OnInit {



  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit() {
  }

}
