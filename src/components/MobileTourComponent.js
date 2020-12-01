import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchInputTourAutoComplete from './SearchInputTourAutoComplete';
import TourPlaceholderCard from './TourPlaceholderCard';

import { mobiletourCities, tourCities } from '../constants/tourConstants';
import { selectTourDestinationValue } from '../actions/searchComponentActions';

class MobileTourComponent extends React.Component{
    constructor(props){
        super(props);
    }
    handleSelectValue(destination){
        const dest = {
           cityId: destination.cityId,
           name: destination.name 
        }
        this.props.selectTourDestinationValue(dest);
        this.props.callbackHideMobileDrawer();
    }
    render(){
        const { searchComponentReducers } = this.props;
        return(
            <div>                       
                <div style={{minHeight:"35px"}}>
                {
                    this.props.isLoading ?
                    <input className="fake-input" type="text" placeholder="Select City" value={searchComponentReducers.tourDestination.name} readOnly/>
                        :
                    <SearchInputTourAutoComplete                                                                                         
                        myanmarCities={tourCities}                        
                        mobileMode={true}
                        callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                    />
                }
                </div>                       
                <TourPlaceholderCard 
                    mobileTours={mobiletourCities}                
                    callbackParent={(destination)=> this.handleSelectValue(destination)}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({     
    searchResults: state.searchResults,    
    searchComponentReducers : state.searchComponentReducers    
 });

const mapDispatchToProps = dispatch => {
    return{
        selectTourDestinationValue: (destination) => dispatch(selectTourDestinationValue(destination))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MobileTourComponent);