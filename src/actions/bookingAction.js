import * as actions from '../constants/actionTypes';

export function requestPrepareBooking(payload){
    return {
        type : actions.REQUEST_PREPARE_BOOKING,
        payload : payload
    }
}

export function receivePrepareBooking(payload){
    return {
        type : actions.RECEIVE_PREPARE_BOOKING,
        payload : payload
    }
}

export function requestCompleteBooking(payload){
    return {
        type : actions.REQUEST_COMPLETE_BOOKING,
        payload :payload
    }
}

export function receiveCompleteBooking(payload) {
    return {
        type : actions.RECEIVE_COMPLETE_BOOKING,
        payload : payload
    }
}

export function loadBookingFromLocalStorage(payload) {
    return {
        type : actions.LOAD_BOOKING_FROM_STORAGE,
        payload : payload
    }
}

export function createBusBooking(payload){
    return {
        type : actions.CREATE_BUS_BOOKING,
        payload : payload
    }
}

export function receiveBusBooking(payload){
    return {
        type : actions.RECEIVE_BUS_BOOKING,
        payload : payload
    }
}

