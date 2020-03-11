import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  provider = new GoogleAuthProvider();
  authStatus = new Subject <firebase.User | null>();

  constructor(private auth: AngularFireAuth, private zone: NgZone) {
  }

  authStatusChecker() {
    this.auth.auth.onAuthStateChanged(
      user => {
        this.zone.run(() => this.authStatus.next(user));
      },
      err => {
        this.zone.run(() => {
          console.log(err);
          this.authStatus.next(null);
        });
      });
    return this.authStatus;
  }

  signIn() {
    this.auth.auth.signInWithPopup(this.provider);
  }

  signOut() {
    this.auth.auth.signOut();
  }
}

