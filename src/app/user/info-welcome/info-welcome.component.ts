import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {DisplayWidth} from '../../shared/display.class';

@Component({
  selector: 'app-info-welcome',
  templateUrl: './info-welcome.component.html',
  styleUrls: ['./info-welcome.component.scss']
})
export class InfoWelcomeComponent extends DisplayWidth {
  @Input() data;
  @Output() load = new EventEmitter();


  @HostListener('click', ['$event.target'])
  onClick(element) {
    if (element.id === 'link') {
      this.load.emit();
    }
  }

  constructor() {
    super();
  }
}
