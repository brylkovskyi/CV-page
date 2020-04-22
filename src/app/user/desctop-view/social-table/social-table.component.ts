import {Component, Input} from '@angular/core';
import {UserDataField} from '../../../shared/user-interface';
import {DataService} from '../../../data.service';
import {socialRecognizer} from '../../../shared/social-recognizer-function';

@Component({
    selector: 'app-social-table',
    templateUrl: './social-table.component.html',
    styleUrls: ['./social-table.component.scss']
})
export class SocialTableComponent {

    constructor(private dataService: DataService) {
    }

    socialRecognizer = socialRecognizer;
    active = this.dataService.activeField;
    @Input() data: UserDataField;
}
