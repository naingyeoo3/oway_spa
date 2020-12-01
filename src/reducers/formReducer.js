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
    firstName: {
        value: "",
        placeholder: "First Name",
        valid: false,   
    },
    lastName: {
        value: "",
        placeholder: "Last Name",
        valid: false
    },
    gender: {
        value: "male",
        valid: false
    },
    nationality: {
        value: "",
        valid: false
    },
    dob : {
        value: moment(Date.now()).format(dateFormat),
        valid: true
    },
    init: null
}

function formReducer(state = INITIAL_STATE , action) {
    switch (action.type) {
        case types.CHANGE_FIRST_NAME:
            return Object.assign({}, state, {
                firstName: {
                    value      : action.payload.value,
                    placeholder: action.payload.placeholder,
                    valid      : action.payload.valid
                }
            });
        case types.CHANGE_LAST_NAME:
            return Object.assign({}, state, {
                lastName: {
                    value      : action.payload.value,
                    placeholder: action.payload.placeholder,
                    valid      : action.payload.valid
                }
            });
        case types.CHANGE_GENDER:
            return Object.assign({}, state, {
                gender: {
                    value: action.payload.value,
                    valid: action.payload.valid
                }
            });
        case types.CHANGE_NATION:
            return Object.assign({}, state, {
                nationality: {
                    value: action.payload.value,
                    valid: action.payload.valid
                }
            });
        case types.CHANGE_DATE_OF_BIRTH:
            return Object.assign({}, state, {
                dob: {
                    value: action.payload.value,
                    valid: action.payload.valid
                }
            });
        case types.SET_VISA_DEFAULT_VALUE:
            return Object.assign({},state, {                
                nationality: {
                    value: '',
                    valid: false
                },
                firstName: {
                    value: '',
                    valid: false
                },
                lastName: {
                    value: '',
                    valid: false
                }
            })
        case types.LOAD_DEFAULT_VALUES:
            return Object.assign({}, state, {
                init: action.payload
            })
        default:
          return state
      }       
}

export default formReducer;
