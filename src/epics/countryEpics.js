import {switchMap, map, catchError,debounceTime,filter} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as actions from '../constants/actionTypes';
import {receiveCountry} from '../actions/countryAction';
import {DEV_TEST_AI} from '../constants/credentials';

export function requestCountryEpic( action$ ){
    return action$.pipe(
        ofType(actions.REQUEST_COUNTRY),
        switchMap((payload)=>{
            return ajax.post(`${DEV_TEST_AI}/setting/countrycodes`,
                              payload.payload,
                              {
                                'Content-Type':'application/json'
                              })
                        .pipe(
                            map((response)=>{
                                return receiveCountry(response.response)
                            }),
                            catchError(error => {
                                console.log(error)
                                return of(error)
                              })
                        )      
        })    
    )
}