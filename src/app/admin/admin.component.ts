import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {delay, mapTo, switchMap, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {merge, of, Subject} from 'rxjs';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
  }

  userId;
  userData;
  unsubscribe = new Subject();
  updateConfirm = null;
  timer;

  setFieldData(target, i) {
    this.userData.data[i].copy = target.value;
  }

  removeActiveField() {
    this.dataService.activeField.next(null);

  }

  setActiveField(event) {
    if (event.path) {
      event.path.forEach(key => {
        if (key.className && key.className.indexOf('fieldGroup') !== -1) {
          this.dataService.activeField.next(key.className.split('active-')[key.className.split('active-').length - 1]);
        }
      });
    } else {
      this.dataService.activeField.next(event);
    }
  }

  timerFunction() {
    const interval = of(null);
    return this.timer = merge(
      interval.pipe(
        mapTo(true)
      ),
      interval.pipe(
        mapTo(false),
        delay(3000)
      )
    );
  }

  saveEditedData() {
    this.dataService.updateUser(this.userId, this.userData).pipe(
      takeUntil(this.unsubscribe)
    )
      .subscribe(
      () => {
        this.updateConfirm = 'Updated';
        this.timerFunction();
      },
      error => {
        this.updateConfirm = 'Update problem (check console)';
        this.timerFunction();
        console.log(error);
      }
    );
  }

  getUserdata(userId) {
    this.userId = userId;
    return this.dataService.getUserdata(userId);
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((data: ParamMap) => this.getUserdata(data.get('id'))),
      takeUntil(this.unsubscribe)
    )
      .subscribe(data => {
        if (data) {
          this.userData = data;
        } else {
          this.dataService.createUser(this.userId);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
