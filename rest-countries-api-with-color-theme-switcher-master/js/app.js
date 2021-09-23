/*jshint esversion: 9 */
import CountriesAPI from './countries-api.mjs';
import ThemeToggle from './components/theme-toggle/index.mjs';
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

window.addEventListener("load", () => {
    console.log("Loaded from outside router");
});

document.addEventListener('DOMContentLoaded', ready);

window.countriesAPI = new CountriesAPI();

async function ready() {


    // try {
    //     const api = new CountriesAPI();
    //    // const call = await api.countryCode('bra');
    //    // document.getElementById('test-display').textContent = JSON.stringify(call);
    // } catch (e) {
    //     document.getElementById('test-display').textContent = "Error code : " + e.status ;
    // } 

    
    customElements.define("home-page", HomePage);
    customElements.define("detail-page", DetailPage);

    customElements.define("app-router", Router);
    customElements.define("route-link", RouteLink, {extends: 'a'});
    customElements.define("theme-toggle", ThemeToggle);
    customElements.define("theme-context", ThemeContext, {extends: 'body'});


    customElements.define("country-search", CountrySearch);
    customElements.define("region-filter", RegionFilter);

    customElements.define("country-list", CountryList, {extends : 'ul'});
    customElements.define("country-card", CountryCard);

    customElements.define("home-page-state-context", HomePageStateContext);

}