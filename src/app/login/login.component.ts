import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {LoadingService} from '../loading.service';
import {DataService} from '../data.service';
import {FormControl, FormGroup} from '@angular/forms';
import {catchError, filter, switchMap, takeUntil, tap} from 'rxjs/operators';
import {BehaviorSubject, from, of, Subject} from 'rxjs';
import UserCredential = firebase.auth.UserCredential;
import {ModalWindowService} from '../modal-window/modal-window.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    loading = this.loadingService.loadingSetter;
    modalMessage = {
        heading: 'Would you like to create a new user with this credentials?',
        message: '',
        btnFirst: 'Yes >',
        btnSecond: 'Cancel >'
    };

    constructor(private authService: AuthService,
                private router: Router,
                private dataService: DataService,
                private loadingService: LoadingService,
                private modalService: ModalWindowService) {
    }

    user: firebase.User | null;
    shareButtonToggler = new BehaviorSubject(false);
    userName = new BehaviorSubject('Anonymous');
    userPhoto = new BehaviorSubject('https://avatarfiles.alphacoders.com/956/95609.jpg');
    unsubscribe = new Subject();

    credentials = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    assignUserInfo(userData) {
        if (userData) {
            this.userPhoto.next(userData.photoURL);
            this.userName.next(userData.name);
            this.shareButtonToggler.next(true);
        } else {
            this.userPhoto.next('https://avatarfiles.alphacoders.com/956/95609.jpg');
            this.userName.next('Anonymous');
            this.shareButtonToggler.next(null);
        }
    }

    submitCredentials() {
        this.loading(true);
        from(this.authService.signIn(this.credentials)).pipe(
            catchError(e => {
                switch (e.code) {
                    case 'auth/user-not-found':
                        const password = this.credentials.value.password;
                        const email = this.credentials.value.email;
                        this.modalMessage.message = `Email: ${email} , Password: ${password.replace(/.(?=.{3,}$)/g, '*')}`;
                        return this.modalService.openModal(this.modalMessage).pipe(
                            switchMap(result => {
                                if (result === 'first') {
                                    return this.authService.registerUser(this.credentials);
                                } else {
                                    this.loading(false);
                                    return of(null);
                                }
                            })
                        );
                    case 'auth/wrong-password':
                        console.log(e);
                        this.loading(false);
                        break;
                    default:
                        this.loading(false);
                        console.log(e);
                }
            }),
            filter(Boolean),
            takeUntil(this.unsubscribe)
        ).subscribe(
            (userCredentials: UserCredential) => {
                this.user = userCredentials.user;
            }
        );
    }

    ngOnInit() {
        this.loading(true);
        this.authService.authStatusChecker().pipe(
            tap(user => {
                this.user = user;
            }),
            switchMap((user) => user ? this.dataService.getUserData(user.uid) : of(null)),
            takeUntil(this.unsubscribe)
        ).subscribe(userData => {
            this.assignUserInfo(userData);
            this.loading(false);
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

    ngOnDestroy() {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();
    }
}
