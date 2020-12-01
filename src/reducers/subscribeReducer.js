import * as types from '../constants/actionTypes';
/**
 * product reducers.
 * @param state
 * @param action
 * @returns {*}
 */

const INITIAL_STATE = {    
    isFetching: false,
    response: null    
}

function subscribeReducer(state = INITIAL_STATE , action) {
    switch (action.type) {
        case types.SENT_USER_SUBSCRIBE:            
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.RECEIVE_USER_SUBSCRIBE:
            return Object.assign({}, state, {
                isFetching: false,
                response: action.payload
            });
        case types.RECEIVE_ERROR_SUBSCRIBE:
            return Object.assign({}, state, {
                isFetching: true,
                response: action.payload
            });
        default:
          return state
      }       
}

export default subscribeReducer;
