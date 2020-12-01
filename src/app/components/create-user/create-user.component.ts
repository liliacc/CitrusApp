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

  constructor(private firestore: AngularFirestore,
              public userAuthService: UserAuthService,
              public angularFireAuth: AngularFireAuth,
              public router: Router,
              public loginService: LoginService) { }

  ngOnInit() {
  }
    async createNewUSerAccount(email, password): Promise<firebase.auth.UserCredential> {
      return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    }

  async createNewUser() {
    const newUserData = {
      displayName: this.userAuthService.user.userName,
      email: this.userAuthService.user.email,
      password: this.userAuthService.user.password,
  };
    const email = newUserData.email;
    const password = newUserData.password;

    this.errorMessage = '';
    const response = await this.createNewUSerAccount(email, password)
      .then(async data => {
        await new Promise<any>((resolve, reject) => {
          this.firestore
            .collection('users')
            .doc(data.user.uid)
            .set({
              username: this.userAuthService.user.userName,
              name: this.userAuthService.user.name,
              lastName: this.userAuthService.user.lastName,
            })
            .then(() => {
              this.userAuthService.user.id = data.user.uid;
              this.router.navigate(['/userBoard']);
            });
        });
      })
      .catch(error => {
      this.errorMessage = error.message;
    });

    console.error(2, response);




  }
  newF() {
    this.router.navigate(['/userBoard']);
  }
}
