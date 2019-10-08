import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {AuthService} from '../auth.service';
import {debounceTime, switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DisplayWidth} from '../shared/display.class';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent extends DisplayWidth implements OnInit, OnDestroy {
  tab;
  unsubscribe = new Subject();
  layout;
  userData;
  active = this.dataService.activeField;
  loading = this.loadingService.loadingSetter;



  constructor(
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef,
    public authService: AuthService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    super();
  }

  @Input() userDataInput;
  @Input() activeField;

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

  ngOnInit() {
    this.loading(true);
    this.route.paramMap.pipe(
      switchMap((data: ParamMap) => this.dataService.getUserdata(data.get('id'))),
      takeUntil(this.unsubscribe)
    )
      .subscribe(data => {
        this.loading(false);
        if (data) {
          if (this.userDataInput) {
            this.userData = this.userDataInput;
            this.unsubscribe.next();
            this.unsubscribe.complete();
          } else {
            this.userData = data;
          }
        }
      });

    this.desctopView.pipe(
      takeUntil(this.unsubscribe),
      debounceTime(300)
    )
      .subscribe(data => {
        this.layout = data;
      });
    this.tab = 'welcome';
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
