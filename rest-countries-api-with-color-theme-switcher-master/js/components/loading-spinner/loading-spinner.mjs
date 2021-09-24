import { CountriesAPIControllerEvent } from "../../countries-api-controller.mjs";
import BaseComponent from "../base-component.mjs";

export default class LoadingSpinner extends BaseComponent {

    #listener = (e) => {
        const data = e.data;
        const loader = this.$('#loader');
        if(data.loading){
            loader.classList.remove('hidden');
        }else{
            loader.classList.add('hidden');
        }
        if(data.error){
            console.log("Error: " + data.error.message);
        }
        console.log(data.loading ? "loading" : "done");
    }

    render(){
        window.addEventListener(CountriesAPIControllerEvent.name, this.#listener.bind(this));
    }

    disconnectedCallback() {
        window.removeEventListener(CountriesAPIControllerEvent.name, this.#listener);
    }

    template() {
        return  `
            <style>
                .loader {
                    border: .5rem solid var(--clr-background-elements); 
                    border-top: .5rem solid gray;
                    border-radius: 50%;
                    width: 3rem;
                    height: 3rem;
                    animation: spin 2s linear infinite;
                }
                .hidden{
                    display:none;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
            <div id="loader" class="loader hidden"></div>
        `;
    }
}