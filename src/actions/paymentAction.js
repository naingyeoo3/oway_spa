import * as actions from '../constants/actionTypes';

export function requestPaymentType(payload){
    return {
        type : actions.REQUEST_PAYMENT_TYPE,
        payload : payload
    }
}

export function receivePaymentType(payload){
    return {
        type : actions.RECEIVE_PAYMENT_TYPE,
        payload : payload
    }
}
