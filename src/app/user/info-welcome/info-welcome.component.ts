import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-info-welcome',
  templateUrl: './info-welcome.component.html',
  styleUrls: ['./info-welcome.component.scss']
})
export class InfoWelcomeComponent implements OnInit {
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
  }

  ngOnInit() {
    this.domElement = this.sanitizer.bypassSecurityTrustHtml(this.data.copy);
  }

}
