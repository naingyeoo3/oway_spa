import { switchMap, map, catchError, debounceTime, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as actions from '../constants/actionTypes';
import {DEV_TEST_AI} from '../constants/credentials';
import {receiveBusCheckout} from '../actions/busCheckoutAction';

export function requestConfirmBusCheckoutEpic(action$){
    return action$.pipe(
        ofType(actions.CHECK_OUT_CONFIRM_BUS),
        switchMap((payload)=> {
            return ajax.post(`${DEV_TEST_AI}/checkout/confirm`,
                              payload.payload,
                              {
                                  'Content-Type' : 'application/json'
                              }
                            ).pipe(
                                map((response)=>{
                                    return receiveBusCheckout(response.response)
                                }),
                                catchError(error =>{
                                    console.log(error);
                                    return of(error)
                                })
                            )
        })
    )
}
