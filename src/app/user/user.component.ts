import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData;
  firstLoad;

  constructor(private parser: UserService) {
  }

  loadWatcher() {
    this.firstLoad = false;
  }

  scrollTo(name) {
    this.firstLoad = false;
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
    this.firstLoad = true;
    this.userData = this.parser.getEntity();
  }

}
