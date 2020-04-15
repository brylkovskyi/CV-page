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
import {PhotoComponent} from './user-view/photo/photo.component';
import {UserViewComponent} from './user-view/user-view.component';
import {SocialTableComponent} from './user-view/social-table/social-table.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        UserComponent,
        AsideTableComponent,
        InfoAboutComponent,
        PhotoComponent,
        InfoWelcomeComponent,
        UserViewComponent,
        SocialTableComponent
    ],
    providers: [],
    imports: [
        NgScrollbarModule,
        CommonModule,
        SharedModule,
        UserRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    exports: [UserComponent, UserViewComponent]
})
export class UserModule {
}
