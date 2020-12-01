import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router';
import history from '../utils/history';

import { reducer as reduxFormReducer } from 'redux-form';
import { default as navbarOptions } from './navbarOptions';
import { default as locales} from './locales';
import { default as searchResults } from './searchResults';
import { default as searchComponentReducers } from './searchComponentReducers';
import { default as formReducer } from './formReducer';
import { default as flightsListingReducer}from './flightsListingReducer';
import { default as hotelsListingReducer} from './hotelsListingReducer';
import { default as hotelReservationReducer} from './hotelReservationReducer';
import { default as listingSearchReducer } from './listingSearchReducer';
import { default as hotDealReducer } from './hotDealReducer';
import { default as tourListing } from './toursListingReducer';
import { default as busListing } from './busesListingReducer';
import { default as countryListing } from './countryReducer';
import { default as paymentReducer } from './paymentReducer';
import { default as travellerInfoReducer } from './travellerInfoReducer';
import { default as orderReducer } from './orderReducer';
import { default as tourTravellerInfo } from './tourTravellerInfo';
import { default as attrListing } from './attrListingReducer';
import { default as checkoutReducer } from './checkoutReducer';
import { default as contactInfoReducer} from './contactInfoReducer'; 
import { default as bookingReducer } from './bookingReducer';
import { default as makePaymentReducer } from './makePaymentReducer';
import { default as subscribeReducer } from './subscribeReducer'
import { default as hotelCheckoutReducer } from './hotelCheckoutReducer';
import { default as visaReducer } from './visaReducer';
import { default as users } from './users';

/**
 * reducers.
 */
const appState = combineReducers({
  navbarOptions,
  locales,
  searchResults,
  searchComponentReducers,
  formReducer,
  listingSearchReducer,
  contactInfoReducer,
  bookingReducer,
  flightsListing : flightsListingReducer,
  hotelsListing : hotelsListingReducer,
  hotelReservation : hotelReservationReducer,
  countryListing ,
  paymentReducer,
  hotDealReducer,
  tourListing,
  busListing,
  travellerInfo: travellerInfoReducer,
  orderReducer : orderReducer,
  attrListing,
  tourTravellerInfo,
  checkoutReducer,
  makePaymentReducer,
  subscribeReducer,
  hotelCheckoutReducer,
  visaReducer,
  users,
  form: reduxFormReducer,
  router: connectRouter(history)
})

/**
 * Returns the combined reducer.
 * @param state
 * @param action
 */
export const rootReducer = (state, action) => {

  return appState(state, action)
}
