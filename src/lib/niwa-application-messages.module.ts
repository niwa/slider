import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule  } from "@angular/common";
import {HttpModule} from "@angular/http";


import {NiwaApplicationMessagesComponent} from "./niwa-application-messages.component";

@NgModule({
  imports: [ CommonModule, FormsModule , HttpModule],
  declarations: [NiwaApplicationMessagesComponent],
  exports:  [NiwaApplicationMessagesComponent],
  entryComponents: [],
  providers: []
})
export class NiwaApplicationMessagesModule {}
