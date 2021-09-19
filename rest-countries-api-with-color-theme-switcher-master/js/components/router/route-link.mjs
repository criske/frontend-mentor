/*jshint esversion: 9 */

import RouteEvent from "./route-event.mjs";

export class RouteLink extends HTMLAnchorElement {

    static get observedAttributes() { return ["href"]; }

    constructor(){
        super();
        this.addEventListener('click', (e) => {
            e.preventDefault();
            this.dispatchEvent(new RouteEvent(this.getAttribute("href")));
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log("new href value "  + newValue);
    }
} 