import * as actions from '../constants/actionTypes';

export function fetchFlightHotDeals(params){    
    return {
        type: actions.FETCH_FLIGHT_HOT_DEALS,
        params:params,
        payload: 'flights'
    }
}

export function receiveFlightHotDeals(data){    
    return {
        type: actions.RECEIVE_FLIGHT_HOT_DEALS,
        payload: data
    }
}

export function fetchHotelHotDeals(params){    
    return {
        type: actions.FETCH_HOTEL_HOT_DEALS,
        payload: 'hotels',
        params : params
    }
}

export function receiveHotelHotDeals(data){    
    return {
        type: actions.RECEIVE_HOTEL_HOT_DEALS,
        payload: data
    }
}

export function fetchBusHotDeals(params){    
    return {
        type: actions.FETCH_BUS_HOT_DEALS,
        payload: 'bus',
        params : params
    }
}

export function receiveBusHotDeals(data){    
    return {
        type: actions.RECEIVE_BUS_HOT_DEALS,
        payload: data
    }
}

export function fetchTourHotDeals(params){    
    return {
        type: actions.FETCH_TOUR_HOT_DEALS,
        payload: 'tours',
        params : params
    }
}

export function receiveTourHotDeals(data){    
    return {
        type: actions.RECEIVE_TOUR_HOT_DEALS,
        payload: data
    }
}

export function fetchAllHotDeals(params){ 
    return {
        type: actions.FETCH_ALL_HOT_DEALS,
        params : params,
        payload: 'all'
    }
}

export function receiveAllHotDeals(data){    
    return {
        type: actions.RECEIVE_ALL_HOT_DEALS,
        payload: data
    }
}

export function fetchVisaDeals(params){ 
    return {
        type: actions.FETCH_VISA_HOT_DEALS,
        params : params,
        payload: 'visa'
    }
}

export function receiveVisaDeals(data){    
    return {
        type: actions.RECEIVE_VISA_HOT_DEALS,
        payload: data
    }
}

export function fetchCarDeals(params){ 
    return {
        type: actions.FETCH_CAR_HOT_DEALS,
        params : params,
        payload: 'cars'
    }
}

export function receiveCarDeals(data){    
    return {
        type: actions.RECEIVE_CAR_HOT_DEALS,
        payload: data
    }
}