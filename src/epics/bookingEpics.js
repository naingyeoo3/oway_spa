import { switchMap, map, catchError, debounceTime, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as actions from '../constants/actionTypes';
import { API_URL } from '../constants/credentials';
import {
    receiveCompleteBooking,
    receivePrepareBooking,
    receiveBusBooking    
} from '../actions/bookingAction';

export function requestPrepareBookingEpic(action$){
    return action$.pipe(
        ofType(actions.REQUEST_PREPARE_BOOKING),
        switchMap((payload)=> {
            return ajax.post(`${API_URL}/flight/v4/prepareBooking`,
                              payload.payload,
                              {
                                  'Content-Type' : 'application/json'
                              }
                            ).pipe(
                                map((response)=>{
                                    return receivePrepareBooking(response.response)
                                }),
                                catchError(error =>{
                                    console.log(error);
                                    return of(error)
                                })
                            )
        })
    )
}

export function requestCompleteBookingEpic(action$){
    return action$.pipe(
        ofType(actions.REQUEST_COMPLETE_BOOKING),
        switchMap((payload)=> {
            return ajax.post(`${API_URL}/flight/v4/completeBooking`,
                              payload.payload,
                              {
                                  'Content-Type' : 'application/json'
                              }
                            ).pipe(
                                map((response)=>{
                                    return receiveCompleteBooking(response.response)
                                }),
                                catchError(error =>{
                                    console.log(error);
                                    return of(error)
                                })
                            )
        })
    )
}

export function createBusBookingEpic(action$){
    return action$.pipe(
        ofType(actions.CREATE_BUS_BOOKING),
        switchMap((payload)=> {
            return ajax.post(`${API_URL}/bus/api/v1/startBooking`,
                              payload.payload,
                              {
                                  'Content-Type' : 'application/json'
                              }
                            ).pipe(
                                map((response)=>{
                                    return receiveBusBooking(response.response)
                                }),
                                catchError(error =>{
                                    console.log(error);
                                    return of(error)
                                })
                            )
        })
    )
}