import {switchMap, map, catchError,debounceTime,filter} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import * as actions from '../constants/actionTypes';
import { of, from } from 'rxjs';
import { 
    HOTEL_API_URL, 
    API_URL 
} from '../constants/credentials';

import { 
    receiveHotelsResult,
    receiveHotelsFilter,
    receiveHotelDetail,
    receiveNotFoundHotel,
    receiveHotelError } from '../actions/hotelsListingAction';

import { searchHotelResults } from '../actions/searchActions';

export function searchHotels( action$ ){
    return action$.pipe(
      ofType(actions.REQUEST_HOTEL_AUTOCOMPLETE),switchMap((payload) =>    
        ajax.getJSON(`${HOTEL_API_URL}?term=${payload.payload}`).pipe(           
          map((response) => searchHotelResults(response)),
          catchError(error => {                  
            return of(console.info(error))
          })
        )        
      )
    ) 
  }
export function getHotels(action$){
    return action$.pipe(
        ofType(actions.GET_HOTELS),
        switchMap((payload)=>{
          return ajax.post(`${API_URL}/hotel/v2/`,payload.payload,{'Content-Type':'application/json'})
                     .pipe(
                       map((response)=>receiveHotelsResult(response)),
                       catchError(error => {
                         return of(receiveHotelError(error.response))
                       })
                     )
        })
  
    )
  }
  
  
export function filterHotels(action$){
    return action$.pipe(
      ofType(actions.FILTER_HOTELS),
      switchMap((payload)=>{
        return ajax.post(`${API_URL}/hotel/v2/`,payload.payload,{'Content-Type':'application/json'})
                   .pipe(
                      map((response)=>receiveHotelsResult(response)),
                      catchError(error=>{
                        //console.log("error",error)
                       return of(receiveNotFoundHotel())
                      })
                   )
      })
    )
  }
  
export function getHotelFilters(action$){
    return action$.pipe(
         ofType(actions.GET_HOTEL_FILTERS),
         switchMap((payload)=>{
            return ajax.post(`${API_URL}/hotel/v2/getfilters`,payload.payload,
                    {'Content-Type' : 'application/json'})
                       .pipe(
                         map((response)=>receiveHotelsFilter(response)),
                         catchError(error => {
                          return of(error)
                        })
                       ) 
         })
    )
  }

export function getHotelDetail(action$){
    return action$.pipe(
       ofType(actions.GET_HOTEL_DETAIL),
       switchMap((payload)=>{
         return ajax.post(`${API_URL}/hotel/v2/${payload.slug}`,payload.payload,
                {'Content-Type' : 'application/json'})
                    .pipe(
                       map((response)=> receiveHotelDetail(response)),
                       catchError(error =>{
                         return of (error)
                       })
                    )
       })
    )
  }
  

  
  