import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../data.service';

@Component({
  selector: 'app-aside-table',
  templateUrl: './aside-table.component.html',
  styleUrls: ['./aside-table.component.scss']
})
export class AsideTableComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  active = this.dataService.activeField;
  @Input() data: any;
  title: string;
  offset: boolean;

  ngOnInit() {
    this.title = this.data.groupName;
  }

  checkOffset(target) {
    return this.offset = target.offsetWidth > 136;
  }

  copyToClipboard(target) {
    if (this.checkOffset(target)) {
      const range = document.createRange();
      const sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(target);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(target);
        sel.addRange(range);
      }
      document.execCommand('copy');
      sel.removeAllRanges();
    }
  }
}
