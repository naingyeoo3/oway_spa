import * as types from '../constants/actionTypes';
import { filterDepart } from '../constants/flightListingConstants';     
import {
    setFlightNamesForFilter, 
    setFlightClassesForFilter, 
    setStopsForFilter, 
    sortByAirlinesHelper, 
    sortByDurationHelper,    
    sortByDepartHelper, 
    sortByArrivalHelper, 
    sortByPriceHelper,  
    filterFlightListingOutwards,
    checkAllFilter,
    calculatePagination
 } from '../constants/flightListingHelper';
    
const initialState = {
    outwards: [],
    per_page : 5,
    cur_page :1,
    total_page : 0,
    isBtoC:false,
    isNotFound:false,
    cacheKey:'',
    referKey:'',
    returnReferKey:'',
    isConfirming:false,
    isVerifying:false,
    isVerified:false,
    isConfirmed:false,
    paginatedListing:[],
    returns: {},
    filteredList: [],
    verifiedFlight:{},
    confirmedFlight:{},
    selectedReturnList :[],
    filters: {
        type: null,
        airlineNames: [],
        classes: [],
        stops: [], 
        price: 0       
    },
    sort: {
        airline: 0,
        duration: 0,
        depart: 0,
        arrival: 0,
        price: 0
    },
    filterBy: {
        type: null,
        airlineNames: [],
        classes: [],
        stops: [],
        price: 0,
        depart: []
    },
    isFiltering: false,
    showDepart: filterDepart,
    detail: {},    
    isFetching: false,
    error: null
}



