import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserAuthService} from '../../services/user-auth.service';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.styl']
})
export class CreateUserComponent implements OnInit {
  error = false;
  errorMessage: string;

  constructor(private angularFirestore: AngularFirestore,
              public userAuthService: UserAuthService,
              public angularFireAuth: AngularFireAuth,
              public router: Router,
              public loginService: LoginService) { }

  ngOnInit() {
  }
   async newUser(createUSerForm) {
    await this.userAuthService.createNewUser(createUSerForm);
   }
  newF() {
    this.router.navigate(['/userBoard']);
  }
}
