import * as types from '../constants/actionTypes';

const INITIAL_STATE = {
    isFetching : false,
    paymentStatus : "processing",
    request : {},
    isPaymentUpdated : false,
    payResponse : {},
    htmlPage : '',
    startedWavePay : false,
    startedKbzPay : false,
    startedOnePay : false,
    payStatus: null
}

function makePaymentReducer (state = INITIAL_STATE ,action){
    switch(action.type){
        case types.REQUEST_MAKE_PAYMENT : return Object.assign({},state,{
            isFetching :true,
            request : action.payload
        })
        case types.RECEIVE_MAKE_PAYMENT : return Object.assign({},state,{
            isFetching : false,
            htmlPage : action.payload,
            paymentStatus: "success"
        })
        case types.UPDATE_PAY_STATUS : return Object.assign({},state,{
            isFetching : true,
            isPaymentUpdated :false
        })
        case types.UPDATE_PAY_STATUS_RES : return Object.assign({},state,{
            isPaymentUpdated : true,
            payResponse : action.payload.payResponse
        })
        case types.WAVE_PAY_START : return Object.assign({},state,{
            isFetching : true
        })
        case types.SUCCESS_WAVE_PAY_START : return Object.assign({},state,{
            startedWavePay : true,
            isFetching : false
        })
        case types.ONE_PAY_START : return Object.assign({},state,{
            isFetching : true
        })
        case types.SUCCESS_ONE_PAY : return Object.assign({},state,{
            startedOnePay : true,
            isFetching : false
        })

        case types.KBZ_PAY_START : return Object.assign({},state,{
           isFetching : true
        })
        case types.SUCCESS_KBZ_PAY : return Object.assign({},state,{
            startedKbzPay : true,
            isFetching : false    
        })
        case types.MAKE_TOUR_PAYMENT:
            return Object.assign({}, state, {
                isFetching: true                
            });
        case types.RECEIVE_TOUR_PAYMENT_RES:
            return Object.assign({}, state, {                
                isFetching: false,
                paymentStatus: "success",
                htmlPage: action.payload                
            })
        case types.UPDATE_PAY_STATUS:
            return Object.assign({}, state, {                
                isFetching: true,                    
            });
        case types.UPDATE_PAY_STATUS_RES:
            return Object.assign({}, state, {
                isFetching: false,
                payStatus: action.payload
            });
        case types.MAKE_HOTEL_PAYMENT:
            return Object.assign({}, state, {
                isFetching: true                
            });
        case types.RECEIVE_HOTEL_PAYMENT:
            return Object.assign({}, state, {                
                isFetching: false,
                paymentStatus: "success",
                htmlPage: action.payload                
            })
        default : return state
    }
}

export default makePaymentReducer;