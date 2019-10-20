import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.styl']
})
export class SigninUserComponent implements OnInit {

  constructor(public userAuthService: UserAuthService) { }

  ngOnInit() {
  }

}

