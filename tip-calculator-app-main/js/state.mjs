export default class State {

    #listener = (state) => { }

    #state;

    #initial;

    constructor(initial){
        this.#state = initial;
        this.#initial = initial;
    }

    onUpdate(listener) {
        this.#listener = listener;
        this.#listener({ ...this.#state });
    }

    update(data) {
        this.#state = { ...this.#state, ...data };
        this.#listener({ ...this.#state });
    }

    reset() {
        this.#state = this.#initial;
        this.#listener({ ...this.#state });
    }
}