import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginFormActive = true;
  createUserFormActive = false;
  constructor() { }

  toggleUSerForm() {
    this.loginFormActive = !this.loginFormActive;
    this.createUserFormActive = !this.createUserFormActive;
  }

  getFormToggleButtonName() {
    return this.loginFormActive ? 'Izveidot lietotāja kontu' : 'Ienākt';
  }
}
