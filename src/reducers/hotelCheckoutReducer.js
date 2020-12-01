import * as types from '../constants/actionTypes';

/**
 * product reducers.
 * @param state
 * @param action
 * @returns {*}
 */

const INITIAL_STATE = {
    isFetching: false,
    checkout: null,
    allCheckout: null,    
    contact : {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        also: false
    },
    addInfo: {
        firstname: '',
        lastname: '',
        phone:'',
        country: '',
        passport: ''
    }
}

function hotelCheckoutReducer(state = INITIAL_STATE , action) {
    switch (action.type) {
        case types.REQUEST_HOTEL_CHECKOUT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.RECEIVE_HOTEL_CHECKOUT:
            return Object.assign({}, state, {
                isFetching: false,
                checkout: action.payload
            })
        case types.REQUEST_HOTEL_ALL_CHECKOUT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.RECEIVE_HOTEL_ALL_CHECKOUT:
            return Object.assign({}, state, {
                allCheckout: action.payload,
            });
        case types.CHANGE_FIRST_NAME_HOTEL:
            return Object.assign({}, state, {
                contact : {
                    firstname: action.payload,
                    lastname: state.contact.lastname,
                    phone: state.contact.phone,
                    email: state.contact.email,
                    also: state.contact.also
                }          
            })
        case types.CHANGE_LAST_NAME_HOTEL:
            return Object.assign({}, state, {
                contact : {
                    firstname: state.contact.firstname,
                    lastname: action.payload,
                    phone: state.contact.phone,
                    email: state.contact.email,
                    also: state.contact.also
                }          
            })
        case types.CHANGE_PHONE_NUM_HOTEL:
            return Object.assign({}, state, {
                contact : {
                    firstname: state.contact.firstname,
                    lastname: state.contact.lastname,
                    phone: action.payload,
                    email: state.contact.email,
                    also: state.contact.also
                }          
            })
        case types.CHANGE_EMAIL_INPUT_HOTEL:
            return Object.assign({}, state, {
                contact : {
                    firstname: state.contact.firstname,
                    lastname: state.contact.lastname,
                    phone: state.contact.phone,
                    email: action.payload,
                    also: state.contact.also
                }          
            })
        case types.CHANGE_ALSO_TRAVELLING:
            return Object.assign({}, state, {
                addInfo: {
                    firstname: action.payload == true ? state.contact.firstname : state.addInfo.firstname,
                    lastname: action.payload == true ? state.contact.lastname : state.addInfo.lastname,
                    phone: action.payload == true ? state.contact.phone : state.addInfo.phone,
                    country: '',
                    passport: ''
                }
            })
        case types.CHANGE_ADULT_NAME:
            return Object.assign({}, state, {
                addInfo: {
                    firstname: action.payload,
                    lastname: state.addInfo.lastname,
                    phone: state.addInfo.phone,
                    country: state.addInfo.country,
                    passport: state.addInfo.passport
                }
            })
        case types.CHANGE_ADULT_LAST_NAME:
            return Object.assign({}, state, {
                addInfo: {
                    firstname: state.addInfo.firstname,
                    lastname: action.payload,
                    phone: state.addInfo.phone,
                    country: state.addInfo.country,
                    passport: state.addInfo.passport
                }
            })            
        case types.CHANGE_ADD_PHONE_NUM:
            return Object.assign({}, state, {
                addInfo: {
                    firstname: state.addInfo.firstname,
                    lastname: state.addInfo.lastname,
                    phone: action.payload,
                    country: state.addInfo.country,
                    passport: state.addInfo.passport
                }
            })
        case types.CHANGE_COUNTRY_NAME:
            return Object.assign({}, state, {
                addInfo: {
                    firstname: state.addInfo.firstname,
                    lastname: state.addInfo.lastname,
                    phone: state.addInfo.phone,
                    country: action.payload,
                    passport: state.addInfo.passport
                }
            })
        case types.CHANGE_PASSPORT_NUM_HOTEL:
            return Object.assign({}, state, {
                addInfo: {
                    firstname: state.addInfo.firstname,
                    lastname: state.addInfo.lastname,
                    phone: state.addInfo.phone,
                    country: state.addInfo.country,
                    passport: action.payload
                }
            })
        default:
          return state
      }       
}

export default hotelCheckoutReducer;
