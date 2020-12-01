import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MessagingService} from '../../services/messaging.service';
import {UserAuthService} from '../../services/user-auth.service';
import {Observable} from 'rxjs';
import {Chat} from '../../models/chat.model';
import {last} from 'rxjs/operators';
import {Message} from '../../models/message.model';
import {firestore} from 'firebase';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.styl']
})

export class ChatBoxComponent implements OnInit {

  @Input() chat: Observable<Chat>;
  id: any;
  messsageText = '';
  constructor(public userAuthService: UserAuthService,
              public db: AngularFirestore,
              public messagingService: MessagingService,
              ) { }
  ngOnInit() {
    this.id = this.userAuthService.user.id;
  }
   sendMessage() {
    if (this.messsageText === '') { return; }
    this.db.collection('chats').doc(this.userAuthService.chatId).update({
         messages: firestore.FieldValue.arrayUnion({ message: this.messsageText, user: this.userAuthService.user.userName})
     });
    this.messsageText = '';
  }

}
