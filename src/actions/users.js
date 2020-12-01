import * as actions from '../constants/actionTypes';
import history from '../utils/history';

export function requestUserLogin(payload){    
    return {
        type: actions.REQUEST_USER_LOGIN,
        payload: payload
    }
}
export function receiveUserLogin(payload){   
    history.push('/')
    return {
        type: actions.RECEIVE_USER_LOGIN,
        payload: payload
    }
}
export function receiveUserLoginErr(payload){    
    return {
        type: actions.RECEIVE_USER_LOGIN_ERR,
        payload: payload
    }
}
export function requestUserRegister(payload){    
    return {
        type: actions.REQUEST_USER_REGISTER,
        payload: payload
    }
}
export function receiveUserRegister(payload){    
    return {
        type: actions.RECEIVE_USER_REGISTER,
        payload: payload
    }
}
export function receiveUserRegisterErr(payload){    
    return {
        type: actions.RECEIVE_USER_REGISTER_ERR,
        payload: payload
    }
}
export function receiveOTPConfirm(payload){    
    return {
        type: actions.RECEIVE_OTP_CONFIRM,
        payload: payload
    }
}
export function verifyUserOtp(payload){
    return {
        type: actions.VERIFY_USER_OTP,
        payload: payload
    }
}
export function verifyUserOtpRes(payload){
    history.push('/change-password')
    return {
        type: actions.VERIFY_USER_OTP_RES,
        payload: payload
    }
}
export function verifyUserOtpErr(payload){
    return {
        type: actions.VERIFY_USER_OTP_ERR,
        payload: payload
    }
}
export function requestOtpHide(){
    return {
        type: actions.HIDE_OTP
    }
}
export function forgotPasswrod(payload){
    return {
        type: actions.FORGOT_PASSWORD,
        payload: payload
    }
}
export function forgotPassRes(payload){
    return {
        type: actions.FORGOT_PASSWORD_RES,
        payload: payload
    }
}
export function requestChangePass(payload){
    return {
        type: actions.REQUEST_CHANGE_PASSWORD,
        payload: payload
    }
}
export function receiveChangePass(payload){
    return {
        type: actions.RECEIVE_CHANGE_PASSWORD,
        payload: payload
    }
}
