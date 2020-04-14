import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {LoadingService} from '../loading.service';
import {User} from '../shared/user-interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit, OnDestroy {
  unsubscribe = new Subject();
  userData: User;
  loading = this.loadingService.loadingSetter;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loading(true);
    this.route.paramMap.pipe(
      switchMap((routeData: ParamMap) => this.dataService.getUserData(routeData.get('id'))),
      takeUntil(this.unsubscribe)
    )
      .subscribe((serverUserData: User) => {
          this.loading(false);
          serverUserData ? this.userData = serverUserData : this.router.navigate(['/404']);
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
