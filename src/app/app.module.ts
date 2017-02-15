import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import { BrowserModule }  from '@angular/platform-browser';

import {NiwaApplicationMessagesModule} from '../lib/niwa-application-messages.module';

@NgModule({
    imports: [
        BrowserModule,
        NiwaApplicationMessagesModule
    ],
    declarations: [
        AppComponent
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }
}
