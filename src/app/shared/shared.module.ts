import {NgModule} from '@angular/core';
import {SafePipe} from './safe.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [SafePipe],
    imports: [HttpClientModule],
    exports: [SafePipe]
})
export class SharedModule {}
