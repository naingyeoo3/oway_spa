import * as types from '../constants/actionTypes';
import moment from 'moment';
/**
 * product reducers.
 * @param state
 * @param action
 * @returns {*}
 */

const INITIAL_STATE = {
    isFetching: false,
    checkout: null,
    allCheckout: null,
    booking: {
        isFetching: false,
        create: null
    },
    makePayment: {
        isFetching: false,
        payment: null
    },
    payStatus: {
        isFetching: false,
        data: null
    }
}

function checkoutReducer(state = INITIAL_STATE , action) {
    switch (action.type) {
        case types.REQUEST_CHECKOUT_CONFIRM:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.RECEIVE_CHECKOUT_CONFIRM:
            return Object.assign({}, state, {
                isFetching: false,
                checkout: action.payload
            })
        case types.REQUEST_ALL_CHECKOUT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.RECEIVE_ALL_CHECKOUT_RESPONSE:
            return Object.assign({}, state, {
                isFetching: false,
                allCheckout: action.payload
            })
        case types.CREATE_TOUR_BOOKING:
            return Object.assign({}, state, {
                booking: {
                    isFetching: true,
                    create: null
                }
            });
        case types.RECEIVE_CREATE_TOUR_BOOKING:
            return Object.assign({}, state, {
                booking: {
                    isFetching: false,
                    create: action.payload
                }
            })
        case types.MAKE_TOUR_PAYMENT:
            return Object.assign({}, state, {
                makePayment: {
                    isFetching: true,
                    payment: null
                }
            });
        case types.RECEIVE_TOUR_PAYMENT_RES:
            return Object.assign({}, state, {
                makePayment: {
                    isFetching: false,
                    payment: action.payload
                }
            })    
        case types.CHECK_OUT_CONFIRM_BUS : 
             return Object.assign({},state,{
                 isFetching : true
             })
        case types.RECEIVE_CHECKOUT_CONFIRM_BUS :
             return Object.assign({},state,{
                 isFetching : false,
                 checkout : action.payload
             })                               
        case types.CLEAR_CHEKCOUT:
            return Object.assign({}, state, {
                isFetching: false,
                checkout: null,
                allCheckout: null,
                booking: {
                    isFetching: false,
                    create: null
                },
                makePayment: {
                    isFetching: false,
                    payment: null
                },
                payStatus: {
                    isFetching: false,
                    data: null
                }
            })
        default:
          return state
      }       
}

export default checkoutReducer;
