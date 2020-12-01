import * as actions from '../constants/actionTypes';


export function confirmBusCheckout(payload){  
    return {
      type: actions.CHECK_OUT_CONFIRM_BUS,
      payload: payload
    }
}

export function receiveBusCheckout(payload){
    console.log(payload)
    return {
        type : actions.RECEIVE_CHECKOUT_CONFIRM_BUS,
        payload : payload
    }
}