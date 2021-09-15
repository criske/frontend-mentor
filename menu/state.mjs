/*jshint esversion: 9 */
import Actions from './actions.mjs';

export default class State {

    #state = {
        expanded: true,
        selected: -1,
        entries: []
    };

    #listener = (action, state) => { };

    setListener(listener) {
        this.#listener = listener;
    }

    toggle() {
        this.#update(Actions.TOGGLE, { expanded: !this.#state.expanded });
    }

    entries(entries) {
        this.#update(Actions.ENTRIES, { entries });
        if (entries.length > 0) {
            this.select(0);
        }
    }

    select(selected) {
        if (this.#state.selected != selected) {
            this.#update(Actions.SELECTED, { selected });
        }
        this.toggle();
    }

    selectedEntry() {
        return this.#state.entries[this.#state.selected];
    }

    #update(action, newState) {
        this.#state = { ...this.#state, ...newState };
        this.#listener(action, this.#state);
    }

}