function flightListingReducer(state = initialState, action) {
    let flightList = [];
     if(action.page === "flight_listing") 
       flightList=  (checkAllFilter(state.filterBy)&& state.filteredList==0)? state.outwards : state.filteredList 
    else 
    flightList = (checkAllFilter(state.filterBy)&& state.filteredList==0)? state.selectedReturnList : state.filteredList;
    switch (action.type) {
        case types.GET_FLIGHTS:
            return Object.assign({}, state, {
                isFetching: true,
                filterBy:{
                    type:null,
                    airlineNames: [],
                    classes: [],
                    stops: [],
                    price: 0,
                    isVerifying:false,
                    isConfirmed :false,
                    depart: []
                }
            })
        case types.RECEIVE_FLIGHT_RESULTS:
            const outwards = action.payload.routings.outward;
            let total_page = Math.ceil(outwards.length/state.per_page);
            let paginatedListing = (outwards.length > state.per_page)? outwards.slice(0,5) : outwards;
            return Object.assign({}, state, {
                outwards: action.payload.routings.outward,
                returns: action.payload.routings.return,
                paginatedListing : paginatedListing,
                cacheKey:action.payload.cacheKey,
                filteredList: [],
                cur_page : 1,
                total_page: total_page,
                filters: {
                    classes: setFlightClassesForFilter(action.payload.routings.outward),
                    airlineNames: setFlightNamesForFilter(action.payload.routings.outward),
                    stops: setStopsForFilter(action.payload.routings.outward),
                },                
                isFetching: false,
                isNotFound : false
            });
        case types.RECEIVE_NOT_FOUND_FLIGHTS :
            console.info(action.payload)
             return Object.assign({},state,{
                 outwards : [],
                 returns :[],
                 paginatedListing:[],
                 filteredList:[],
                 filters:{
                     classes :[],
                     airlineNames :[],
                     stops:[]
                 },
                 isFetching:false,
                 isNotFound: true,
                 error: action.payload  
             })    
        case types.LOAD_MORE_FLIGHT :
              let cur_page = state.cur_page + 1;
              let offset = state.per_page * cur_page;
               if(state.filteredList.length == 0)
               paginatedListing = (cur_page != state.total_page)? state.outwards.slice(0,offset) : state.outwards;
               else
               paginatedListing = (cur_page != state.total_page)? state.filteredList.slice(0,offset) :
               state.filteredList;
              return Object.assign({},state,{
                  paginatedListing : paginatedListing,
                  cur_page : cur_page,
                  filteredList : state.filteredList,
                  isFetching: false
              })  
              
        case types.LOAD_MORE_FLIGHT_RETURN :
             cur_page = state.cur_page +1;
             offset = state.per_page * cur_page;
             if(state.filteredList.length == 0)
               paginatedListing = (cur_page != state.total_page)? state.selectedReturnList.slice(0,offset) : state.selectedReturnList;
               else
               paginatedListing = (cur_page != state.total_page)? state.filteredList.slice(0,offset) :
               state.filteredList;
              return Object.assign({},state,{
                  paginatedListing : paginatedListing,
                  cur_page : cur_page,
                  filteredList : state.filteredList,
                  isFetching: false
              })  
                   

        case types.FILTER_FLIGHT_LISTING:
                let filteredResult = filterFlightListingOutwards(state.outwards,state.filterBy);
                if(checkAllFilter(state.filterBy) && filteredResult.length===0 ){
                    total_page = Math.ceil(state.outwards.length/state.per_page);
                    paginatedListing = (state.outwards.length > state.per_page)? state.outwards.slice(0,5):state.outwards;
                }else{
                    total_page = Math.ceil(filteredResult.length/state.per_page);
                    paginatedListing = (filteredResult.length > state.per_page)? filteredResult.slice(0,5) : filteredResult;
                }
                
                return Object.assign({}, state, {
                    filteredList: filteredResult,
                    paginatedListing : paginatedListing,
                    total_page :total_page,
                    cur_page:1,
                    isFiltering: false
                    }) 
        case types.FILTER_FLIGHT_RETURN :
                filteredResult = filterFlightListingOutwards(state.selectedReturnList,state.filterBy);
                if(checkAllFilter(state.filterBy) && filteredResult.length == 0){
                    console.log("here is true filterBy")
                    total_page = Math.ceil(state.selectedReturnList.length/state.per_page);
                    paginatedListing = (state.selectedReturnList.length > state.per_page)? state.selectedReturnList.slice(0,5):state.selectedReturnList;
                }else{
                    total_page = Math.ceil(filteredResult.length/state.per_page);
                    paginatedListing = (filteredResult.length > state.per_page)? filteredResult.slice(0,5) : filteredResult; 
                }
                return Object.assign({}, state, {
                    filteredList: filteredResult,
                    paginatedListing : paginatedListing,
                    total_page :total_page,
                    cur_page:1,
                    isFiltering: false
                    }) 

        case types.FILTER_FLIGHTS:
            return Object.assign({}, state, {
                filteredList: action.payload,
                filterType: action.filterType
            })
        case types.SELECT_FLIGHT :
             let selectedFlightList = action.payload
             total_page = Math.ceil(selectedFlightList.length/state.per_page);
             paginatedListing = (selectedFlightList.length > state.per_page)? selectedFlightList.slice(0,5) : selectedFlightList;
             console.log("action referKey",action.referKey);
            return Object.assign({},state,{
                filteredList : action.payload,
                filterType :null,
                selectedReturnList : action.payload,
                paginatedListing: paginatedListing,
                total_page:total_page,
                referKey : action.referKey,
                cur_page :1,
                filters: {
                    classes : setFlightClassesForFilter(action.payload),
                    airlineNames: setFlightNamesForFilter(action.payload),
                    stops: setStopsForFilter(action.payload)
                }                
            })    
        case types.SORT_BY_DEURATION:
            const sortedDurationList =  sortByDurationHelper(flightList, state.sort.duration);
            let result = calculatePagination(sortedDurationList,state.per_page);
            return Object.assign({}, state, {
                sort : {
                    duration: state.sort.duration === 0 ? 1 : 0,
                    airline: state.sort.airline,
                    depart: state.sort.depart,
                    arrival: state.sort.arrival,
                    price: state.sort.price
                },
                filteredList: sortedDurationList,
                paginatedListing : result.paginatedList,
                total_page : result.total_page,
                cur_page:1
            })
        case types.SORT_BY_AIRLINE:
            const sortedArilineList = sortByAirlinesHelper(flightList, state.sort.airline);
            result = calculatePagination(sortedArilineList,state.per_page);
            return Object.assign({}, state, {
                sort : {
                    duration: state.sort.duration,
                    airline: state.sort.airline === 0 ? 1 : 0,
                    depart: state.sort.depart,
                    arrival: state.sort.arrival,
                    price: state.sort.price
                },
                filteredList: sortedArilineList,
                paginatedListing : result.paginatedList,
                total_page:result.total_page,
                cur_page:1,
            })
        case types.SORT_BY_DEPART:
            const sortedDepartList = sortByDepartHelper(flightList, state.sort.depart)
            result = calculatePagination(sortedDepartList,state.per_page);
            return Object.assign({}, state, {
                sort : {
                    duration: state.sort.duration,
                    airline: state.sort.airline,
                    depart: state.sort.depart === 0 ? 1 : 0,
                    arrival: state.sort.arrival,
                    price: state.sort.price
                },
                filteredList: sortedDepartList,
                paginatedListing : result.paginatedList,
                total_page:result.total_page,
                cur_page:1,
            })
        case types.SORT_BY_ARRIVAL:
            const sortedArrivalList = sortByArrivalHelper(flightList, state.sort.arrival)
            result = calculatePagination(sortedArrivalList,state.per_page);
            return Object.assign({}, state, {
                sort : {
                    duration: state.sort.duration,
                    airline: state.sort.airline,
                    depart: state.sort.depart,
                    arrival: state.sort.arrival === 0 ? 1 : 0,
                    price: state.sort.price
                },
                filteredList: sortedArrivalList,
                paginatedListing : result.paginatedList,
                total_page : result.total_page,
                cur_page:1
            })
        case types.SORT_BY_PRICE:
            const sortedPriceList = sortByPriceHelper(flightList, state.sort.price)
            result = calculatePagination(sortedPriceList,state.per_page);
            return Object.assign({}, state, {
                sort : {
                    duration: state.sort.duration,
                    airline: state.sort.airline,
                    depart: state.sort.depart,
                    arrival: state.sort.arrival,
                    price: state.sort.price  === 0 ? 1 : 0
                },
                filteredList: sortedPriceList,
                paginatedListing : result.paginatedList,
                total_page : result.total_page,
                cur_page:1
            })
        case types.SORT_FLIGHTS:
            if (state.filterType != null)
                return Object.assign({}, state, {
                    filteredList: action.payload
                })
            else
                return Object.assign({}, state, {
                    outwards: action.payload
                })
        case types.SORT_FILTERED_FLIGHTS:
            return Object.assign({}, state, {
                filteredList: action.payload
            })
            
        case types.ADD_PRICE_FILTER:            
            return Object.assign({}, state, {
                filterBy: {
                    price: action.payload,
                    type: state.filterBy.type,
                    airlineNames: state.filterBy.airlineNames,
                    classes: state.filterBy.classes,
                    stops: state.filterBy.stops,      
                    depart: state.filterBy.depart,
                },
                isFiltering: true
            })
        case types.RESET_PRICE_FILTER:
            return Object.assign({}, state, {
                filterBy: {
                    price: 0,
                    type: state.filterBy.type,
                    airlineNames: state.filterBy.airlineNames,
                    classes: state.filterBy.classes,
                    stops: state.filterBy.stops,      
                    depart: state.filterBy.depart,
                },
                isFiltering: true
            })
        case types.ADD_STOP_FILTER:
            if(action.checked){
                var added_stop = [];
                added_stop.push(action.payload)
                return Object.assign({}, state, {
                    filterBy: {
                        price: state.filterBy.price,
                        type: state.filterBy.type,
                        airlineNames: state.filterBy.airlineNames,
                        classes: state.filterBy.classes,
                        stops:[...state.filterBy.stops, ...added_stop],      
                        depart: state.filterBy.depart,
                    },
                    isFiltering: true
                })
            }else{
                let filters = state.filterBy.stops;
                let index = state.filterBy.stops.indexOf(action.payload);
                filters.splice(index, 1);
                return Object.assign({},state,{
                    filterBy:{...state.filterBy,stops:filters},
                    isFiltering: true
                });
            }           
           
        case types.RESET_FLIGHT_STOP_FILTER:
            return Object.assign({}, state, {
                filterBy: {
                    price: state.filterBy.price,
                    type: state.filterBy.type,
                    airlineNames: state.filterBy.airlineNames,
                    classes: state.filterBy.classes,
                    stops: [],      
                    depart: state.filterBy.depart,
                },
                isFiltering: true
            })
            
        case types.ADD_AIRLILNENAME_FILTER:
            if(action.checked){
                var added_airline = []
                added_airline.push(action.payload);
                return Object.assign({}, state, {
                    filterBy: {
                        price: state.filterBy.price,
                        type: state.filterBy.type,
                        airlineNames: [...state.filterBy.airlineNames, ...added_airline],
                        classes: state.filterBy.classes,
                        stops: state.filterBy.stops,      
                        depart: state.filterBy.depart,
                    },
                    isFiltering: true
                })
                }
                else{
                    let filters = state.filterBy.airlineNames;
                    let index = state.filterBy.airlineNames.indexOf(action.payload);
                    filters.splice(index, 1);
                    return Object.assign({},state,{
                        filterBy:{...state.filterBy,airlineNames:filters},
                        isFiltering: true
                    });
                }
            
        case types.RESET_AIRLINENAME_FILTER:
            return Object.assign({}, state, {
                filterBy: {
                    price: state.filterBy.price,
                    type: state.filterBy.type,
                    airlineNames: [],
                    classes: state.filterBy.classes,
                    stops: state.filterBy.stops,      
                    depart: state.filterBy.depart,
                },
                isFiltering: true
            })
        case types.ADD_DEPART_FILTER:
            if(action.checked){
                var addDepart = []
                addDepart.push(action.payload)           
                return Object.assign({}, state, {
                    filterBy: {
                        price: state.filterBy.price,
                        type: state.filterBy.type,
                        airlineNames: state.filterBy.airlineNames,
                        classes: state.filterBy.classes,
                        stops: state.filterBy.stops,      
                        depart: [...state.filterBy.depart, ...addDepart],
                    },
                    isFiltering: true
                })
            }else{
                let filters = state.filterBy.depart;
                let index = state.filterBy.depart.indexOf(action.payload);
                filters.splice(index, 1);
                return Object.assign({},state,{
                    filterBy:{...state.filterBy,depart:filters},
                    isFiltering: true
                });
            }
         
        case types.RESET_DEPART_FILTER:
            return Object.assign({}, state, {
                filterBy: {
                    price: state.filterBy.price,
                    type: state.filterBy.type,
                    airlineNames: state.filterBy.airlineNames,
                    classes: state.filterBy.classes,
                    stops: state.filterBy.stops,      
                    depart: [],
                },
                isFiltering: true
            })
        case types.ADD_TYPE_FILTER:
            var added_type = [];
            added_type.push(action.payload);
            return Object.assign({}, state, {
                filterBy: {
                    price: state.filterBy.price,
                    type: state.filterBy.type.push(action.payload),
                    airlineNames: state.filterBy.airlineNames,
                    classes: state.filterBy.classes,
                    stops: state.filterBy.stops,      
                    depart: state.filterBy.depart,
                },
                isFiltering: true
            })
        case types.RESET_TYPE_FILTER:
            return Object.assign({}, state, {
                filterBy: {
                    price: state.filterBy.price,
                    type: [],
                    airlineNames: state.filterBy.airlineNames,
                    classes: state.filterBy.classes,
                    stops: state.filterBy.stops,      
                    depart: state.filterBy.depart,
                }
            })
        case types.ADD_CLASS_FILTER:
            if(action.checked){
                var added_class = [];
                added_class.push(action.payload);
                return Object.assign({}, state, {
                    filterBy: {
                        price: state.filterBy.price,
                        type:  state.filterBy.type,
                        airlineNames: state.filterBy.airlineNames,
                        classes: [...state.filterBy.classes, ...added_class],
                        stops: state.filterBy.stops,      
                        depart: state.filterBy.depart,
                    },
                    isFiltering: true
                })
            }
            else{
                let filters = state.filterBy.classes;
                let index = state.filterBy.classes.indexOf(action.payload);
                filters.splice(index, 1);
                return Object.assign({},state,{
                    filterBy:{...state.filterBy,depart:filters},
                    isFiltering: true
                }); 
            }

        case types.RESET_CLASS_FILTER:
            return Object.assign({}, state, {
                filterBy: {
                    price: state.filterBy.price,
                    type: state.filterBy.type,
                    airlineNames: state.filterBy.airlineNames,
                    classes: [],
                    stops: state.filterBy.stops,      
                    depart: state.filterBy.depart,
                },
                isFiltering: true
            })
        case types.VERIFY_FLIGHT : 
             return Object.assign({},state,{
                 isVerifying :true,
                 isVerified:false,
                 isConfirming :false,
                 isConfirmed : false
             })
        case types.RECEIVE_VERIFY_FLIGHT :
             return Object.assign({},state,{
                 isVerifying : false,
                 isVerified:true,
                 verifiedFlight : action.payload
             })
        case types.CONFIRM_FLIGHT :
             return Object.assign({},state,{
                 isConfirming : true
             })      
        case types.RECEIVE_CONFIRM_FLIGHT :
            let confirmedFlight = {
                adult : action.payload.adult,
                child : action.payload.child,
                infant : action.payload.infant,
                rates : action.payload.rates,
                source : action.payload.source
            }
             return Object.assign({},state,{
                 isConfirmed : true,
                 isConfirming : false,
                 isVerified :false,
                 confirmedFlight : confirmedFlight
             })  
        case types.LOAD_FLIGHT_LISTING_FROM_STORAGE :
              return Object.assign({},state,action.payload)            
        default: return state
    }
}

export default flightListingReducer;