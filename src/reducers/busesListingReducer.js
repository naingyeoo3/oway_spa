import * as actions from '../constants/actionTypes';
import {
    setBusClassesForFilter,
    setOperatorFilter,
    setAmenitiesFilter,
    filterBusListing,
    sortByBusDurationHelper,
    sortByBusPriceHelper,
    sortByBusExpressNameHelper,
    sortByBusArrivalHelper,
    sortByBusDeptHelper,
    checkAllFilter,
    calculatePagination
} from '../constants/busListingHelper';

const INITIAL_STATE = {
    isFetching: false,
    isFetchingBusDetail: false,
    cacheKey :'8c519499eaed605984e686bd14afec98',
    per_page: 5,
    cur_page: 1,
    total_page: 0,
    paginatedListing: [],
    filters: {
        price: 0,
        operators: [],
        classes: [],
        amenities: []
    },
    sort: {
        expressName: 0,
        duration: 0,
        depart: 0,
        arrival: 0,
        price: 0
    },
    filterBy: {
        price: 0,
        classes: [],
        depts: [],
        operators: [],
        amenities: []
    },
    filteredList: [],
    isFiltering: false,
    oneWay: [],
    roundTrip: [],
    returnList : [],
    busDetail: {},
    detailRouteId :null,
    error: null,
    busConfirmed :false,
    isConfirming : false,
    gotOwayTier : false,
    fetchOwayTier : false,
    selectedBusRoute : {},
    selectedReturn :{},
    confirmBusResponse :{},
    tierResponse:{}

};

function checkTripType(tripType="0",state){
    switch(tripType.toString()){
        case "1" : return state.oneWay;break;
        case "2" : return state.roundTrip;break;
        case "3" : return state.returnList;break;
    }
}

