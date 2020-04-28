import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {LoadingService} from '../loading.service';
import {DataService} from '../data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, switchMap, takeUntil, tap} from 'rxjs/operators';
import {BehaviorSubject, of, Subject} from 'rxjs';
import {ModalWindowService} from '../modal-window/modal-window.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    loading = this.loadingService.loadingSetter;

    constructor(private authService: AuthService,
                private router: Router,
                private dataService: DataService,
                private loadingService: LoadingService,
                private modalService: ModalWindowService) {
    }

    user: firebase.User | null;
    formUnsubscribe = new Subject();
    shareButtonToggler = new BehaviorSubject(false);
    userName = new BehaviorSubject('Anonymous');
    userPhoto = new BehaviorSubject('https://avatarfiles.alphacoders.com/956/95609.jpg');
    unsubscribe = new Subject();
    error = {
        email: [],
        password: []
    };

    loginForm = new FormGroup({
        email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/i)])),
        password: new FormControl('', [Validators.required, Validators.pattern(/^\S{6,}$/i)])
    });

    ngOnInit() {
        this.loginForm.valueChanges.pipe(
            debounceTime(700),
            switchMap(() => of({
                email: Object.keys(this.loginForm.get('email').errors || {}),
                password: Object.keys(this.loginForm.get('password').errors || {})
            })),
            takeUntil(this.formUnsubscribe))
            .subscribe(data => this.error = data);
        this.loading(true);
        this.authService.authStatusChecker().pipe(
            tap(user => {
                this.user = user;
                if (user) {
                    this.formUnsubscribe.next(true);
                }
            }),
            switchMap((user) => user ? this.dataService.getUserData(user.uid) : of(null)),
            takeUntil(this.unsubscribe)
        ).subscribe(userData => {
            this.assignUserInfo(userData);
            this.loading(false);
        });
    }

    assignUserInfo(userData): void {
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

    submitCredentials(): void {
        this.loading(true);
        this.authService.signIn(this.loginForm)
            .then().catch((e) => {
            switch (e.code) {
                case 'auth/user-not-found':
                    const password = this.loginForm.value.password.replace(/.(?=.{3,}$)/g, '*');
                    const email = this.loginForm.value.email;
                    const modalMessage = {
                        heading: 'Would you like to create a new user with this credentials?',
                        message: `Email: ${email} , Password: ${password}`, btnFirst: 'Yes >', btnSecond: 'Cancel >'
                    };
                    this.modalService.openModal(modalMessage).pipe(takeUntil(this.unsubscribe))
                        .subscribe(result => {
                            if (result === 'first') {
                                this.authService.registerUser(this.loginForm)
                                    .then()
                                    .catch((error => {
                                        console.log(error);
                                        this.error.email = ['unspecified'];
                                        this.loading(false);
                                    }));
                            } else {
                                this.loading(false);
                            }
                        });
                    break;
                case 'auth/wrong-password':
                    this.error.password = ['wrong'];
                    this.loading(false);
                    break;
                default:
                    this.error.email = ['unspecified'];
                    console.log(e);
                    this.loading(false);
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

    ngOnDestroy() {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();
    }
}
