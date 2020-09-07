import {Component, Input, OnInit} from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {MessagingService} from '../../services/messaging.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.styl']
})

export class UserBoardComponent implements OnInit {
  constructor(private userAuthService: UserAuthService,
              public db: AngularFirestore,
              public messagingService: MessagingService) { }

  ngOnInit() {
    this.db.collection('users').get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.messagingService.users.push({userName: doc.data().username, id: doc.id} as User);
      });
    });
    console.log(1231231323, this.messagingService.users);
  }
}