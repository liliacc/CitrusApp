import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { SigninUserComponent } from './components/signin-user/signin-user.component';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule} from '@angular/forms';
import { UserBoardComponent } from './pages/user-board/user-board.component';
import { UserToolBarComponent } from './components/user-tool-bar/user-tool-bar.component';
import {SearchComponent} from './components/search/search.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import {HeaderComponent} from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HelpComponent } from './pages/help/help.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MessageComponent } from './components/message/message.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    SigninUserComponent,
    UserBoardComponent,
    UserToolBarComponent,
    SearchComponent,
    ChatBoxComponent,
    HeaderComponent,
    FooterComponent,
    HelpComponent,
    SettingsComponent,
    MessageComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'CitrusApp'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
