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
  loading;

  constructor(private auth: AngularFireAuth) {
  }

  authStatusChecker() {
    this.loading = 'Checking Authorization';
    this.authStatus.next(null);
    this.auth.auth.onAuthStateChanged(user => {
      user ? this.loading = false : this.loading = 'You are not signed in';
      console.log(this.loading);
      this.authStatus.next(user);
    }, err => {
      this.loading = 'Error on Authorization Stage';
      console.log(err);
      this.authStatus.next(false);
    });
  }

  signIn() {
    this.auth.auth.signInWithRedirect(this.provider);
  }

  signOut() {
    this.auth.auth.signOut().then(() => this.authStatus.next(false)
    );
  }



}

