import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  items: Observable<any[]>;
  title = 'CitrusApp';
  constructor(db: AngularFirestore) {
    this.items = db.collection('users').valueChanges();
  }
}
