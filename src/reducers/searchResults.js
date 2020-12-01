import * as actions from '../constants/actionTypes';
/**
 * product reducers.
 * @param state
 * @param action
 * @returns {*}
 */

const INITIAL_STATE = {
    startTrip : {
        isFetching: false,        
        data      : []
    },
    destTrip : {
        isFetching: false,        
        data      : []
    },
    hotelDest: {
        isFetching: false,
        data      : null
    },
    menu : {
        menu: '/flights'
    }
}

function searchResults(state = INITIAL_STATE , action) {    
    switch (action.type) {        
        case actions.REQUEST_CITIES_FETCHING:
            return Object.assign({}, state, {
                startTrip : {
                    isFetching: true,                    
                    data      : state.startTrip.data
                }
            })
        case actions.RECEIVE_SEARCH_RESULTS:
            return Object.assign({}, state, {
                startTrip : {
                    isFetching: false,                    
                    data: action.results.data ? action.results.data : []
                }
            }); 
        case actions.REQUEST_DEST_AUTOCOMPLETE:
            return Object.assign({}, state, {
                destTrip : {
                    isFetching: true,                 
                    data      : state.destTrip.data
                }
            });
        case actions.RECEIVE_DEST_AUTOCOMPLETE_RESULTS:
            return Object.assign({}, state, {
                destTrip : {
                    isFetching: false,                 
                    data: action.results.data ? action.results.data : []
                }
            });
        case actions.REMOVE_SEARCH_RESULTS:
            return Object.assign({}, state, {
                startTrip: {
                    isFetching: false,                    
                    data      : []
                },
                destTrip: {
                    isFetching: false,                    
                    data      : []
                }
            })
        case actions.REQUEST_SEARCH_HOTEL_RESULTS:
            return Object.assign({}, state, {
                hotelDest: {
                    isFetching: true,
                    data: state.hotelDest.data
                }
            })
        case actions.RECEIVE_SEARCH_HOTEL_RESULTS:
            return Object.assign({}, state, {
                hotelDest: {
                    isFetching: false,
                    data: !!action.results.data ? action.results.data : null
                }
            })
        case actions.RECEIVE_HOTEL_API_NULL:
            return Object.assign({}, state, {
                hotelDest: {
                    isFetching: false,
                    data: null
                }
            })
        case actions.REMOVE_HOTEL_RESULTS:
            return Object.assign({}, state, {
                hotelDest: {
                    isFetching: false,
                    data: null
                }
            })        
        case actions.RECEIVE_SEARCH_ERROR:            
            return Object.assign({}, state, {
                hotelDest: {
                    isFetching: false,
                    data: {
                        code: action.payload.code,
                        message: action.payload.message
                    }
                }
            })
        default:
          return state
      }       
}

export default searchResults;