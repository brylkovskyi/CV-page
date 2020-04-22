import {NgModule} from '@angular/core';
import {SafePipe} from '../user/safe.pipe';

@NgModule({
    declarations: [SafePipe],
    imports: [],
    exports: [SafePipe]
})
export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule
        };
    }
}
