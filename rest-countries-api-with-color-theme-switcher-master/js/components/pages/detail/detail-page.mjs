/*jshint esversion: 9 */

import BasePage from "../base-page.mjs";

export default class DetailPage extends BasePage {

    render() {
        this.#setLink(this.params);
    }

    paramsChangedCallback(params) {
        this.#setLink(params);
    }

    #setLink(params){
        const a = this.shadowRoot.getElementById("next-page");
        if(a == null){
            return;
        }

        let nextCountry =  params.name || ""; 
        a.innerText = `Country: ${nextCountry}`;
    }

    templateFile() {
        return '/pages/detail/detail.html';
    }

    cssFile() {
        return '/pages/detail/detail.css';
    }
}