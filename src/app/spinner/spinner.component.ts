import {Component, OnInit} from '@angular/core';
import {LoadingService} from './loading.service';
import {ModalWindowService} from '../modal-window/modal-window.service';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

    constructor(private loadingService: LoadingService, public modalService: ModalWindowService) {
    }

    loading = this.loadingService.loading;

    ngOnInit() {
    }

}
