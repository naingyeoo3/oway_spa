import * as types from '../constants/actionTypes';
import messages_en from "../assests/resources/i18n/en.json";
/**
 * product reducers.
 * @param state
 * @param action
 * @returns {*}
 */

const INITIAL_STATE = {
    lang: 'en',
    queryName:'en',
    messages: messages_en,
    isDefaultLocale: true,
}

function locales(state = INITIAL_STATE , action) {
    switch (action.type) {
        case types.CHANGE_LOCALE:
            return Object.assign({}, state, {
                lang: action.lang,
                queryName: action.queryName,
                messages: action.messages,
                isDefaultLocale: action.isDefaultLocale
            });
              
        default:
          return state
      }       
}

export default locales;
