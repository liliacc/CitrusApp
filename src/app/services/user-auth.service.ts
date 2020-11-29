import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Chat} from '../models/chat.model';
import {Message} from '../models/message.model';

@Injectable({
  providedIn: 'root'
})

export class UserAuthService {

  chat: Observable<Chat>;
  user: User = new User();
  message: Message[];
  email: string;
  password: any;
  typedInEmailForSignIn = '';
  typedInPassForSignIn = '';
  errorMessage = '';
  loginFormActive = true;
  createUserFormActive = false;

  userId: string;
  constructor(public angularFireAuth: AngularFireAuth,
              public router: Router,
              public db: AngularFirestore) {
  }
// log in existing user
  signInUser() {
    this.user = new User();
    console.error('signIn F');
    const email = this.typedInEmailForSignIn;
    const password = this.typedInPassForSignIn;
    this.errorMessage = '';
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(loginResponsePayload => {
        console.error(loginResponsePayload.user.uid);
        this.db.collection('users').doc(loginResponsePayload.user.uid).get().subscribe(userData => {
          console.error('callback');
          this.user.userName = userData.data().username;
          this.userId = loginResponsePayload.user.uid;
          this.router.navigate(['/userBoard']);
          console.error(this.user.userName,  this.userId);
        });
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }

  signOut() {
    console.error('signOut');
    return this.angularFireAuth.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }

}
