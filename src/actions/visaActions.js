import * as actions from '../constants/actionTypes';

export function requestVisaSearch(payload){    
    return {
        type: actions.REQUEST_VISA_SEARCH,
        payload: payload
    }
}
export function receiveVisaSearch(payload){    
    return {
        type: actions.RECEIVE_VISA_SEARCH,
        payload: payload
    }
}
export function applyVisa(payload){
    return {
        type: actions.APPLY_VISA,
        payload: payload
    }
}
export function receiveApplyVisa(payload){
    return {
        type: actions.RECEIVE_APPLY_VISA,
        payload: payload
    }
}
export function requestCheckoutVisa(payload){
    return {
        type: actions.REQUEST_VISA_CHECKOUT,
        payload: payload
    }
}
export function receiveCheckoutVisa(payload){
    return {
        type: actions.RECEIVE_VISA_CHECKOUT,
        payload: payload
    }
}