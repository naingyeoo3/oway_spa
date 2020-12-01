import * as actions from '../constants/actionTypes';

export function handleLocaleChange(lang, messages, queryName) {
  return {
    type: actions.CHANGE_LOCALE,
    lang: lang,
    queryName: queryName,
    messages: messages,
    isDefaultLocale: true
  };
}

export function actionCreator(){
  return {
    type: actions.FETCH_DECK
  }
};


export function changeLang(param) {
  return {
    type : actions.REQUEST_CHANGE_LANG,
    payload: param
  }
}
export function receiveLangChange() {
  return {
    type : actions.REQUEST_CHANGE_LANG
  }
}

export function changeNationalType(type, name, other_name, value) {  
  return {
    type : actions.CHANGE_NATIONAL_TYPE,
    payload:{
      type: type,
      name: name,
      other_name: other_name,
      value: value
    }
  }
}
export function changeCurrencyUnit(type, name){
  return {
    type: actions.CHANGE_CURRENCY_UNIT,
    payload: {
      type: type,
      name: name
    }
  }
}
export function setOptionMenu(name){  
  return {
    type: actions.CHANGE_MENU_OPTIONS,
    payload: name
  }
}

export function updatePromotionShow(date){
  return {
    type: actions.UPDATE_PROMOTION_SHOW,
    payload: date
  }
}

export function refreshPaymentState(){
  return {
    type: actions.REFRESH_PAYMENT
  }
}

export function setPaymentType(payment){
  return {
    type: actions.SET_PAYMENT_TYPE,
    payload: payment
  }
}

export function closePromotionShow(date){
  return {
    type: actions.CLOSE_PROMOTION_SHOW,
    payload: date
  }
}