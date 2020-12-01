import * as types from '../constants/actionTypes';
/**
 * product reducers.
 * @param state
 * @param action
 * @returns {*}
 */

const INITIAL_STATE = {
    flight: {
        items : [],
        isFetching: false
    },
    bus: {
        items : [],
        isFetching: false
    },
    hotel: {
        items : [],
        isFetching: false
    },
    tour: {
        items : [],
        isFetching: false
    },
    deals: {
        items : [],
        isFetching: false
    },
    visa: {
        items : [],
        isFetching: false
    },
    car: {
        items :[],
        isFetching: false
    }
}

function hotDealReducer(state = INITIAL_STATE , action) {
    switch (action.type) {
        case types.FETCH_FLIGHT_HOT_DEALS:
            return Object.assign({}, state, {
                flight: {
                    items : [],
                    isFetching: true
                }
            });
        case types.RECEIVE_FLIGHT_HOT_DEALS:
            return Object.assign({}, state, {
                flight: {
                    items : action.payload.data,
                    isFetching: false
                }
            });
        case types.FETCH_BUS_HOT_DEALS:
            return Object.assign({}, state, {
                bus: {
                    items : [],
                    isFetching: true
                }
            });
        case types.RECEIVE_BUS_HOT_DEALS:
            return Object.assign({}, state, {
                bus: {
                    items : action.payload.data,
                    isFetching: false
                }
            });
        case types.FETCH_HOTEL_HOT_DEALS:
            return Object.assign({}, state, {
                hotel: {
                    items : [],
                    isFetching: true
                }
            });
        case types.RECEIVE_HOTEL_HOT_DEALS:
            return Object.assign({}, state, {
                hotel: {
                    items : action.payload.data,
                    isFetching: false
                }
            });
        case types.FETCH_TOUR_HOT_DEALS:
            return Object.assign({}, state, {
                tour: {
                    items : [],
                    isFetching: true
                }
            });
        case types.RECEIVE_TOUR_HOT_DEALS:
            return Object.assign({}, state, {
                tour: {
                    items : action.payload.data,
                    isFetching: false
                }
            });
        case types.FETCH_ALL_HOT_DEALS:
            return Object.assign({}, state, {
                deals: {
                    items : [],
                    isFetching: true
                }
            });
        case types.RECEIVE_ALL_HOT_DEALS:            
            return Object.assign({}, state, {
                deals: {
                    items : action.payload.data,
                    isFetching: false
                }
            });
        case types.FETCH_VISA_HOT_DEALS:
            return Object.assign({}, state, {
                visa: {
                    items : [],
                    isFetching: true
                }
            });
        case types.RECEIVE_VISA_HOT_DEALS:            
            return Object.assign({}, state, {
                visa: {
                    items : action.payload.data,
                    isFetching: false
                }
            });
        case types.FETCH_CAR_HOT_DEALS:
            return Object.assign({}, state, {
                car: {
                    items : [],
                    isFetching: true
                }
            });
        case types.RECEIVE_CAR_HOT_DEALS:            
            return Object.assign({}, state, {
                car: {
                    items : action.payload.data,
                    isFetching: false
                }
            });
        default:
          return state
      }       
}

export default hotDealReducer;
