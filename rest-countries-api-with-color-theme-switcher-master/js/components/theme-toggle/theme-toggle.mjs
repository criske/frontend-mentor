/*jshint esversion: 9 */

import { ThemeToggleEvent } from "../../theme-toggle.mjs";
import BaseComponent from "../base-component.mjs";

export default class ThemeToggle extends BaseComponent {

    #isLight;

    constructor() {
        super();
    }

    render() {
        const btn = this.$('#theme-toggle');
        btn.addEventListener('click', () => {
            this.shadowRoot.dispatchEvent(new ThemeToggleEvent());
        });
        this.#updateText();
    }

    set isLight(isLight) {
        this.#isLight = isLight;
        this.#updateText();
    }

    #updateText(){
        const text = this.$('i');
        const svg = this.$('svg');
        if (text) {
            text.textContent = this.#isLight ? "light mode" : "dark mode";
        }
        if(svg){
            svg.setAttribute('fill', this.#isLight ? 'none' : 'currentColor');
        }
    }
}