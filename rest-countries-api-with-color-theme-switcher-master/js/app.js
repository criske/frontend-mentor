/*jshint esversion: 9 */
import CountriesAPI from './countries-api.mjs';
import ThemeToggle from './components/theme-toggle/index.mjs';
import ThemeContext from './components/theme-context/index.mjs';
import Router from './components/router/index.mjs';
import { RouteLink } from './components/router/route-link.mjs';
import HomePage from './components/pages/home/home-page.mjs';
import DetailPage from './components/pages/detail/detail-page.mjs';

document.addEventListener('DOMContentLoaded', ready);

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
}