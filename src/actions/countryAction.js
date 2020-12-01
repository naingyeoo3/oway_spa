import * as actions from '../constants/actionTypes';

export function requestCountry(payload){
    return {
        type    : actions.REQUEST_COUNTRY,
        payload : payload
    }

}

export function receiveCountry(payload){
    return {
        type : actions.RECEIVE_COUNTRY,
        payload : payload
    }
}