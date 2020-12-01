import * as actions from '../constants/actionTypes';
const INITAIL_STATE = {
    contactInfo : {}
}

function contactInfoReducer(state = INITAIL_STATE,action) {
    switch(action.type){
        case actions.ADD_CONTACT_INFO : return Object.assign({},state,{
           contactInfo : action.payload 
        })
        default :return  state
    }
} 

export default contactInfoReducer