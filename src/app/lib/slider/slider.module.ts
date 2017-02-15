import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {SliderComponent} from "./slider.component";


@NgModule({
    imports: [ BrowserModule, FormsModule ],
    declarations: [
         SliderComponent
    ],
    providers: [

    ],
    exports: [
        SliderComponent
    ],
    bootstrap: [SliderComponent]
})
export class SliderModule {

    constructor() {
    }
}

