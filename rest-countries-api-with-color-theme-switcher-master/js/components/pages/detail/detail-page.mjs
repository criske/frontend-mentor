/*jshint esversion: 9 */

import BasePage from "../base-page.mjs";

export default class DetailPage extends BasePage {

    constructor() {
        super();
    }

    render() {
        if (this.data) {
            this.#updatePage(this.data);
        }
    }

    paramsChangedCallback(params) {
        if (params.name) {
            window.countriesAPI.country(params.name).then(data => {
                this.data = data;
                this.#updatePage(this.data);
            });
        } else if (params.code) {
            window.countriesAPI.code(params.code).then(data => {
                this.data = data;
                this.#updatePage(this.data);
            });
        }
    }


    #updatePage(data) {
        if(!data || !this.$("h1")){
            return;
        }
        this.$("h1").textContent = data.name;
        this.$("img").setAttribute("src", data.flags[0]);
        this.$("#native-name").textContent = data.nativeName;
        this.$("#population").textContent = data.population;
        this.$("#region").textContent = data.continent;
        this.$("#sub-region").textContent = data.region;
        this.$("#capital").textContent = data.capital;
        this.$("#tld").textContent = data.topLevelDomain.join();
        this.$("#currencies").textContent = data.currencies.map(c => c.name).join();
        this.$("#languages").textContent = data.languages.map(l => l.name).join();

        const bordersLinks = this.$("#borders-links");
        data.borders.forEach(b => {
            const link = document.createElement("a", { is: "route-link" });
            link.setAttribute("href", `detail-page?code=${b}`);
            link.textContent = b;
            bordersLinks.appendChild(link);
        });
    }

    templateFile() {
        return '/pages/detail/detail.html';
    }

    cssFile() {
        return '/pages/detail/detail.css';
    }
}