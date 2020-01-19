import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = this.loadingService.loadingSetter;

  constructor(private authService: AuthService,
              private router: Router,
              private loadingService: LoadingService) {}

  user: firebase.User | null;

  ngOnInit() {
    this.loading(true);
    this.authService.authStatusChecker().subscribe(user => {
        this.user = user;
        this.loading(false);
      }
    );
  }

  signIn() {
    this.authService.signIn();
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
