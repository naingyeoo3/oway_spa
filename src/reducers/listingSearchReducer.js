import * as types from '../constants/actionTypes';
import moment from 'moment';
const dateFormat = 'DD MMM YYYY';
/**
 * form reducers.
 * @param state
 * @param action
 * @returns {*}
 */

const INITIAL_STATE = {
    flight: {
        plan: 1,
        from: '',
        to:'',
        fromDate: '',
        toDate: ''
    }    
}

function listingSearchReducer(state = INITIAL_STATE , action) {
    switch (action.type) {
        case types.CHANGE_TRIP_TYPE:
            return Object.assign({}, state, {
                flight: {
                    plan: action.payload,
                    from: '',
                    to:'',
                    fromDate: '',
                    toDate: ''
                }
            });        
        default:
          return state
      }       
}

export default listingSearchReducer;
