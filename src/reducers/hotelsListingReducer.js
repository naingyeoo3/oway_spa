import * as types from '../constants/actionTypes';
const INITIAL_STATE={
    hotelList : [],
    filteredList : [],
    hotelTypes : [],
    amenities  :[],
    ratings :[],
    bedTypes : [],
    prices :{},
    stars : [],
    priorities:[],
    isNotFound : false,
    spokenLanguages : [],
    filterType : null,
    isFetching :false,
    isFiltering : false,
    isFetchingDetail : false,
    facilities : [],
    detail :null,
    categories : [],
    page : 1,
    meta : {},
    error: null
}


function hotelListingReducer(state= INITIAL_STATE,action){
    switch (action.type){
        case types.GET_HOTELS : 
             return Object.assign({}, state, {
                isFetching: true,
             });
        case types.RECEIVE_HOTEL_RESULTS : 
             return Object.assign({},state,{
                 hotelList : action.payload.data,
                 isFetching : false,
                 isFiltering : false,
                 meta : action.payload.meta,
                 isNotFound: false
             });
        case types.FILTER_HOTELS : 
              return Object.assign({},state,{
                  isFiltering : true,
                  filterType : action.filterType
              }); 
        
        case types.GET_HOTEL_DETAIL :
               return Object.assign({},state,{
                  isFetchingDetail : true
               })     
        case types.RECEIVE_HOTEL_DETAIL :
               return Object.assign({},state,{
                   isFetchingDetail : false,
                   detail : action.payload.data,
                   categories : groupAmenities(action.payload.data.amenities),
                   spokenLanguages : action.payload.data.options.spokenLanguages.split(',')
               })
        case types.RECEIVE_HOTEL_ERROR:
            return Object.assign({},state,{
                hotelList : [],
                isFetching : false,
                isFiltering : false,
                isNotFound :true,
                meta : {},
                error: action.payload
            });       
        case types.NOT_FOUND_HOTELS :
            return Object.assign({},state,{
                hotelList : [],
                isFetching : false,
                isFiltering : false,
                isNotFound :true,
                meta : {},
            });       
        case types.SORT_HOTELS :
                if (state.filterType != null)
                return Object.assign({}, state, {
                    filteredList: action.payload
                })
                 else
                return Object.assign({}, state, {
                    hotelList: action.payload
                })      
        case types.RECEIVE_HOTEL_FILTERS :
             return Object.assign({},state,{
                amenities  : action.payload.data.amenities,
                ratings    : action.payload.data.ratings,
                hotelTypes : action.payload.data.type,
                prices     : action.payload.data.prices,
                bedTypes   : action.payload.data.rooms.bed,
                stars      : action.payload.data.ratings.stars,
                isFiltering : false,
                error: state.error
             })     
        default : return state;          
    }
}

function groupAmenities(amenities){
    const  categories = amenities.reduce((categories,item)=>{
         const category = (categories[item.category.name] || []);
         category.push(item);
         categories[item.category.name] = category;
         return categories;
     },{});
     return categories;

 }

 
export default hotelListingReducer;