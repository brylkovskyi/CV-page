import {
    AfterViewChecked,
    ChangeDetectorRef,
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
export class MobileViewComponent implements AfterViewChecked {
    tab = new BehaviorSubject('welcome');
    stickBottom;
    socialRecognizer = socialRecognizer;

    constructor(private changeDetector: ChangeDetectorRef) {

    }

    @Input() inputUserData: User;
    @Input() activeField;
    @ViewChild('footer', {static: false})
    private footerElement: ElementRef;

    @HostListener('window:click', ['$event.target.id'])
    private aboutMe(id) {
        if (id === 'link') {
            this.tab.next('aboutme');
            const elem = this.footerElement.nativeElement;
            this.stickBottom = elem.offsetTop < window.innerHeight - elem.offsetHeight;
        }
    }

    scrollTo(name) {
        this.tab.next(name);
        if (this.footerElement && this.footerElement.nativeElement) {
            this.stickBottom = false;
            this.changeDetector.detectChanges();
            const elem = this.footerElement.nativeElement;
            this.stickBottom = elem.offsetTop < window.innerHeight - elem.offsetHeight;
        }
        this.changeDetector.detectChanges();


    }

    filterField(data, fieldName): UserDataField {
        return data.find(item => item.groupName === fieldName);
    }

    ngAfterViewChecked() {
        if (this.footerElement && this.footerElement.nativeElement) {
            const elem = this.footerElement.nativeElement;
            if (this.stickBottom !== elem.offsetTop <= window.innerHeight - elem.offsetHeight) {
                this.stickBottom = elem.offsetTop <= window.innerHeight - elem.offsetHeight;
                this.changeDetector.detectChanges();
            }
        }

    }

}
