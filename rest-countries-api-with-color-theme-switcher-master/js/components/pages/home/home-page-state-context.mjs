import StateContext from "../../state-context/state-context.mjs";

export class HomePageStateContext extends StateContext {

    constructor() {
        super();
        super.initialState = {
            countries: [],
            mode: 'filter' 
        };
    }
    reducer(state, action) {
        return {
            mode: action.type,
            countries: action.data
        };
    }

}