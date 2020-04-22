import {Component, OnInit} from '@angular/core';
import {LoadingService} from './loading.service';
import {
    GuardsCheckEnd,
    GuardsCheckStart,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router
} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    loading = this.loadingService.loadingSetter;
    homeButtonToggler = new Subject();

    navigateHome() {
        this.router.navigate(['login']);
    }

    constructor(private loadingService: LoadingService,
                private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart ||
                event instanceof GuardsCheckEnd) {
                this.loading(true);
            }

            if (event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError ||
                event instanceof GuardsCheckStart) {
                this.loading(false);
                const routes = /(view)|(edit)/i;
                this.homeButtonToggler.next(event.url.match(routes) || event instanceof NavigationCancel);
            }
        });
    }

    ngOnInit(): void {
        window.onbeforeunload = () => {
            window.scrollTo(0, 0);
        };
    }

}
