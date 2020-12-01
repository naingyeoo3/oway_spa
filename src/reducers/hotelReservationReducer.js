import * as types from '../constants/actionTypes';
const INITIAL_STATE = {
  roomsList: [],
  totalRooms: 0,
  totalNights: 0,
  totalExtraBeds: 0,
  totalAmount: 0,
};

function hotelReservationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.ADD_ROOM:           
        return Object.assign({}, state, {
            roomsList: action.payload,
            // totalRooms: reservation.totalRooms,
            // totalNights: reservation.totalNights,
            // totalAmount: reservation.totalPrice,
        });
    case types.APPEND_ROOM:
        var appendIndex = state.roomsList.map((item)=> item.id == action.payload.id)
        console.info(state.roomsList[appendIndex] = action.payload)
        console.info(state.roomsList);
        return Object.assign({}, state, {
            roomsList:[],
            // totalRooms: reservation.totalRooms,
            // totalNights: reservation.totalNights,
            // totalAmount: reservation.totalPrice,
        });
    case types.ADD_EXTRA_BED:
    //   let extraBed = addExtraBedFunction(state.roomsList, action.bed);
        var appendIndex = state.roomsList.map((item)=> item.id == action.payload.id)
        return Object.assign({}, state, {
            roomsList: state.roomsList[appendIndex] = action.payload,
            // totalRooms: extraBed.totalRooms,
            // totalNights: extraBed.totalNights,
            // totalAmount: extraBed.totalPrice,
            // totalExtraBeds: extraBed.bedsCount,
          });
    case types.CLEAR_RESERVATION:
      return Object.assign({}, state, {
        roomsList:[]
      })
    default:
      return state;
  }
}

function addExtraBedFunction(roomsList, bed) {
  console.log('extraBed', bed);
  let found = false;
  let checkRoomList = [];
  let roomCount = 0;
  let bedCount = 0;
  let totalPrice = 0;
  roomsList.map((item) => {
    if (bed.id === item.id) {
      const room = {
        id: item.id,
        type: item.type,
        extraBed: bed.count,
        extraBedPrice: bed.count > 0 ? bed.price * item.count : 0,
        price: item.price,
        count: item.count,
      };
      checkRoomList.push(room);
      roomCount += room.count;
      bedCount += bed.count * room.count;
      totalPrice += room.price + room.extraBedPrice;
      found = true;
    } else {
      const room = {
        id: item.id,
        type: item.type,
        extraBed: bed.count,
        extraBedPrice: bed.price,
        price: item.price,
        count: item.count,
      };
      checkRoomList.push(room);
      roomCount += room.count;
      bedCount += 0;
      totalPrice += room.price;
    }
  });
  return {
    roomsList: checkRoomList,
    totalRooms: roomCount,
    totalPrice: totalPrice,
    bedsCount: bedCount,
    totalNights: 1,
  };
}

function addRoomFunction(roomsList, room) {
  if (roomsList.length > 0) {
    let found = false;
    let checkRoomList = [];
    let roomCount = 0;
    let totalPrice = 0;
    roomsList.map((item) => {
      if (room.id === item.id) {
        if (room.count != 0) {
          checkRoomList.push(room);
          roomCount += room.count;
          totalPrice += room.price;
        }

        found = true;
      } else {
        checkRoomList.push(item);
        roomCount += item.count;
        totalPrice += item.price;
      }
    });
    if (!found) {
      checkRoomList.push(room);
      roomCount += room.count;
      totalPrice += room.price;
      return {
        roomsList: checkRoomList,
        totalRooms: roomCount,
        totalPrice: totalPrice,
        totalNights: 1,
      };
    } else {
      return {
        roomsList: checkRoomList,
        totalRooms: roomCount,
        totalPrice: totalPrice,
        totalNights: 1,
      };
    }
  } else {
    roomsList.push(room);
    return {
      roomsList: roomsList,
      totalRooms: room.count,
      totalPrice: room.price,
      totalNights: 1,
    };
  }
}

export default hotelReservationReducer;
