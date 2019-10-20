import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserAuthService} from '../../services/user-auth.service';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

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
              public router: Router ) { }

  ngOnInit() {
  }
    async createNewUSerAccount(email, password): Promise<firebase.auth.UserCredential> {
      return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    }

  async createNewUser() {
    const newUserData = {
      name: this.userAuthService.userData.name,
      lastName: this.userAuthService.userData.lastName,
      userName: this.userAuthService.userData.userName,
      email: this.userAuthService.userData.email,
      password: this.userAuthService.userData.password
  };
    const email = newUserData.email;
    const password = newUserData.password;

    this.errorMessage = '';
    const response = await this.createNewUSerAccount(email, password).catch(error => {
      console.error(1, error);
      this.errorMessage = error.message;
    });

    if (!response) {
      return;
    }

    console.error(2, response);
    await new Promise<any>((resolve, reject) => {
        this.firestore
          .collection('users')
          .add(newUserData);

      });

    this.router.navigate(['/userBoard']);


  }
}
