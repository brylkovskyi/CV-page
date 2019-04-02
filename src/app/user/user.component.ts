import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData;
  firstLoad;
  authStatus;

  constructor(
    private dataService: UserService,
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService) {
  }

  loadWatcher() {
    this.firstLoad = false;
  }

  scrollTo(name) {
    this.firstLoad = false;
    this.changeDetector.detectChanges();
    document.getElementById(name).scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  socialRecognizer(link) {
    link.toLowerCase();
    const className = 'fab fa-';
    const facebook = /facebook.com/;
    const twitter = /twitter.com/;
    const linkedin = /linkedin.com/;
    if (facebook.test(link)) {
      return className + 'facebook';
    }
    if (twitter.test(link)) {
      return className + 'twitter';
    }
    if (linkedin.test(link)) {
      return className + 'linkedin';
    }
  }


  ngOnInit() {
    // this.authService.loading = 'Checking Authorization';
    this.authService.authStatusChecker();
    this.authService.authStatus.subscribe(user => {
        this.changeDetector.detectChanges();
        this.authStatus = user;
        if (!user) {
          this.userData = null;
        }
        if (user) {
          this.authService.loading = 'Loading User Data';

          this.dataService.getUsersList().subscribe(list => {
            Object.keys(list.payload.data()).forEach(key => {
              if (key === user.uid) {
                this.dataService.getUserdata(list.payload.data()[key]).subscribe(
                  data => {
                    this.authService.loading = false;
                    this.userData = data.payload.data();
                  },
                  err => console.log('no rights', err)
                );
              } else {
                this.authService.loading = 'No User Data';
              }
            });
          }, err => console.log('no rights', err));
        }

      }
    );
    this.firstLoad = true;
  }
}
