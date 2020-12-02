import { Injectable } from '@angular/core';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  users: User[] = [];
  filteredUsers: User[] = [];
  otherUser: User = null;

  constructor() { }


}
