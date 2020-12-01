import React, { Component } from 'react';
import SearchInputAutoComplete from './SearchInputAutoComplete';
import SearchInputBusAutoComplete from './SearchInputBusAutoComplete';
import SearchInputHotelAutoComplete from './SearchInputHotelAutoComplete';
import SearchInputTourAutoComplete from './SearchInputTourAutoComplete';

import { 
    travelerClass,
    mobileHotelRegionCities
} from '../constants/constants';
import { 
    flightCities,
    flightMobileCities
} from '../constants/flightConstants'

import { hotelCities } from '../constants/hotelConstants'
import {
    busCities,
    busMobileCities
} from '../constants/busConstants'

class MobileAutocompleteFrom extends Component {
    constructor(props){
        super(props);
    }
    getMobileAutocompleteFrom = (route)=> {        
        const {
            router,
            isLoading,
            fromCityTitle,
            startTripResults,
            flightsCities,
            busCities,
            hotelResults,
            hotelCities,
            tourPlaces,
            tourCityTitle
        } = this.props;
        
        switch (route) {
            case '/':
                return (
                    <div style={{minHeight:"35px"}}>
                        {
                            isLoading ?
                            <input className="fake-input" type="text" placeholder="Select City" value={fromCityTitle} readOnly/>
                                :
                            <SearchInputAutoComplete 
                                results={startTripResults}                                                                     
                                myanmarCities={flightCities}
                                title="From"
                                mobileMode={true}
                                callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                            />      
                        }
                    </div>
                )
                break;
            case '/flights':
                return (
                    <div style={{minHeight:"35px"}}>
                        {
                            isLoading ?
                            <input className="fake-input" type="text" placeholder="Select City" value={fromCityTitle} readOnly/>
                                :
                            <SearchInputAutoComplete 
                                results={startTripResults}                                                                     
                                myanmarCities={flightCities}
                                title="From"
                                mobileMode={true}
                                callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                            />      
                        }
                    </div>
                )
                break;
            case '/buses':
                return (
                    <div style={{minHeight:"35px"}}>
                    {
                        isLoading ?
                        <input className="fake-input" type="text" placeholder="Select City" value={fromCityTitle} readOnly/>
                            :
                        <SearchInputBusAutoComplete 
                            myanmarCities={myanmarBusCities}
                            title="From"  
                            mobileMode={true}       
                            callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                        />        
                    }
                    </div>
                )
                break;
            case '/hotels':
                return (
                    <div style={{minHeight:"35px"}}>
                    {
                        isLoading ?
                        <input className="fake-input" type="text" placeholder="Select City" value={name} readOnly/>
                            :
                        <SearchInputHotelAutoComplete 
                            results={hotelResults}                                                                     
                            myanmarCities={mobileHotelRegionCities}                        
                            mobileMode={true}
                            callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                        />
                    }
                    </div>
                )
            case '/tours':
                return (
                    <div style={{minHeight:"35px"}}>
                    {
                        isLoading ?
                        <input className="fake-input" type="text" placeholder="Select City" value={tourCityTitle} readOnly/>
                            :
                        <SearchInputTourAutoComplete                                                                                         
                            myanmarCities={tourPlaces}                        
                            mobileMode={true}
                            callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                        />
                    }
                    </div>
                )
                case '/attractions':
                return (
                    <div style={{minHeight:"35px"}}>
                    {
                        isLoading ?
                        <input className="fake-input" type="text" placeholder="Select City" value={tourCityTitle} readOnly/>
                            :
                        <SearchInputTourAutoComplete                                                                                         
                            myanmarCities={tourPlaces}                        
                            mobileMode={true}
                            callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                        />
                    }
                    </div>
                )
            default:
                break;
            }                                                        
    }
    render() {  
        const { router } = this.props;                                           
        return(
            <div>
               {this.getMobileAutocompleteFrom(router.location.pathname)}               
            </div>
        )
    }
}

export default MobileAutocompleteFrom;