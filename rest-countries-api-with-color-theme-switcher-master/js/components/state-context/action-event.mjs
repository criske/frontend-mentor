export default class ActionEvent extends CustomEvent {

    static name = "action-event";

    constructor(type, data) {
        super(ActionEvent.name, {
            bubbles: true,
            composed: true,
        });
        this.action = { type, data };
    }
}