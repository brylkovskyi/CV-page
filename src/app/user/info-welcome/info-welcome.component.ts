import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {DisplayWidth} from '../../shared/display.class';

@Component({
  selector: 'app-info-welcome',
  templateUrl: './info-welcome.component.html',
  styleUrls: ['./info-welcome.component.scss']
})
export class InfoWelcomeComponent extends DisplayWidth implements OnInit {
  @Input() data: any;
  @Output() load = new EventEmitter();
  domElement;

  @HostListener('click', ['$event.target'])
  onClick(element) {
    if (element.id === 'link') {
      this.load.emit();
    }
  }


  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.domElement = this.sanitizer.bypassSecurityTrustHtml(this.data.copy);
  }

}
