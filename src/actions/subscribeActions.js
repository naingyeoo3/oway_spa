import * as actions from '../constants/actionTypes';

export function sentUserSubscribe(payload){    
    return {
        type: actions.SENT_USER_SUBSCRIBE,
        payload: payload
    }
}
export function receiveSubscribeRes(payload){ 
    return {
        type: actions.RECEIVE_USER_SUBSCRIBE,
        payload: payload
    }
}
export function receiveSubscribeErr(payload){    
    return {
        type: actions.RECEIVE_ERROR_SUBSCRIBE,
        payload: payload
    }
}

