/*jshint esversion: 9 */

export default class CountriesAPI {

    #BASE_URL = 'https://restcountries.com/v3.1';
    // #BASE_URL = 'http://localhost:8080/v2';

    constructor(dataSource) {
    }

    all() {
        return this.#countryListFetch('/all');
    }

    continent(continent) {
        return this.#countryListFetch(`/region/${continent}`);
    }

    search(queryName) {
        return this.#countryListFetch(`/name/${queryName}`);
    }

    country(name) {
        return this.#countryDetailFetch(`/name/${name}?fullText=true`);
    }

    code(code) {
        return this.#countryDetailFetch(`/alpha/${code}`);
    }

    #countryListFetch(endpoint) {
        let { promise, cancelHandler } = this.#endpointFetch(`${endpoint}?fields=name,population,region,capital,flags`);
        promise = promise.then(data => data.map(country => this.#countryListMapper(country)));
        return { promise, cancelHandler };
    }

    #countryDetailFetch(endpoint) {
        let parsedEndpoint = (endpoint.indexOf('=') === -1) ? endpoint + '?' : endpoint + '&';
        let { promise, cancelHandler } = this.#endpointFetch(`${parsedEndpoint}` +
            'fields=name,population,tld,region,subregion,currencies,capital,flags,languages,borders');
        promise = promise.then(data => {
            const country = Array.isArray(data) ? data[0] : data;
            return this.#countryDetailMapper(country);
        });
        return { promise, cancelHandler };
    }

    #endpointFetch(endpoint) {
        const abortController = new AbortController();
        const signal = abortController.signal;
        //TODO force cache for now;
        const promise = fetch(`${this.#BASE_URL}${endpoint}`, { signal, cache: "force-cache" })
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(data => data.status ? Promise.reject(data) : Promise.resolve(data));
        const cancelHandler = () => abortController.abort();
        return { promise, cancelHandler };
    }

    #countryListMapper(country) {
        return {
            name: country.name.official,
            flag: country.flags.svg,
            population: country.population,
            region: country.region,
            capital: country.capital.length !== 0 ? country.capital[0] : "",
        };
    }

    #countryDetailMapper(country) {
        var c =  {
            name: country.name.official,
            nativeName: country.name.nativeName ? Object.values(country.name.nativeName)[0].official : country.name.official,
            flag: country.flags.svg,
            topLevelDomain: country.tld,
            population: country.population,
            region: country.region,
            subregion: country.subregion,
            capital: country.capital.length !== 0 ? country.capital[0] : "",
            languages: Object.values(country.languages || {}),
            currencies: Object.values(country.currencies || {}).map(curr => curr.name),
            borders: country.borders
        };
        return c;
    }

}
