import ActionEvent from "./action-event.mjs";

export default class StateContext extends HTMLElement {

    #state = {};

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        console.log("State context");
        this.shadowRoot.innerHTML = `<slot></slot>`;
        this.shadowRoot.addEventListener(ActionEvent.name, (e) =>{
            this.#state = this.reducer(this.#state, e.action);
        });
    }

    reducer(state, action){
        return state;
    }

    set initialState(state) {
        this.#state = state;
    }

}