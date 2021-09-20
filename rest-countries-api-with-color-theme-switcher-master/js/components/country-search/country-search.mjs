import BaseComponent from "../base-component.mjs";

export default class CountrySearch extends BaseComponent {

    render(){
        console.log("Country search");
    }

    templateFile(){
        return '/country-search/country-search.html';
    }

    cssFile(){
        return '/country-search/country-search.css';
    }
    
}