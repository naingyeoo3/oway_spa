import {switchMap, map, catchError, debounceTime} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as actions from '../constants/actionTypes';

import { 
  receiveCheckoutRes,
  receiveAllCheckoutRes,
  receiveCreateTourBooking,
  receiveTourInsertOrder,
  receiveTourPaymentRes,
  makeTourPayment,
  updatePayStatusRes
} from '../actions/tourCheckoutActions';

import { API_URL, DEV_TEST_AI } from '../constants/credentials';
/**
 * 
 * @param action$ 
 * @param store
 * @returns {any|*|Observable}
 */

export function tourCheckoutEpic( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_CHECKOUT_CONFIRM),switchMap((payload)=>{
        return ajax.post(`${DEV_TEST_AI}/checkout/confirm`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{return receiveCheckoutRes(response.response)}),              
              catchError(error => {
                return of(receiveCheckoutErr(error.response))                
              })
            )
        })              
    )   
}
export function allCheckoutEpic( action$ ){
    return action$.pipe(
      ofType(actions.REQUEST_ALL_CHECKOUT),switchMap((payload)=>{
          return ajax.post(`${DEV_TEST_AI}/checkout/v4/all-checkout`,payload.payload,{'Content-Type':'application/json'}).pipe(
                map((response)=>{return receiveAllCheckoutRes(response.response)}),
                catchError(error => {
                  return of(receiveCheckoutErr(error.response))
                })
              )
          })              
      )   
  }
  export function createTourBooking(action$){
    return action$.pipe(
        ofType(actions.CREATE_TOUR_BOOKING),switchMap((payload)=>{
            return ajax.post(`${API_URL}/destination/v2/booking/create`,payload.payload,{'Content-Type':'application/json'}).pipe(
                    map((response)=>{
                        return receiveCreateTourBooking(response.response)
                    }),
                    catchError(error =>{
                        return of(error)
                    })
                )
            })              
        )   
}
export function insertOrder(action$){
    return action$.pipe(
        ofType(actions.CREATE_TOUR_INSERT_ORDER),switchMap((payload)=>{
            return ajax.post(`${DEV_TEST_AI}/order/v2/destination/store`,payload.payload,{'Content-Type':'application/json'}).pipe(
                    map((response)=> 
                        receiveTourInsertOrder(response.response)
                    ),
                    catchError(error => {
                        return of(error)
                    })                    
                )
            })
            // ,map((payload)=> makeTourPayment(payload))                          
        )   
  }
export function makePayment(action$){    
    return action$.pipe(
        ofType(actions.MAKE_TOUR_PAYMENT),
        switchMap((payload)=>{
        return fetch(`${API_URL}/pay/makepayment`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload.payload),
          })
          .then(response => {
            console.log(response);return response.text()})
          .then(data => {
            let formStart = data.search('<form');
            let formEnd = data.search('form>');
            let paymentForm = data.substring(formStart-1, formEnd+5)
            paymentForm = paymentForm.replace('method="POST"', 'method="POST" target="_blank"');
            return  receiveTourPaymentRes(paymentForm)
          })
          .catch((error) => {
            console.error('Error:', error);
            return of (error)
          })
        })
    )
}
export function paymentConfirm(action$){
  return action$.pipe(
      ofType(actions.UPDATE_PAY_STATUS),switchMap((payload)=>{
          return ajax.post(`${API_URL}/pay/updatepaystatus `,payload.payload,{'Content-Type':'application/json'}).pipe(
                  map((response)=> 
                      updatePayStatusRes(response.response)
                  ),
                  catchError(error => {
                      return of(error)
                  })                    
              )
          })                 
      )   
}
