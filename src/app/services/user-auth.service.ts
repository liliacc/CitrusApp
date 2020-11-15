import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class UserAuthService {
  typedInEmailForSignIn = '';
  typedInPassForSignIn = '';
  errorMessage = '';

  userData: User = new User();

  constructor(public angularFireAuth: AngularFireAuth,
              public router: Router,
              public db: AngularFirestore) {
  }

  signInUser() {
    console.error('signIn F');
    const email = this.typedInEmailForSignIn;
    const password = this.typedInPassForSignIn;
    this.errorMessage = '';
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(loginResponsePayload => {
        console.error(loginResponsePayload.user.uid);
        this.db.collection('users').doc(loginResponsePayload.user.uid).get().subscribe(userData => {
          console.error('callback');
          this.userData.userName = userData.data().username;
          this.userData.id = loginResponsePayload.user.uid;
          this.router.navigate(['/userBoard']);
          console.error(this.userData.userName,  this.userData.id);
        });
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }

  signOut() {
    console.error('signOut');
    return this.angularFireAuth.auth.signOut().then(() => {
      this.router.navigate(['SignUser']);
    });
  }

}
