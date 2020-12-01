import * as types from '../constants/actionTypes';
// import moment from 'moment';
// const dateFormat = 'DD MMM YYYY';
/**
 * product reducers.
 * @param state
 * @param action
 * @returns {*}
 */

const INITIAL_STATE = {
    language : 'en',
    nation   : {
        type : 'l',
        name : 'Myanmar Citizen',
        other_name: 'local',
        value: 'ntl'
    },
    currency : {
        type : 'mmk',
        name : 'MMK'
    },        
    menu:'/flights',
    promotion: {
        open : true,
        show_date: null
    },
    payment: {
        onepay_token: '',
        wavepay_token: '',
        phone: '',
        channel: '',
        kbzpay_token: '',
        userName:''
    }
}

function navbarOptions(state = INITIAL_STATE , action) {
    switch (action.type) {
        case types.REQUEST_CHANGE_LANG:
            return Object.assign({}, state, {
                language: action.payload
            });
        case types.CHANGE_NATIONAL_TYPE:            
            return Object.assign({}, state, {
                nation:{
                    type: action.payload.type,
                    name: action.payload.name,
                    other_name: action.payload.other_name,
                    value: action.payload.value
                }
            });
        case types.CHANGE_CURRENCY_UNIT:
            return Object.assign({}, state, {
                currency:{
                    type: action.payload.type,
                    name: action.payload.name
                }
            })
        case types.CHANGE_MENU_OPTIONS:
            return Object.assign({}, state, {
                menu: action.payload
            })
        case types.CLOSE_PROMOTION_SHOW:
                return Object.assign({}, state, {
                    promotion: {
                        open: false,
                        show_date: action.payload 
                    }
                })
        case types.UPDATE_PROMOTION_SHOW:                                    
            return Object.assign({}, state, {
                promotion: {
                    open: true,
                    show_date: action.payload 
                }
            })
        case types.REFRESH_PAYMENT:
            return Object.assign({}, state, {
                payment: {
                    onepay_token: '',
                    wavepay_token: '',
                    phone: '',
                    channel: '',
                    kbzpay_token: '',
                    user_name: ''
                }
            })
        case types.SET_PAYMENT_TYPE:
            return Object.assign({}, state, {
                payment: {
                    onepay_token: action.payload.onepay_token ? action.payload.onepay_token : '',
                    wavepay_token: action.payload.wavepay_token ? action.payload.wavepay_token : '',
                    phone: action.payload.phone ? action.payload.phone : '',
                    channel: action.payload.channel ? action.payload.channel : '',
                    kbzpay_token: action.payload.kbzpay_token ? action.payload.kbzpay_token : '',
                    user_name: action.payload.user_name ? action.payload.user_name : ''
                }
            })
        default:
          return state
      }       
}

export default navbarOptions;