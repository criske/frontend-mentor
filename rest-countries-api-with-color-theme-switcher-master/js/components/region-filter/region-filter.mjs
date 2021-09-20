import BaseComponent from "../base-component.mjs";

export default class RegionFilter extends BaseComponent {

    render(){
        console.log("Region Filter");
    }

    templateFile(){
        return '/region-filter/region-filter.html';
    }

    cssFile(){
        return '/region-filter/region-filter.css';
    }
    
}