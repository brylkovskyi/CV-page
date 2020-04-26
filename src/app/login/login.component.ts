import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {LoadingService} from '../loading.service';
import {DataService} from '../data.service';
import {FormControl, FormGroup} from '@angular/forms';
import {switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, of} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loading = this.loadingService.loadingSetter;

    constructor(private authService: AuthService,
                private router: Router,
                private dataService: DataService,
                private loadingService: LoadingService) {
    }

    user: firebase.User | null;
    shareButtonToggler =  new BehaviorSubject(null);
    userName = new BehaviorSubject('Anonymous');
    userPhoto = new BehaviorSubject('https://avatarfiles.alphacoders.com/956/95609.jpg');

    credentials = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    submitCredentials() {
        this.authService.signIn(this.credentials)
            .then()
            .catch(e => {
                switch (e.code) {
                    case 'auth/user-not-found':
                        this.authService.registerUser(this.credentials).then((user) => {
                            console.log(user);
                        });
                        break;
                    case 'auth/wrong-password':
                        break;
                }
            });
    }

    ngOnInit() {

        this.loading(true);
        this.authService.authStatusChecker().pipe(
            tap(user => {
                this.user = user;
            }),
            switchMap((user) => user ? this.dataService.getUserData(user.uid) : of(null)))
            .subscribe(userData => {
                this.loading(false);
                if (userData) {
                    this.userPhoto.next(userData.photoURL);
                    this.userName.next(userData.name);
                    this.shareButtonToggler.next(true);
                }
            });
    }

    signInOAuth() {
        this.authService.signInGoogle();
    }

    signOut() {
        this.authService.signOut();
    }

    viewProfile() {
        this.router.navigate(['/view', {id: this.user.uid}]);
    }

    editProfile() {
        this.router.navigate(['/edit', {id: this.user.uid}]);
    }
}
