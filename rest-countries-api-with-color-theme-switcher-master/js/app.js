/*jshint esversion: 9 */
import CountriesAPI from './countries-api.mjs';
import CountriesAPIController from './countries-api-controller.mjs';
import { CountriesAPIControllerEvent } from './countries-api-controller.mjs';
import ThemeToggle from './components/theme-toggle/theme-toggle.mjs';
import ThemeContext from './components/theme-context/index.mjs';
import Router from './components/router/router.mjs';
import { RouteLink } from './components/router/route-link.mjs';
import HomePage from './components/pages/home/home-page.mjs';
import DetailPage from './components/pages/detail/detail-page.mjs';
import CountrySearch from './components/country-search/country-search.mjs';
import RegionFilter from './components/region-filter/region-filter.mjs';
import CountryList from './components/country-list/country-list.mjs';
import CountryCard from './components/country-card/country-card.mjs';
import { HomePageStateContext } from './components/pages/home/home-page-state-context.mjs';
import LoadingSpinner from './components/loading-spinner/loading-spinner.mjs';
import FlagImage from './components/flag-image/flag-image.mjs';

window.countriesAPI = new CountriesAPIController(new CountriesAPI());

document.addEventListener('DOMContentLoaded', ready);

async function ready() {

    window.addEventListener(CountriesAPIControllerEvent.name, (e) => {
        const data = e.data;
        const loader = document.getElementById('loader');
        if (data.loading) {
            loader.classList.remove('hidden');
        } else {
            loader.classList.add('hidden');
        }
        if (data.error) {
            console.log("Error: " + data.error.message);
        }
    });

    customElements.define("loading-spinner", LoadingSpinner);

    customElements.define("home-page", HomePage);
    customElements.define("detail-page", DetailPage);

    customElements.define("app-router", Router);
    customElements.define("route-link", RouteLink, { extends: 'a' });
    customElements.define("theme-toggle", ThemeToggle);
    customElements.define("theme-context", ThemeContext, { extends: 'body' });


    customElements.define("flag-image", FlagImage);
    customElements.define("country-search", CountrySearch);
    customElements.define("region-filter", RegionFilter);

    customElements.define("country-list", CountryList, { extends: 'ul' });
    customElements.define("country-card", CountryCard);

    customElements.define("home-page-state-context", HomePageStateContext);

}


window.flagRedirectToWikipedia = function (countryName) {
    const flag = "Flag_of_" + countryName.replaceAll(" ", "_");
    return `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/${flag}.svg/640px-${flag}.svg.png`;
}