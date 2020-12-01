import * as actions from '../constants/actionTypes';

export function searchStartCities(input){  
    return {
      type: actions.REQUEST_SEARCH_AUTOCOMPLETE,
      payload: input
    }
  }

export function searchListingFlightCities(input){
  return {
    type: actions.REQUEST_LISTING_SEARCH_AUTOCOMPLETE,
    payload: input
  }
}
  
export function searchDestCities(input){
  return {
    type: actions.REQUEST_DEST_AUTOCOMPLETE,
    payload: input
  }
}
export function requestCities(){
  return {
    type: actions.REQUEST_CITIES_FETCHING 
  }
}

export function searchResults(results){ 
  return {
    type: actions.RECEIVE_SEARCH_RESULTS,
    results: results
  }
}
export function searchDestResults(results){
  return {
    type: actions.RECEIVE_DEST_AUTOCOMPLETE_RESULTS,
    results: results
  }
}
export function removeSearchResults(){
  return {
    type: actions.REMOVE_SEARCH_RESULTS
  }
}

export function searchHotelDest(input){  
  return {
    type: actions.REQUEST_HOTEL_AUTOCOMPLETE,
    payload: input
  }
}
export function requestHotelResults(){  
  return {
    type: actions.REQUEST_SEARCH_HOTEL_RESULTS,   
  }
}
export function searchHotelResults(results){    
  if(results === null){
    return {
      type : actions.RECEIVE_HOTEL_API_NULL
    }
  }else{
    return {
      type: actions.RECEIVE_SEARCH_HOTEL_RESULTS,
      results: results
    }
  }  
}
export function removeHotelResults(){  
  return {
    type: actions.REMOVE_HOTEL_RESULTS    
  }
}
export function receiveHotelDataError(response){ 
  return {
    type: actions.RECEIVE_SEARCH_ERROR,
    payload: response.response
  }
}