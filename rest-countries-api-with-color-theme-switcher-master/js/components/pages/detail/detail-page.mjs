/*jshint esversion: 9 */

import BasePage from "../base-page.mjs";

export default class DetailPage extends BasePage {

    constructor() {
        super();
        // this.data = JSON.parse(`
        // [
        //     {
        //         "currencies": [
        //             {
        //                 "code": "EUR",
        //                 "name": "Euro",
        //                 "symbol": "€"
        //             }
        //         ],
        //         "languages": [
        //             {
        //                 "iso639_1": "nl",
        //                 "iso639_2": "nld",
        //                 "name": "Dutch",
        //                 "nativeName": "Nederlands"
        //             },
        //             {
        //                 "iso639_1": "fr",
        //                 "iso639_2": "fra",
        //                 "name": "French",
        //                 "nativeName": "français"
        //             },
        //             {
        //                 "iso639_1": "de",
        //                 "iso639_2": "deu",
        //                 "name": "German",
        //                 "nativeName": "Deutsch"
        //             }
        //         ],
        //         "flags": [
        //             "https://restcountries.com/data/bel.svg",
        //             "https://restcountries.com/data/png/bel.png"
        //         ],
        //         "name": "Belgium",
        //         "topLevelDomain": [
        //             ".be"
        //         ],
        //         "capital": "Brussels",
        //         "region": "Western Europe",
        //         "continent": "Europe",
        //         "population": 11319511,
        //         "borders": [
        //             "FRA",
        //             "DEU",
        //             "LUX",
        //             "NLD"
        //         ],
        //         "nativeName": "België"
        //     }
        // ]
        // `)[0];
    }

    render() {
        if (this.data) {
            this.#updatePage(this.data);
        }
    }

    paramsChangedCallback(params) {
        if (params.name) {
            window.countriesAPI.country(params.name).then(data => {
                this.data = data[0];
            });
        } else if (params.code) {
            window.countriesAPI.code(params.code).then(data => {
                this.data = data;
            });
        }
    }


    #updatePage(data) {
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