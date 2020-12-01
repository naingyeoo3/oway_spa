import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlightPlaceholderCard from './FlightPlaceholderCard';
import SearchInputAutoComplete from './SearchInputAutoComplete';

import { flightMobileCities } from '../constants/flightConstants';
import { autocompleteSelectFromValue } from '../actions/searchComponentActions';

class MobileFlightFromComponent extends Component {
    constructor(props){
        super(props);
    }
    handleSelectValue(keyword, name){
        this.props.autocompleteSelectFromValue(keyword, name)
        this.props.callbackHideMobileDrawer()
    }
    render() {
        const { searchResults, searchComponentReducers } = this.props;
        return (
            <div>
                <div style={{minHeight:"35px"}}>
                    {
                        this.props.isLoading ?
                        <input className="fake-input" type="text" placeholder="Select City" value={searchComponentReducers.from.fromCityTitle} readOnly/>
                            :
                        <SearchInputAutoComplete 
                            results={searchResults.startTrip}                            
                            title="From"
                            mobileMode={true}
                            callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                        />      
                    }                                
                </div>
                <FlightPlaceholderCard 
                    mobileFlights={flightMobileCities}
                    callbackParent={(keyword, name)=> this.handleSelectValue(keyword, name)}
                />      
            </div>
        );
    }
}

const mapStateToProps = state => ({     
    searchResults: state.searchResults, 
    searchComponentReducers: state.searchComponentReducers,   
 });
 const mapDispatchToProps = dispatch => {
    return{                     
        autocompleteSelectFromValue : (keyword, title)=> dispatch(autocompleteSelectFromValue(keyword, title))
    }
}
 export default connect(mapStateToProps, mapDispatchToProps)(MobileFlightFromComponent);