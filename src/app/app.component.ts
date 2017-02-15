import {Component, ViewEncapsulation} from "@angular/core";


@Component({
  selector: "my-app",
  template: `<niwa-application-messages></niwa-application-messages>`,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {


  constructor() {
  }

  ngOnInit() {
  }

}
