import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserBoardComponent} from './components/user-board/user-board.component';
import {UserSignComponent} from './pages/user-sign/user-sign.component';


const routes: Routes = [
  { path: 'SignUser', component: UserSignComponent },
  {path: '', redirectTo: '/SignUser', pathMatch: 'full'},
  { path: 'userBoard', component: UserBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
