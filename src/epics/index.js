import {switchMap, map, catchError} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of, from } from 'rxjs';
import * as actions from '../constants/actionTypes';

import {
  search,
  searchDest
} from './autocompleteEpics';
import {
  userSubscribe
} from './subscribeEpics';

import { 
  flightEpic,
  hotelEpic,
  busEpic,
  tourEpic,
  hotdealEpic,
  visaEpic,
  carEpic
} from './hotdealEpics';

import {
  departFilterEpic,
  priceFilterEpic,
  stopFilterEpic,
  airlineFilterEpic,
  typeFilterEpic,
  classFilterEpic,
  resetAirlineEpic,
  resetClassEpic,
  resetDepartsEpic,
  resetStopEpic,
  getFlights,
  verifyFlightEpic,
  confirmFlightEpic
} from './flightListingEpics';

import {
  searchHotels,
  getHotels,
  filterHotels,
  getHotelFilters,
  getHotelDetail  
} from './hotelListingEpics';

import {
  tourListingEpic,
  sortPriceAceEpice,
  sortPriceDecEpice,
  tourDetailEpic,
  categoryFilterEpic,
  sortDiscountAceEpic,
  sortDiscountDecEpic,
  sortRecommedAceEpic,
  sortRecommedDecEpic,
  loadMoreEpic,
  filterTourSearch,
  dailyRate
} from './tourListingEpics';

import {
  busOnewayListingEpic,
  busRoundTripListingEpic,
  busReturnListingEpic,
  busDetailEpic,
  busPriceFilterEpic,
  busOperatorsFilterEpic,
  busResetOperatorsFilter,
  busClassesFilterEpic,
  busResetClassesFilterEpic,
  busAmenitiesFilterEpic,
  busResetAmenitiesFilterEpic,
  busDepartFilterEpic,
  busResetDepartFilterEpic,
  requestOwayTierEpic,
  busConfirmEpic
} from './busListingEpics';

import {
  requestConfirmBusCheckoutEpic
} from './busCheckoutEpics'

import {
requestCountryEpic
} from './countryEpics';

import {
  requestMakePaymentEpic,
  updatePaymentStatus,
  startKbzPayEpic,
  startOnePayEpic,
  startWavePayEpic
} from './makePaymentEpics'

import {
requestPrepareBookingEpic,
requestCompleteBookingEpic,
createBusBookingEpic
} from './bookingEpics'

import {
  requestPaymentTypeEpic
} from './paymentEpic';

import {
   inserOrderEpic,
   updateOrderEpic,
   confirmOrderEpic,
   confirmOrderEpicWithEmail,
   insertBusOrderEpic
} from './orderEpics'

import{
  attrCategoryEpic,
  attrListingEpic,
  attrSortDiscountAceEpic,
  attrSortDiscountDecEpic,
  attrSortRecommedAceEpic,
  attrSortRecommedDecEpic,
  attrSortPriceAceEpice,
  attrSortPriceDecEpice,
  loadMoreAttrEpic,
  attrDetailEpic,
  filterAttrSearch
} from './attractionListingEpics';

import {
  tourCheckoutEpic,
  allCheckoutEpic,
  createTourBooking,
  insertOrder,
  makePayment,
  paymentConfirm
} from './tourCheckoutEpics';

import {
  requestHotelCheckout,
  makeHotelPayment,
  requestHotelAllCheckout  
} from './hotelCheckoutEpics';

import {
  searchVisa,
  applyVisa,
  checkoutVisa
} from './visaEpics';

import {
  userLogin,
  userRegister,
  verifyOtp,
  forgotPass,
  changePass
} from './userEpics';

export const rootEpic = combineEpics(    
  search,
  searchDest,  
  searchHotels,
  getFlights,
  verifyFlightEpic,
  confirmFlightEpic,
  getHotels,
  getHotelFilters,
  filterHotels,
  getHotelDetail,
  flightEpic,
  hotelEpic,
  busEpic,
  tourEpic,
  visaEpic,
  carEpic,
  hotdealEpic,
  departFilterEpic,
  priceFilterEpic,
  stopFilterEpic,
  airlineFilterEpic,
  typeFilterEpic,
  classFilterEpic,
  tourListingEpic,
  loadMoreEpic,
  resetAirlineEpic,
  resetClassEpic,
  resetDepartsEpic,
  resetStopEpic,
  busOnewayListingEpic,
  busRoundTripListingEpic,
  busReturnListingEpic,
  busDetailEpic,
  busPriceFilterEpic,
  busOperatorsFilterEpic,
  busResetOperatorsFilter,
  busClassesFilterEpic,
  busResetClassesFilterEpic,
  busAmenitiesFilterEpic,
  busResetAmenitiesFilterEpic,
  busDepartFilterEpic,
  busResetDepartFilterEpic,
  sortPriceAceEpice,
  sortPriceDecEpice,
  tourDetailEpic,
  categoryFilterEpic,
  sortDiscountAceEpic,
  sortDiscountDecEpic,
  sortRecommedAceEpic,
  sortRecommedDecEpic,
  requestCountryEpic,
  requestPaymentTypeEpic,
  inserOrderEpic,
  attrCategoryEpic,
  attrListingEpic,
  attrSortDiscountAceEpic,
  attrSortDiscountDecEpic,
  attrSortRecommedAceEpic,
  attrSortRecommedDecEpic,
  attrSortPriceAceEpice,
  attrSortPriceDecEpice,
  loadMoreAttrEpic,
  attrDetailEpic,
  filterAttrSearch,
  filterTourSearch,
  tourCheckoutEpic,
  allCheckoutEpic,
  requestPrepareBookingEpic,
  requestMakePaymentEpic,
  createTourBooking,
  insertOrder,
  makePayment,
  userSubscribe,
  updatePaymentStatus,
  confirmOrderEpic,
  confirmOrderEpicWithEmail,
  updateOrderEpic,
  requestCompleteBookingEpic,
  startWavePayEpic,
  startOnePayEpic,
  startKbzPayEpic,
  paymentConfirm,
  dailyRate,
  requestHotelCheckout,
  makeHotelPayment,
  requestOwayTierEpic,
  busConfirmEpic,
  requestConfirmBusCheckoutEpic,
  createBusBookingEpic,
  insertBusOrderEpic,
  makeHotelPayment,
  requestHotelAllCheckout,
  searchVisa,
  applyVisa,
  checkoutVisa,
  userLogin,
  userRegister,
  verifyOtp,
  forgotPass,
  changePass
);