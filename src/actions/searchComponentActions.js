import * as actions from '../constants/actionTypes';

export function handleDefaultValueSearchComponent(payload){        
    return {
        type: actions.DEFAULT_VALUE_SEARCH_COMPONENTS,
        payload: payload
    }
}
export function autocompleteSelectFromValue(keyword, title, id){    
    return {
        type: actions.SET_AUTOCOMPLETE_FROM_VALUE,
        payload: {
            keyword: keyword,
            title: title,
            id: id
      }
    }
}
export function autocompleteSelectToValue(keyword, title, id){
    return {
        type: actions.SET_AUTOCOMPLETE_TO_VALUE,
        payload: {
            keyword: keyword,
            title: title,
            id: id
        }
    }
}
export function searchDateFromValue(date){
    return {
        type: actions.SEARCH_DATE_FROM_VALUE,
        payload: date
    }
}
export function searchDateToValue(date){
    return {
        type: actions.SEARCH_DATE_TO_VALUE,
        payload: date
    }
}
export function searchOneWayDate(date){
    return {
        type: actions.SEARCH_ONEWAY_DATE_VALUE,
        payload: date
    }
}
export function addTravllerCount(travellerType){
    return {
        type: actions.ADD_COUNT_TRAVELLER,
        travellerType: travellerType
    }
}
export function reduceTravllerCount(travellerType){
    return {
        type: actions.REDUCE_COUNT_TRAVELLER,
        travellerType: travellerType
    }
}

export function selectTravellerClass(title, keyword){
    return {
        type: actions.SELECT_TRAVELLER_CLASS,
        payload: {
            title: title,
            keyword: keyword
        }
    }
}

export function changeNationType(nationType){    
    return {
        type: actions.CHANGE_NATION_TYPE,
        payload: nationType
    }
}

export function changeTripPlan(type){    
    return {
        type: actions.CHANGE_TRIP_PLAN,
        payload: type
    }
}
export function handlingSwapSearchValue(){
    return {
        type: actions.SWAP_SEARCH_VALUE
    }
}
export function handleRefreshState(){
    return {
        type: actions.IS_REFRESING_STATE
    }
}
export function handleRefreshStateEnd(){
    return {
        type: actions.IS_REFRESING_STATE_END
    }
}
export function selectDestinationValue(value){    
    return {
        type: actions.SELECT_DESTINATION_VALUE,
        payload: value
    }
}
export function addChildAgeSelector(){
    return {
        type: actions.ADD_AGE_SELECTOR
    }
}
export function reduceChildAgeSelector(){
    return {
        type: actions.REDUCE_AGE_SELECTOR
    }
}

export function selectChildAge(name, age){
    return {
        type: actions.SELECT_CHILD_AGE,
        payload:{
            name: name,
            age: age
        }        
    }
}

export function selectTourDestinationValue(destination){    
    return {
        type: actions.SELECT_TOUR_DESTINATION,
        payload: destination
    }
}
export function selectTraveller(value){
    return {
        type: actions.SELECT_TRAVELLER_COUNT,
        payload: value
    }
}