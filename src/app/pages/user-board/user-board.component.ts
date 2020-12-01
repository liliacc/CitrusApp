import {Component, Input, OnInit} from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {MessagingService} from '../../services/messaging.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';
import {Chat} from '../../models/chat.model';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.styl']
})

export class UserBoardComponent implements OnInit {
  otherUserId: string;

  constructor(public userAuthService: UserAuthService,
              public db: AngularFirestore,
              public messagingService: MessagingService,
              public router: Router) { }

  ngOnInit() {
    if (!this.userAuthService.user.id) {
      console.error('navigateBack');
      this.router.navigate(['/login']);
    }
    this.userAuthService.currentPage = 'userBoard';
    this.db.collection('users').get().subscribe(querySnapshot => {
      this.messagingService.users = [];
      querySnapshot.forEach(doc => {
        if (doc.id !== this.userAuthService.user.id) {

            this.messagingService.users.push({userName: doc.data().username, id: doc.id} as User);

        }
      });
    });
    console.error(1231231323, this.messagingService.users);
  }
  getChatMessages(otherUser: User) {
    this.otherUserId = otherUser.id;
    this.db.collection('chats').get().subscribe(querySnapshot => {
      let found = false;
      querySnapshot.forEach(doc => {
        const users: string[] = doc.data().users;
        if (users.includes(this.otherUserId) && users.includes(this.userAuthService.user.id)) {
          console.error('in a cond');
          this.userAuthService.chat = this.db.collection('chats').doc(doc.id).valueChanges() as Observable<Chat>;
         // this.userAuthService.chat.subscribe(it => this.messages = it.messages);
          this.userAuthService.chatId = doc.id;
          found = true;
        }
       // this.db.collection('chats').doc(doc.id).get().subscribe(it => this.messages = it.data().messages);
      });
      if (!found) {
        this.db
          .collection('chats')
          .add({messages: [], users: [this.userAuthService.user.id, this.otherUserId]})
          .then((doc2) => {
            this.userAuthService.chat = this.db.collection('chats').doc(doc2.id).valueChanges() as Observable<Chat>;
          //  this.db.collection('chats').doc(doc2.id).get().subscribe(it => this.messages = it.data().messages);
          //  this.userAuthService.chat.subscribe(it => this.messages = it.messages);
            this.userAuthService.chatId = doc2.id;
          });

      }
    });

  }
}
