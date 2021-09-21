import StateContext from "../../state-context/state-context.mjs";

export class HomePageStateContext extends StateContext {

    constructor() {
        super();
        super.initialState = {
            countries: [],
            mode: 'filtering'
        };
    }
    reducer(state, action) {
        let newState;
        switch (action.type) {
            case 'countries': {
                newState = { ...state, countries: action.data };
                break;
            }
            case 'mode' : {
                newState = {...state, mode: action.data};
                break;
            }
            default: {
                newState = state;
            }
        }
        return newState;
    }

}