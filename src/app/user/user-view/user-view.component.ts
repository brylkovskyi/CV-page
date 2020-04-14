import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DisplayWidth} from '../../shared/display.class';
import {User, UserDataField} from '../../shared/user-interface';
import {DataService} from '../../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent extends DisplayWidth implements OnInit {

  tab;
  active = this.dataService.activeField;

  constructor(
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {
    super();
  }

  @Input() inputUserData: User;
  @Input() activeField;

  loadWatcher(tab) {
    this.tab = tab;
  }

  filterField(data, fieldName): UserDataField {
    return data.find(item => item.groupName === fieldName);
 }

  navigateHome() {
    this.router.navigate(['login']);
  }

  scrollTo(name) {
    this.tab = 'about';
    this.changeDetector.detectChanges();
    document.getElementById(name).scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  ngOnInit(): void {
    this.tab = 'welcome';
  }

}

