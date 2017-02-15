import {Component} from "@angular/core";
import {Message} from "./message";
import {NiwaApplicationMessagesService} from "./niwa-application-messages.service";

@Component({
    selector: "niwa-application-messages",
    providers: [NiwaApplicationMessagesService],
    template: `
<div class="col-md-12" *ngIf="showMessage()">
    <div class="panel">
        <div class="panel-heading bg-{{message.cssClass}}">
            <span class="glyphicon glyphicon{{message.icon}}"> </span>
            {{message.text}}
        </div>
    </div>
</div>

`
})
export class NiwaApplicationMessagesComponent {


    message = new Message("ok", "");
    error: any;

    constructor(private appMessagesService: NiwaApplicationMessagesService) {
    }

    ngOnInit() {

        this.appMessagesService.getMessage().subscribe(
            (message: Message) => {
                this.message = message;
            },
            error => {
                this.error = error;
                console.log(this.error);
            }
        );
    }

    showMessage() {
        return (this.message !== null && this.message.status !== "ok");
    }


}
