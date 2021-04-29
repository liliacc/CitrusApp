import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MessagingService} from '../../services/messaging.service';
import {UserAuthService} from '../../services/user-auth.service';
import {Observable} from 'rxjs';
import {Chat} from '../../models/chat.model';
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
              public angularFirestore: AngularFirestore,
              public messagingService: MessagingService,
              ) { }
  ngOnInit() {
    this.id = this.userAuthService.user.id;
  }
   sendMessage() {
    if (this.messsageText === '') { return; }
    // console.error(this.userAuthService.chatId, this.userAuthService.user);
    this.messagingService.updateChat(this.messsageText, this.userAuthService.user.userName);
    this.messsageText = '';
  }

}
