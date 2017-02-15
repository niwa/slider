import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SliderModule } from './lib/slider/slider.module';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        SliderModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {


}
