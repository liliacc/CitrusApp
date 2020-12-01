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
    console.error(this.message);
  }

}
