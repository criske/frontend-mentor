import BaseComponent from "../base-component.mjs";
import ActionEvent from "../state-context/action-event.mjs";

export default class CountrySearch extends BaseComponent {

    #search = "";

    #timeout;

    render() {
        const clear = this.$('#clear');
        const search = this.$('#search');
        if(search.value > 0){
            clear.classList.remove('.hidden');
        }

        //TODO refactor debounce into its own function
        search.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value.length >= 3) {
                clearTimeout(this.#timeout);
                this.#timeout = setTimeout(() => {
                    window.countriesAPI.search(value).then(data => {
                        this.dispatchEvent(new ActionEvent("search", data));
                    });
                }, 750);
            }
            if(value.length == 0){
                clear.classList.add('hidden');
            }else{
                clear.classList.remove('hidden');
            }
        });
        clear.addEventListener('click', () => {
            search.value = "";
            clear.classList.add('hidden');
        });
    }

    onStateChanged(state){
        if(state.mode === 'filter'){
            this.$('#clear').classList.add('hidden');
            this.$('#search').value = "";
        }
    }
}