import * as actions from '../constants/actionTypes';

import moment from 'moment';
const dateFormat = 'DD MMM YYYY';
import { myanmarCities } from '../constants/constants';
/**
 * product reducers.
 * @param state
 * @param action
 * @returns {*}
 */

const INITIAL_STATE = {
    searchTab: 2,
    from: {
        fromCityTitle: 'Yangon (RGN)',            
        fromCity:'RGN',
        id: 5001,
        placeholder: 'Origin'
    },
    to: {
        toCityTitle: 'Bangkok (DMK)',
        toCity:'DMK',
        id: null,
        placeholder: 'Destination'
    },
    destination: {
        name: 'Yangon, Myanmar',
        slug: 'yangon',
        scope: 'city',
        id: 32559,
        city_slug: 'yangon',
        township_slug: 'yangon',
        hotel_slug:'',
        country: 'Myanmar',
        region: 'local',
        placeholder: 'Where do you want to stay?'
    },
    tourDestination: {
        cityId: 123,
        name: 'Bangkok',
        region: 'foreign',
        placeholder: 'Where do you want to go?'
    },
    fromDate:{
        date: moment().add(1,'days').format(dateFormat),            
    },
    toDate: {
        date: moment().add(1,'days').format(dateFormat),            
    },
    onewayDate: {
        date: moment().add(1,'days').format(dateFormat),            
    },
    travellers: {
        adult: 1,
        child: 0,
        infact: 0,
        room: 1,
        childAge: []
    },
    travellerClass: {        
        name: 'Economy',
        key: 'Y'
    },    
    nationType: 'f',
    isRefreshing: false,
    recommendedCities : myanmarCities
}

