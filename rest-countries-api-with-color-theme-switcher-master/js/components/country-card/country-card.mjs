import BaseComponent from "../base-component.mjs";
import RouteEvent from "../router/route-event.mjs";

export default class CountryCard extends BaseComponent {

    #clickListener = ()=> {
        if(this.hasAttribute("name")){
            this.dispatchEvent(new RouteEvent(`detail-page?name=${this.getAttribute('name')}`));
        };
    };

    constructor(){
        super();
    }

    render() {
        this.$('section').removeEventListener('click', this.#clickListener);
        this.$('section').addEventListener('click', this.#clickListener);

        if(this.hasAttribute("flag")){
            this.$('#flag').setAttribute('src', this.getAttribute("flag"));
        }
        if(this.hasAttribute("name")){
            this.$('#name').textContent = this.getAttribute("name");
        }
        if(this.hasAttribute("region")){
            this.$('#region').textContent = this.getAttribute("region");
        }
        if(this.hasAttribute("capital")){
            this.$('#capital').textContent = this.getAttribute("capital");
        }
        if(this.hasAttribute("population")){
            this.$('#population').textContent = this.getAttribute("population");
        }
    }


    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'flag':
                this.$('#flag').setAttribute('src', newValue);
                break;
            case 'name':
                this.$('#name').textContent = newValue;
                break;
            case 'population':
                this.$('#population').textContent = newValue;
                break;
            case 'region':
                this.$('#region').textContent = newValue;
                break;
            case 'capital':
                this.$('#capital').textContent = newValue;
                break;
            default:
                break;
        }
    }
}