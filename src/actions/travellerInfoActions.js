import * as actions from '../constants/actionTypes';


export function addAdultTravellerInfo(payload){
    return {
        type: actions.ADD_ADULT_TRAVELLER_INFO,
        payload : payload

    }
}
export function addChildTravellerInfo(payload){
    return {
        type: actions.ADD_CHILD_TRAVELLER_INFO,
        payload : payload

    }
}
export function addInfantTravellerInfo(payload){
    return {
        type: actions.ADD_INFANT_TRAVELLER_INFO,
        payload : payload

    }
}