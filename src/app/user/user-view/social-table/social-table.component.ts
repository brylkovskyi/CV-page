import {Component, Input} from '@angular/core';
import {UserDataField} from '../../../shared/user-interface';
import {DataService} from '../../../data.service';

@Component({
    selector: 'app-social-table',
    templateUrl: './social-table.component.html',
    styleUrls: ['./social-table.component.scss']
})
export class SocialTableComponent {

    constructor(private dataService: DataService) {
    }

    active = this.dataService.activeField;
    @Input() data: UserDataField;

    socialRecognizer(link) {
        link.toLowerCase();
        const className = 'fab fa-';
        const facebook = /facebook.com/;
        const twitter = /twitter.com/;
        const linkedin = /linkedin.com/;
        const instagram = /instagram.com/;

        if (facebook.test(link)) {
            return className + 'facebook';
        }
        if (twitter.test(link)) {
            return className + 'twitter';
        }
        if (linkedin.test(link)) {
            return className + 'linkedin';
        }
        if (instagram.test(link)) {
            return className + 'instagram';
        }
        return 'fas fa-link';
    }
}
