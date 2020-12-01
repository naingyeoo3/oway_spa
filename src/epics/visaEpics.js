import {switchMap, map, catchError,debounceTime,filter} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import * as actions from '../constants/actionTypes';
import { of, from } from 'rxjs';
import {  
    API_URL, DEV_TEST_AI 
} from '../constants/credentials';

import { 
    receiveVisaSearch,
    receiveApplyVisa,
    receiveCheckoutVisa
 } from '../actions/visaActions';
 
export function searchVisa( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_VISA_SEARCH),switchMap((payload)=>{      
        return ajax.post(`${API_URL}/visa/v1/search`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{return receiveVisaSearch(response.response)}),              
              catchError(error => {
                return of(console.info(error))
              })
            )
        })              
    )
}
export function applyVisa( action$ ){
    return action$.pipe(
      ofType(actions.APPLY_VISA),switchMap((payload)=>{      
          return ajax.post(`${API_URL}/visa/v1/apply`,payload.payload,{'Content-Type':'application/json'}).pipe(
                map((response)=>{return receiveApplyVisa(response.response)}),              
                catchError(error => {
                  return of(console.info(error))
                })
              )
          })              
      )
}
export function checkoutVisa( action$ ){
    return action$.pipe(
      ofType(actions.REQUEST_VISA_CHECKOUT),switchMap((payload)=>{      
          return ajax.post(`${DEV_TEST_AI}/checkout/confirm`,payload.payload,{'Content-Type':'application/json'}).pipe(
                map((response)=>{return receiveCheckoutVisa(response.response)}),              
                catchError(error => {
                  return of(console.info(error))
                })
              )
          })              
      )
}