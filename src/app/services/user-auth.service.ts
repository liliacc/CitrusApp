import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Chat} from '../models/chat.model';
import * as firebase from 'firebase';
import {firestore} from 'firebase';
import FieldValue = firebase.firestore.FieldValue;
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})

export class UserAuthService {
  typedInEmailForRecovery = '';
  typedInEmailForSignIn = '';
  typedInPassForSignIn = '';
  errorMessage = '';
  loginFormActive = true;
  createUserFormActive = false;
  chat: Observable<Chat>;
  chatId: string;
  user: User = new User();
  currentPage = '';
  deleteData = false;
  recoverPass = false;
  // signInForm: any;


  constructor(public angularFireAuth: AngularFireAuth,
              public router: Router,
              public angularFirestore: AngularFirestore,
              public loginService: LoginService
  ) {
  }

  async createNewUSerAccount(email, password): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async createNewUser(createUSerForm) {
    console.error(createUSerForm);
    this.user.userName = createUSerForm.form.value.userName;
    this.user.email = createUSerForm.form.value.email;
    this.user.password = createUSerForm.form.value.password;
    this.user.name = createUSerForm.form.value.firstName;
    this.user.lastName = createUSerForm.form.value.lastName;

    const newUserData = {
      displayName: this.user.userName,
      email: this.user.email,
      password: this.user.password,
    };
    const email = newUserData.email;
    const password = newUserData.password;

    this.errorMessage = '';
    const response = await this.createNewUSerAccount(email, password)
      .then(async data => {
        await data.user.sendEmailVerification();
        await new Promise<any>((resolve, reject) => {
          this.angularFirestore
            .collection('users')
            .doc(data.user.uid)
            .set({
              username: this.user.userName,
              name: this.user.name,
              lastName: this.user.lastName,
            })
            .then(() => {
              this.user.id = data.user.uid;
              // this.router.navigate(['/userBoard']);
              window.alert('Lūdzu verificējiet epasta adresi, uzspiežot uz epastā saņemto linku');
              this.loginService.loginFormActive = true;
              this.loginService.createUserFormActive = false;
              createUSerForm.form.reset();
            }).then(() => {
          });
        });
      })
      .catch(error => {
        this.errorMessage = error.message;
      });

    console.error(2, response);

  }

  signInUser(loginUser) {
    const email = this.typedInEmailForSignIn;
    const password = this.typedInPassForSignIn;
    this.errorMessage = '';
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(loginResponsePayload => {
        if (!loginResponsePayload.user.emailVerified) {
          window.alert('Epasta verifikācija nav veikta, lūdzu verificēt epastu!');
          return;
        }
        this.angularFirestore.collection('users').doc(loginResponsePayload.user.uid).get().subscribe(user => {
          this.user.userName = user.data().username;
          this.user.id = loginResponsePayload.user.uid;
          this.router.navigate(['/userBoard']);
        });
      }).then(() => {
        loginUser.form.reset();
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

  getAnswer(answer) {
    if (answer === 'cancel') {
      this.deleteData = false;
    }
    if (answer === 'delete') {
      this.angularFireAuth.auth.currentUser.delete().then(() => {
        this.signOut();
      });
      this.deleteData = false;
    }
  }

  chekIfUSerWantstoDeleteAccount() {
    this.deleteData = true;
  }

  deleteChatMessage(message) {
    this.angularFirestore.collection('chats').doc(this.chatId).get().subscribe(chatDocumentSnap => {
      const chat: Chat = chatDocumentSnap.data() as Chat;
      for (const item of chat.messages) {
        if (item.message === message && item.user === this.user.userName) {
          item.message = 'Ziņa tika dzēsta';
          item.timestamp = new Date();
          break;
        }
      }
      this.angularFirestore.collection('chats').doc(this.chatId).update({
        messages: chat.messages
      }).then(r => {
      });
    });
  }
  removeChat() {
    if (this.chatId  === null || this.chatId === '') {
      return;
    }
    this.chat = undefined;

    window.setTimeout(() => {
      this.angularFirestore.collection('chats').doc(this.chatId).update({
        users: firebase.firestore.FieldValue.arrayRemove(this.user.id)
      })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
      this.angularFirestore.collection('chats').doc(this.chatId).update({
        deletedUsers: [this.user.id]
      })
        .catch((error) => {
          console.error('Error adding data field: ', error);
        });
    }, 200);

  }

  showLoginForm() {
    this.loginService.loginFormActive = true ;
    this.recoverPass = false;
  }
  resetPassword(emailAddress) {
    this.recoverPass = true;
    if (this.typedInEmailForRecovery === '' || null) {
      return;
    }
    this.angularFireAuth.auth.sendPasswordResetEmail(emailAddress).then(() => {
      this.recoverPass = false;
      this.showLoginForm();
    }).catch((error) => {
      window.alert('Ievadītais ēpasts neeksistē! Mēģiniet vēlreiz!');
    });
  }
  // signInWithGoogle() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithPopup(provider)
  //     .then((result) => {
  //       /** @type {firebase.auth.OAuthCredential} */
  //       const credential = result.credential;
  //
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // ...
  //     }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     const credential = error.credential;
  //     // ...
  //   });
  //
  // }
}
