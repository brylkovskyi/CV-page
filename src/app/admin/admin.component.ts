import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../data.service';
import {delay, mapTo, switchMap, takeUntil, tap, map} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {fromEvent, merge, of, Subject} from 'rxjs';
import {LoadingService} from '../loading.service';
import {ModalWindowService} from '../modal-window/modal-window.service';
import {ModalData} from '../shared/modal-window-interface';

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
        private router: Router,
        private modalService: ModalWindowService) {
    }

    @ViewChild('saveButton', {static: false}) saveButtonRef: ElementRef;
    loading = this.loadingService.loadingSetter;
    userId;
    userData;
    modifiedUserData: string;
    initUserData: string;
    unsubscribe = new Subject();
    updateConfirm = null;
    timer;
    preventUnsavedData = fromEvent(window, 'beforeunload');

    highlightSaveButton() {
        const button = this.saveButtonRef.nativeElement;
        button.className = 'highlight';
        setTimeout(() => button.className = '', 10000);
        button.scrollIntoView({behavior: 'smooth', block: 'start'});
    }


    canDeactivate() {
        this.modifiedUserData = JSON.stringify(this.userData);
        if (this.modifiedUserData !== this.initUserData) {
            const modalData: ModalData = {
                heading: 'You are leaving webpage',
                message: 'Unsaved changes will be lost. You may <i>review</i> your edits or instantly <i>save</i> them.' +
                    ' If changes are not important click <i>discard</i>.',
                btnFirst: 'Review',
                btnSecond: 'Save',
                btnThird: 'Discard'
            };
            return this.modalService.openModal(modalData).pipe(
                map(result => {
                    switch (result) {
                        case 'first':
                            this.highlightSaveButton();
                            return false;
                        case 'second':
                            this.saveEditedData();
                            return true;
                        case 'third':
                            return true;
                        default:
                            return true;
                    }
                }));
        } else {
            return true;
        }
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
            tap(data => {
                this.userData = data;
                this.initUserData = JSON.stringify(data);
                this.loading(false);
            }),
            switchMap(() => this.preventUnsavedData),
            takeUntil(this.unsubscribe))
            .subscribe((event: any) => {
                this.modifiedUserData = JSON.stringify(this.userData);
                if (this.initUserData !== this.modifiedUserData) {
                    if (event instanceof BeforeUnloadEvent) {
                        event.returnValue = false;
                        this.highlightSaveButton();
                    }
                }
            });
    }

    ngOnDestroy(): void {
        this.userData = null;
        this.modifiedUserData = null;
        this.initUserData = null;
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
