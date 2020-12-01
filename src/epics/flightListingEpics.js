import {switchMap, map, catchError,debounceTime,filter} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {of} from 'rxjs'
import { API_URL,DEV_TEST_AI } from '../constants/credentials';
import * as actions from '../constants/actionTypes';

import { 
  filterFlightListing, 
  receiveFlightResults,
  reciveNotFoundFlights,
  filterFlightReturn,
  receiveVerifyFlight,
  receiveConfirmFlight} from '../actions/flightsListingAction';

/**
 * 
 * @param action$ 
 * @param store
 * @returns {any|*|Observable}
 */


export function departFilterEpic( action$ ){
  return action$.pipe(
    ofType(actions.ADD_DEPART_FILTER),
    debounceTime(300),
    filter((payload)=> payload.payload),
    map((payload)=>  (payload.page=="flight_listing")? filterFlightListing(payload) : filterFlightReturn(payload))     
  )  
}

export function resetDepartsEpic( action$ ){
  return action$.pipe(
     ofType(actions.RESET_DEPART_FILTER),
     debounceTime(300),
     map((payload)=>  (payload.page=="flight_listing")? filterFlightListing(payload) : filterFlightReturn(payload)) 
  )
} 

export function classFilterEpic( action$ ){
  return action$.pipe(
    ofType(actions.ADD_CLASS_FILTER),
    debounceTime(300),
    filter((payload)=> payload.payload),
    map((payload)=>  (payload.page=="flight_listing")? filterFlightListing(payload) : filterFlightReturn(payload))    
  )  
}

export function resetClassEpic( action$ ){
  return action$.pipe(
     ofType(actions.RESET_CLASS_FILTER),
     debounceTime(300),
     map((payload)=>  (payload.page=="flight_listing")? filterFlightListing(payload) : filterFlightReturn(payload)) 
  )
}

export function priceFilterEpic( action$ ){
  return action$.pipe(
    ofType(actions.ADD_PRICE_FILTER),
    debounceTime(300),
    filter((payload)=> payload.payload),
    map((payload)=>  (payload.page=="flight_listing")? filterFlightListing(payload) : filterFlightReturn(payload))     
  )  
}

export function stopFilterEpic( action$ ){
  return action$.pipe(
    ofType(actions.ADD_STOP_FILTER),
    debounceTime(300),
    filter((payload)=> { return payload.payload}),
    map((payload)=>  (payload.page=="flight_listing")? filterFlightListing(payload) : filterFlightReturn(payload))     
  )  
}

export function resetStopEpic( action$ ){
  return action$.pipe(
    ofType(actions.RESET_FLIGHT_STOP_FILTER),
    debounceTime(300),
    map((payload)=>  (payload.page=="flight_listing")? filterFlightListing(payload) : filterFlightReturn(payload)) 
  )
}

export function airlineFilterEpic( action$ ){
  return action$.pipe(
    ofType(actions.ADD_AIRLILNENAME_FILTER),
    debounceTime(300),
    filter((payload)=> payload.payload),
    map((payload)=>  (payload.page=="flight_listing")? filterFlightListing(payload) : filterFlightReturn(payload))   
  )  
}

export function resetAirlineEpic( action$ ){
  return action$.pipe(
     ofType(actions.RESET_AIRLINENAME_FILTER),
     debounceTime(300),
     map((payload)=>  (payload.page=="flight_listing")? filterFlightListing(payload) : filterFlightReturn(payload)) 
  )
}

export function typeFilterEpic( action$ ){
  return action$.pipe(
    ofType(actions.ADD_TYPE_FILTER),
    debounceTime(300),
    filter((payload)=> payload.payload),
    map(()=> filterFlightListing())    
  )  
}
export function getFlights(action$){  
  return action$.pipe(
    ofType(actions.GET_FLIGHTS),switchMap((payload)=>{
    return ajax.post(`${API_URL}/flight/v4/makeRequest`,payload.payload,{'Content-Type':'application/json'}).pipe(
          map((response)=>{
            if(response.response.code == "200")
            return receiveFlightResults(response)
            else
            return reciveNotFoundFlights(response.response)
          }),
          catchError(error => {
            return of(error)
          })
        )
      }      
    )
  )
}

export function verifyFlightEpic(action$){
  return action$.pipe(
    ofType(actions.VERIFY_FLIGHT),switchMap((payload)=>{
      return ajax.post(`${API_URL}/flight/v4/verifyFlight`,payload.payload,
              {
                'Content-Type':'application/json'
              }
            ).pipe(
              map((response)=>{
                if(response.response.code == "200"){
                  return receiveVerifyFlight(response.response)
                }
                else 
                  return reciveNotFoundFlights()
              }),
              catchError(error => {
                console.log(error)
                return of(error)
              })
            )
    }))
}

export function confirmFlightEpic(action$){
  return action$.pipe(
    ofType(actions.CONFIRM_FLIGHT),switchMap((payload)=>{
      return ajax.post(`${DEV_TEST_AI}/checkout/confirm`,payload.payload,
              {
                'Content-Type':'application/json'
              }
            ).pipe(
              map((response)=>{
                if(response.response.code == "200"){
                  return receiveConfirmFlight(response.response)
                }
                else 
                  return reciveNotFoundFlights()
              }),
              catchError(error => {
                console.log(error)
                return of(error)
              })
            )
    }))
}
