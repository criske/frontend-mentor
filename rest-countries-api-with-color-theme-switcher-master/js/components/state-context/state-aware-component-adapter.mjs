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

    onStateChanged(current, previous) {
        if (this.#ready) {
            this.#onSafeStateChanged(current, previous);
        } else {
            this.#pendingState = { current, previous};
        }
    }

    #tryOnStateChanged(){
        if(this.#pendingState){
            this.#onSafeStateChanged(this.#pendingState.current, this.#pendingState.previous);
            this.#pendingState = null;
        }
    }
}