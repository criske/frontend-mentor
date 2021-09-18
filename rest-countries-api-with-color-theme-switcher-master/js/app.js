/*jshint esversion: 9 */
import CountriesAPI from './countries-api.mjs';
import ThemeToggle from './components/theme-toggle/index.mjs';
import ThemeContext from './components/theme-context/index.mjs';
import Router from './components/router/index.mjs';

document.addEventListener('DOMContentLoaded', ready);

async function ready() {
    // try {
    //     const api = new CountriesAPI();
    //    // const call = await api.countryCode('bra');
    //    // document.getElementById('test-display').textContent = JSON.stringify(call);
    // } catch (e) {
    //     document.getElementById('test-display').textContent = "Error code : " + e.status ;
    // } 

    customElements.define("app-router", Router);
    customElements.define("theme-toggle", ThemeToggle);
    customElements.define("theme-context", ThemeContext, {extends: 'body'});
}