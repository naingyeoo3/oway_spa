import React, { Component } from 'react';

import SearchInputAutoComplete from './SearchInputAutoComplete';
import AutocompletePlaceholder from './AutocompletePlaceholder';
import SearchInputBusAutoComplete from './SearchInputBusAutoComplete';

import { busSearchCities } from '../constants/busConstants'

class AutocompleteToComponent extends Component {
    constructor(props){
        super(props);
    }
    detectBusRoute = (route) => route == '/buses';
    render() {
        const {
            router,
            searchComponentReducers,
            myanmarCities,
            myanmarBusCities            
        } = this.props;
        return (
            <div>{
                this.detectBusRoute(router.location.pathname) ?
                    <div>
                        {
                            searchComponentReducers.isRefreshing ?
                                <AutocompletePlaceholder route={router.location.pathname} />
                                :
                                <SearchInputBusAutoComplete 
                                    myanmarCities={myanmarBusCities}
                                    myanmarSearchCities={busSearchCities}
                                    title="To" 
                                    selectValue={searchComponentReducers.to.toCityTitle}
                                />
                        }
                    </div>                                        
                    :
                    <div style={{height:"100%"}}>
                        {
                            searchComponentReducers.isRefreshing ?
                                <div className="to-spinner">
                                    <AutocompletePlaceholder />
                                </div>
                                :
                                <SearchInputAutoComplete 
                                    results={this.props.searchResults.destTrip}                                    
                                    myanmarCities={myanmarCities}
                                    title="To"                                     
                                />
                        }                                        
                    </div>
                }
            </div>
        );
    }
}

export default AutocompleteToComponent;