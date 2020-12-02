import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.styl']
})
export class SettingsComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    public angularFireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.userAuthService.currentPage = 'settings';

  }
}

