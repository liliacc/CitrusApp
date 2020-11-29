import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MessagingService} from '../../services/messaging.service';
import {UserAuthService} from '../../services/user-auth.service';
import {Observable} from 'rxjs';
import {Chat} from '../../models/chat.model';
import {last} from 'rxjs/operators';
import {Message} from '../../models/message.model';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.styl']
})

export class ChatBoxComponent implements OnInit {
  user: User;
  chat: Observable<Chat>;
  chatId: string;
  messsageText = '';
  messages: Message[];
  constructor(public userAuthService: UserAuthService,
              public db: AngularFirestore,
              public messagingService: MessagingService,
              ) { }
  ngOnInit() {
    console.error('onInit', this.userAuthService.user);
    // On page init from collection chats
    this.db.collection('chats').get().subscribe(querySnapshot => {
      let found = false;
      console.error('123123', querySnapshot);
      querySnapshot.forEach(doc => {
        console.error('11111', doc);
        const users: string[] = doc.data().users;
        if (users.includes(this.messagingService.otherUser.id) && users.includes(this.userAuthService.userId)) {
          console.error('in a cond');
          this.chat = this.db.collection('chats').doc(doc.id).valueChanges() as Observable<Chat>;
          this.chatId = doc.id;
          found = true;
        }
        this.db.collection('chats').doc(doc.id).get().subscribe(it => {this.messages = it.data().messages);
        this.chat.subscribe(it => this.messages = it.messages);
      });
      if (!found) {
        this.db
          .collection('chats')
          .add({messages: [], users: [this.userAuthService.user.id, this.messagingService.otherUser.id]})
          .then((doc2) => {
            this.chat = this.db.collection('chats').doc(doc2.id).valueChanges() as Observable<Chat>;
            this.db.collection('chats').doc(doc2.id).get().subscribe(it => this.messages = it.data().messages);
            this.chat.subscribe(it => this.messages = it.messages);
            this.chatId = doc2.id;
          });

      }
    });

  }
  // creates chat document i nnot existing or updates document
   sendMessage() {
    console.error('msg', this.userAuthService.message);
    if (!this.userAuthService.message) {
      console.error('wrong', this.userAuthService.message);
      return;
    }
    this.userAuthService.message.push({message: this.messsageText, uid:  this.messagingService.otherUser.id});
    this.db
      .collection('chats')
      .doc(this.chatId)
      .update({messages:  this.userAuthService.message});
    this.db
      .collection('users')
      .doc(this.userAuthService.user.id)
      .update( {myChats: this.userAuthService.user.myChats});
    this.messsageText = '';

  }

}
