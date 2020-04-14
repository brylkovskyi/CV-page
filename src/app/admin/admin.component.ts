import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../data.service';
import {delay, mapTo, switchMap, takeUntil, tap, map} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BehaviorSubject, fromEvent, merge, of, Subject} from 'rxjs';
import {LoadingService} from '../loading.service';
import {User} from '../shared/user-interface';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private loadingService: LoadingService,
        private router: Router) {
    }

    @ViewChild('saveButton', {static: false}) saveButtonRef: ElementRef;
    loading = this.loadingService.loadingSetter;
    userId;
    userData: User;
    initUserData: string;
    unsubscribe = new Subject();
    updateConfirm = null;
    timer;
    isUserDataChanged: BehaviorSubject<boolean> = new BehaviorSubject(false);
    preventUnsavedData = merge(fromEvent(window, 'beforeunload'), this.router.events);

    canDeactivate() {
        return this.isUserDataChanged.pipe(
            map(data => !data)
        );
    }

    setFieldData(target, i) {
        this.userData.data[i].groupData = target.value;
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
        this.dataService.updateUser(this.userId, this.userData).then(
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

    ngOnInit(): void {
        this.loading(true);
        this.route.paramMap.pipe(
            tap((routeData: ParamMap) => this.userId = routeData.get('id')),
            switchMap(() => this.dataService.getUserData(this.userId)),
            switchMap(user => user ? of(user) : this.dataService.createUser(this.userId)),
            takeUntil(this.unsubscribe),
            tap(data => {
                this.userData = data;
                this.initUserData = JSON.stringify(data);
                this.loading(false);
            }),
            switchMap(() => this.preventUnsavedData))
            .subscribe((event: any) => {
                const highlightSaveButton = () => {
                    const button = this.saveButtonRef.nativeElement;
                    button.className = 'highlight';
                    setTimeout(() => button.className = '', 10000);
                    button.scrollIntoView({behavior: 'smooth', block: 'start'});

                };
                const modified = JSON.stringify(this.userData);
                if (this.initUserData !== modified) {
                    highlightSaveButton();
                    event instanceof BeforeUnloadEvent ? event.returnValue = false : this.isUserDataChanged.next(true);
                } else {
                    this.isUserDataChanged.next(false);
                }
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
