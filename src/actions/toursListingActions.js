import * as actions from '../constants/actionTypes';

export function requestTourListing(payload){    
    return {
        type: actions.REQUEST_TOUR_LISTING,
        payload: payload
    }
}
export function receiveTourListing(data){
    return {
        type: actions.RECEIVE_TOUR_LISTING,
        payload: data
    }
}
export function receiveTourError(err){
    return {
        type: actions.RECEIVE_TOUR_LISTING_ERROR,
        payload: err
    }
}
export function requestCategoryFilter(payload){
    return {
        type: actions.REQUEST_CATEGORY_FILTER,
        payload: payload
    }
}
export function receiveCategoryFilter(payload){
    return {
        type: actions.RECEIVE_CATEGORY_FILTER,
        payload: payload
    }
}
export function loadFilter(){
    return {
        type: actions.LOAD_TOUR_FILTER
    }
}
export function addFilter(param){
    return {
        type: actions.ADD_TOUR_FILTER,
        payload: param
    }
}
export function reduceFilter(param){
    return {
        type: actions.REDUCE_TOUR_FILTER,
        payload: param
    }
}
export function resetFilter(){
    return {
        type: actions.RESET_TOUR_FILTER
    }
}
export function requestPriceAsc(){
    return {
        type: actions.REQUEST_SORT_PRICE_ASC
    }
}
export function sortPriceAsc(){
    return {
        type: actions.SORT_PRICE_ASC
    }
}
export function requestPriceDec(){
    return {
        type: actions.REQUEST_SORT_PRICE_DEC
    }
}
export function sortPriceDec(){
    return {
        type: actions.SORT_PRICE_DEC
    }
}
export function requestTourDetail(payload){
    return {
        type: actions.REQUEST_TOUR_DETAIL,
        payload: payload
    }
}
export function receiveTourDetail(payload){
    return {
        type: actions.RECEIVE_TOUR_DETAIL,
        payload: payload.data
    }
}
export function requestSortDiscountAce(){
    return {
        type: actions.REQUEST_SORT_DISCOUNT_ACE
    }
}
export function receiveSortDiscountAce(payload){
    return {
        type: actions.RECEIVE_SORT_DISCOUNT_ACE,
        payload: payload
    }
}
export function requestSortDiscountDec(){
    return {
        type: actions.REQUEST_SORT_DISCOUNT_DEC
    }
}
export function receiveSortDiscountDec(payload){
    return {
        type: actions.RECEIVE_SORT_DISCOUNT_DEC,
        payload: payload
    }
}
export function requestSortRecommendedAce(){
    return {
        type: actions.REQUEST_SORT_RECOMMENDED_ACE
    }
}
export function receiveSortRecommendedAce(){
    return {
        type: actions.RECEIVE_SORT_RECOMMENDED_ACE        
    }
}
export function requestSortRecommendedDec(){
    return {
        type: actions.REQUEST_SORT_RECOMMENDED_DEC
    }
}
export function receiveSortRecommendedDec(){
    return {
        type: actions.RECEIVE_SORT_RECOMMENDED_DEC        
    }
}
export function addFilterCategory(payload){
    return {
        type: actions.ADD_FILTER_CATEGORY,
        payload: payload
    }
}
export function removeFilterCategory(payload){
    return {
        type: actions.REMOVE_FILTER_CATEGORY,
        payload: payload
    }
}
export function resetCatFilter(){
    return {
        type: actions.RESET_FILTERS_CATEGORY
    }
}
export function loadMoreTour(payload){
    return {
        type: actions.LOAD_MORE_TOUR,
        payload: payload
    }
}
export function receiveTourLoadMore(payload){
    return {
        type: actions.RECEIVE_TOUR_LOAD_MORE,
        payload: payload
    }
}
export function requestFilterTourSearch(payload){
    return {
        type: actions.REQUEST_FILTER_TOUR_SEARCH,
        payload: payload
    }
}
export function filterFeartureTourSearch(payload){
    return {
        type: actions.RECEIVE_FILTER_TOUR_SEARCH,
        payload: payload
    }
}
export function requestDailyRate(payload){
    return {
        type: actions.REQUEST_DAILY_RATE,
        payload: payload
    }
}
export function receiveDailyRate(payload){
    return {
        type: actions.RECEIVE_DAILY_RATE,
        payload: payload
    }
}