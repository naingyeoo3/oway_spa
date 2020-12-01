import * as actions from '../constants/actionTypes';

import {
    sortPriceAceHelper,
    sortPriceDecHelper,
    sortDiscountAceHelper,
    sortDiscountDecHelper,
    sortRecommedAceHelper,
    sortRecommedDecHelper
} from '../constants/tourListingHelpers';

const INITIAL_STATE = {
    isLoadFilter: false,
    isFetching: false,
    data: [],
    totalData:[],
    pageNum:1,
    currentPage:1,
    meta: null,
    error: null,
    filter:[],
    filterCat:[],
    sort:{
        price: 0,
        recommended: 0,
        discount: 0
    },
    detail:{
        isFetching: false,
        data: null
    },
    filterCategories: {
        isFetching: false,
        data: []
    },
    dailyRate: null
};
 
function attrListing(state = INITIAL_STATE, action){
    switch (action.type) {
        case actions.REQUEST_ATTR_LISTING:
            return Object.assign({}, state, {              
                isFetching: true
            })
        case actions.RECEIVE_ATTR_LISTING:                         
            return Object.assign({}, state, {                
                isFetching: false,
                totalData: action.payload.data,                
                meta: action.payload.meta,
                pageNum: action.payload.data.length / 10,
                currentPage: 1,
                data: action.payload.data.length > 10 ? action.payload.data.slice(0, 10) : action.payload.data,
                error: null,
                isLoadFilter: false,
            }) 
        case actions.RECEIVE_ATTR_LISTING_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                data: [],
                meta: null,
                error: action.payload,
                isLoadFilter: false,
            })
        case actions.REQUEST_ATTR_CATEGORY:
            return Object.assign({}, state, {
                filterCategories: {
                    isFetching: true,
                    data: []
                }
            })
        case actions.RECEIVE_ATTR_CATEGORY:
            return Object.assign({}, state, {
                filterCategories: {
                    isFetching: false,
                    data: action.payload.categories
                }
            })
        case actions.REQUEST_ATTR_SORT_PRICE_ASC:
            return Object.assign({}, state, {
                isFetching: true
            })
        case actions.SORT_ATTR_PRICE_ASC:
            return Object.assign({}, state, {
                isFetching: false,
                data: sortPriceAceHelper(state.data),
                sort: {
                    price: state.sort.price == 0 ? 1 : 0
                }
            })
        case actions.REQUEST_ATTR_SORT_PRICE_DEC:
            return Object.assign({}, state, {
                isFetching: true
            })
        case actions.SORT_ATTR_PRICE_DEC:
            return Object.assign({}, state, {
                isFetching: false,
                data: sortPriceDecHelper(state.data),
                sort: {
                    price: state.sort.price == 0 ? 1 : 0
                }
            })
        case actions.REQUEST_ATTR_SORT_DISCOUNT_ACE:
            return Object.assign({}, state, {
                isFetching: true
            })
        case actions.RECEIVE_ATTR_SORT_DISCOUNT_ACE:            
            return Object.assign({}, state, {
                isFetching: false,
                data: sortDiscountAceHelper(state.data),
                sort: {
                    discount: state.sort.discount == 0 ? 1 : 0
                }
            })
        case actions.REQUEST_ATTR_SORT_DISCOUNT_DEC:
            return Object.assign({}, state, {
                isFetching: true
            })
        case actions.RECEIVE_ATTR_SORT_DISCOUNT_DEC:
            return Object.assign({}, state, {
                isFetching: false,
                data: sortDiscountDecHelper(state.data),
                sort: {
                    discount: state.sort.discount == 0 ? 1 : 0
                }
            })
        case actions.REQUEST_ATTR_SORT_RECOMMENDED_ACE:
            return Object.assign({}, state, {
                isFetching: true
            })
        case actions.RECEIVE_ATTR_SORT_RECOMMENDED_ACE:
            return Object.assign({}, state, {
                isFetching: false,
                data: sortRecommedAceHelper(state.data),
                sort: {
                    recommended: state.sort.recommended == 0 ? 1 : 0
                }
            })
        case actions.REQUEST_ATTR_SORT_RECOMMENDED_DEC:
            return Object.assign({}, state, {
                isFetching: true
            })
        case actions.RECEIVE_ATTR_SORT_RECOMMENDED_DEC:
            return Object.assign({}, state, {
                isFetching: false,
                data: sortRecommedDecHelper(state.data),
                sort: {
                    recommended: state.sort.recommended == 0 ? 1 : 0
                }
            })
        case actions.ADD_ATTR_FILTER:
            var add_filter = [];
            add_filter.push(action.payload)            
            return Object.assign({}, state, {
                filter: [...state.filter, ...add_filter]
            })
        case actions.REDUCE_ATTR_FILTER:
            var reduce_filter = state.filter;
            reduce_filter.map((item, index)=> item === action.payload ? reduce_filter.splice(index, 1) : null);
            return Object.assign({}, state, {
                filter: reduce_filter
            })        
        case actions.ADD_ATTR_FILTER_CATEGORY:
            var filters = [];
            filters.push(action.payload)            
            return Object.assign({}, state, {
                filterCat: [...state.filterCat, ...filters]
            })
        case actions.REMOVE_ATTR_FILTER_CATEGORY:
            var remove_filters = state.filterCat;
            remove_filters.map((item, index)=> item === action.payload ? remove_filters.splice(index, 1) : null);
            return Object.assign({}, state, {
                filterCat: remove_filters
            })
        case actions.RESET_FILTERS_CATEGORY:
            return Object.assign({}, state, {
                filterCat: []
            })
        case actions.LOAD_MORE_ATTR:
            return Object.assign({}, state, {
                // isFetching: true
            })
        case actions.RECEIVE_ATTR_LOAD_MORE:            
            return Object.assign({}, state, {
                // isFetching: false,
                totalData: state.totalData,                
                meta: state.meta,
                pageNum: state.pageNum,
                currentPage: action.payload,
                data: state.totalData.length > 10 ? state.totalData.slice(0, action.payload * 10) : state.data,
                error: null,
                isLoadFilter: false
            })
        case actions.REQUEST_ATTR_DETAIL:
            return Object.assign({}, state, {
                detail: {
                    isFetching: true,
                    data: null
                }
            })
        case actions.RECEIVE_ATTR_DETAIL:
            return Object.assign({}, state, {
                detail: {
                    isFetching: false,
                    data: action.payload
                }
            })
        case actions.REQUEST_FILTER_ATTRACTION_SEARCH:
            return Object.assign({}, state, {
                isFetching: true
            })
        case actions.REECEIVE_FILTER_ATTRACTION_SEARCH:
            return Object.assign({}, state, {                
                isFetching: false,
                totalData: state.totalData,
                meta: null,
                pageNum: 1,
                currentPage: 1,
                data: [action.payload],
                error: null,
                isLoadFilter: false,
            })
        case actions.REQUEST_DAILY_RATE:
            return Object.assign({}, state, {
                isFetching: true
            })
        case actions.RECEIVE_DAILY_RATE:
            return Object.assign({}, state, {
                dailyRate: action.payload
            })
        default:
            return state
    }
}
export default attrListing;