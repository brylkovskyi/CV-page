import {
    Component,
    ElementRef,
    HostListener,
    Input,
    ViewChild
} from '@angular/core';
import {User, UserDataField} from '../../shared/user-interface';
import {socialRecognizer} from '../../shared/social-recognizer-function';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-mobile-view',
    templateUrl: './mobile-view.component.html',
    styleUrls: ['./mobile-view.component.scss']
})
export class MobileViewComponent {
    tab = new BehaviorSubject('welcome');
    stickBottom;
    socialRecognizer = socialRecognizer;

    constructor() {
    }

    @Input() inputUserData: User;
    @Input() activeField;
    @ViewChild('footer', {static: false})
    private footerElement: ElementRef;

    @HostListener('window:click', ['$event.target.id'])
    private aboutMe(id) {
        if (id === 'link') {
            this.tab.next('aboutme');
        }
    }

    scrollTo(name) {
        this.tab.next(name);
    }

    filterField(data, fieldName): UserDataField {
        return data.find(item => item.groupName === fieldName);
    }


}
