import StateAwareComponentAdapter from "../state-context/state-aware-component-adapter.mjs";

export default class CountryList extends HTMLUListElement {

    #adapter = new StateAwareComponentAdapter((state) => {
        this.replaceChildren();

        const arr = state.countries;

        if(arr.length == 0){
            return;
        }

        //TODO: this is just a hack... to warmup the cache of country-card template content, by a creating card first and 
        //the slight delay the creation of the remaining cards!
        //To fix this, in base-component, the card templates (html and css) should be loaded async in constructor
        //first and not on connectedcallback, like it is now, otherwise on first pass will load the same asset for each card.
        //On second pass... like changing the filter or searching, the card template is loaded from cache as it should.
        const c =  arr[0];

        const el = document.createElement("country-card");
            el.setAttribute("flag", c.flag);
            el.setAttribute("name", c.name);
            el.setAttribute("population", c.population);
            el.setAttribute("capital", c.capital);
            el.setAttribute("region", c.region);
            this.appendChild(el);

        setTimeout(()=>{
            for(let i = 1; i < arr.length; i++){
                const c = arr[i];
                const el = document.createElement("country-card");
                el.setAttribute("flag", c.flag);
                el.setAttribute("name", c.name);
                el.setAttribute("population", c.population);
                el.setAttribute("capital", c.capital);
                el.setAttribute("region", c.region);
                this.appendChild(el);
            }
        }, 75);
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