import { Component, OnInit } from '@angular/core';

import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.styl']
})
export class CreateUserComponent implements OnInit {
  error = false;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  createNewUser() {
    const data = {
      name: 'ņame 1',
      lastName: 'ast name 1',
      email: 'safa@dfadf.lv'
    };
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('users')
        .add(data);
    });
  }
}
