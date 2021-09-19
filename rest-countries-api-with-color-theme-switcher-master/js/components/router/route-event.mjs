/*jshint esversion: 9 */

export default class RouteEvent extends CustomEvent {

    static name = "route-event";

    #link;

    constructor(link){
        super(RouteEvent.name, {
            bubbles: true,
            composed: true
        });
        this.#link = link;
    }

    get link() {
        return this.#link;
    }

}