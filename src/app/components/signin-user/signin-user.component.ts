import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.styl']
})
export class SigninUserComponent implements OnInit {
  userData: User;

  constructor() { }

  ngOnInit() {
  }

}

