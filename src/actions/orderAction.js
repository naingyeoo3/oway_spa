import * as actions from '../constants/actionTypes';

export function insertOrder(payload){
    return {
        type : actions.INSERT_ORDER,
        payload : payload
    }
}

export function successInserOrder(payload){
    console.log("order Insert Payload",payload);
    return {
        type : actions.SUCCESS_INSERT_ORDER,
        payload : payload
    }
}

export function updateOrder(payload){
    return {
        type : actions.UPDATE_ORDER,
        payload : payload
    }
}

export function successUpdateOrder(payload){
    return {
        type :actions.SUCCESS_UPDATE_ORDER,
        payload : payload
    }
}

export function confirmOrder(payload){
    return {
        type : actions.CONFIRM_ORDER,
        payload :payload
    }
}
export function successConfirmOrder(payload){
    return {
        type : actions.SUCCESS_CONFIRM_ORDER,
        payload : payload
    }
}

export function confirmOrderWithEmail(payload){
    return {
        type : actions.CONFIRM_ORDER_WITH_EMAIL,
        payload : payload
    }
}

export function successCofirmOrderWithEmail(payload){
    return {
        type : actions.SUCCESS_CONFIRM_ORDER_WITH_EMAIL,
        payload : payload
    }
}

export function loadOrderFromLocalStorage(payload){
    return {
        type : actions.LOAD_ORDER_FROM_LOCAL_STORAGE,
        payload :payload
    }
}

export function insertBusOrder(payload){
   return {
       type : actions.INSERT_BUS_ORDER,
       payload :payload
   }
}

export function receiveBusOrder(payload){
    return {
        type : actions.RECEIVE_BUS_ORDER,
        payload : payload
    }
}

export function updateBusOrder(payload){
    return {
        type : actions.UPDATE_BUS_ORDER,
        payload : payload
    }
}

export function receiveBusUpdateOrder(payload){
    return {
        type : actions.RECEIVE_UPDATE_BUS_ORDER,
        payload : payload
    }
}

export function confirmBusOrder(payload){
    return {
        type : actions.CONFIRM_BUS_ORDER,
        payload : payload
    }
}

export function receiveBusConfirmOrder(payload){
    return {
        type : actions.RECEIVE_CONFIRM_BUS_ORDER,
        payload : payload
    }
}

