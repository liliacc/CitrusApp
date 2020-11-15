import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {User} from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  items: Observable<User[]>;
  title = 'CitrusApp';
  constructor(db: AngularFirestore) {
    this.items = db.collection('users').valueChanges() as Observable<User[]>;
  }
}
