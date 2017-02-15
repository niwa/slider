export class Message {
    status: string;
    text: string;
    cssClass: string;
    icon: string;

    constructor(status: string, text:   string) {
        this.text = text;
        this.status = status;

        switch (this.status) {

            case "ok":
                this.cssClass = "ok";
                this.icon = "-ok-signs";
                break;
            case "message":
                this.cssClass = "info";
                this.icon = "-info-sign";
                break;
            case "maintenance":
                this.cssClass = "warning";
                this.icon = "-wrench";
                break;
            case "error":
                this.cssClass = "danger";
                this.icon = "-warning-sign";
                break;
            default:
                this.cssClass = this.status;
                this.icon = "";
                break;
        }
    }
}
