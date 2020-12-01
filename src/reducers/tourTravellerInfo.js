import * as types from '../constants/actionTypes';
import moment from 'moment';
const dateFormat = 'DD MMM YYYY';
/**
 * form reducers.
 * @param state
 * @param action
 * @returns {*}
 */

const INITIAL_STATE = {
    contactInfo: {
        firstName:'',
        lastName:'',
        phoneNo:'',
        email:'',
        isInclude: false,
        easyBook: false
    },
    traveller :[
        {
            firstName: '',
            lastName: '',
            country: '',
            passportNum: '',
            passportExpire: ''
        }
    ],

}

function tourTravellerInfo(state = INITIAL_STATE , action) {
    switch (action.type) {
        case types.LOAD_TRAVELLER_INFO:
            var adult = [];
            for (let i = 0; i < action.payload; i++) {
                adult.push(state.traveller[0])            
            }
            return Object.assign({}, state, {
                traveller: adult
            }); 
        case types.CHANGE_CONTACT_FIRST_NAME:            
            return Object.assign({}, state, {
                contactInfo :{
                    firstName: action.payload,
                    lastName: state.contactInfo.lastName,
                    phoneNo: state.contactInfo.phoneNo,
                    email: state.contactInfo.email,
                    isInclude: state.contactInfo.isInclude,
                    easyBook: state.contactInfo.easyBook
                }
            }); 
        case types.CHANGE_CONTACT_LAST_NAME:            
            return Object.assign({}, state, {
                contactInfo :{
                    firstName: state.contactInfo.firstName,
                    lastName: action.payload,
                    phoneNo: state.contactInfo.phoneNo,
                    email: state.contactInfo.email,
                    isInclude: state.contactInfo.isInclude,
                    easyBook: state.contactInfo.easyBook
                }
            });        
        case types.CHANGE_CONTACT_PHONE_NO:            
            return Object.assign({}, state, {
                contactInfo :{
                    firstName: state.contactInfo.firstName,
                    lastName: state.contactInfo.lastName,
                    phoneNo: action.payload,
                    email: state.contactInfo.email,
                    isInclude: state.contactInfo.isInclude,
                    easyBook: state.contactInfo.easyBook
                }
            }); 
        case types.CHANGE_CONTACT_EMAIL:            
            return Object.assign({}, state, {
                contactInfo :{
                    firstName: state.contactInfo.firstName,
                    lastName: state.contactInfo.lastName,
                    phoneNo: state.contactInfo.phoneNo,
                    email: action.payload,
                    isInclude: state.contactInfo.isInclude,
                    easyBook: state.contactInfo.easyBook
                }
            });
        case types.CHANGE_CONTACT_ISINCLUDE:            
            return Object.assign({}, state, {
                contactInfo :{
                    firstName: state.contactInfo.firstName,
                    lastName: state.contactInfo.lastName,
                    phoneNo: state.contactInfo.phoneNo,
                    email: state.contactInfo.email,
                    isInclude: action.payload,
                    easyBook: state.contactInfo.easyBook
                }
            });
        case types.CHANGE_CONTACT_EASY_BOOK:            
            return Object.assign({}, state, {
                contactInfo :{
                    firstName: state.contactInfo.firstName,
                    lastName: state.contactInfo.lastName,
                    phoneNo: state.contactInfo.phoneNo,
                    email: state.contactInfo.email,
                    isInclude: state.contactInfo.isInclude,
                    easyBook: action.payload
                }
            });
        case types.CHANGE_FIRST_NAME_INPUT:
            const firstName_payload = {                
                firstName: action.payload,
                lastName: state.traveller[action.id].lastName,
                country: state.traveller[action.id].country,
                passportNum: state.traveller[action.id].passportNum,
                passportExpire: state.traveller[action.id].passportExpire
            }
            state.traveller[action.id] = firstName_payload
            return Object.assign({}, state, {
                traveller: state.traveller
            })
        case types.CHANGE_LAST_NAME_INPUT:
            const lastNamePayload = {                
                firstName: state.traveller[action.id].firstName,
                lastName: action.payload,
                country: state.traveller[action.id].country,
                passportNum: state.traveller[action.id].passportNum,
                passportExpire: state.traveller[action.id].passportExpire
            }
            state.traveller[action.id] = lastNamePayload
            return Object.assign({}, state, {
                traveller: state.traveller
            })
        case types.CHANGE_COUNTRY_NAME_INPUT:
            const countryPayload = {                
                firstName: state.traveller[action.id].firstName,
                lastName: state.traveller[action.id].lastName,
                country: action.payload,
                passportNum: state.traveller[action.id].passportNum,
                passportExpire: state.traveller[action.id].passportExpire
            }
            state.traveller[action.id] = countryPayload
            return Object.assign({}, state, {
                traveller: state.traveller
            })
        case types.CHANGE_PASSPORT_NUMBER_INPUT:
            const passportPayload = {                
                firstName: state.traveller[action.id].firstName,
                lastName: state.traveller[action.id].lastName,
                country: state.traveller[action.id].country,
                passportNum: action.payload,
                passportExpire: state.traveller[action.id].passportExpire
            }
            state.traveller[action.id] = passportPayload
            return Object.assign({}, state, {
                traveller: state.traveller
            })
        case types.CHANGE_EXPIRE_DATE_INPUT:
            const expirePayload = {                
                firstName: state.traveller[action.id].firstName,
                lastName: state.traveller[action.id].lastName,
                country: state.traveller[action.id].country,
                passportNum:  state.traveller[action.id].passportNum,
                passportExpire: action.payload
            }
            state.traveller[action.id] = expirePayload
            return Object.assign({}, state, {
                traveller: state.traveller
            })
        default:
          return state
      }       
}

export default tourTravellerInfo;
