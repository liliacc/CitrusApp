import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {firestore} from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserAuthService} from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  users: User[] = [];
  filteredUsers: User[] = [];
  otherUser: User = null;
  constructor( private angularFirestore: AngularFirestore,
               private userAuthService: UserAuthService
  ) { }

  updateChat(message, user) {
    this.angularFirestore.collection('chats').doc(this.userAuthService.chatId).update({
      messages: firestore.FieldValue.arrayUnion({ message, user})
    });

}

}
