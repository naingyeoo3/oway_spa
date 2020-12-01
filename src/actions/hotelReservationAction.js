import * as actions from '../constants/actionTypes';

export function addHotelRoom(payload){    
  return {
      type : actions.ADD_ROOM,
      payload : payload,
  }
}

export function addExtraBed(bed) {
    return {
        type : actions.ADD_EXTRA_BED,
        payload : bed,
    }
}
export function appendRoom(payload){
    return {
        type : actions.APPEND_ROOM,
        payload: payload
    }
}
export function clearReservation(){
    return {
        type: actions.CLEAR_RESERVATION
    }
}