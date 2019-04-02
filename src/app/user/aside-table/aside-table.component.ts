import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-aside-table',
  templateUrl: './aside-table.component.html',
  styleUrls: ['./aside-table.component.scss']
})
export class AsideTableComponent implements OnInit {

  constructor() {
  }

  @Input() data: any;
  title: string;

  ngOnInit() {
    this.title = this.data.groupName;
  }

}
