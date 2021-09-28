import ActionEvent from "./action-event.mjs";

export default class StateContext extends HTMLElement {

    #state = {};

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<slot></slot>`;
        this.shadowRoot.addEventListener(ActionEvent.name, (e) => {
            this.#state = this.reducer(this.#state, e.action);
            Array
                .from(this.querySelectorAll('*'))
                .filter(e => 'onStateChanged' in e)
                .forEach(e => e.onStateChanged({ ...this.#state }));
        });
    }

    reducer(state, action) {
        return state;
    }

    set initialState(state) {
        this.#state = state;
    }

}