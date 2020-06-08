import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {LoadingService} from '../spinner/loading.service';
import {User} from '../shared/user-interface';
import {DisplayWidth} from '../shared/display.class';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent extends DisplayWidth implements OnInit, OnDestroy {
    unsubscribe = new Subject();
    userData: User;
    loading = this.loadingService.loadingSetter;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private loadingService: LoadingService,
        private router: Router
    ) {
        super();
    }

    ngOnInit(): void {
        this.loading(true);
        this.route.paramMap.pipe(
            switchMap((routeData: ParamMap) => this.dataService.getUserData(routeData.get('id'))),
            takeUntil(this.unsubscribe)
        )
            .subscribe((serverUserData: User) => {
                    serverUserData ? this.userData = serverUserData : this.router.navigate(['/404']);
                    this.loading(false);
                }
            );
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
