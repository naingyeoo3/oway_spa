import * as types from '../constants/actionTypes';
const INITAIL_STATE = {
  orderId: null,
  productId: '',
  flightOrderId: [],
  userId: '',
  userTypeId: '',
  tripType: 0,
  flightType: 0,
  bookingDate: '',
  paymentCategoryId: '',
  paymentSubCategoryId: '',
  orderStatus: '',
  paymentStatus: '',
  bookingStatus: '',
  paymentProcessingFee: 0,
  paymentProcessingAmount: 0,
  discountPercent: 0,
  discountAmount: 0,
  taxPercent: 0,
  taxAmount: 0,
  tierAmount: 0,
  fareType: '',
  source: '',
  originTotalAmount: {},
  exchangeTotalAmount: [],
  contactInfo: {},
  promoInfo: [],
  deliveryInfo: [],
  travelerInfo: {},
  flightInfo: {},
  hotelInfo: {},
  tourInfo: {},
  busInfo: {},
  flightOrderInfo: [],
  orderUpdated: false,
  isFetching: false,
  orderConfirmed: false,
  emailSent: false,
  tour: null,
  tourOrderUpdate: null,
  tourOrderConfirm: null,
  hotel: null,
  hotelOrder: null,
  hotelPayUpdate: null,
  hotelOrderUpdate: null,
  hotelOrderConfirm: null
};

function orderReducer(state = INITAIL_STATE, action) {
  switch (action.type) {
    case types.INSERT_ORDER:
      return Object.assign({}, state, {
        isFetching: true,
        flightInfo: action.payload,
      });
    case types.SUCCESS_INSERT_ORDER:
      return Object.assign({}, state, {
        orderId: action.payload.orderId,
        userId: action.payload.userId,
        userTypeId: action.payload.userTypeId,
        productId: action.payload.productId,
        paymentCategoryId: action.payload.paymentCategoryId,
        paymentSubCategoryId: action.payload.paymentSubCategoryId,
        contactInfo: action.payload.contactInfo,
        originTotalAmount: action.payload.originTotalAmount,
        exchangeTotalAmount: action.payload.exchangeTotalAmount,
        source : action.payload.source,
        isFetching: false,
      });
    case types.CONFIRM_ORDER:
      return Object.assign({}, state, {
        orderConfirmed: false,
        orderUpdated: false,
      });
    case types.SUCCESS_CONFIRM_ORDER:
      return Object.assign({}, state, {
        flightOrderInfo: action.payload.flightOrderInfo,
        exchangeTotalAmount: action.payload.exchangeTotalAmount,
        travelerInfo: action.payload.travelerInfo,
        promoInfo: action.payload.promoInfo,
        contactInfo: action.payload.contactInfo,
        bookingDate: action.payload.bookingDate,
        tripType: action.payload.tripType,
        flightType: action.payload.flightType,
        paymentStatus: action.payload.paymentStatus,
        orderStatus: action.payload.orderStatus,
        paymentProcessingFee: action.payload.paymentProcessingFee,
        paymentProcessingAmount: action.payload.paymentProcessingAmount,
        fareType: action.payload.fareType,
        source: action.payload.source,
        orderConfirmed: true,
      });
     case types.INSERT_BUS_ORDER : 
          return Object.assign({}, state, {
            isFetching: true,
            busInfo: action.payload,
          });
     case types.RECEIVE_BUS_ORDER :
          return Object.assign({},state,{
            orderId: action.payload.orderId,
            userId: action.payload.userId,
            userTypeId: action.payload.userTypeId,
            productId: action.payload.productId,
            source : action.payload.source,
            paymentCategoryId: action.payload.paymentCategoryId,
            paymentSubCategoryId: action.payload.paymentSubCategoryId,
            contactInfo: action.payload.contactInfo,
            originTotalAmount: action.payload.originTotalAmount,
            exchangeTotalAmount: action.payload.exchangeTotalAmount,
            isFetching: false
          }) 
    case types.CONFIRM_ORDER_WITH_EMAIL:
      return Object.assign({}, state, {
        emailSent: false,
      });
    case types.CONFIRM_ORDER_WITH_EMAIL:
      return Object.assign({}, state, {
        emailSent: true,
      });
    case types.SUCCESS_UPDATE_ORDER:
      return Object.assign({}, state, {
        orderUpdated: true,
      });
    case types.LOAD_ORDER_FROM_LOCAL_STORAGE:
      return Object.assign({}, state, action.payload);
    case types.CREATE_TOUR_INSERT_ORDER:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.RECEIVE_TOUR_INSERT_ORDER:
      return Object.assign({}, state, {
        tour: action.payload,
      });
    case types.UPDATE_TOUR_ORDER:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.UPDATE_TOUR_ORDER_RES:
      return Object.assign({}, state, {
        tourOrderUpdate: action.payload,
      });
    case types.CONFIRM_TOUR_ORDER_RES:
      return Object.assign({}, state, {
        tourOrderConfirm: action.payload,
      });
    case types.REQUEST_HOTEL_ORDER_INSERT:
      return Object.assign({}, state, {
        hotel: action.payload.data,
      });
    case types.CREATE_HOTEL_ORDER:
      return Object.assign({}, state, {
        hotelOrder: action.payload,
      });
    case types.RECEIVE_PAY_UPDATE:
      return Object.assign({}, state, {
        hotelPayUpdate: action.payload,
      });
    case types.RECEIVE_HOTEL_ORDER_UPDATE:
      return Object.assign({}, state, {
        hotelOrderUpdate: action.payload,
      });
    case types.RECEIVE_HOTEL_ORDER_CONFIRM:
      return Object.assign({}, state, {
        hotelOrderConfirm: action.payload,
      });
    default:
      return state;
  }
}

export default orderReducer;
