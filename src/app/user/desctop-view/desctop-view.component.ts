import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DisplayWidth} from '../../shared/display.class';
import {User, UserDataField} from '../../shared/user-interface';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-desctop-view',
  templateUrl: './desctop-view.component.html',
  styleUrls: ['./desctop-view.component.scss']
})
export class DesctopViewComponent extends DisplayWidth implements OnInit {

  tab;
  active = this.dataService.activeField;

  constructor(
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef
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

  scrollTo(name) {
    this.tab = 'about';
    this.changeDetector.detectChanges();
    document.getElementById(name).scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  ngOnInit(): void {
    this.tab = 'welcome';
  }

}

