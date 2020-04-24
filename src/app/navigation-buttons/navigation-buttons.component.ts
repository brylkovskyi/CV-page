import {Component, OnInit} from '@angular/core';
import {combineLatest, Subject} from 'rxjs';
import {
    GuardsCheckEnd,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    Router,
    Scroll
} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-navigation-buttons',
    templateUrl: './navigation-buttons.component.html',
    styleUrls: ['./navigation-buttons.component.scss']
})
export class NavigationButtonsComponent implements OnInit {

    homeButtonToggler = new Subject();
    shareButtonToggler = new Subject();
    editButtonToggler = new Subject();
    userId: string;
    currentUrl;

    constructor(private router: Router, private authService: AuthService) {
    }

    navigateHome() {
        this.router.navigate(['login']);
    }

    navigateShare() {
        this.router.navigate(['view', {id: this.userId}]);
    }

    navigateEdit() {
        this.router.navigate(['edit', {id: this.userId}]);
    }


    ngOnInit(): void {
        combineLatest([this.router.events, this.authService.authStatusChecker()]).subscribe(
            data => {
                let event = data[0];
                const user = data[1];
                const home = /(view)|(edit)/i;
                const edit = /(view)/i;
                const view = /(edit)/i;
                if (event instanceof NavigationEnd ||
                    event instanceof NavigationCancel ||
                    event instanceof NavigationError ||
                    event instanceof GuardsCheckEnd ||
                    event instanceof Scroll) {
                    event instanceof Scroll ? this.currentUrl = event.routerEvent.url : this.currentUrl = event.url;
                    if (user && user.uid) {
                        this.userId = user.uid;
                    }
                    this.homeButtonToggler.next(this.currentUrl.match(home) || event instanceof NavigationCancel);
                    this.editButtonToggler.next(this.currentUrl.match(edit) &&
                        !(event instanceof NavigationCancel) && this.currentUrl.includes(this.userId));
                    this.shareButtonToggler.next((this.currentUrl.match(view)
                        || event instanceof NavigationCancel) && this.userId);
                }

            });

    }
}
