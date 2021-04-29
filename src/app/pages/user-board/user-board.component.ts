import {Component, Input, OnInit} from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {MessagingService} from '../../services/messaging.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';
import {Chat} from '../../models/chat.model';
import * as firebase from 'firebase';
import {firestore} from 'firebase';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.styl']
})

export class UserBoardComponent implements OnInit {
  otherUserId: string;
  chats: Chat[] = [];

  constructor(public userAuthService: UserAuthService,
              public angularFirestore: AngularFirestore,
              public messagingService: MessagingService,
              public router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (!this.userAuthService.user.id) {
      this.router.navigate(['/login']);
    }
    this.userAuthService.currentPage = 'userBoard';

    this.chats = [];
    this.messagingService.filteredUsers = [];
    this.userAuthService.chat = undefined;

    this.angularFirestore.collection('chats').get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        const chat: Chat = doc.data() as Chat;
        if (chat.users.includes(this.userAuthService.user.id)) {
          this.chats.push(chat);
        }
      });
      this.angularFirestore.collection('users').get().subscribe(querySnapshot2 => {
        this.messagingService.users = [];
        querySnapshot2.forEach(doc2 => {
          const doc = doc2.data();

          if (this.userAuthService.user.id !== doc2.id) {
            this.messagingService.users.push({userName: doc.username, id: doc2.id} as User);
            for (const chat of this.chats) {
              if (chat.users.includes(doc2.id)) {
                this.messagingService.filteredUsers.push({userName: doc.username, id: doc2.id} as User);
                break;
              }
            }

          }
        });
      });

    });

  }

  getChatMessages(otherUser: User) {
    this.otherUserId = otherUser.id;
    this.angularFirestore.collection('chats').get().subscribe(querySnapshot => {
      let found = false;
      querySnapshot.forEach(doc => {
        const users: string[] = doc.data().users;
        if (users.includes(this.otherUserId) && users.includes(this.userAuthService.user.id)) {
          this.userAuthService.chat = this.angularFirestore.collection('chats').doc(doc.id).valueChanges() as Observable<Chat>;

          this.userAuthService.chatId = doc.id;
          found = true;
        }
      });
      if (!found) {
        let foundExistingChat = false;
        querySnapshot.forEach(doc => {
          const users: string[] = doc.data().users;
          const deletedUsers: string[] = doc.data().deletedUsers;
          if (users.includes(this.otherUserId) &&  deletedUsers.includes(this.userAuthService.user.id) ) {
            this.angularFirestore.collection('chats').doc(doc.id).update({
              deletedUsers: firebase.firestore.FieldValue.arrayRemove(this.userAuthService.user.id)
            });
            this.angularFirestore.collection('chats').doc(doc.id).update({
              users: firestore.FieldValue.arrayUnion(this.userAuthService.user.id)
            });
            this.userAuthService.chat = this.angularFirestore.collection('chats').doc(doc.id).valueChanges() as Observable<Chat>;
            this.userAuthService.chatId = doc.id;
            foundExistingChat = true;
          }
        });
        if (!foundExistingChat) {
          this.angularFirestore
            .collection('chats')
            .add({messages: [], users: [this.userAuthService.user.id, this.otherUserId], deletedUsers: []})
            .then((doc2) => {
              this.userAuthService.chat = this.angularFirestore.collection('chats').doc(doc2.id).valueChanges() as Observable<Chat>;
              this.userAuthService.chatId = doc2.id;
            });
        }

      }
    });
  }

  startChat(user: User) {
    this.messagingService.otherUser = user;
    this.getChatMessages(user);
  }
}
