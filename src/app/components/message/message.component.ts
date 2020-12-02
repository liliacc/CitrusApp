import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.styl']
})
export class MessageComponent implements OnInit {
  @Input() message: any;
  constructor(
    public userAuthService: UserAuthService
  ) { }

  ngOnInit() {
  }

  chekIfIsIncoming() {
      if (this.message.user === this.userAuthService.user.userName) {
        return false;
      } else {
        return true;
      }
  }
  getSenderName() {
    return this.message.user;
  }


}
