import * as actions from '../constants/actionTypes';
import { PAYMENT_API_KEY } from '../constants/credentials';

export function loadTraveller(count){  
    return {
      type: actions.LOAD_TRAVELLER_INFO,
      payload: count
    }
}
export function changeFirstName(param, id){    
    return {
        type: actions.CHANGE_FIRST_NAME_INPUT,
        payload: param,
        id: id
    }
}
export function changeLastName(param, id){    
    return {
        type: actions.CHANGE_LAST_NAME_INPUT,
        payload: param,
        id: id
    }
}
export function changeCountryName(param, id){    
    return {
        type: actions.CHANGE_COUNTRY_NAME_INPUT,
        payload: param,
        id: id
    }
}
export function changePassportNumber(param, id){    
    return {
        type: actions.CHANGE_PASSPORT_NUMBER_INPUT,
        payload: param,
        id: id
    }
}
export function changeExpireDate(param, id){    
    return {
        type: actions.CHANGE_EXPIRE_DATE_INPUT,
        payload: param,
        id: id
    }
}
export function changeContactFirstName(param){
    return {
        type: actions.CHANGE_CONTACT_FIRST_NAME,
        payload: param
    }
}
export function changeContactLastName(param){
    return {
        type: actions.CHANGE_CONTACT_LAST_NAME,
        payload: param
    }
}
export function changeContactPhone(param){
    return {
        type: actions.CHANGE_CONTACT_PHONE_NO,
        payload: param
    }
}
export function changeContactEmail(param){
    return {
        type: actions.CHANGE_CONTACT_EMAIL,
        payload: param
    }
}
export function changeContactInclude(param){
    return {
        type: actions.CHANGE_CONTACT_ISINCLUDE,
        payload: param
    }
}
export function changeContactEasyBook(param){
    return {
        type: actions.CHANGE_CONTACT_EASY_BOOK,
        payload: param
    }
}
export function requestCheckoutConfirm(payload){
    return {
        type: actions.REQUEST_CHECKOUT_CONFIRM,
        payload: payload
    }
}
export function receiveCheckoutRes(param){
    return {
        type: actions.RECEIVE_CHECKOUT_CONFIRM,
        payload: param
    }
}
export function requestAllCheckout(param){
    return {
        type: actions.REQUEST_ALL_CHECKOUT,
        payload: param
    }
}
export function receiveAllCheckoutRes(param){
    return {
        type: actions.RECEIVE_ALL_CHECKOUT_RESPONSE,
        payload: param
    }
}
export function receiveCheckoutErr(payload){
    return {
        type: actions.RECEIVE_CHECKOUT_ERROR,
        payload: payload
    }
}
export function createTourBooking(payload){
    return {
        type: actions.CREATE_TOUR_BOOKING,
        payload: payload
    }
}
export function receiveCreateTourBooking(payload){ 
    return {
        type: actions.RECEIVE_CREATE_TOUR_BOOKING,
        payload: payload
    }
}
export function createTourInsertOrder(payload){
    return {
        type: actions.CREATE_TOUR_INSERT_ORDER,
        payload: payload
    }
}
export function receiveTourInsertOrder(payload){         
    return {
        type: actions.RECEIVE_TOUR_INSERT_ORDER,
        payload: payload
    }
}
export function makeTourPayment(payload){    
    // const data = {
    //     "version":"v2",
    //     "topUpFlag" : "true",
    //     "orderId": payload.payload.orderId,//3685,
    //     "paymentCategoryId": payload.payload.paymentCategoryId,//1,
    //     "paymentSubCategoryId": payload.payload.paymentSubCategoryId,//1,
    //     "userId": payload.payload.userId, //null,
    //     "userTypeId": payload.payload.userTypeId,//null,
    //     "currencyCode": payload.payload.originTotalAmount.currencyCode,//"USD",
    //     "usdAmount": payload.payload.originTotalAmount.currencyCode == "USD" ? payload.payload.originTotalAmount.grandTotal : payload.payload.exchangeTotalAmount[0].currencyRate,//108.00,originTotalAmount.grandTotal
    //     "mmkAmount": payload.payload.originTotalAmount.currencyCode == "MMK" ? payload.payload.originTotalAmount.grandTotal : payload.payload.exchangeTotalAmount[0].currencyRate,  //120000.00,
    //     "sgdAmount": payload.payload.exchangeTotalAmount[1].currencyRate,//123.00, 
    //     "productId": payload.payload.productId,
    //     "contactName":payload.payload.contactInfo.firstName + payload.payload.contactInfo.lastName,
    //     "contactEmail": payload.payload.contactInfo.email,
    //     "source": payload.payload.source,//"TF",
    //     "channelType": 1,//1,
    //     "frontUrl":"https://development.owaytrip.com/new-thankyou",
    //     "backUrl":"https://development.owaytrip.com/paymentResponse",
    //     "apiKey":PAYMENT_API_KEY   
    // }
    return {
        type: actions.MAKE_TOUR_PAYMENT,
        payload: payload
    }
}
export function receiveTourPaymentRes(response){ 
    console.info(response)    
    return {
        type: actions.RECEIVE_TOUR_PAYMENT_RES,
        payload: response
    }
}
export function updatePayStatus(response){ 
    return {
        type: actions.UPDATE_PAY_STATUS,
        payload: response
    }
}
export function updatePayStatusRes(response){ 
    return {
        type: actions.UPDATE_PAY_STATUS_RES,
        payload: response
    }
}
export function updateBooking(response){ 
    return {
        type: actions.UPDATE_TOUR_BOOKING,
        payload: response
    }
}
export function updateBookingRes(response){ 
    return {
        type: actions.UPDATE_TOUR_BOOKING_RES,
        payload: response
    }
}
export function updateOrder(response){ 
    return {
        type: actions.UPDATE_TOUR_ORDER,
        payload: response
    }
}
export function updateOrderRes(response){ 
    return {
        type: actions.UPDATE_TOUR_ORDER_RES,
        payload: response
    }
}
export function confirmOrder(response){ 
    return {
        type: actions.CONFIRM_TOUR_ORDER,
        payload: response
    }
}
export function confirmOrderRes(response){ 
    return {
        type: actions.CONFIRM_TOUR_ORDER_RES,
        payload: response
    }
}