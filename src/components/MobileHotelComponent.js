import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'

import SearchInputHotelAutoComplete from './SearchInputHotelAutoComplete';
import HotelPlaceholderCard  from './HotelPlaceholderCard'

import { hotelMobileCities, hotelCities } from '../constants/hotelConstants';
import { selectDestinationValue } from '../actions/searchComponentActions';

class MobileHotelComponent extends Component {
    constructor(props){
        super(props);
    }
    handleSelectValue(destination){    
        const dest = {
            name: destination.name,
            id: destination.id,
            scope: destination.scope,
            slug: destination.slug,        
            township_slug: '',
            region: destination.region,
            country: destination.keyword.split(',')[1].trim(),
            hotel_slug: ''
        }     
        this.props.selectDestinationValue(dest);
        this.props.callbackHideMobileDrawer();
    }
    render() {
        const { searchResults, searchComponentReducers } = this.props;
        return (
            <div>                
                <div style={{minHeight:"35px"}}>
                {
                    this.props.isLoading ?
                    <input className="fake-input" type="text" placeholder="Select City" value={searchComponentReducers.destination.name} readOnly/>
                        :
                    <SearchInputHotelAutoComplete 
                        results={searchResults.hotelDest}
                        mobileMode={true}
                        callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                    />
                }
                </div>
                <HotelPlaceholderCard 
                    mobileHotels={hotelCities}
                    callbackParent={(destination)=> this.handleSelectValue(destination)}
                />                        
                <span className="city-info"><FormattedMessage id="mobile.text.moresearch" /></span>                    
            </div>
        );
    }
}

const mapStateToProps = state => ({     
    searchResults: state.searchResults,    
    searchComponentReducers : state.searchComponentReducers    
 });

const mapDispatchToProps = dispatch => {
    return{                             
        selectDestinationValue: (destination) => dispatch(selectDestinationValue(destination))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MobileHotelComponent);