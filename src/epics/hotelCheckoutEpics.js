import {switchMap, map, catchError,debounceTime,filter} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import * as actions from '../constants/actionTypes';
import { of, from } from 'rxjs';
import {  
    API_URL, DEV_TEST_AI 
} from '../constants/credentials';

import { 
    receiveHotelCheckout,
    receiveHotelOrderInsert,
    receiveHotelOrder,
    receiveHotelPayment,
    receiveAllCheckout
 } from '../actions/hotelCheckoutAction';
 
export function requestHotelCheckout( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_HOTEL_CHECKOUT),switchMap((payload)=>{      
        return ajax.post(`${DEV_TEST_AI}/checkout/confirm`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{return receiveHotelCheckout(response.response)}),              
              catchError(error => {
                return of(console.info(error))
              })
            )
        })              
    )
  }
export function requestHotelAllCheckout( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_HOTEL_ALL_CHECKOUT),switchMap((payload)=>{      
        return ajax.post(`${DEV_TEST_AI}/checkout/v4/all-checkout`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{return receiveAllCheckout(response.response)}),              
              catchError(error => {
                return of(console.info(error))
              })
            )
        })              
    )
  }  

// export function requestHotelOrderInsert( action$ ){
  // return action$.pipe(
    // ofType(actions.REQUEST_HOTEL_ORDER_INSERT),switchMap((payload)=>{
    //     return ajax.post(`${API_URL}/hotel/v2/order`,payload.payload,{'Content-Type':'application/json'}).pipe(
    //           map((response)=>{return receiveHotelOrderInsert(response.response)}),              
    //           catchError(error => {
    //             return of(console.info(error))
    //           })
    //         )
    //     })
    // )    
  // }
// export function createHotelOrder( action$ ){
  // return action$.pipe(
    // ofType(actions.CREATE_HOTEL_ORDER),switchMap((payload)=>{
    //     return ajax.post(`${API_URL}/order/hotel/store`,payload.payload,{'Content-Type':'application/json'}).pipe(
    //           map((response)=>{return receiveHotelOrder(response.response)}),              
    //           catchError(error => {
    //             return of(console.info(error))
    //           })
    //         )
    //     })              
    // )    
  // }
  
  export function makeHotelPayment(action$){    
    return action$.pipe(
        ofType(actions.MAKE_HOTEL_PAYMENT),
        switchMap((payload)=>{
        return fetch(`${API_URL}/pay/makepayment`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload.payload),
          })
          .then(response => { return response.text()})            
          .then(data => {
            let formStart = data.search('<form');
            let formEnd = data.search('form>');
            let paymentForm = data.substring(formStart-1, formEnd+5)
            paymentForm = paymentForm.replace('method="POST"', 'method="POST" target="_blank"');
            return  receiveHotelPayment(paymentForm)
          })
          .catch((error) => {
            console.error('Error:', error);
            return of (error)
          })
        })
    )
}