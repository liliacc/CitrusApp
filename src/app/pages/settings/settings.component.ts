import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.styl']
})
export class SettingsComponent implements OnInit {

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit() {
    this.userAuthService.currentPage = 'settings';

  }

}
