import {switchMap, map, catchError,debounceTime,filter} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { filterBuses } from '../actions/busListingActions';
import * as actions from '../constants/actionTypes';

import { 
  receiveOnewayBusListing, 
  receiveRoundtripBusListing,
  receiveBusDetail,
  receiveBusReturnListing,
  receiveBusError,
  receiveConfrimBus,
  receiveOwayTier
} from '../actions/busListingActions';

import { API_URL,DEV_TEST_AI } from '../constants/credentials';
/**
 * 
 * @param action$ 
 * @param store
 * @returns {any|*|Observable}
 */

export function busOnewayListingEpic( action$ ){  
  return action$.pipe(
    ofType(actions.REQUEST_ONEWAY_BUS_LISTING),switchMap((payload)=>{
        return ajax.post(`${API_URL}/bus/api/v1/oneWay`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{
                if(response.response.code == "200")
                  return receiveOnewayBusListing(response.response)
                    else
                  return receiveBusError(response.response)
                })
            )
        })              
    )   
}
export function busRoundTripListingEpic( action$ ){  
  return action$.pipe(
    ofType(actions.REQUEST_ROUNDTRIP_BUS_LISTING),switchMap((payload)=>{
        return ajax.post(`${API_URL}/bus/api/v1/roundTrip`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{
                if(response.response.code == "200")
                  return receiveRoundtripBusListing(response.response)
                    else
                  return receiveBusError(response.response)
                })
            )
        })              
    )   
}

export function busReturnListingEpic( action$ ){ 
  return action$.pipe(
     ofType(actions.REQUEST_BUS_RETURN_LISTING),switchMap((payload)=>{
       return ajax.post(`${API_URL}/bus/api/v1/returnTrip`,payload.payload,
       {'Content-Type':'application/json'}).pipe(
         map((response)=>{
          if(response.response.code == "200")
              return receiveBusReturnListing(response.response)
                else
              return receiveBusError(response.response)
            })
       )
     }))
}

export function busDetailEpic( action$ ) {
  return action$.pipe(
    ofType(actions.LOAD_BUS_DETAIL),
    switchMap((payload)=>{
      return ajax.post(`${API_URL}/bus/api/v1/busDetail`,payload.payload,{'Content-Type':'application/json'}).pipe(
          map((response)=>{
            return receiveBusDetail(response.response)
          }),
          catchError(error=>{
            return of(error)
          })
      )
    })
  )
}

//bus confirm 

export function busConfirmEpic(action$) {
  return action$.pipe(
    ofType(actions.CONFIRM_BUS),
    switchMap((payload)=>{
      return ajax.post(`${API_URL}/bus/api/v1/confirm`,payload.payload,{
        'Content-Type' : 'application/json'
      }).pipe(
        map((response)=>{
          return receiveConfrimBus(response.response)
        }),
        catchError(error=>{
          return of(error)
        })
      )
    })
  )
}


export function requestOwayTierEpic(action$){
  return action$.pipe(
    ofType(actions.REQUEST_OWAY_TIER),
    switchMap((payload)=>{
      return ajax.post(`${API_URL}/flight/owayTier`,payload.payload,{
        'Content-Type' : 'application/json'
      }).pipe(
        map((response)=>{
          return receiveOwayTier(response.response)
        }),
        catchError(error=>{
          return of (error)
        })
      )
    })
  )
}

export function busPriceFilterEpic(action$){
  return action$.pipe(
    ofType(actions.ADD_BUS_PRICE_FILTER),
    debounceTime(300),
    filter((payload)=> payload.payload),
    map((payload)=> filterBuses(payload))
 )
}

export function busOperatorsFilterEpic(action$){
  return action$.pipe(
     ofType(actions.ADD_BUS_OPERATOR_FILTER),
     debounceTime(300),
     filter((payload)=> payload.payload),
     map((payload)=> filterBuses(payload))
  )
}

export function busResetOperatorsFilter(action$){
  return action$.pipe(
    ofType(actions.RESET_BUS_OPERATOR_FILTER),
    debounceTime(300),
    map((payload)=>filterBuses(payload))
  )
}

export function busClassesFilterEpic(action$){
  return action$.pipe(
     ofType(actions.ADD_BUS_CLASS_FILTER),
     debounceTime(300),
     filter((payload)=>payload.payload),
     map((payload)=> filterBuses(payload))
  )
}

export function busResetClassesFilterEpic(action$){
  return action$.pipe(
    ofType(actions.RESET_BUS_CLASS_FILTER),
    debounceTime(300),
    map((payload)=>filterBuses(payload))
  )
}

export function busDepartFilterEpic(action$){
  return action$.pipe(
    ofType(actions.ADD_BUS_DEPT_FILTER),
    debounceTime(300),
    filter((payload)=>payload.payload),
    map((payload)=>filterBuses(payload))
  )
}

export function busResetDepartFilterEpic(action$){
  return action$.pipe(
    ofType(actions.RESET_DEPART_FILTER),
    debounceTime(300),
    filter((payload)=>payload.payload),
    map((payload)=>filterBuses(payload))
  )
}

export function busAmenitiesFilterEpic(action$){
  return action$.pipe(
     ofType(actions.ADD_BUS_AMENITIES_FILTER),
     debounceTime(300),
     filter((payload)=>payload.payload),
     map((payload)=>filterBuses(payload))
  )
}

export function busResetAmenitiesFilterEpic(action$){
  return action$.pipe(
    ofType(actions.RESET_BUS_AMENITIES_FILTER),
    debounceTime(300),
    map((payload)=>filterBuses(payload))
  )
}