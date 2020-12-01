import * as actions from '../constants/actionTypes';

export function requestAttrListing(payload){    
    return {
        type: actions.REQUEST_ATTR_LISTING,
        payload: payload
    }
}
export function receiveAttrListing(data){
    return {
        type: actions.RECEIVE_ATTR_LISTING,
        payload: data
    }
}
export function receiveAttrError(err){    
    return {
        type: actions.RECEIVE_ATTR_LISTING_ERROR,
        payload: err
    }
}
export function requestAttrCategory(payload){
    return {
        type: actions.REQUEST_ATTR_CATEGORY,
        payload: payload
    }
}
export function receiveCategoryFilter(payload){
    return {
        type: actions.RECEIVE_ATTR_CATEGORY,
        payload: payload
    }
}
export function loadMoreAttr(payload){
    return {
        type: actions.LOAD_MORE_ATTR,
        payload: payload
    }
}
export function receiveAttrLoadMore(payload){
    return {
        type: actions.RECEIVE_ATTR_LOAD_MORE,
        payload: payload
    }
}
export function requestAttrPriceAsc(){
    return {
        type: actions.REQUEST_ATTR_SORT_PRICE_ASC
    }
}
export function sortAttrPriceAsc(){
    return {
        type: actions.SORT_ATTR_PRICE_ASC
    }
}
export function requestAttrPriceDec(){
    return {
        type: actions.REQUEST_ATTR_SORT_PRICE_DEC
    }
}
export function sortAttrPriceDec(){
    return {
        type: actions.SORT_ATTR_PRICE_DEC
    }
}
export function requestAttrDetail(payload){
    return {
        type: actions.REQUEST_ATTR_DETAIL,
        payload: payload
    }
}
export function receiveAttrDetail(payload){
    return {
        type: actions.RECEIVE_ATTR_DETAIL,
        payload: payload.data
    }
}
export function requestAttrSortDiscountAce(){
    return {
        type: actions.REQUEST_ATTR_SORT_DISCOUNT_ACE
    }
}
export function receiveAttrSortDiscountAce(payload){
    return {
        type: actions.RECEIVE_ATTR_SORT_DISCOUNT_ACE,
        payload: payload
    }
}
export function requestAttrSortDiscountDec(){
    return {
        type: actions.REQUEST_ATTR_SORT_DISCOUNT_DEC
    }
}
export function receiveAttrSortDiscountDec(payload){
    return {
        type: actions.RECEIVE_ATTR_SORT_DISCOUNT_DEC,
        payload: payload
    }
}
export function requestAttrSortRecommendedAce(){
    return {
        type: actions.REQUEST_ATTR_SORT_RECOMMENDED_ACE
    }
}
export function receiveAttrSortRecommendedAce(){
    return {
        type: actions.RECEIVE_ATTR_SORT_RECOMMENDED_ACE        
    }
}
export function requestAttrSortRecommendedDec(){
    return {
        type: actions.REQUEST_ATTR_SORT_RECOMMENDED_DEC
    }
}
export function receiveAttrSortRecommendedDec(){
    return {
        type: actions.RECEIVE_ATTR_SORT_RECOMMENDED_DEC        
    }
}
export function addAttrFilter(param){
    return {
        type: actions.ADD_ATTR_FILTER,
        payload: param
    }
}
export function reduceAttrFilter(param){
    return {
        type: actions.REDUCE_ATTR_FILTER,
        payload: param
    }
}
export function resetAttrFilter(){
    return {
        type: actions.RESET_ATTR_FILTER
    }
}
export function addAttrFilterCategory(payload){
    return {
        type: actions.ADD_ATTR_FILTER_CATEGORY,
        payload: payload
    }
}
export function removeAttrFilterCategory(payload){
    return {
        type: actions.REMOVE_ATTR_FILTER_CATEGORY,
        payload: payload
    }
}
export function resetAttrCatFilter(){
    return {
        type: actions.RESET_ATTR_FILTERS_CATEGORY
    }
}

export function requestFilterAttrSearch(payload){
    return {
        type: actions.REQUEST_FILTER_ATTRACTION_SEARCH,
        payload: payload
    }
}
export function receiveFilterAttrSearch(payload){
    return {
        type: actions.REECEIVE_FILTER_ATTRACTION_SEARCH,
        payload: payload
    }
}
export function clearCheckout(){
    return {
        type: actions.CLEAR_CHEKCOUT
    }
}