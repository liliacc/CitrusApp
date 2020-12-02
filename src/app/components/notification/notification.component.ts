import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.styl']
})
export class NotificationComponent implements OnInit {

  constructor(public userAuthService: UserAuthService) { }

  ngOnInit() {
  }

}
