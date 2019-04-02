import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-info-about',
  templateUrl: './info-about.component.html',
  styleUrls: ['./info-about.component.scss']
})
export class InfoAboutComponent implements OnInit {
  @Input() data: any;
  domElement;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.domElement = this.sanitizer.bypassSecurityTrustHtml(this.data.copy);
  }

}
