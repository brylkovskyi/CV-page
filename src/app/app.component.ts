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

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    loading = this.loadingService.loadingSetter;

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
            }
        });
    }

    ngOnInit(): void {
        // set vh for mobile devices
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        window.onbeforeunload = () => {
            window.scrollTo(0, 0);
        };
    }

}
