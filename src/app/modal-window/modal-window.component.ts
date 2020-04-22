import {Component, OnInit} from '@angular/core';
import {ModalWindowService} from './modal-window.service';

@Component({
    selector: 'app-modal-window',
    templateUrl: './modal-window.component.html',
    styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
    modalData;

    constructor(public modalService: ModalWindowService) {
    }

    ngOnInit() {
        this.modalData = this.modalService.modalData;
    }

}
