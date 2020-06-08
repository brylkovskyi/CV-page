import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Subject} from 'rxjs';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    provider = new firebase.auth.GoogleAuthProvider();
    authStatus = new Subject<firebase.User | null>();

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

    registerUser(credentials): Promise<UserCredential> {
        return this.auth.auth.createUserWithEmailAndPassword(credentials.value.email, credentials.value.password);
    }

    signIn(credentials): Promise<UserCredential> {
        return this.auth.auth.signInWithEmailAndPassword(credentials.value.email, credentials.value.password);
    }

    signInGoogle() {
        this.auth.auth.signInWithPopup(this.provider);
    }

    signOut() {
        this.auth.auth.signOut();
    }
}
