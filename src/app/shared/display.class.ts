import {HostListener} from '@angular/core';
import {BehaviorSubject, merge} from 'rxjs';
import {debounceTime, skip, take} from 'rxjs/operators';

export class DisplayWidth {
  subject = new BehaviorSubject(+window.innerWidth > 700);
  desktopView = merge(
    this.subject.pipe(take(1)),
    this.subject.pipe(skip(1), debounceTime(300))
  );

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width) {
    this.subject.next(+width > 700);
  }
}

