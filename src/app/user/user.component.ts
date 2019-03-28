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
  authStatus = false;

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
    this.authService.authStatusChecker();
    this.authService.authStatus.subscribe(userId => {
        if (userId) {
          this.authStatus = true;
          this.dataService.getUsersList().subscribe(list => {
            Object.keys(list.payload.data()).forEach(key => {
              if (key === userId) {
                this.dataService.getUserdata(list.payload.data()[key]).subscribe(
                  data => this.userData = data.payload.data()
                );
              }
            });
          });
        }
      }
    );
    this.firstLoad = true;
  }

}
