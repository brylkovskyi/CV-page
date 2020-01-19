import { Component, OnInit } from '@angular/core';
import {LoadingService} from '../../loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(private loadingService: LoadingService) { }

  loading = this.loadingService.loading;

  ngOnInit() {
  }

}
