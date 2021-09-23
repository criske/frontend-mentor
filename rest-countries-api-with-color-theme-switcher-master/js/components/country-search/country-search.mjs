import BaseComponent from "../base-component.mjs";
import ActionEvent from "../state-context/action-event.mjs";

export default class CountrySearch extends BaseComponent {

    #search = "";

    render() {
       this.$('#search').addEventListener('input', (e) => {
            const value = e.target.value;
            if(value.length >= 3){
                window.countriesAPI.search(value).then(data => {
                    this.dispatchEvent(new ActionEvent("countries", data));
                });
            }
       });
    }

    templateFile() {
        return '/country-search/country-search.html';
    }

    cssFile() {
        return '/country-search/country-search.css';
    }

    #debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

}