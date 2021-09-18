/*jshint esversion: 9 */
import ThemeToggleService from "../../theme-toggle.mjs";
import { ThemeToggleEvent } from "../../theme-toggle.mjs";

export default class ThemeContext extends HTMLBodyElement {

    constructor() {

        super();

        const customElementsChildren = Array
            .from(this.querySelectorAll('*'))
            .filter(e => e.shadowRoot !== null);

        this.service = ThemeToggleService();

        this.service.initial();

        customElementsChildren.forEach(e => {
            this.service.updateFor(e.shadowRoot.host);
        });

        this.addEventListener(ThemeToggleEvent.name, () => {
            this.service.toggle();
            customElementsChildren.forEach(e => {
                this.service.updateFor(e);
            });
        });
    }

}