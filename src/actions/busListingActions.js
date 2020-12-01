import * as actions from '../constants/actionTypes';

export function requestOnewayBusListing(payload){    
    return {
        type: actions.REQUEST_ONEWAY_BUS_LISTING,
        payload: payload
    }
}
export function receiveOnewayBusListing(data){
    return {
        type: actions.RECEIVE_ONEWAY_BUS_LISTING,
        payload: data
    }
}
export function requestRoundtripBusListing(payload){    
    return {
        type: actions.REQUEST_ROUNDTRIP_BUS_LISTING,
        payload: payload
    }
}
export function receiveRoundtripBusListing(data){
    return {
        type: actions.RECEIVE_ROUNDTRIP_BUS_LISTING,
        payload: data
    }
}
export function receiveBusError(payload){
    return {
        type: actions.RECEIVE_BUS_ERROR,
        payload: payload
    }
}
export function requestBusReturnListing(payload){
   return {
       type : actions.REQUEST_BUS_RETURN_LISTING,
       payload : payload
   }
}
export function receiveBusReturnListing(data){
    return {
        type : actions.RECEIVE_BUS_RETURN_LISTING,
        payload : data
    }
}
export function addBusPriceFilter(value,tripType){
    return {
        type : actions.ADD_BUS_PRICE_FILTER,
        payload : value,
        tripType:tripType
    }
}
export function resetBusPriceFilter(tripType){
    return {
        type : actions.RESET_BUS_PRICE_FILTER,
        tripType : tripType
    }
}


export function addBusClassFilter(e,tripType){
    return {
        type    : actions.ADD_BUS_CLASS_FILTER,
        payload : e.target.value,
        checked : e.target.checked,
        tripType : tripType
    }
}
export function resetBusClassFilter(tripType){
    return {
        type : actions.RESET_BUS_CLASS_FILTER,
        tripType:tripType
    }
}

export function addBusDeptFilter(e,tripType){
    return {
        type    : actions.ADD_BUS_DEPT_FILTER,
        payload : e.target.value,
        checked : e.target.checked,
        tripType : tripType
    }
}
export function resetBusDeptFilter(tripType){
    return {
        type : actions.RESET_BUS_DEPT_FILTER,
        tripType : tripType
    }
}

export function addBusOperatorFilter(e,tripType){
    return {
        type    : actions.ADD_BUS_OPERATOR_FILTER,
        payload : e.target.value,
        checked : e.target.checked,
        tripType : tripType
    }
}
export function resetBusOperatorFilter(tripType){
    return {
        type : actions.RESET_BUS_OPERATOR_FILTER,
        tripType : tripType
    }
}


export function addBusAmenitiesFilter(e,tripType){
    return {
        type    : actions.ADD_BUS_AMENITIES_FILTER,
        payload : e.target.value,
        checked : e.target.checked,
        tripType : tripType
    }
}
export function resetBusAmenitiesFilter(tripType){
    return {
        type : actions.RESET_BUS_AMENITIES_FILTER,
        tripType : tripType
    }
}

export function filterBuses(payload){
    console.log("payload",payload)
    return {
        type       : actions.FILTER_BUSES,
        tripType     : payload.tripType
    }
}

export function loadMoreBus(tripType){
    return {
        tripType : tripType,
        type : actions.LOAD_MORE_BUS,
    }
}

export function loadBusDetail(payload){
    return {
        type : actions.LOAD_BUS_DETAIL,
        payload : payload
    }
}

export function receiveBusDetail(payload){
    return {
        type : actions.RECEIVE_BUS_DETAIL,
        payload : payload
    }
}

//sorting 

export function sortByBusExpressName(tripType){
    return {
        type : actions.BUS_SORT_BY_EXPRESS,
        tripType : tripType 
    }
}

export function sortByBusPrice(tripType){
    return {
        type : actions.BUS_SORT_BY_PRICE,
        tripType : tripType 
    }
}

export function sortByBusArrival(tripType) {
    return {
        type : actions.BUS_SORT_BY_ARRIVAL,
        tripType : tripType 
    }
}

export function sortByBusDeparture(tripType){
    return {
        type : actions.BUS_SORT_BY_DEPARTS,
        tripType : tripType
    }
}

export function sortByBusDuration(tripType){
    return {
        type : actions.BUS_SORT_BY_DURATION,
        tripType : tripType
    }
}

export function confirmBus(payload,busRoute,tripType){
    return {
        type : actions.CONFIRM_BUS,
        payload : payload,
        busRoute:busRoute,
        tripType : tripType
    }
}

export function selectOneWayBus(payload){
    return {
        type : actions.SELECT_ONE_WAY_BUS,
        payload : payload

    }
}


export function receiveConfrimBus(payload){
    return {
        type : actions.RECEIVE_CONFIRM_BUS,
        payload : payload
    }
}

export function requestOwayTier(payload){
    return {
        type : actions.REQUEST_OWAY_TIER,
        payload : payload
    }
}

export function receiveOwayTier(payload){
    return {
        type : actions.RECEIVE_OWAY_TIER,
        payload :payload
    }
}