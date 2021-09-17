/*jshint esversion: 9 */

export default class CountriesAPI {

    #BASE_URL = 'https://restcountries.eu/rest/v2';

    constructor(dataSource) {
    }

    async all() {
        return this.#countryListFetch('/all');
    }

    async region(region) {
        return this.#countryListFetch(`/region/${region}`);
    }

    async search(queryName) {
        return this.#countryListFetch(`/name/${queryName}`);
    }

    async country(name){
        return this.#countryDetailFetch(`/name/${name}?fullText=true`);
    }

    async countryCode(code){
        return this.#countryDetailFetch(`/alpha/${code}`);
    }

    async #endpointFetch(endpoint) {
        return fetch(`${this.#BASE_URL}${endpoint}`)
            .then(response => response.ok ? response.json() : Promise.reject(response));
    }

    async #countryListFetch(endpoint) {
        return this.#endpointFetch(`${endpoint}?fields=name;population;region;capital;flag`);
    }

    async #countryDetailFetch(endpoint) {
        let parsedEndpoint = (endpoint.indexOf('=') === -1) ?  endpoint + '?' : endpoint + '&';
        return this.#endpointFetch(`${parsedEndpoint}` +
        'fields=name;nativeName;population;topLevelDomain;region;subregion;currencies;capital;flag;languages;borders');
    }
}
