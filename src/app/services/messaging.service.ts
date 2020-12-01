import { Injectable } from '@angular/core';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  users: User[] = [];
  otherUser: User = null;

  constructor() { }

  startChat(user: User) {
    this.otherUser = user;
  }
}
