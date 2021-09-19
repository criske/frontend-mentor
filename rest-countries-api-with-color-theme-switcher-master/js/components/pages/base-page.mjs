/*jshint esversion: 9 */

import BaseComponent from "../base-component.mjs";

export default class BasePage extends BaseComponent {

    static get observedAttributes() { return ["params"]; }

    #params = {};

    constructor() {
        super();
    }

    get params() {
        return this.#params;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'params') {
            const entries = newValue.split('&');
            const obj = {};
            entries.forEach(e => {
                const keyVal = e.split('=');
                obj[keyVal[0]] = keyVal[1];
            }) 
            this.#params = obj;
            this.paramsChangedCallback(this.#params);
        }
    }

    paramsChangedCallback(params) {}
}