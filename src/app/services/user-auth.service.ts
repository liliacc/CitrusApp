import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserAuthService {
 typedInEmailForSignIn = '';
 typedInPassForSignIn = '';
 errorMessage = '';

 userData: User = new User('', '', '', '', '');

  constructor(public angularFireAuth: AngularFireAuth,
              public router: Router) { }

  async signInUser() {
    const email = this.typedInEmailForSignIn;
    const password = this.typedInPassForSignIn;
    this.errorMessage = '';
    const response = await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.errorMessage = error.message;
      });

    if (!response) {
      return;
    }
    console.error(1, response);

    this.router.navigate(['/userBoard']);
  }

}
