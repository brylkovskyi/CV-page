import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  provider = new GoogleAuthProvider();
  authStatus = new BehaviorSubject(null);
  uid: string;

  authStatusChecker() {
    this.auth.auth.onAuthStateChanged(user => {
      if (user) {
        this.authStatus.next(user.uid);
      } else {
        this.signIn();
      }
    });
  }

  signIn() {
    this.auth.auth.signInWithPopup(this.provider).then(authData => {
      this.authStatus.next(authData.user.uid);
      this.uid = authData.user.uid;

    }).catch(error => {
      console.log(error);
      this.authStatus.next(null);
    });
  }

  signOut() {
    return this.auth.auth.signOut();
  }

  constructor(private auth: AngularFireAuth) {
  }

}

