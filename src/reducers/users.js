import * as types from '../constants/actionTypes';
/**
 * product reducers.
 * @param state
 * @param action
 * @returns {*}
 */

const INITIAL_STATE = {
    isFetching: false,
    user: null,
    otpConfirm: false
}

function users(state = INITIAL_STATE , action) {
    switch (action.type) {
        case types.REQUEST_USER_LOGIN:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.RECEIVE_USER_LOGIN:
            return Object.assign({}, state, {
                user: action.payload,
                isFetching: false
            });              
        case types.RECEIVE_USER_LOGIN_ERR:
            return Object.assign({}, state, {
                user: action.payload,
                isFetching: false
            });  
        case types.REQUEST_USER_REGISTER:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.RECEIVE_USER_REGISTER:
            return Object.assign({}, state, {
                user: action.payload,
                isFetching: false,
                otpConfirm: true
            });              
        case types.RECEIVE_USER_REGISTER_ERR:
            return Object.assign({}, state, {
                user: action.payload,
                isFetching: false
            });       
        case types.RECEIVE_OTP_CONFIRM :
            return Object.assign({}, state, {
                user: action.payload,
                isFetching: false,
                otpConfirm: true
            });       
        case types.VERIFY_USER_OTP:
            return Object.assign({}, state, {
                user: null,
                isFetching: true,
                otpConfirm: true
            });       
        case types.VERIFY_USER_OTP_RES:
            return Object.assign({}, state, {
                user: action.payload,
                isFetching: false,
                otpConfirm: false
            });       
        case types.VERIFY_USER_OTP_ERR:
            return Object.assign({}, state, {
                user: action.payload,
                isFetching: true,
                otpConfirm: true
            }); 
        case types.HIDE_OTP:
            return Object.assign({}, state, {                
                otpConfirm: false,
                isFetching: false
            });
        case types.FORGOT_PASSWORD:
            return Object.assign({}, state, {                
                isFetching: true,
                otpConfirm: true
            });
        case types.FORGOT_PASSWORD_RES:
            return Object.assign({}, state, {                
                isFetching: false,
                user: action.payload,
                otpConfirm: true
            });  
        default:
          return state
      }       
}

export default users;
