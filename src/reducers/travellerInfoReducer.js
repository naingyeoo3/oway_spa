import * as actions from '../constants/actionTypes';
const INITIAL_STATE = {
    adult: [],
    child: [],
    infant: []
}

function travellerInfoReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.ADD_ADULT_TRAVELLER_INFO: return Object.assign({}, state, {
            adult: [...state.adult, action.payload]
        })
        case actions.ADD_CHILD_TRAVELLER_INFO: return Object.assign({}, state, {
            child: [...state.child, action.payload]
        })
        case actions.ADD_INFANT_TRAVELLER_INFO: return Object.assign({}, state, {
            infant: [...state.infant, action.payload]
        })
        default: return state;
    }
}

export default travellerInfoReducer;