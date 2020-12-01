import * as actions from '../constants/actionTypes';

export function changeTripType(name){  
    return {
      type: actions.CHANGE_TRIP_TYPE,
      payload: name
    }
}
export function focusFromAutcomplete(){  
    return {
      type: actions.FOCUS_FROM_AUTOCOMPLETE,
    }
}
export function leaveFromAutocomplete(){  
    return {
      type: actions.LEAVE_FROM_AUTOCOMPLETE      
    }
}
export function searchAutocomplete(input){  
    return {
      type: actions.SEARCH_LISTING_AUTOCOMPLETE,
      payload: input      
    }
}
export function selectListingFromValue(value){
    return {
        type: actions.SELECT_LISTING_FROM_VALUE,
        payload: value
    }
}
export function selectListingToValue(value){
    return {
        type: actions.SELECT_LISTING_To_VALUE,
        payload: value
    }
}