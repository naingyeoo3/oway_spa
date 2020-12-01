import {switchMap, map, catchError, debounceTime} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as actions from '../constants/actionTypes';

import { 
  receiveTourListing, 
  receiveTourError,
  sortPriceAsc,
  sortPriceDec,
  receiveTourDetail,
  receiveCategoryFilter,
  receiveSortDiscountAce,
  receiveSortDiscountDec,
  receiveSortRecommendedAce,
  receiveSortRecommendedDec,
  receiveTourLoadMore,
  filterFeartureTourSearch,
  receiveDailyRate
} from '../actions/toursListingActions';

import { API_URL } from '../constants/credentials';
/**
 * 
 * @param action$ 
 * @param store
 * @returns {any|*|Observable}
 */

export function tourListingEpic( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_TOUR_LISTING),switchMap((payload)=>{
        return ajax.post(`${API_URL}/destination/v2/list`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{return receiveTourListing(response.response)}),
              catchError(error => {
                return of(receiveTourError(error.response))
              })
            )
        })              
    )   
}
export function sortPriceAceEpice( action$ ){
  return action$.pipe(
     ofType(actions.REQUEST_SORT_PRICE_ASC),
     debounceTime(300),
     map(()=> sortPriceAsc())
  )
} 
export function sortPriceDecEpice( action$ ){
  return action$.pipe(
     ofType(actions.REQUEST_SORT_PRICE_DEC),
     debounceTime(300),
     map(()=> sortPriceDec())
  )
} 
export function tourDetailEpic( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_TOUR_DETAIL),switchMap((payload)=>{
        return ajax.post(`${API_URL}/destination/v2/detail`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{return receiveTourDetail(response.response)}),
              catchError(error => {
                return of(receiveTourError(error.response))
              })
            )
        })
    )   
}
export function categoryFilterEpic( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_CATEGORY_FILTER),switchMap((payload)=>{
        return ajax.post(`${API_URL}/destination/v1/categories`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{return receiveCategoryFilter(response.response)}),
              catchError(error => {
                return of(error)
              })
            )
        })              
    )   
}
export function sortDiscountAceEpic( action$ ){
  return action$.pipe(
     ofType(actions.REQUEST_SORT_DISCOUNT_ACE),
     debounceTime(300),
     map(()=> receiveSortDiscountAce())
  )
} 
export function sortDiscountDecEpic( action$ ){
  return action$.pipe(
     ofType(actions.REQUEST_SORT_DISCOUNT_DEC),
     debounceTime(300),
     map(()=> receiveSortDiscountDec())
  )
}
export function sortRecommedAceEpic( action$ ){
  return action$.pipe(
     ofType(actions.REQUEST_SORT_RECOMMENDED_ACE),
     debounceTime(300),
     map(()=> receiveSortRecommendedAce())
  )
} 
export function sortRecommedDecEpic( action$ ){
  return action$.pipe(
     ofType(actions.REQUEST_SORT_RECOMMENDED_DEC),
     debounceTime(300),
     map(()=> receiveSortRecommendedDec())
  )
}
export function loadMoreEpic( action$ ){
  return action$.pipe(
    ofType(actions.LOAD_MORE_TOUR),
    
    debounceTime(300),
    map((payload)=> receiveTourLoadMore(payload.payload))
  )
}
export function filterTourSearch( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_FILTER_TOUR_SEARCH),      
    debounceTime(300),
    map((payload)=> filterFeartureTourSearch(payload.payload))
  )
}
export function dailyRate( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_DAILY_RATE),switchMap((payload)=>{
        return ajax.post(`${API_URL}/destination/v2/dailyrate`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{return receiveDailyRate(response.response)}),
              catchError(error => {
                return of(error)
              })
            )
        })              
    )   
}
