import {HostListener} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export class DisplayWidth {
  desctopView = new BehaviorSubject(+window.innerWidth > 700);

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width) {
    this.desctopView.next(+width > 700);
  }
}

