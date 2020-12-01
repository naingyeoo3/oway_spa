import React, { Component } from 'react';
import { connect } from 'react-redux';

import BusPlaceholderCard from './BusPlaceholderCard';
import SearchInputBusAutoComplete from './SearchInputBusAutoComplete';

import { autocompleteSelectFromValue } from '../actions/searchComponentActions';
import { busMobileCities, busCities, busSearchCities } from '../constants/busConstants';

class MobileBusFromComponent extends Component {
    constructor(props){
        super(props);
    }
    handleSelectValue(keyword, name){
        this.props.autocompleteSelectFromValue(keyword, name);
        this.props.callbackHideMobileDrawer()
    }
    render() {
        const { searchComponentReducers } = this.props;
        return (
            <div>
                <div style={{minHeight:"35px"}}>
                    {
                        this.props.isLoading ?
                        <input className="fake-input" type="text" placeholder="Select City" value={searchComponentReducers.from.fromCityTitle} readOnly/>
                            :
                        <SearchInputBusAutoComplete 
                            myanmarCities={busCities}
                            myanmarSearchCities={busSearchCities}
                            title="From"  
                            mobileMode={true}       
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
    searchComponentReducers: state.searchComponentReducers,   
 });
const mapDispatchToProps = dispatch => {
    return{                     
        autocompleteSelectFromValue : (keyword, title)=> dispatch(autocompleteSelectFromValue(keyword, title))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MobileBusFromComponent);