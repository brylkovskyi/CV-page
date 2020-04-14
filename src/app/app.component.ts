import {Component} from '@angular/core';
import {LoadingService} from './loading.service';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    loading = this.loadingService.loadingSetter;

    constructor(private loadingService: LoadingService,
                private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.loading(true);
            }

            if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
                this.loading(false);
            }
        });
    }

}
