import { switchMap, map, catchError, debounceTime, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as actions from '../constants/actionTypes';
import { API_URL } from '../constants/credentials';
import {receiveMakePayment,receiveUpdatePayment,successWavePayStart,successKbzPayStart,successOnePayStart} from '../actions/makePaymentAction';


export function requestMakePaymentEpic(action$){
    return action$.pipe(
        ofType(actions.REQUEST_MAKE_PAYMENT),
        switchMap((payload)=>{
        return fetch(`${API_URL}/pay/makepayment`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload.payload),
          })
          .then(response => {
              return response.text()})
          .then(data => {
            let formStart = data.search('<form');
            let formEnd = data.search('form>');
            let paymentForm = data.substring(formStart-1, formEnd+5)
            if(paymentForm.search("https://development.owaytrip.com/")!== -1){
              paymentForm = paymentForm.replace('method="POST"','method="GET" target="_blank"');
              paymentForm = paymentForm.replace('https://development.owaytrip.com/',"http://localhost:3000/checkout/mobile-payment/")
            }else{
              paymentForm = paymentForm.replace('method="POST"', 'method="POST" target="_blank"');
            }
           return  receiveMakePayment(paymentForm)
          })
          .catch((error) => {
            console.error('Error:', error);
            return of (error)
          })
        })
    )
}


export function updatePaymentStatus(action$){
  return action$.pipe(
    ofType(actions.UPDATE_PAY_STATUS),
    switchMap((payload) => {
      return ajax.post(`${API_URL}/pay/updatepaystatus`,
                       payload.payload,
                      {
                      'Content-Type': 'application/json'
                      })
                      .pipe(
                          map((response)=>{
                              return receiveUpdatePayment(response.response)
                          }),
                          catchError(error => {
                              console.log(error)
                              return of(error)
                           })
                      )

  })
  )
}

export function startWavePayEpic(action$){
  return action$.pipe(
    ofType(actions.WAVE_PAY_START),
    switchMap((payload)=>{
      return ajax.post(`${API_URL}/pay/wavepay/paystart`,
                        payload.payload,
                        {
                          'Content-Type': 'application/json'
                        }) 
                        .pipe(
                          map((response)=>{
                            return successWavePayStart(response.response)
                          }),
                          catchError(error=>{
                            console.log(error)
                            return of(error)
                          })
                        )
    })
  )
}

export function startKbzPayEpic(action$){
  return action$.pipe(
    ofType(actions.KBZ_PAY_START),
    switchMap((payload)=>{
      return ajax.post(`${API_URL}/pay/kbzpay/checkquery`,
                        payload.payload,
                        {
                          'Content-Type' : 'application/json'
                        })
                        .pipe(
                          map((response)=>{
                            return successKbzPayStart(response.response)
                          }),
                          catchError(error=>{
                            console.log(error)
                            return of(error)
                          })
                        )
    })
  )
}

export function startOnePayEpic(action$){
  return action$.pipe(
    ofType(actions.ONE_PAY_START),
    switchMap((payload)=>{
      return ajax.post(`${API_URL}/pay/onepay/paystart`,
                        payload.payload,
                        {
                          'Content-Type' : 'application/json'
                        })
                        .pipe(
                          map((response)=>{
                            return successOnePayStart(response.response)
                          }),
                          catchError(error=>{
                            console.log(error)
                            return of(error)
                          })
                        )
    })
  )
}
  