import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {UserComponent} from './user.component';
import {AsideTableComponent} from './aside-table/aside-table.component';
import {InfoAboutComponent} from './info-about/info-about.component';
import {InfoWelcomeComponent} from './info-welcome/info-welcome.component';
import {UserRoutingModule} from './user-routing.module';
import {UserService} from './user.service';
import {NgScrollbarModule} from 'ngx-scrollbar';

@NgModule({
  declarations: [UserComponent, AsideTableComponent, InfoAboutComponent, InfoWelcomeComponent],
  providers: [UserService],
  imports: [
    NgScrollbarModule,
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule {
}
