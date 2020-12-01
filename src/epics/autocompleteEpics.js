import {switchMap, map, catchError} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as actions from '../constants/actionTypes';

import { 
    searchResults, 
    searchDestResults
  } from '../actions/searchActions';

import { FLIGHT_AUTOCOMPLETE_API } from '../constants/credentials';

export function search( action$ ){
    return action$.pipe(
      ofType(actions.REQUEST_SEARCH_AUTOCOMPLETE),
      switchMap((payload)=> 
        ajax.getJSON(`${FLIGHT_AUTOCOMPLETE_API}?q=${payload.payload}`).pipe(          
            map((response) => searchResults(response)),
            catchError(error => {
              return of(error)
            })
            )
        ))    
  }
  
export function searchDest( action$ ){
    return action$.pipe(
      ofType(actions.REQUEST_DEST_AUTOCOMPLETE),switchMap((payload) =>     
        ajax.getJSON(`${FLIGHT_AUTOCOMPLETE_API}?q=${payload.payload}`).pipe(
          map(response => searchDestResults(response)),
          catchError(error => {          
            return of(error);
          })
        )    
      )
    ) 
  }  