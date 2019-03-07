import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { UserComponent } from './user.component';
import { AsideTableComponent } from './aside-table/aside-table.component';
import { InfoCustomizableComponent } from './info-customizable/info-customizable.component';
import { InfoNonCustomizableComponent } from './info-non-customizable/info-non-customizable.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent, AsideTableComponent, InfoCustomizableComponent, InfoNonCustomizableComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
