import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.styl']
})
export class HelpComponent implements OnInit {

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit() {
    this.userAuthService.currentPage = 'help';
  }

}
