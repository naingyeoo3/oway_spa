import * as actions from '../constants/actionTypes';
const INITAIL_STATE = {
    paymentTypeList: [],
    cards:[],
    mobilePayments:[],
    cods:[],
    payAtShops:[],
    productId:0,
    wallet :{},
    source :[],
    channelType : 0,
    userRoleId :0,
    rates: {},
    promoInfo: [],
    airAsiaBigLife: [],
    selectedPayment : {},
    isFetching: true,
    alert: {
        show: false,
        msg:""
    }
}
function paymentReducer(state = INITAIL_STATE, action) {
    switch (action.type) {
        case actions.REQUEST_PAYMENT_TYPE: 
            return Object.assign({}, state, {
                isFetching: true,
                selectedPayment : action.payload.paymentMethodDetailInfo
            })
        case actions.RECEIVE_PAYMENT_TYPE:         
            return Object.assign({}, state, {
                isFetching: false,
                paymentTypeList: action.payload.paymentMethodsInfo.subCategories,
                rates : action.payload.rates,
                productId : action.payload.productId,
                source : action.payload.source,
                channelType : action.payload.channelType,
                userRoleId : action.payload.userRoleId,
                promoInfo : action.payload.promoInfo,
                airAsiaBigLife:action.payload.airAsiaBigLife,
                cards : filterCards(action.payload.paymentMethodsInfo.subCategories),
                mobilePayments : filterMobilePayments(action.payload.paymentMethodsInfo.subCategories),
                cods : filterCOD(action.payload.paymentMethodsInfo.subCategories),
                payAtShops : filterPayAtShop(action.payload.paymentMethodsInfo.subCategories),
                wallet : filterOwayWallet(action.payload.paymentMethodsInfo.subCategories)
            })
        case actions.RECEIVE_ALL_CHECKOUT_RESPONSE:            
            return Object.assign({}, state, {
                isFetching: false,
                paymentTypeList: action.payload.paymentMethodsInfo.subCategories,
                rates : action.payload.rates,
                productId : action.payload.productId,
                source : action.payload.source,
                channelType : action.payload.channelType,
                userRoleId : action.payload.userRoleId,
                promoInfo : action.payload.promoInfo,
                airAsiaBigLife:action.payload.airAsiaBigLife,
                cards : filterCards(action.payload.paymentMethodsInfo.subCategories),
                mobilePayments : filterMobilePayments(action.payload.paymentMethodsInfo.subCategories),
                cods : filterCOD(action.payload.paymentMethodsInfo.subCategories),
                payAtShops : filterPayAtShop(action.payload.paymentMethodsInfo.subCategories),
                wallet : filterOwayWallet(action.payload.paymentMethodsInfo.subCategories)
            })
        case actions.RECEIVE_HOTEL_ALL_CHECKOUT:
            return Object.assign({}, state, {
                isFetching: false,
                paymentTypeList: action.payload.paymentMethodsInfo.subCategories,
                rates : action.payload.rates,
                productId : action.payload.productId,
                source : action.payload.source,
                channelType : action.payload.channelType,
                userRoleId : action.payload.userRoleId,
                promoInfo : action.payload.promoInfo,
                airAsiaBigLife:action.payload.airAsiaBigLife,
                cards : filterCards(action.payload.paymentMethodsInfo.subCategories),
                mobilePayments : filterMobilePayments(action.payload.paymentMethodsInfo.subCategories),
                cods : filterCOD(action.payload.paymentMethodsInfo.subCategories),
                payAtShops : filterPayAtShop(action.payload.paymentMethodsInfo.subCategories),
                wallet : filterOwayWallet(action.payload.paymentMethodsInfo.subCategories)
            })
        case actions.ALERT_MSG:
            return Object.assign({}, state, {
                alert: {
                    show : true,
                    msg:"Select What your payment"
                }
            })
        default : return state

    }
}

function filterCards(payments){
    let cards = payments.filter((payment)=> payment.categoryId == 1)
    return cards;
}

function filterMobilePayments(payments){
    let mobilePaymentCatIds = [10,11,12];
    let mobilePayments = payments.filter((payment)=> mobilePaymentCatIds.includes(payment.categoryId));
    return mobilePayments
}

function filterCOD(payments) {
    let cods = payments.filter((payment)=> payment.subCategoryId == 19);
    return cods;
}

function filterPayAtShop(payments){
    // let payAtShopsCatIds = [3,4,7,8,9];
    let payAtShops = payments.filter((payment)=> payment.subCategoryId == 20) 
    return payAtShops;
}
function filterOwayWallet(payments){
    let walletId = 6;
    let wallet = payments.filter((payment)=> payment.categoryId == walletId);
    return wallet[0];
}
export default paymentReducer;