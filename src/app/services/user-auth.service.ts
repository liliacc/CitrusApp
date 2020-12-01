import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Chat} from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})

export class UserAuthService {
  typedInEmailForSignIn = '';
  typedInPassForSignIn = '';
  errorMessage = '';
  loginFormActive = true;
  createUserFormActive = false;
  chat: Observable<Chat>;
  chatId: string;
  user: User = new User();
  currentPage = '';

  constructor(public angularFireAuth: AngularFireAuth,
              public router: Router,
              public db: AngularFirestore) {
  }

  signInUser() {
    const email = this.typedInEmailForSignIn;
    const password = this.typedInPassForSignIn;
    this.errorMessage = '';
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(loginResponsePayload => {
        this.db.collection('users').doc(loginResponsePayload.user.uid).get().subscribe(user => {
          this.user.userName = user.data().username;
          this.user.id = loginResponsePayload.user.uid;
          this.router.navigate(['/userBoard']);
        });
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }

  signOut() {
    return this.angularFireAuth.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }

}
