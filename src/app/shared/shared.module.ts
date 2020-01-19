import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhotoComponent} from './photo/photo.component';
import {SpinnerComponent} from './spinner/spinner.component';


@NgModule({
  declarations: [PhotoComponent, SpinnerComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    PhotoComponent,
    SpinnerComponent
  ]
})
export class SharedModule {
}
