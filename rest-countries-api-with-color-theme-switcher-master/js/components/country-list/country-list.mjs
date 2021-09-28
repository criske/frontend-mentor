export default class CountryList extends HTMLUListElement {

    constructor(){
        super();
    }

    onStateChanged(state){
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
    }
}