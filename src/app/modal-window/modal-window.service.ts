import {Injectable} from '@angular/core';
import {ModalData} from '../shared/modal-window-interface';
import {BehaviorSubject, Subject} from 'rxjs';
import {LoadingService} from '../loading.service';

@Injectable({
        providedIn: 'root'
    }
)

export class ModalWindowService {
    modalToggler = new BehaviorSubject<boolean>(false);
    modalData: ModalData;
    closeResult = new Subject<string>();

    constructor() {
    }

    openModal(data: ModalData) {
        this.modalData = data;
        this.modalToggler.next(true);
        return this.closeResult;
    }

    modalClose(result) {
        this.modalToggler.next(false);
        this.closeResult.next(result);
    }

}
