import {Component, Input, OnInit} from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {MessagingService} from '../../services/messaging.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {Chat} from '../../models/chat.model';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.styl']
})

export class UserBoardComponent implements OnInit {
  constructor(public userAuthService: UserAuthService,
              public db: AngularFirestore,
              public messagingService: MessagingService,
              public router: Router) { }

  async ngOnInit() {
    if (!this.userAuthService.userId) {
      this.router.navigate(['/login']);
    }
    this.db.collection('users').get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.messagingService.users.push({userName: doc.data().username, id: doc.id} as unknown as User);
      });
    });
    console.log(1231231323, this.messagingService.users);
    // for (const chatId of this.userAuthService.user.myChats) {
    //   const chatDocument = await this.db.collection('chats').doc(chatId).get().toPromise();
    //   const chat = chatDocument.data();
    //   console.error('EEEE', chat);
    // }
  }
}
