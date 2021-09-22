/*jshint esversion: 9 */

import RouteEvent from "./route-event.mjs";

export class RouteLink extends HTMLAnchorElement {

    static get observedAttributes() { return ["href"]; }

    constructor(){
        super();
        this.addEventListener('click', (e) => {
            e.preventDefault();
            const href = this.getAttribute("href").trim().toLowerCase();
            switch (href) {
                case "#":
                    break;
                case "back":{
                    window.history.back();
                    break;
                }
                default:{
                    this.dispatchEvent(new RouteEvent(href));
                    break;
                }
            }
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("new href value "  + newValue);
    }
} 