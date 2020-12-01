import { switchMap, map, catchError, debounceTime, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as actions from '../constants/actionTypes';
import { DEV_TEST_AI } from '../constants/credentials';
import {receivePaymentType} from '../actions/paymentAction';
export function requestPaymentTypeEpic(action$) {
    return action$.pipe(
        ofType(actions.REQUEST_PAYMENT_TYPE),
        switchMap((payload) => {
            return ajax.post(`${DEV_TEST_AI}/checkout/v4/all-checkout`,
                             payload.payload,
                            {
                            'Content-Type': 'application/json'
                            })
                            .pipe(
                                map((response)=>{
                                    return receivePaymentType(response.response)
                                }),
                                catchError(error => {
                                    console.log(error)
                                    return of(error)
                                 })
                            )

        })
    )
}