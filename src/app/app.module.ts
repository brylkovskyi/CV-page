import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {UnknownPageComponent} from './unknown-page/unknown-page.component';
import {SpinnerComponent} from './spinner/spinner.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import {SharedModule} from './shared/shared.module';
import { NavigationButtonsComponent } from './navigation-buttons/navigation-buttons.component';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

@NgModule({
  declarations: [
    AppComponent,
    UnknownPageComponent,
    SpinnerComponent,
    ModalWindowComponent,
    NavigationButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireFunctionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
