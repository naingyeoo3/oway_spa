import * as actions from '../constants/actionTypes';

export function addContactInfo(payload) {
    return {
         type : actions.ADD_CONTACT_INFO,
         payload : payload
    }
}