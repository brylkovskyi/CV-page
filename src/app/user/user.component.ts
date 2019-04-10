import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from './data.service';
import {AuthService} from '../auth.service';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DisplayWidth} from '../shared/display.class';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends DisplayWidth implements OnInit, OnDestroy {
  userData;
  tab;
  authStatus;
  unsubscribe = new Subject();
  layout;

  constructor(
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService) {
    super();
  }

  loadWatcher(tab) {
    this.tab = tab;
  }

  scrollTo(name) {
    this.tab = 'about';
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
    this.desctopView.pipe(takeUntil(this.unsubscribe), debounceTime(300))
      .subscribe(data => {
        this.layout = data;
      });
    this.authService.authStatusChecker();
    this.authService.authStatus.pipe(takeUntil(this.unsubscribe)).subscribe(user => {
        this.authStatus = user;
        if (!user) {
          this.userData = null;
        }
        if (user) {
          this.authService.loading = 'Loading User Data';
          this.dataService.getUsersList().pipe(takeUntil(this.unsubscribe)).subscribe(list => {
            Object.keys(list.payload.data()).forEach(key => {
              if (key === user.uid) {
                this.dataService.getUserdata(list.payload.data()[key]).pipe(takeUntil(this.unsubscribe)).subscribe(
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

    // no auth test version start

    this.dataService.getUsersList().pipe(takeUntil(this.unsubscribe)).subscribe(list => {
      Object.keys(list.payload.data()).forEach(key => {
        const uid = 'EGD5JCB5KkZEQbkJk465c04rLUq2';
        if (key === uid) {
          this.dataService.getUserdata(list.payload.data()[key]).pipe(takeUntil(this.unsubscribe)).subscribe(
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

    // no auth test version end

    this.tab = 'welcome';
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
