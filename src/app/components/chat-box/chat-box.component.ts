import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MessagingService} from '../../services/messaging.service';
import {UserAuthService} from '../../services/user-auth.service';
import {Observable} from 'rxjs';
import {Chat} from '../../models/chat.model';
import {last} from 'rxjs/operators';
import {Message} from '../../models/message.model';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.styl']
})

export class ChatBoxComponent implements OnInit {

  chat: Observable<Chat>;
  chatId: string;
  id: any;
  messsageText = '';
  messages: Message[];
  constructor(public userAuthService: UserAuthService,
              public db: AngularFirestore,
              public messagingService: MessagingService,
              ) { }
  ngOnInit() {
    this.id = this.userAuthService.userData.id;
    console.error('onInit', this.userAuthService.userData);
    this.db.collection('chats').get().subscribe(querySnapshot => {
      let found = false;
      querySnapshot.forEach(doc => {
        const users: string[] = doc.data().users;
        if (users.includes(this.messagingService.otherUser.id) && users.includes(this.userAuthService.userData.id)) {
          console.error('in a cond');
          this.chat = this.db.collection('chats').doc(doc.id).valueChanges() as Observable<Chat>;
          this.chatId = doc.id;
          found = true;
        }
      });
      if (!found) {
        this.db
          .collection('chats')
          .add({messages: [], users: [this.userAuthService.userData.id, this.messagingService.otherUser.id]})
          .then((doc2) => {
            this.chat = this.db.collection('chats').doc(doc2.id).valueChanges() as Observable<Chat>;
            this.chat.subscribe(it => this.messages = it.messages);
            this.chatId = doc2.id;
          });

      }
    });

  }
   sendMessage() {
    this.messages.push({message: this.messsageText, uid:  this.messagingService.otherUser.id});
    this.db
      .collection('chats')
      .doc(this.chatId)
      .update({messages:  this.messages});
    // this.messsageText = '';

  }

}
