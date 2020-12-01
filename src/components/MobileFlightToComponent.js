import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchInputAutoComplete from './SearchInputAutoComplete';
import FlightPlaceholderCard from './FlightPlaceholderCard';

import { flightMobileCities } from '../constants/flightConstants';
import { autocompleteSelectToValue } from '../actions/searchComponentActions';

class MobileFlightToComponent extends Component {
    constructor(props){
        super(props)
    }
    handleSelectValue(keyword, name){
        this.props.autocompleteSelectToValue(keyword, name);
        this.props.callbackHideMobileDrawer();
    }
    render() {
        const { searchResults, searchComponentReducers } = this.props;
        return (
            <div>
                <div style={{minHeight:"35px"}}>
                    {
                        this.props.isLoading ?
                        <input className="fake-input" type="text" placeholder="Select City" value={searchComponentReducers.to.toCityTitle} readOnly/>
                            :
                        <SearchInputAutoComplete 
                            results={searchResults.destTrip}                                    
                            // myanmarCities={myanmarBusCities}
                            title="To"                                
                            mobileMode={true}
                            callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                        />
                    }
                </div>
                <FlightPlaceholderCard 
                    mobileFlights={flightMobileCities}
                    callbackParent={(keyword, name) => this.handleSelectValue(keyword, name)}
                />
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
        autocompleteSelectToValue : (keyword, title)=> dispatch(autocompleteSelectToValue(keyword, title))
    }
}

 export default connect(mapStateToProps, mapDispatchToProps)(MobileFlightToComponent);