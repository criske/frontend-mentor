/*jshint esversion: 9 */
import ThemeToggleService from "../../theme-toggle.mjs";
import { ThemeToggleEvent } from "../../theme-toggle.mjs";

export default class ThemeContext extends HTMLBodyElement {

    static get observedAttributes() { return ['mode']; }

    constructor() {
        super();
        this.service = ThemeToggleService();
        this.service.initial();

        this.addEventListener(ThemeToggleEvent.name, () => {
            this.#updateTheme(this.service.isLight() ? 'dark' : 'light');
        });
    }

    connectedCallback() {
        if (this.hasAttribute('mode')) {
            this.#updateTheme(this.getAttribute('mode'));
        } else {
            this.#updateTheme('light');
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'mode') {
            this.#updateTheme(newValue);
        }
    }

    #updateTheme(mode) {
        var update = (isLight) => {
            this.service.changeTheme(isLight);
            const customElementsChildren = Array
                .from(this.querySelectorAll('*'))
                .filter(e => e.shadowRoot !== null);
            customElementsChildren.forEach(e => {
                if(e.tagName.toLowerCase() === 'theme-toggle'){
                    e.isLight = isLight;
                } 
                this.service.updateFor(e.shadowRoot.host);
            });
        };
        if (mode.toLowerCase() === 'dark') {
            update(false);
        } else {
            update(true);
        }
    }
}