import {switchMap, map, catchError} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as actions from '../constants/actionTypes';

import { 
  receiveFlightHotDeals,
  receiveBusHotDeals,
  receiveTourHotDeals,
  receiveHotelHotDeals,
  receiveAllHotDeals,
  receiveVisaDeals,
  receiveCarDeals
 } from '../actions/hotdealActions';

import { HOT_DEALS_URL } from '../constants/credentials';
/**
 * 
 * @param action$ 
 * @param store
 * @returns {any|*|Observable}
 */

export function flightEpic( action$ ){
  return action$.pipe(
    ofType(actions.FETCH_FLIGHT_HOT_DEALS),
    switchMap((payload)=>
      ajax({
          url: `${HOT_DEALS_URL}`,
          method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: {                
                ...payload.params,productType: payload.payload
            }
      }).pipe(
        map(response => {return receiveFlightHotDeals(response.response)}),
        catchError(error => {
          console.log('error: ', error);
          return of(error);
        })
      )) 
    )   
}

export function hotelEpic( action$ ){
  return action$.pipe(
    ofType(actions.FETCH_HOTEL_HOT_DEALS),
    switchMap((payload)=>
      ajax({
          url:`${HOT_DEALS_URL}`,
          method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: {                
              ...payload.params,productType: payload.payload
            }
      }).pipe(
        map(response => receiveHotelHotDeals(response.response)),
        catchError(error => {
          console.log('error: ', error);
          return of(error);
        })
      )) 
    )   
}

export function busEpic( action$ ){
  return action$.pipe(
    ofType(actions.FETCH_BUS_HOT_DEALS),
    switchMap((payload)=>
      ajax({
          url:`${HOT_DEALS_URL}`,
          method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: {                
              ...payload.params,productType: payload.payload
            }
      }).pipe(
        map(response => receiveBusHotDeals(response.response)),
        catchError(error => {
          console.log('error: ', error);
          return of(error);
        })
      )) 
    )   
}

export function tourEpic( action$ ){
  return action$.pipe(
    ofType(actions.FETCH_TOUR_HOT_DEALS),
    switchMap((payload)=>
      ajax({
          url:`${HOT_DEALS_URL}`,
          method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: {                
              ...payload.params,productType: payload.payload
            }
      }).pipe(
        map(response => receiveTourHotDeals(response.response)),
        catchError(error => {
          console.log('error: ', error);
          return of(error);
        })
      )) 
    )   
}

export function hotdealEpic( action$ ){
  return action$.pipe(
    ofType(actions.FETCH_ALL_HOT_DEALS),
    switchMap((payload)=>
      ajax({
          url:`${HOT_DEALS_URL}`,
          method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: {                
              ...payload.params,productType: payload.payload
            }
      }).pipe(
        map(response => receiveAllHotDeals(response.response)),
        catchError(error => {
          console.log('error: ', error);
          return of(error);
        })
      )) 
    )   
}

export function visaEpic( action$ ){
  return action$.pipe(
    ofType(actions.FETCH_VISA_HOT_DEALS),
    switchMap((payload)=>
      ajax({
          url:`${HOT_DEALS_URL}`,
          method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: {                
              ...payload.params,productType: payload.payload
            }
      }).pipe(
        map(response => receiveVisaDeals(response.response)),
        catchError(error => {
          console.log('error: ', error);
          return of(error);
        })
      )) 
    )   
}

export function carEpic( action$ ){
  return action$.pipe(
    ofType(actions.FETCH_CAR_HOT_DEALS),
    switchMap((payload)=>
      ajax({
          url:`${HOT_DEALS_URL}`,
          method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: {                
              ...payload.params,productType: payload.payload
            }
      }).pipe(
        map(response => receiveCarDeals(response.response)),
        catchError(error => {
          console.log('error: ', error);
          return of(error);
        })
      )) 
    )   
}