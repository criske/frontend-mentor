import StateAwareComponentAdapter from "../state-context/state-aware-component-adapter.mjs";

export default class CountryList extends HTMLUListElement {

    #adapter = new StateAwareComponentAdapter((state) => {
        this.replaceChildren();
        state.countries.forEach(c => {
            const el = document.createElement("country-card");
            el.setAttribute("flag", c.flag || c.flags.svg);
            el.setAttribute("name", c.name);
            el.setAttribute("population", c.population);
            el.setAttribute("capital", c.capital);
            el.setAttribute("region", c.region);
            this.appendChild(el);
        });
    });


    constructor(){
        super();
    }

    connectedCallback(){
        this.#adapter.setConnected();
    }

    onStateChanged(state){
       this.#adapter.onStateChanged(state);
    }
}