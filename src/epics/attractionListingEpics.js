import {switchMap, map, catchError, debounceTime} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as actions from '../constants/actionTypes';

import {
    receiveAttrListing,
    receiveAttrError,
    receiveCategoryFilter,
    receiveAttrSortDiscountAce,
    receiveAttrSortDiscountDec,
    receiveAttrSortRecommendedAce,
    receiveAttrSortRecommendedDec,
    sortAttrPriceAsc,
    sortAttrPriceDec,
    receiveAttrLoadMore,
    receiveAttrDetail,
    receiveFilterAttrSearch
} from '../actions/attractionActions';

import { API_URL } from '../constants/credentials';
/**
 * 
 * @param action$ 
 * @param store
 * @returns {any|*|Observable}
 */

export function attrListingEpic( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_ATTR_LISTING),switchMap((payload)=>{
        return ajax.post(`${API_URL}/destination/v2/list`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{return receiveAttrListing(response.response)}),
              catchError(error => {
                return of(receiveAttrError(error.response))
              })
            )
        })              
    )   
}
export function attrCategoryEpic( action$ ){
    return action$.pipe(
      ofType(actions.REQUEST_ATTR_CATEGORY),switchMap((payload)=>{
          return ajax.post(`${API_URL}/destination/v1/categories`,payload.payload,{'Content-Type':'application/json'}).pipe(
                map((response)=>{return receiveCategoryFilter(response.response)}),
                catchError(error => {
                  return of(error)
                })
              )
          })              
      )   
}
export function attrDetailEpic( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_ATTR_DETAIL),switchMap((payload)=>{
        return ajax.post(`${API_URL}/destination/v2/detail`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{return receiveAttrDetail(response.response)}),
              catchError(error => {
                return of(receiveAttrError(error.response))
              })
            )
        })
    )   
} 
export function attrSortDiscountAceEpic( action$ ){
  return action$.pipe(
      ofType(actions.REQUEST_ATTR_SORT_DISCOUNT_ACE),
      debounceTime(300),
      map(()=> receiveAttrSortDiscountAce())
  )
} 
export function attrSortDiscountDecEpic( action$ ){
  return action$.pipe(
      ofType(actions.REQUEST_ATTR_SORT_DISCOUNT_DEC),
      debounceTime(300),
      map(()=> receiveAttrSortDiscountDec())
  )
}
export function attrSortRecommedAceEpic( action$ ){
  return action$.pipe(
      ofType(actions.REQUEST_ATTR_SORT_RECOMMENDED_ACE),
      debounceTime(300),
      map(()=> receiveAttrSortRecommendedAce())
  )
} 
export function attrSortRecommedDecEpic( action$ ){
  return action$.pipe(
      ofType(actions.REQUEST_ATTR_SORT_RECOMMENDED_DEC),
      debounceTime(300),
      map(()=> receiveAttrSortRecommendedDec())
  )
}
export function attrSortPriceAceEpice( action$ ){
  return action$.pipe(
      ofType(actions.REQUEST_ATTR_SORT_PRICE_ASC),
      debounceTime(300),
      map(()=> sortAttrPriceAsc())
  )
} 
export function attrSortPriceDecEpice( action$ ){
  return action$.pipe(
      ofType(actions.REQUEST_ATTR_SORT_PRICE_DEC),
      debounceTime(300),
      map(()=> sortAttrPriceDec())
  )
} 

export function loadMoreAttrEpic( action$ ){
  return action$.pipe(
    ofType(actions.LOAD_MORE_ATTR),      
    debounceTime(300),
    map((payload)=> receiveAttrLoadMore(payload.payload))
  )
}

export function filterAttrSearch( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_FILTER_ATTRACTION_SEARCH),      
    debounceTime(300),
    map((payload)=> receiveFilterAttrSearch(payload.payload))
  )
}