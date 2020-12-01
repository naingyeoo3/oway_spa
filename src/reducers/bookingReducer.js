import * as actions from '../constants/actionTypes';
const INITAIL_STATE = {
    bookingRefCode: [],
    flightInfo: {},
    hotelInfo: {},
    busInfo: {
        bookingPayload : null,
        isFetching: false,
        data: null
    },
    source: [],
    cacheKey: '',
    rates: [],
    refCode: [],
    bookingSuccessCode: [],
    bookingStatus: '',
    bookingPrepared: false,
    bookingCompleted: false,
    isFetching: false,
    tour: {
        isFetching: false,
        data: null
    }
}
function bookingReducer(state = INITAIL_STATE, action) {
    switch (action.type) {
        case actions.REQUEST_PREPARE_BOOKING: return Object.assign({}, state, {
            isFetching: true,
            bookingPrepared: false
        })
        case actions.RECEIVE_PREPARE_BOOKING: return Object.assign({}, state, {
            bookingRefCode: action.payload.bookingRefCode,
            source: action.payload.source,
            cacheKey: action.payload.cacheKey,
            rates: action.payload.rates,
            refCode: action.payload.refCode,
            isFetching: false,
            bookingPrepared: true
        })
        case actions.REQUEST_COMPLETE_BOOKING: return Object.assign({}, state, {
            isFetching: true,
            bookingCompleted: false
        })
        case actions.RECEIVE_COMPLETE_BOOKING: return Object.assign({}, state, {
            bookingCompleted: true,
            bookingPrepared: false,
            bookingStatus: action.payload.bookingStatus,
            bookingSuccessCode: action.payload.bookingSuccessCode,
            bookingRefCode: action.payload.bookingRefCode,
            refCode: action.payload.refCode

        })
        case actions.LOAD_BOOKING_FROM_STORAGE: return Object.assign({}, state, action.payload)

        case actions.CREATE_BUS_BOOKING:
            let busInfo = state.busInfo;
            busInfo["isFetching"] = true;
            busInfo["bookingPayload"] = action.payload;
            return Object.assign({}, state, {
              busInfo : busInfo,
              bookingPrepared :false
            })
        case actions.RECEIVE_BUS_BOOKING :
             busInfo = state.busInfo;
             busInfo["isFetching"] = false;
             busInfo["data"] = action.payload;
             return Object.assign({}, state, {
                busInfo : busInfo,
                bookingPrepared : true
              })    

        default: return state
    }
}

export default bookingReducer;