function busListing(state = INITIAL_STATE, action) {
    const dataForSort = (checkAllFilter(state.filterBy))?  checkTripType(action.tripType,state) : state.filteredList;
    // console.log("dataForSort",dataForSort);
    switch (action.type) {
        case actions.REQUEST_ONEWAY_BUS_LISTING:
            return Object.assign({}, state, {
                isFetching: true,
                oneWay: [],
                error: null
            })
        case actions.RECEIVE_ONEWAY_BUS_LISTING:
            // console.info(action.payload)
            const oneWay = action.payload.busRoutes;
            let total_page = Math.ceil(oneWay.length / state.per_page);
            let paginatedListing = (oneWay.length > state.per_page) ? oneWay.slice(0, 5) : oneWay;
            return Object.assign({}, state, {
                isFetching: false,
                oneWay: action.payload.busRoutes,
                roundTrip: state.roundTrip,
                paginatedListing: paginatedListing,
                cur_page: 1,
                filterBy: {
                    price: 0,
                    classes: [],
                    depts: [],
                    operators: [],
                    amenities: []
                },   
                total_page: total_page,
                filters: {
                    operators: setOperatorFilter(action.payload.busRoutes),
                    classes: setBusClassesForFilter(action.payload.busRoutes),
                    amenities: setAmenitiesFilter(action.payload.busRoutes)
                },
                error: null
            })
        case actions.RECEIVE_ROUNDTRIP_BUS_LISTING:
            const roundTrip = action.payload.busRoutes;
            total_page = Math.ceil(roundTrip.length / state.per_page);
            paginatedListing = (roundTrip.length > state.per_page) ? roundTrip.slice(0, 5) : roundTrip;
            return Object.assign({}, state, {
                isFetching: false,
                oneWay: state.oneWay,
                roundTrip: action.payload.busRoutes,
                cacheKey : action.payload.cacheKey,
                paginatedListing: paginatedListing,
                cur_page: 1,
                filterBy: {
                    price: 0,
                    classes: [],
                    depts: [],
                    operators: [],
                    amenities: []
                },   
                total_page: total_page,
                filters: {
                    operators: setOperatorFilter(action.payload.busRoutes),
                    classes: setBusClassesForFilter(action.payload.busRoutes),
                    amenities: setAmenitiesFilter(action.payload.busRoutes)
                },
                error: null
            })
        case actions.RECEIVE_BUS_RETURN_LISTING :
             const returnList = action.payload.busRoutes;
             total_page = Math.ceil(returnList.length / state.per_page);  
             paginatedListing = (returnList.length > state.per_page) ? returnList.slice(0, 5) : returnList; 
             return Object.assign({},state,{
                isFetching :false,
                oneWay : state.oneWay,
                roundTrip : state.roundTrip,
                returnList : action.payload.busRoutes,
                paginatedListing : paginatedListing,
                filteredList:[],
                filterBy: {
                    price: 0,
                    classes: [],
                    depts: [],
                    operators: [],
                    amenities: []
                },   
                cur_page : 1,
                total_page : total_page,
                filters: {
                    operators: setOperatorFilter(action.payload.busRoutes),
                    classes: setBusClassesForFilter(action.payload.busRoutes),
                    amenities: setAmenitiesFilter(action.payload.busRoutes)
                },
                error: null

             })
        case actions.RECEIVE_BUS_ERROR:
            return Object.assign({}, state, {
                error: action.payload,
                isFetching :false,
            })
        case actions.LOAD_BUS_DETAIL:
            return Object.assign({}, state, {
                isFetchingBusDetail: true,
                busDetail: {},
                detailRouteId : action.payload.busRouteId
            })
        case actions.RECEIVE_BUS_DETAIL:
            return Object.assign({}, state, {
                isFetchingBusDetail: false,
                busDetail: action.payload
            })
        case actions.REQUEST_ROUNDTRIP_BUS_LISTING:
            return Object.assign({}, state, {
                isFetching: true,
                roundTrip: []
            })
        case actions.REQUEST_BUS_RETURN_LISTING :
             return Object.assign({},state,{
                 isFetching : true,
                 returnList : []
             })    
        case actions.FILTER_BUSES:
            let dataForFilter = checkTripType(action.tripType,state);
            let filteredResult = filterBusListing(dataForFilter, state.filterBy);
            console.log("checkallFilter",checkAllFilter(state.filterBy))
            if(filteredResult.length > 0 || !checkAllFilter(state.filterBy)){
                total_page = Math.ceil(filteredResult.length / state.per_page);  
                paginatedListing = (filteredResult.length > state.per_page) ? filteredResult.slice(0, 5) : filteredResult;
            }else{
                total_page = Math.ceil(dataForFilter.length / state.per_page);
                paginatedListing = (dataForFilter.length > state.per_page) ? dataForFilter.slice(0, 5) : dataForFilter;
            } 

            return Object.assign({}, state, {
                filteredList: filteredResult,
                total_page:total_page,
                cur_page:1,
                paginatedListing : paginatedListing,
                isFiltering: false
            })
        case actions.LOAD_MORE_BUS:
            dataForFilter = checkTripType(action.tripType,state);
            let cur_page = state.cur_page + 1;
            let offset = state.per_page * cur_page
            console.log("Load MOre", dataForFilter)
            if (state.filteredList.length == 0)
                paginatedListing = (cur_page != state.total_page) ? dataForFilter.slice(0, offset) : dataForFilter;
            else
                paginatedListing = (cur_page != state.total_page) ? state.filteredList.slice(0, offset) : state.filteredList;

            //console.log(paginatedListing);

            return Object.assign({}, state, {
                paginatedListing: paginatedListing,
                cur_page: cur_page,
                filteredList: state.filteredList,
                isFetching: false
            })
        case actions.ADD_BUS_PRICE_FILTER:
            return Object.assign({}, state,
                {
                    filterBy: {
                        price: action.payload,
                        operators: state.filterBy.operators,
                        classes: state.filterBy.classes,
                        depts: state.filterBy.depts,
                        amenities: state.filterBy.amenities
                    },
                    isFiltering: true
                }
            )
        case actions.ADD_BUS_OPERATOR_FILTER:
            if (action.checked) {
                return Object.assign({}, state, {
                    filterBy: {
                        price: state.filterBy.price,
                        operators: [...state.filterBy.operators, action.payload],
                        classes: state.filterBy.classes,
                        depts: state.filterBy.depts,
                        amenities: state.filterBy.amenities
                    },
                    isFiltering: true
                })
            }
            else {
                let filters = state.filterBy.operators;
                let index = state.filterBy.operators.indexOf(action.payload);
                filters.splice(index, 1);
                return Object.assign({}, state, {
                    filterBy: { ...state.filterBy, operators: filters },
                    isFiltering : true
                });
            }
        case actions.RESET_BUS_OPERATOR_FILTER:
            return Object.assign({}, state, {
                filterBy: {
                    price: state.filterBy.price,
                    operators: [],
                    classes: state.filterBy.classes,
                    depts: state.filterBy.depts,
                    amenities: state.filterBy.amenities
                },
                isFiltering: true
            })
        case actions.ADD_BUS_DEPT_FILTER:
            if (action.checked) {
                return Object.assign({}, state, {
                    filterBy: {
                        price: state.filterBy.price,
                        operators: state.filterBy.operators,
                        classes: state.filterBy.classes,
                        depts: [...state.filterBy.depts, action.payload],
                        amenities: state.filterBy.amenities
                    },
                    isFiltering: true
                })
            }
            else {
                let filters = state.filterBy.depts;
                let index = state.filterBy.depts.indexOf(action.payload);
                filters.splice(index, 1);
                return Object.assign({}, state, {
                    filterBy: { ...state.filterBy, depts: filters },
                    isFiltering :true
                });
            }


        case actions.RESET_BUS_DEPT_FILTER:
            return Object.assign({}, state, {
                filterBy: {
                    price: state.filterBy.price,
                    operators: state.filterBy.operators,
                    classes: state.filterBy.classes,
                    depts: [],
                    amenities: state.filterBy.amenities
                },
                isFiltering: true
            })

        case actions.ADD_BUS_AMENITIES_FILTER:
            if (action.checked) {
                return Object.assign({}, state, {
                    filterBy: {
                        price: state.filterBy.price,
                        operators: state.filterBy.operators,
                        classes: state.filterBy.classes,
                        depts: state.filterBy.depts,
                        amenities: [...state.filterBy.amenities, action.payload]
                    },
                    isFiltering: true
                })
            }
            else {
                let filters = state.filterBy.amenities;
                let index = state.filterBy.amenities.indexOf(action.payload);
                filters.splice(index, 1);
                return Object.assign({}, state, {
                    filterBy: { ...state.filterBy, amenities: filters },
                    isFiltering : true
                });
            }

        case actions.RESET_BUS_AMENITIES_FILTER:
            return Object.assign({}, state, {
                filterBy: {
                    price: state.filterBy.price,
                    operators: state.filterBy.operators,
                    classes: state.filterBy.classes,
                    depts: state.filterBy.depts,
                    amenities: []
                },
                isFiltering: true
            })

        case actions.ADD_BUS_CLASS_FILTER:
            if (action.checked) {
                return Object.assign({}, state, {
                    filterBy: {
                        price: state.filterBy.price,
                        operators: state.filterBy.operators,
                        classes: [...state.filterBy.classes, action.payload],
                        depts: state.filterBy.depts,
                        amenities: state.filterBy.amenities
                    },
                    isFiltering: true
                })
            }
            else {
                let filters = state.filterBy.classes;
                let index = state.filterBy.classes.indexOf(action.payload);
                filters.splice(index, 1);
                return Object.assign({}, state, {
                    filterBy: { ...state.filterBy, classes: filters },
                    isFiltering: true
                });
            }
        case actions.RESET_BUS_CLASS_FILTER:
            return Object.assign({}, state, {
                filterBy: {
                    price: state.filterBy.price,
                    operators: state.filterBy.operators,
                    classes: [],
                    depts: state.filterBy.depts,
                    amenities: state.filterBy.amenities,
                },
                isFiltering:true
            })
        case actions.BUS_SORT_BY_EXPRESS:
            const sortedExpreessList = sortByBusExpressNameHelper(dataForSort, state.sort.expressName);
            let result = calculatePagination(sortedExpreessList,state.per_page);
            return Object.assign({}, state, {
                sort: {
                    expressName: state.sort.expressName === 0 ? 1 : 0,
                    arrival: state.sort.arrival,
                    depart: state.sort.depart,
                    duration: state.sort.duration,
                    price: state.sort.price
                },
                filteredList: sortedExpreessList,
                paginatedListing : result.paginatedList,
                total_page:result.total_page,
                cur_page:1,
            })
        case actions.BUS_SORT_BY_DURATION :
            const sortedDurationList = sortByBusDurationHelper(dataForSort, state.sort.duration);
             result = calculatePagination(sortedDurationList,state.per_page);
            return Object.assign({}, state, {
                sort: {
                    expressName: state.sort.expressName,
                    arrival: state.sort.arrival,
                    depart: state.sort.depart,
                    duration: state.sort.duration === 0 ? 1 : 0,
                    price: state.sort.price
                },
                filteredList: sortedDurationList,
                paginatedListing : result.paginatedList,
                total_page:result.total_page,
                cur_page:1,
            })
        case actions.BUS_SORT_BY_PRICE:
            const sortedPriceList = sortByBusPriceHelper(dataForSort, state.sort.price);
             result = calculatePagination(sortedPriceList,state.per_page);
            return Object.assign({},state,{
                sort: {
                    expressName: state.sort.expressName,
                    arrival: state.sort.arrival,
                    depart: state.sort.depart,
                    duration: state.sort.duration,
                    price: state.sort.price === 0 ? 1 : 0
                },
                filteredList : sortedPriceList,
                paginatedListing : result.paginatedList,
                total_page : result.total_page,
                cur_page:1
            })
        case actions.BUS_SORT_BY_ARRIVAL :
           
             const sortedArrivalList = sortByBusArrivalHelper(dataForSort,state.sort.arrival);
             result = calculatePagination(sortedArrivalList,state.per_page);

             return Object.assign({},state,{
                 sort: {
                    expressName: state.sort.expressName,
                    arrival: state.sort.arrival === 0 ? 1 : 0,
                    depart: state.sort.depart,
                    duration: state.sort.duration,
                    price: state.sort.price 
                 },
                 filteredList : sortedArrivalList,
                 paginatedListing : result.paginatedList,
                 total_page : result.total_page,
                 cur_page :1
             }) 
        case actions.BUS_SORT_BY_DEPARTS :
             const sortedDeptList = sortByBusDeptHelper(dataForSort,state.sort.depart);
              result = calculatePagination(sortedDeptList,state.per_page);
             return Object.assign({},state,{
                sort: {
                    expressName: state.sort.expressName,
                    arrival: state.sort.arrival,
                    depart: state.sort.depart === 0 ? 1 : 0,
                    duration: state.sort.duration,
                    price: state.sort.price 
                 },
                 filteredList : sortedDeptList,
                 paginatedListing : result.paginatedList,
                 total_page : result.total_page,
                 cur_page : 1
             })
        case actions.CONFIRM_BUS : 
             if(action.tripType == 1){
                return Object.assign({},state,{
                    isConfirming : true,
                    isConfirmed:false,
                    selectedBusRoute : action.busRoute
              })
             }
             else {
                 return Object.assign({},state,{
                     isConfirming : true,
                     isConfirmed : false,
                     selectedReturn : action.busRoute
                 })
             }

        case actions.RECEIVE_CONFIRM_BUS : 
             return Object.assign({},state,{
                    isConfirming : false,
                    isConfirmed : true,
                    gotOwayTier:false,
                    confirmBusResponse : action.payload
             })
        case actions.RECEIVE_OWAY_TIER :
             return Object.assign({},state,{
                 tierResponse : action.payload,
                 gotOwayTier : true
             })  
        case actions.SELECT_ONE_WAY_BUS :
             return Object.assign({},state,{
                 selectedBusRoute : action.payload
             })                   
        default:
            return state
    }
}

export default busListing;