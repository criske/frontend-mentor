/*jshint esversion: 9 */

export default class CountriesAPI {

    // #BASE_URL = 'https://restcountries.com/v2';
    #BASE_URL = 'http://localhost:8080/v2';

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

    async code(code){
        return this.#countryDetailFetch(`/alpha/${code}`);
    }

    async #endpointFetch(endpoint) {
        return fetch(`${this.#BASE_URL}${endpoint}`)
            .then(response => response.ok ? response.json() : Promise.reject(response));
    }

    async #countryListFetch(endpoint) {
        return this.#endpointFetch(`${endpoint}?fields=name,population,region,capital,flags`);
    }

    async #countryDetailFetch(endpoint) {
        let parsedEndpoint = (endpoint.indexOf('=') === -1) ?  endpoint + '?' : endpoint + '&';
        return this.#endpointFetch(`${parsedEndpoint}` +
        'fields=name,nativeName,population,topLevelDomain,region,continent,currencies,capital,flags,languages,borders');
    }
}
