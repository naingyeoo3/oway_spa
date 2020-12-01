import {switchMap, map, catchError,debounceTime,filter} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import * as actions from '../constants/actionTypes';
import { of, from } from 'rxjs';
import {  
    API_URL, DEV_TEST_AI 
} from '../constants/credentials';

import { 
    receiveUserLogin, 
    receiveUserLoginErr,
    receiveUserRegister,
    receiveUserRegisterErr,
    receiveOTPConfirm,
    verifyUserOtpRes,
    verifyUserOtpErr,
    forgotPassRes,
    receiveChangePass
 } from '../actions/users';
 
export function userLogin( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_USER_LOGIN),switchMap((payload)=>{      
        return ajax.post(`${DEV_TEST_AI}/v3/user/userLogInV3`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{
                  if(response.response.code == 200){
                    return receiveUserLogin(response.response)
                  }else if(response.response.code == 144){
                    return receiveOTPConfirm(response.response)
                  }else{
                    return receiveUserLoginErr(response.response)
                  }                                    
            }),              
              catchError(error => {
                return of( receiveUserLoginErr(error.response))
              })
            )
        })              
    )
}
export function userRegister( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_USER_REGISTER),switchMap((payload)=>{      
        return ajax.post(`${DEV_TEST_AI}/v3/user/register`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{
                  if(response.response == 200){
                    return receiveUserRegister(response.response)
                  }else{
                    return receiveUserRegisterErr(response.response)
                  }
            }),              
              catchError(error => {
                return of( receiveUserRegisterErr(error.response))
              })
            )
        })              
    )
}
export function verifyOtp( action$ ){
  return action$.pipe(
    ofType(actions.VERIFY_USER_OTP),switchMap((payload)=>{      
        return ajax.post(`${DEV_TEST_AI}/v3/user/verify`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{ 
                  if(response.response.code == 200){
                    return verifyUserOtpRes(response.response)
                  }else{
                    return verifyUserOtpErr(response.response)
                  }
            }),              
              catchError(error => {
                return of( verifyUserOtpErr(error.response))
              })
            )
        })              
    )
}
export function forgotPass( action$ ){
  return action$.pipe(
    ofType(actions.FORGOT_PASSWORD),switchMap((payload)=>{      
        return ajax.post(`${DEV_TEST_AI}/v3/user/forgetpassword`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{ 
                return forgotPassRes(response.response)                  
            }),              
              catchError(error => {
                return of( forgotPassRes(error.response))
              })
            )
        })              
    )
}
export function changePass( action$ ){
  return action$.pipe(
    ofType(actions.REQUEST_CHANGE_PASSWORD),switchMap((payload)=>{      
        return ajax.post(`${DEV_TEST_AI}/v3/user/changepassword`,payload.payload,{'Content-Type':'application/json'}).pipe(
              map((response)=>{ 
                return receiveChangePass(response.response)                  
            }),              
              catchError(error => {
                return of( receiveChangePass(error.response))
              })
            )
        })              
    )
}
