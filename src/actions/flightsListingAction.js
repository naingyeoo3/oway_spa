import * as actions from '../constants/actionTypes';

export function requestFlightData(data){
    return {
        type : actions.GET_FLIGHTS,
        payload : data
    }
}

export function loadFlightDataFromStorage(data){
      return {
          type : actions.LOAD_FLIGHT_LISTING_FROM_STORAGE,
          payload : data
      }
}

export function receiveFlightResults(result){    
    return {
      type : actions.RECEIVE_FLIGHT_RESULTS,
      payload : result.response
    }
 }

export function reciveNotFoundFlights(payload){    
    return {
        type : actions.RECEIVE_NOT_FOUND_FLIGHTS,
        payload: payload
    }
} 
export function filterFlightData(data,filterType){    
    return {
        type : actions.FILTER_FLIGHTS,
        payload : data,
        filterType:filterType
    }
}

export function sortFlightData(data){
    return {
        type : actions.SORT_FLIGHTS,
        payload : data
    }
}

export function sortFilteredFlightData(data){
    return {
        type : actions.SORT_FILTERED_FLIGHTS,
        payload :data
    }
}
export function selectFlight(data,referKey){
    return {
        type : actions.SELECT_FLIGHT,
        payload : data,
        referKey : referKey
    }
}

export function addStopFilter(e,page){    
    return {
        type: actions.ADD_STOP_FILTER,
        page : page, // for normal Flight listing and return Flight Listing
        payload: e.target.value.toString(),
        checked : e.target.checked
    }
}
export function resetStopFilter(page){
    return {
        type: actions.RESET_FLIGHT_STOP_FILTER,
        page: page
    }
}
export function addPriceFilter(value,page){
    return {
        type: actions.ADD_PRICE_FILTER,
        page : page,
        payload: value  
    }
}
export function resetPriceFilter(page){
    return {
        type: actions.RESET_PRICE_FILTER,
        page: page
    }
}
export function addAirlineNameFilter(e,page){
    return {
        type: actions.ADD_AIRLILNENAME_FILTER,
        page: page,
        payload: e.target.value,
        checked: e.target.checked
    }
}

export function resetAirlineNameFilter(page){
    return {
        type: actions.RESET_AIRLINENAME_FILTER,
        page: page
    }
}
export function addDepartFilter(e,page){
    return {
        type: actions.ADD_DEPART_FILTER,
        page : page,
        payload: e.target.value,
        checked : e.target.checked
    }
}
export function resetDepartFilter(page){
    return {
        type: actions.RESET_DEPART_FILTER,
        page: page
    }
}
export function addTypeFilter(value){
    return {
        type: actions.ADD_TYPE_FILTER,
        payload: value
    }
}
export function resetTypeFilter(){
    return {
        type: actions.RESET_TYPE_FILTER
    }
}
export function addClassFilter(e,page){
    return {
        type: actions.ADD_CLASS_FILTER,
        page : page,
        payload: e.target.value,
        checked: e.target.checked
    }
}
export function resetClassFilter(page) {
    return {
        type: actions.RESET_CLASS_FILTER,
        page: page
    }
}
export function srotByAirline(page){
    return {
        type: actions.SORT_BY_AIRLINE,
        page: page
    }
}
export function sortByDuration(page){
    return {
        type: actions.SORT_BY_DEURATION,
        page: page
    }
}
export function sortByDepart(page){
    return {
        type: actions.SORT_BY_DEPART,
        page: page
    }
}
export function sortByArrival(page){
    return {
        type: actions.SORT_BY_ARRIVAL,
        page: page
    }
}
export function sortByPrice(page){
    return {
        type: actions.SORT_BY_PRICE,
        page: page
    }
}
export function loadMoreFlight(){
    return {
        type : actions.LOAD_MORE_FLIGHT,
    }
}

export function loadMoreFlightReturn(){
    return {
        type :actions.LOAD_MORE_FLIGHT_RETURN
    }
}
export function filterFlightListing(payload){
    return {
        page: payload.page,
        type: actions.FILTER_FLIGHT_LISTING
    }
}

export function filterFlightReturn(payload){
    return {
        page : payload.page,
        type : actions.FILTER_FLIGHT_RETURN
    }
}

export function verifyFlight(payload){
    console.log("Verifying flight Action",payload)
    return {
        type : actions.VERIFY_FLIGHT,
        payload : payload
    }
}

export function receiveVerifyFlight(payload){
    console.log("Receive Verify Payload",payload)
    return {
        type : actions.RECEIVE_VERIFY_FLIGHT,
        payload : payload
    }
}

export function confirmFlight(payload){
    console.log("Flight Confirmation")
    return {
        type : actions.CONFIRM_FLIGHT,
        payload : payload
    }
}

export function receiveConfirmFlight(payload){
    return {
        type : actions.RECEIVE_CONFIRM_FLIGHT,
        payload : payload
    }
}
