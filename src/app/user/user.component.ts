import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {AuthService} from '../auth.service';
import {catchError, filter, switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DisplayWidth} from '../shared/display.class';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {LoadingService} from '../loading.service';
import { User } from '../shared/user-interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent extends DisplayWidth implements OnInit, OnDestroy {
  tab;
  unsubscribe = new Subject();
  userData: User;
  active = this.dataService.activeField;
  loading = this.loadingService.loadingSetter;

  constructor(
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef,
    public authService: AuthService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private router: Router
  ) {
    super();
  }

  @Input() inputUserData;
  @Input() activeField;

  loadWatcher(tab) {
    this.tab = tab;
  }

  navigateHome() {
    this.router.navigate(['login']);
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
    let reserved = null;

    if (facebook.test(link) && !reserved) {
      reserved = true;
      return className + 'facebook';
    }
    if (twitter.test(link) && !reserved) {
      reserved = true;
      return className + 'twitter';
    }
    if (linkedin.test(link) && !reserved) {
      reserved = true;
      return className + 'linkedin';
    }
    if (!reserved) {
      return 'fas fa-link';
    }
  }

  ngOnInit(): void {
    this.loading(true);
    this.route.paramMap.pipe(
      switchMap((routeData: ParamMap) => this.dataService.getUserData(routeData.get('id'))),
      takeUntil(this.unsubscribe)
    )
      .subscribe((serverUserData: User) => {
        this.loading(false);

        if (this.inputUserData) {
          this.userData = this.inputUserData;
          this.unsubscribe.next();
          this.unsubscribe.complete();
        } else {
          this.userData = serverUserData;
        }

      });

    this.tab = 'welcome';
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
