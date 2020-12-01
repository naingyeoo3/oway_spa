import * as actions from '../constants/actionTypes';

export function requestHotelCheckout(payload){
  return {
      type : actions.REQUEST_HOTEL_CHECKOUT,
      payload : payload,
  }
}
export function receiveHotelCheckout(payload){
    return {
        type: actions.RECEIVE_HOTEL_CHECKOUT,
        payload: payload
    }
}
export function requestHotelOrderInsert(payload){    
    return {
        type: actions.REQUEST_HOTEL_ORDER_INSERT,
        payload: payload
    }
}
export function receiveHotelOrderInsert(payload){
    console.info('reserve response')
    return {
        type: actions.RECEIVE_HOTEL_ORDER_INSERT,
        payload: payload
    }
}

export function createHotelOrder(payload){
    return {
        type: actions.CREATE_HOTEL_ORDER,
        payload: payload
    }
}
export function receiveHotelOrder(payload){
    return {
        type: actions.RECEIVE_HOTEL_ORDER,
        payload: payload
    }
}
export function makeHotelPayment(payload){
    return {
        type: actions.MAKE_HOTEL_PAYMENT,
        payload: payload
    }
}
export function receiveHotelPayment(payload){
    return {
        type: actions.RECEIVE_HOTEL_PAYMENT,
        payload: payload
    }
}

export function changeFirstName(payload){
    return {
        type: actions.CHANGE_FIRST_NAME_HOTEL,
        payload: payload
    }
}
export function changeLastName(payload){
    return {
        type: actions.CHANGE_LAST_NAME_HOTEL,
        payload: payload
    }
}
export function changePhoneNum(payload){
    return {
        type: actions.CHANGE_PHONE_NUM_HOTEL,
        payload: payload
    }
}
export function changeEmailInput(payload){
    return {
        type: actions.CHANGE_EMAIL_INPUT_HOTEL,
        payload: payload
    }
}
export function changeAlsoTravelling(payload){
    return {
        type: actions.CHANGE_ALSO_TRAVELLING,
        payload: payload
    }
}
export function changeAdultName(payload){
    return {
        type: actions.CHANGE_ADULT_NAME,
        payload: payload
    }
}
export function changeAdultLastName(payload){
    return {
        type: actions.CHANGE_ADULT_LAST_NAME,
        payload: payload
    }
}
export function changeAddPhoneNum(payload){
    return {
        type: actions.CHANGE_ADD_PHONE_NUM,
        payload: payload
    }
}
export function changeCountryName(payload){
    return {
        type: actions.CHANGE_COUNTRY_NAME,
        payload: payload
    }
}
export function changePassportNum(payload){
    return {
        type: actions.CHANGE_PASSPORT_NUM_HOTEL,
        payload: payload
    }
}
export function receivePayUpdate(payload){
    return {
        type: actions.RECEIVE_PAY_UPDATE,
        payload: payload
    }
}
export function receiveHotelOrderUpdate(payload){
    return {
        type: actions.RECEIVE_HOTEL_ORDER_UPDATE,
        payload: payload
    }
}
export function receiveHotelOrderConfirm(payload){
    return {
        type: actions.RECEIVE_HOTEL_ORDER_CONFIRM,
        payload: payload
    }
}
export function requestAllCheckout(payload){
    return {
        type: actions.REQUEST_HOTEL_ALL_CHECKOUT,
        payload: payload
    }
}
export function receiveAllCheckout(payload){
    return {
        type: actions.RECEIVE_HOTEL_ALL_CHECKOUT,
        payload: payload
    }
}
