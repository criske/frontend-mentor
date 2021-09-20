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

        let nextCountry = 1;
        if (params.country) {
            nextCountry = parseInt(params.country) + 1;
        }
        const nextLink = `detail-page?country=${nextCountry}`;
        a.setAttribute("href", nextLink);
        a.innerText = `Next country: ${nextCountry}`;
    }

    templateFile() {
        return '/pages/detail/detail.html';
    }

    cssFile() {
        return '/pages/detail/detail.css';
    }
}