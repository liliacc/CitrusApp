import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {User} from './models/user.model';
import {UserAuthService} from './services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  items: Observable<User[]>;
  title = 'CitrusApp';
  constructor(public db: AngularFirestore, public userAuthService: UserAuthService) {
    this.items = db.collection('users').valueChanges() as Observable<User[]>;
  }
}
