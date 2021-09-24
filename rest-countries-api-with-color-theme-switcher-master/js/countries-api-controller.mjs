export default class CountriesAPIController {

    #countriesApi;

    #currentCancelHandler = null;

    #requestsCount = 0;

    constructor(countriesAPI) {
        this.#countriesApi = countriesAPI;
    }

    all() {
        return this.#replaceCall(this.#countriesApi.all.bind(this.#countriesApi));
    }

    continent(continent) {
        return this.#replaceCall(this.#countriesApi.continent.bind(this.#countriesApi, continent));
    }

    search(queryName) {
        return this.#replaceCall(this.#countriesApi.search.bind(this.#countriesApi, queryName));
    }

    country(name) {
        return this.#replaceCall(this.#countriesApi.country.bind(this.#countriesApi, name), false);
    }

    code(code) {
        return this.#replaceCall(this.#countriesApi.code.bind(this.#countriesApi, code), false);
    }

    #replaceCall(call, isArrayResponse = true) {
        const { promise, cancelHandler } = call();
        //TODO enalble cancel handler later - right now is buggy.. because it cancel prev request on reload
        // and that request is needed.
        // if (this.#currentCancelHandler !== null) {
        //     this.#currentCancelHandler();
        // }
        this.#currentCancelHandler = cancelHandler;
        if(this.#requestsCount === 0){
            window.dispatchEvent(CountriesAPIControllerEvent.loading());
        }
        this.#requestsCount++;

        return promise
            .catch(e => {
                if (e.name === 'AbortError') {
                    window.dispatchEvent(new CountriesAPIControllerEvent(this.#requestsCount > 0, e));
                    this.#currentCancelHandler = null;
                }
                //fallback 
                return Promise.resolve(isArrayResponse ? [] : undefined);
            })
            .finally(() =>{
                this.#requestsCount--;
                window.dispatchEvent(CountriesAPIControllerEvent.done());
                this.#currentCancelHandler = null;
            });
    }

}

export class CountriesAPIControllerEvent extends CustomEvent {

    static name = "countries-api-controller-event";

    static loading() {
        return new CountriesAPIControllerEvent(true);
    }

    static done(error) {
        return new CountriesAPIControllerEvent(false, error);
    }

    constructor(loading, error) {
        super(CountriesAPIControllerEvent.name, { bubbles: true, composed: true });
        this.data = { loading, error };
    }

}
