import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {AsideTableComponent} from './desctop-view/aside-table/aside-table.component';
import {InfoAboutComponent} from './desctop-view/info-about/info-about.component';
import {InfoWelcomeComponent} from './desctop-view/info-welcome/info-welcome.component';
import {UserRoutingModule} from './user-routing.module';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {PhotoComponent} from './desctop-view/photo/photo.component';
import {DesctopViewComponent} from './desctop-view/desctop-view.component';
import {SocialTableComponent} from './desctop-view/social-table/social-table.component';
import {SharedModule} from '../shared/shared.module';
import { MobileViewComponent } from './mobile-view/mobile-view.component';

@NgModule({
    declarations: [
        UserComponent,
        AsideTableComponent,
        InfoAboutComponent,
        PhotoComponent,
        InfoWelcomeComponent,
        DesctopViewComponent,
        SocialTableComponent,
        MobileViewComponent
    ],
    providers: [],
    imports: [
        NgScrollbarModule,
        CommonModule,
        SharedModule,
        UserRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    exports: [UserComponent, DesctopViewComponent, MobileViewComponent]
})
export class UserModule {
}
