import * as actions from '../constants/actionTypes';

export function requestMakePayment(payload){
   return {
       type : actions.REQUEST_MAKE_PAYMENT,
       payload : payload
   }
}

export function receiveMakePayment(payload){
    return {
        type : actions.RECEIVE_MAKE_PAYMENT,
        payload : payload
    }
}

export function updatePaymentStatus(payload){
    return {
        type : actions.UPDATE_PAY_STATUS,
        payload : payload
    }
}

export function receiveUpdatePayment(payload){
   return {
       type : actions.UPDATE_PAY_STATUS_RES,
       payload :payload
   }
}

export function requestWavePayStart(payload){
    return {
        type : actions.WAVE_PAY_START,
        payload : payload
    }
}

export function successWavePayStart(payload){
    return {
        type : actions.SUCCESS_WAVE_PAY_START,
        payload : payload
    }
}

export function requestOnePayStart(payload){
    return {
        type : actions.ONE_PAY_START,
        payload : payload
    }
}

export function successOnePayStart(payload){
    return {
        type : actions.SUCCESS_ONE_PAY,
        payload : payload
    }
}

export function requestKbzPayStart(payload){
    return {
        type : actions.KBZ_PAY_START,
        payload : payload
    }
}

export function successKbzPayStart(payload){
    return {
        type : actions.SUCCESS_KBZ_PAY,
        payload : payload
    }
}
export function alertMsg(){
    return {
        type: actions.ALERT_MSG
    }
}