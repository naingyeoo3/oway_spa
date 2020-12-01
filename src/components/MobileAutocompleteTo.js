import React, { Component } from 'react';
import SearchInputBusAutoComplete from './SearchInputBusAutoComplete';
import SearchInputAutoComplete from './SearchInputAutoComplete';

class MobileAutocompleteTo extends Component {
    constructor(props){
        super(props);
    }
    detectBusRoute = (route) => route == '/buses';

    render() {
        const { 
            searchComponentReducers, 
            searchResults, 
            router,
            isLoading,
            myanmarCities,
            busCities 
        } = this.props;
        return (                                
                this.detectBusRoute(router.location.pathname) ?           
                    <div style={{minHeight:"35px"}}>
                        {
                            isLoading ?
                            <input className="fake-input" type="text" placeholder="Select City" value={searchComponentReducers.to.toCityTitle} readOnly/>
                                :
                            <SearchInputBusAutoComplete 
                                myanmarCities={myanmarCities}
                                title="To"         
                                callbackHideMobileDrawer={()=> this.setState(update(this.state, {$set:{ visible: false}}))}
                            />           
                        }
                    </div>       
                    :
                    <div style={{minHeight:"35px"}}>
                        {
                            isLoading ?
                            <input className="fake-input" type="text" placeholder="Select City" value={searchComponentReducers.to.toCityTitle} readOnly/>
                                :
                            <SearchInputAutoComplete 
                                results={searchResults.destTrip}                                    
                                myanmarCities={busCities}
                                title="To"                                
                                mobileMode={true}
                                callbackHideMobileDrawer={()=> this.setState(update(this.state, {$set:{ visible: false}}))}
                            />
                        }
                    </div>            
        );
    }
}

export default MobileAutocompleteTo;