import BaseComponent from '../base-component.mjs';
import StateAwareComponentAdapter from './state-aware-component-adapter.mjs';

export default class StateAwareComponent extends BaseComponent {

    #adapter = new StateAwareComponentAdapter(this.onSafeStateChanged.bind(this));

    async connectedCallback() {
        await super.connectedCallback();
        this.#adapter.setConnected();
    }

    onStateChanged(state) {
        this.#adapter.onStateChanged(state);
    }

    onSafeStateChanged(state) {

    }
}