function searchComponentReducers(state = INITIAL_STATE , action) {    
    switch (action.type) { 
        case actions.DEFAULT_VALUE_SEARCH_COMPONENTS:
            return Object.assign({}, state, {
                from: action.payload.from,
                to : action.payload.to,
                fromDate:action.payload.fromDate,
                toDate: action.payload.toDate,
                onewayDate: action.payload.onewayDate,
                travellers: action.payload.travellers,
                travellersType:action.payload.travellersType,
                searchTab: action.payload.searchTab,
                recommendedCities : action.payload.recommendedCities,
                destination: action.payload.destination,
                tourDestination: action.payload.tourDestination
            });
        case actions.SET_AUTOCOMPLETE_FROM_VALUE:            
            return Object.assign({}, state, {
                from:{
                    fromCityTitle: action.payload.title,            
                    fromCity: action.payload.keyword,
                    id: action.payload.id,
                    placeholder: state.from.placeholder
                }
            })            
        case actions.SET_AUTOCOMPLETE_TO_VALUE:
            return Object.assign({}, state, {
                to:{
                    toCityTitle: action.payload.title,
                    toCity:action.payload.keyword,
                    id: action.payload.id,
                    placeholder: state.to.placeholder
                }
            })  
        case actions.SEARCH_DATE_FROM_VALUE:
            return Object.assign({}, state, {
                fromDate:{                    
                    date: action.payload            
                }
            })   
        case actions.SEARCH_DATE_TO_VALUE:
            return Object.assign({}, state, {
                toDate: {
                    date: action.payload,            
                },
            })
        case actions.SEARCH_ONEWAY_DATE_VALUE:
            return Object.assign({}, state, {
                onewayDate: {
                    date: action.payload
                }
            })
        case actions.ADD_COUNT_TRAVELLER:
            return Object.assign({}, state, {
                travellers: {
                    adult: action.travellerType == 'adult' ? state.travellers.adult + 1 : state.travellers.adult,
                    child: action.travellerType == 'child' ? state.travellers.child + 1 : state.travellers.child,
                    infact: action.travellerType == 'infact' ? state.travellers.infact + 1 : state.travellers.infact,
                    room: action.travellerType == 'room' && state.travellers.room <= 9 ? state.travellers.room + 1 : state.travellers.room,
                    childAge: state.travellers.childAge
                },
            })
        case actions.REDUCE_COUNT_TRAVELLER:
            return Object.assign({}, state, {
                travellers: {
                    adult: action.travellerType == 'adult' && state.travellers.adult > 1 ? state.travellers.adult - 1 : state.travellers.adult,
                    child: action.travellerType == 'child' && state.travellers.child > 0 ? state.travellers.child - 1 : state.travellers.child,
                    infact: action.travellerType == 'infact' && state.travellers.infact > 0 ? state.travellers.infact - 1 : state.travellers.infact,
                    room: action.travellerType == 'room' && state.travellers.room > 1  ? state.travellers.room - 1 : state.travellers.room,
                    childAge: state.travellers.childAge
                },
            })
        case actions.SELECT_TRAVELLER_CLASS:
            return Object.assign({}, state, {
                travellerClass: {
                    name: action.payload.title,
                    key: action.payload.keyword
                }
            })
        case actions.CHANGE_NATION_TYPE:
            return Object.assign({}, state, {
                nationType: action.payload
            })
        case actions.CHANGE_TRIP_PLAN:
            return Object.assign({}, state, {
                searchTab: action.payload
            })
        case actions.SWAP_SEARCH_VALUE:
            return Object.assign({}, state, {
                from: {
                    fromCityTitle: state.to.toCityTitle,            
                    fromCity: state.to.toCity,
                    placeholder: state.from.placeholder
                },
                to: {
                    toCityTitle: state.from.fromCityTitle,
                    toCity: state.from.fromCity,
                    placeholder: state.to.placeholder
                },
                isRefreshing: false
            })
        case actions.IS_REFRESING_STATE:
            return Object.assign({}, state, {
                isRefreshing: true
            })
        case actions.IS_REFRESING_STATE_END:
            return Object.assign({}, state, {
                isRefreshing: false
            })      
        case actions.SELECT_DESTINATION_VALUE:   
            return Object.assign({}, state, {
                destination: {
                    name: action.payload.name,
                    slug: action.payload.slug,
                    scope: action.payload.scope,
                    township_slug: action.payload.township_slug,
                    id: action.payload.id,
                    region: action.payload.region,
                    placeholder: state.destination.placeholder,
                    country: action.payload.country,
                    hotel_slug: action.payload.hotel_slug
                }
            })
        case actions.ADD_AGE_SELECTOR:             
            var childAgeObj = {name: state.travellers.childAge.length + 1, age: 1}; 
            return Object.assign({}, state, {
                travellers: {
                    adult: state.travellers.adult,
                    child: state.travellers.child,
                    infact: state.travellers.infact,
                    room: state.travellers.room,
                    childAge: state.travellers.childAge.concat(childAgeObj)
                }
            })
        case actions.REDUCE_AGE_SELECTOR:
            var childAgeArr = state.travellers.childAge.slice(0, state.travellers.childAge.length - 1); 
            return Object.assign({}, state, {
                travellers: {
                    adult: state.travellers.adult,
                    child: state.travellers.child,
                    infact: state.travellers.infact,
                    room: state.travellers.room,
                    childAge: state.travellers.childAge.length >= 1 ? childAgeArr : []
                }
            })
        case actions.SELECT_CHILD_AGE:       
            var childAgeArrUpdate = state.travellers.childAge;
            childAgeArrUpdate[action.payload.name - 1] = {name: action.payload.name, age: action.payload.age}
            return Object.assign({}, state, {
                travellers: {
                    adult: state.travellers.adult,
                    child: state.travellers.child,
                    infact: state.travellers.infact,
                    room: state.travellers.room,
                    childAge: childAgeArrUpdate
                }
            })
        case actions.SELECT_TOUR_DESTINATION:
            return Object.assign({}, state, {
                tourDestination: {
                    cityId: action.payload.cityId,
                    name: action.payload.name,
                    placeholder: state.tourDestination.placeholder
                }
            })
        case actions.SELECT_TRAVELLER_COUNT:
            return Object.assign({}, state, {
                travellers: {
                    adult: action.payload,
                    child: state.travellers.child,
                    infact: state.travellers.infact,
                    room: state.travellers.room,
                    childAge: childAgeArrUpdate
                }
            })
        default:
          return state
      }       
}

export default searchComponentReducers;