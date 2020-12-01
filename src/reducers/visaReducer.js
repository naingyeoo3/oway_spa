import * as types from '../constants/actionTypes';
/**
 * product reducers.
 * @param state
 * @param action
 * @returns {*}
 */

const INITIAL_STATE = {
    info:{

    },
    searchRes: {
        isFetching: false,
        data: null
    },
    applyRes: {
        isFetching: false,
        data: null
    },
    checkout: {
        isFetching: false,
        data: null
    }
}

function visaReducer(state = INITIAL_STATE , action) {
    switch (action.type) {
        case types.REQUEST_VISA_SEARCH:
            return Object.assign({}, state, {
                searchRes: {
                    isFetching: true,
                    data: null
                }
            });
        case types.RECEIVE_VISA_SEARCH:
            return Object.assign({}, state, {
                searchRes: {
                    isFetching: false,
                    data: action.payload
                }
            });              
        case types.APPLY_VISA:
            return Object.assign({}, state, {
                applyRes: {
                    isFetching: true,
                    data: null
                }
            });
        case types.RECEIVE_APPLY_VISA:
            return Object.assign({}, state, {
                applyRes: {
                    isFetching: false,
                    data: action.payload
                }
            });
        case types.REQUEST_VISA_CHECKOUT:
            return Object.assign({}, state, {
                checkout: {
                    isFetching: true,
                    data: null
                }
            });
        case types.RECEIVE_VISA_CHECKOUT:
            return Object.assign({}, state, {
                checkout: {
                    isFetching: false,
                    data: action.payload
                }
            });
        default:
          return state
      }       
}

export default visaReducer;
