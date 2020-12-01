import * as actions from '../constants/actionTypes';
const INITIAL_STATE ={
    countryList : [],
    isFetching : false
}

function countryListing(state = INITIAL_STATE,action){
    switch(action.type){
      case actions.REQUEST_COUNTRY : 
            return Object.assign({},state,{
                isFetching :true
            })
      case actions.RECEIVE_COUNTRY :
            return Object.assign({},state,{
                isFetching : false,
                countryList : action.payload.country
            }) 
      default :return state            
    }
}

export default countryListing;