import * as actions from '../constants/actionTypes';

export function changeFirstName(data){    
    return {
        type: actions.CHANGE_FIRST_NAME,
        payload: data
    }
}
export function changeLastName(data){
    return {
        type: actions.CHANGE_LAST_NAME,
        payload: data
    }
}
export function changeGender(data){
    return {
        type: actions.CHANGE_GENDER,
        payload: data
    }
}
export function changeNation(data){
    return {
        type: actions.CHANGE_NATION,
        payload: data
    }
}
export function changeDateOfBirth(data){
    return {
        type: actions.CHANGE_DATE_OF_BIRTH,
        payload: data
    }
}
export function setVisaFormData(){
    return {
        type: actions.SET_VISA_DEFAULT_VALUE,        
    }
}
export function loadDefaultValues(payload){
    return {
        type: actions.LOAD_DEFAULT_VALUES,
        payload: payload
    }
}