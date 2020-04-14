import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {AsideTableComponent} from './user-view/aside-table/aside-table.component';
import {InfoAboutComponent} from './user-view/info-about/info-about.component';
import {InfoWelcomeComponent} from './user-view/info-welcome/info-welcome.component';
import {UserRoutingModule} from './user-routing.module';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {SafePipe} from './safe.pipe';
import {PhotoComponent} from './user-view/photo/photo.component';
import {UserViewComponent} from './user-view/user-view.component';
import {SocialTableComponent} from './user-view/social-table/social-table.component';

@NgModule({
    declarations: [
        UserComponent,
        AsideTableComponent,
        InfoAboutComponent,
        PhotoComponent,
        InfoWelcomeComponent,
        SafePipe,
        UserViewComponent,
        SocialTableComponent
    ],
    providers: [],
    imports: [
        NgScrollbarModule,
        CommonModule,
        UserRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    exports: [UserComponent, UserViewComponent]
})
export class UserModule {
}
