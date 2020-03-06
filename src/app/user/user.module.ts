import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {AsideTableComponent} from './aside-table/aside-table.component';
import {InfoAboutComponent} from './info-about/info-about.component';
import {InfoWelcomeComponent} from './info-welcome/info-welcome.component';
import {UserRoutingModule} from './user-routing.module';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {SafePipe} from './safe.pipe';
import {PhotoComponent} from './photo/photo.component';

@NgModule({
  declarations: [
    UserComponent,
    AsideTableComponent,
    InfoAboutComponent,
    PhotoComponent,
    InfoWelcomeComponent,
    SafePipe
  ],
  providers: [],
  imports: [
    NgScrollbarModule,
    CommonModule,
    UserRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  exports: [UserComponent]
})
export class UserModule {
}
