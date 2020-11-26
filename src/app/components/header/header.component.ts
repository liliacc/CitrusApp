import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  constructor( public userAuthService: UserAuthService ) { }

  ngOnInit() {
  }

}
