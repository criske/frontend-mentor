export default class StateAwareComponentAdapter {

    #ready = false;

    #pendingState;

    #onSafeStateChanged;

    constructor(onSafeStateChanged) {
        this.#onSafeStateChanged = onSafeStateChanged;
    }

    setConnected(){
        this.#ready = true;
        this.#tryOnStateChanged();
    }

    onStateChanged(state) {
        if (this.#ready) {
            this.#onSafeStateChanged(state);
        } else {
            this.#pendingState = state;
        }
    }

    #tryOnStateChanged(){
        if(this.#pendingState){
            this.#onSafeStateChanged(this.#pendingState);
            this.#pendingState = null;
        }
    }
}