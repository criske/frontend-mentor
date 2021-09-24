/*jshint esversion: 9 */

export default class CountriesAPI {

    #BASE_URL = 'https://restcountries.com/v2';
    // #BASE_URL = 'http://localhost:8080/v2';

    constructor(dataSource) {
    }

    all() {
        return this.#countryListFetch('/all');
    }

    continent(continent) {
        return this.#countryListFetch(`/continent/${continent}`);
    }

    search(queryName) {
        return this.#countryListFetch(`/name/${queryName}`);
    }

    country(name) {
        let {promise, cancelHandler} = this.#countryDetailFetch(`/name/${name}?fullText=true`);
        promise = promise.then(data => data[0]); // cleanup this should be a single country obj not an array[1];
        return { promise, cancelHandler };
    }

    code(code) {
        return this.#countryDetailFetch(`/alpha/${code}`);
    }

    #countryListFetch(endpoint) {
        return this.#endpointFetch(`${endpoint}?fields=name,population,region,capital,flags`);
    }

    #countryDetailFetch(endpoint) {
        let parsedEndpoint = (endpoint.indexOf('=') === -1) ? endpoint + '?' : endpoint + '&';
        return this.#endpointFetch(`${parsedEndpoint}` +
            'fields=name,nativeName,population,topLevelDomain,region,continent,currencies,capital,flags,languages,borders');
    }

    #endpointFetch(endpoint) {
        const abortController = new AbortController();
        const signal = abortController.signal;
        //TODO force cache for now;
        const promise =  fetch(`${this.#BASE_URL}${endpoint}`, { signal, cache : "force-cache" })
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(data => data.status ? Promise.reject(data) : Promise.resolve(data));
        const cancelHandler = () => abortController.abort();
        return { promise, cancelHandler };
    }

}
