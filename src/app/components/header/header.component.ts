import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  constructor( public userAuthService: UserAuthService, private router: Router ) { }

  ngOnInit() {
    // console.error(this.router.getCurrentNavigation());
  }
  // checkIfActiveLink() {
  // this.userAuthService.currentPage;
  //   switch() {
  //
  //   }
  // }
}
