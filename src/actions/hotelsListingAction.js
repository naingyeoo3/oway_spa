import * as actions from '../constants/actionTypes';

export function requestHotelData(data){
    return {
        type    : actions.GET_HOTELS,
        payload : data
    }
}


export function receiveHotelsResult(result){
    return {
        type    : actions.RECEIVE_HOTEL_RESULTS,
        payload : result.response
      }
}

export function receiveHotelError(payload){
    return {
        type : actions.RECEIVE_HOTEL_ERROR,
        payload: payload
    }
}
export function requestHotelFilter(data){
    return {
        type    : actions.GET_HOTEL_FILTERS,
        payload : data
    }
}

export function receiveHotelsFilter(result){
    return {
        type    : actions.RECEIVE_HOTEL_FILTERS,
        payload : result.response
    }
}

export function filterHotelData(data,filterType){
    return {
        type : actions.FILTER_HOTELS,
        payload : data,
        filterType:filterType
    }
}

export function sortHotelData(data){
    return {
        type : actions.SORT_HOTELS,
        payload : data
    }
}

export function sortFilteredHotelData(data){
    return {
        type : actions.SORT_FILTERED_HOTELS,
        payload : data
    }
}
 
export function requestHotelDetail(slug,payload){
    return {
        type : actions.GET_HOTEL_DETAIL,
        slug : slug,
        payload : payload
    }
}

export function receiveHotelDetail(payload){
    return {
        type : actions.RECEIVE_HOTEL_DETAIL,
        payload : payload.response

    }
}

export function receiveNotFoundHotel(){
    return {
        type : actions.NOT_FOUND_HOTELS
    }
}
