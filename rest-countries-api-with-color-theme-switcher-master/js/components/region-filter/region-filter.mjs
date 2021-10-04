import ActionEvent from "../state-context/action-event.mjs";
import StateAwareComponent from "../state-context/state-aware-component.mjs";

export default class RegionFilter extends StateAwareComponent {

    #region = [];

    #filter = ''

    render() {
        this.#filterData(this.$('#filter').value);

        this.$('#filter').addEventListener('change', e =>{
            this.#filterData(e.target.value);  
        });

        this.$('label').addEventListener('click', () => {
            this.$('#filter');
        });
    }

    #filterData(value){
        let apiCall;
        if(value.length === 0){
            apiCall = window.countriesAPI.all();
        }else{
            apiCall = window.countriesAPI.continent(value);
        }
        this.#filter = value;
        apiCall.then(data => {
            this.#region = data;
            this.shadowRoot.dispatchEvent(new ActionEvent(
                "filter",
                data
            ));
        });
    }

    onSafeStateChanged(state){
        if(state.mode === 'search'){
            this.$('#filter').value = "";
        }else if(state.mode === 'clear-search'){
            this.$('#filter').value = this.#filter;
            this.shadowRoot.dispatchEvent(new ActionEvent(
                "filter",
                this.#region
            ));
        }
    }
    
}