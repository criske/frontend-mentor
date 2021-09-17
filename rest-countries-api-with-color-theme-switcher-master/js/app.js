/*jshint esversion: 9 */
import CountriesAPI from './countries-api.mjs';

document.addEventListener('DOMContentLoaded', ready);

async function ready() {
    try {
        const api = new CountriesAPI();
        const call = await api.countryCode('bra');
        document.getElementById('test-display').textContent = JSON.stringify(call);
    } catch (e) {
        document.getElementById('test-display').textContent = "Error code : " + e.status ;
    } 
}