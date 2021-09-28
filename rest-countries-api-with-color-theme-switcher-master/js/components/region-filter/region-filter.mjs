import ActionEvent from "../state-context/action-event.mjs";
import StateAwareComponent from "../state-context/state-aware-component.mjs";

export default class RegionFilter extends StateAwareComponent {


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
        apiCall.then(data => {
            this.shadowRoot.dispatchEvent(new ActionEvent(
                "filter",
                data
            ));
        });
    }

    onSafeStateChanged(state){
        if(state.mode === 'search'){
            this.$('#filter').value = "";
        }
    }
    
}