import React, { Component } from 'react';
import { connect } from 'react-redux';

import BusPlaceholderCard from './BusPlaceholderCard';
import SearchInputBusAutoComplete from './SearchInputBusAutoComplete';

import { autocompleteSelectToValue } from '../actions/searchComponentActions';
import { busMobileCities, busCities, busSearchCities } from '../constants/busConstants';

class MobileBusToComponent extends Component {
    constructor(props){
        super(props);
    }
    handleSelectValue(keyword, name){
        this.props.autocompleteSelectToValue(keyword, name);
        this.props.callbackHideMobileDrawer()
    }
    render() {
        const { searchComponentReducers } = this.props;
        return (
            <div>
                <div style={{minHeight:"35px"}}>
                    {
                        this.props.isLoading ?
                        <input className="fake-input" type="text" placeholder="Select City" value={searchComponentReducers.to.toCityTitle} readOnly/>
                            :
                        <SearchInputBusAutoComplete 
                            myanmarCities={busCities}
                            myanmarSearchCities={busSearchCities}
                            mobileMode={true}
                            title="To"         
                            callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                        />           
                    }
                </div>
                <BusPlaceholderCard 
                    mobileBuses={busMobileCities} 
                    callbackParent={(keyword, name)=> this.handleSelectValue(keyword, name)}
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileBusToComponent);