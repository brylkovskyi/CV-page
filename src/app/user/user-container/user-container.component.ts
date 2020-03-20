import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DisplayWidth} from '../../shared/display.class';
import {User} from '../../shared/user-interface';
import {DataService} from '../../data.service';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent extends DisplayWidth implements OnInit {

  tab;
  active = this.dataService.activeField ;

  constructor(
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef,
    public authService: AuthService,
    private router: Router
  ) {
    super();
  }

  @Input() inputUserData: User;
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

    if (facebook.test(link)) {
      return className + 'facebook';
    }
    if (twitter.test(link)) {
      return className + 'twitter';
    }
    if (linkedin.test(link)) {
      return className + 'linkedin';
    }
    return 'fas fa-link';
  }

  ngOnInit(): void {
    this.tab = 'welcome';
  }

}

