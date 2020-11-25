import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserBoardComponent} from './components/user-board/user-board.component';
import {LoginComponent} from './pages/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'userBoard', component: UserBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
