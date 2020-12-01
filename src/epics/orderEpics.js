import { switchMap, map, catchError, debounceTime, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as actions from '../constants/actionTypes';
import { DEV_TEST_AI } from '../constants/credentials';
import { successInserOrder, 
       successUpdateOrder, 
       successConfirmOrder,
       successCofirmOrderWithEmail,
       receiveBusOrder } from '../actions/orderAction';

export function inserOrderEpic(action$){
    return action$.pipe(
        ofType(actions.INSERT_ORDER),
        switchMap((payload) => {
            return ajax.post(`${DEV_TEST_AI}/order/v3/flight/store`,
                             payload.payload,
                            {
                            'Content-Type': 'application/json'
                            })
                            .pipe(
                                map((response)=>{
                                    return successInserOrder(response.response)
                                }),
                                catchError(error => {
                                    console.log(error)
                                    return of(error)
                                 })
                            )

        })
    )
}

export function updateOrderEpic(action$){
    return action$.pipe(
        ofType(actions.UPDATE_ORDER),
        switchMap((payload)=>{
            return ajax.post(`${DEV_TEST_AI}/order/v3/flight/update`,
                             payload.payload,{
                                'Content-Type': 'application/json' 
                             })
                             .pipe(
                                 map((response)=>{
                                     return successUpdateOrder(response.response)
                                 }),
                                 catchError(error=>{
                                     console.log(error)
                                     return of(error)
                                 })
                             )
        })
    )
} 

export function confirmOrderEpic(action$){
    return action$.pipe(
         ofType(actions.CONFIRM_ORDER),
         switchMap((payload)=>{
             return ajax.post(`${DEV_TEST_AI}/order/v3/flight/confirm`,
                               payload.payload,
                               {
                                   'Content-Type' : 'application/json'
                               }     
                             )
                             .pipe(
                                 map((response)=>{
                                     return successConfirmOrder(response.response)
                                 }),
                                 catchError(error=>{
                                     console.log(error)
                                     return of(error)
                                 })
                             )
         })
    )
}

export function confirmOrderEpicWithEmail(action$){
    return action$.pipe(
        ofType(actions.CONFIRM_ORDER_WITH_EMAIL),
        switchMap((payload)=>{
            return ajax.post(`${DEV_TEST_AI}/order/v3/flight/confirm`,
            payload.payload,
            {
                'Content-Type' : 'application/json'
            }     
          )
          .pipe(
              map((response)=>{
                  return successCofirmOrderWithEmail(response.response)
              }),
              catchError(error=>{
                  console.log(error)
                  return of(error)
              })
           )
        })
    )
}

export function insertBusOrderEpic(action$){
    return action$.pipe(
        ofType(actions.INSERT_BUS_ORDER),
        switchMap((payload) => {
            return ajax.post(`${DEV_TEST_AI}/order/v3/bus/store`,
                             payload.payload,
                            {
                            'Content-Type': 'application/json'
                            })
                            .pipe(
                                map((response)=>{
                                    return receiveBusOrder(response.response)
                                }),
                                catchError(error => {
                                    console.log(error)
                                    return of(error)
                                 })
                            )

        })
    )
}

