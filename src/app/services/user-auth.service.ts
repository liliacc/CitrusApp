import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Chat} from '../models/chat.model';
import * as firebase from 'firebase';
import {firestore} from 'firebase';

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
  deleteAccount = false;

  constructor(public angularFireAuth: AngularFireAuth,
              public router: Router,
              public angularFirestore: AngularFirestore) {
  }
  async createNewUSerAccount(email, password): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async createNewUser() {
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
              this.router.navigate(['/userBoard']);
            });
        });
      })
      .catch(error => {
        this.errorMessage = error.message;
      });

    console.error(2, response);

  }
  signInUser() {
    const email = this.typedInEmailForSignIn;
    const password = this.typedInPassForSignIn;
    this.errorMessage = '';
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(loginResponsePayload => {
        this.angularFirestore.collection('users').doc(loginResponsePayload.user.uid).get().subscribe(user => {
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

  getAnswer(answer) {
    if ( answer === 'cancel' ) {
      this.deleteAccount = false;
    }
    if ( answer === 'delete' ) {
      this.angularFireAuth.auth.currentUser.delete().then(() => {
        this.signOut();
      });
      this.deleteAccount = false;
    }
  }
  chekIfUSerWantstoDeleteAccount() {
    this.deleteAccount = true;
  }
  deleteChatMessage(message, user) {
    this.angularFirestore.collection('chats').doc(this.chatId).get().subscribe(chatDocumentSnap => {
      const chat: Chat = chatDocumentSnap.data() as Chat;
      console.error(chat);
      for (let item of chat.messages) {
        console.error(12, item.message, message, item.user, user);
        if (item.message === message && item.user === user) {
          console.error(1213, item.message, message, item.user, user);
          item.message = 'Ziņa tika dzēsta';
          item.timestamp = new Date();
        }
      }
      console.error(chat.messages);

      this.angularFirestore.collection('chats').doc(this.chatId).update({
        messages: chat.messages
      }).then(r => {});

    });

  }
  }
