import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserBoardComponent} from './pages/user-board/user-board.component';
import {LoginComponent} from './pages/login/login.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {HelpComponent} from './pages/help/help.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'userBoard', component: UserBoardComponent },
  { path: 'help', component: HelpComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
