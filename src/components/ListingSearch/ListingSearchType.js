import React, { Component } from 'react';
import { connect } from 'react-redux';


import TripPlanType from './TripPlanType';
import BusinessPlanType from './BusinessPlanType';
import SelectPassenger from './SelectPassenger';

import { changeTripPlan } from '../../actions/searchComponentActions';
import { selectTravellerClass } from '../../actions/searchComponentActions'

import { tripPlan } from '../../constants/listingConstants';
import { travelerClass } from '../../constants/constants';

import './listing-search-type.scss'
 
class ListingSearchType extends Component {
    constructor(props){
        super(props);        
    }
    getTripPlan(){
        const { router, searchComponentReducers } = this.props;
        if(router.location.pathname.includes('flights/search') || router.location.pathname.includes('buses/search')){
            return (
                <TripPlanType 
                    selectedValue={searchComponentReducers.searchTab}
                    callbackParent={(plan)=> this.props.changeTripPlan(plan)}                    
                    tripPlan={tripPlan}
                />
            )
        }

    }
    getBusinessPlan(){
        const { router, searchComponentReducers } = this.props;
        if(router.location.pathname.includes('flights/search')){
            return (
                <BusinessPlanType 
                    selectedValue={searchComponentReducers.travellerClass.name}
                    callbackParent={(name, type)=> this.props.selectTravellerClass(name, type)}
                    businessPlan={travelerClass}                    
                />
            )
        }
    }
    getTravellerSelect(){
        const { router } = this.props;
        if(router.location.pathname.includes('flights/search')){
            return (
                <SelectPassenger isFlight={true} listTypes={['adult','child','infact']}/>
            )
        }
        if(router.location.pathname.includes('buses/search')){
            return (
                <SelectPassenger isBus={true} listTypes={['adult','child']}/>
            )
        }
        if(router.location.pathname.includes('tours/search')){
            return (
                <SelectPassenger isTour={true} listTypes={['adult','child','infact']}/>
            )
        }
        if(router.location.pathname.includes('hotels/search')){
            return (
                <SelectPassenger isHotel={true} listTypes={['room','adult','child']}/>
            )
        }
        if(router.location.pathname.includes('attractions/search')){
            return (
                <SelectPassenger isAttraction={true} listTypes={['adult','child','infact']}/>
            )
        }
        
    }
    render() { 
        const { searchComponentReducers } = this.props;
        return (
            <div className="search-type">
                {this.getTripPlan()}                
                {this.getBusinessPlan()}
                {this.getTravellerSelect()}
            </div>
        );
    }
}

const mapStateToProps = state => ({     
    searchComponentReducers: state.searchComponentReducers,
    router: state.router
 });

const mapDispatchToProps = dispatch => {
    return{                     
        changeTripPlan: (type)=> dispatch(changeTripPlan(type)),
        selectTravellerClass : (title, keyword)=> dispatch(selectTravellerClass(title, keyword)),        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingSearchType);