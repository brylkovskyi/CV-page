import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {
  }

  prevValue;

  public transform(value: any): SafeHtml {
    if (value !== this.prevValue) {
      this.prevValue = value;
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }
  }
}
