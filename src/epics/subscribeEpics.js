import {switchMap, map, catchError} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as actions from '../constants/actionTypes';

import { 
  receiveSubscribeRes,  
  receiveSubscribeErr 
} from '../actions/subscribeActions';

import { SUBSCRIBE_API_URL } from '../constants/credentials';
/**
 * 
 * @param action$ 
 * @param store
 * @returns {any|*|Observable}
 */

export function userSubscribe( action$ ){
  return action$.pipe(
    ofType(actions.SENT_USER_SUBSCRIBE),switchMap((payload)=>{
        return ajax.post(`${SUBSCRIBE_API_URL}`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{return receiveSubscribeRes(response.response)}),
              catchError(error => {
                return of(receiveSubscribeErr(error.response))
              })
            )
        })              
    )     
}
