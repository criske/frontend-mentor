/*jshint esversion: 9 */

import { ThemeToggleEvent } from "../../theme-toggle.mjs";
import BaseComponent from "../base-component.mjs";

export default class ThemeToggle extends BaseComponent {

    #isLight = true;

    constructor() {
        super();
    }

    render() {
        const btn = this.$('#theme-toggle');
        const text = this.$('i');
        text.textContent = this.#isLight ? "light mode" : "dark mode";
        btn.addEventListener('click',  () => {
            this.#isLight = !this.#isLight;
            text.textContent = this.#isLight ? "light mode" : "dark mode";
            this.shadowRoot.dispatchEvent(new ThemeToggleEvent());
        });
    }

    templateFile() {
        return '/theme-toggle/template.html';
    }

    cssFile() {
        return '/theme-toggle/style.css';
    }
}