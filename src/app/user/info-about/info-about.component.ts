import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-info-about',
  templateUrl: './info-about.component.html',
  styleUrls: ['./info-about.component.scss']
})
export class InfoAboutComponent {
  @Input() data: any;

  constructor() {
  }
}
