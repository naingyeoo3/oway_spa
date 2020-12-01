import React, { Component } from 'react';

import AutocompletePlaceholder from './AutocompletePlaceholder';
import SearchInputAutoComplete from './SearchInputAutoComplete';
import SearchInputHotelAutoComplete from './SearchInputHotelAutoComplete';
import SearchInputBusAutoComplete from './SearchInputBusAutoComplete';
import SearchInputTourAutoComplete from './SearchInputTourAutoComplete';

import { busSearchCities } from '../constants/busConstants'

class AutocompleteFromComponent extends Component {
    constructor(props){
        super(props);
    }
    render() {      
        const {
            isRefreshing,
            router,
            flightsCities,
            hotelCities,
            busCities,
            startTripResults,
            fromCityTitle,
            hotelResults
        } = this.props;           
        if(isRefreshing){
            return (<AutocompletePlaceholder />    )
        }else{
            switch (router.location.pathname) {
                case '/':
                    return ( 
                        <SearchInputAutoComplete 
                            results={startTripResults}                                                                     
                            myanmarCities={flightsCities}
                            title="From"                                                                                                               
                        />)
                    break;
                case '/flights':
                    return ( 
                        <SearchInputAutoComplete 
                            results={startTripResults}                                                                     
                            myanmarCities={flightsCities}
                            title="From"                                                                                                               
                        />)
                case '/hotels':
                    // return (
                    //     <SearchInputHotelAutoComplete 
                    //         results={hotelResults}                                                                     
                            // myanmarCities={hotelCities}
                    //         title="From"
                    //     />
                    // )
                    return ( 
                        <SearchInputHotelAutoComplete 
                            results={hotelResults}
                            myanmarCities={hotelCities}
                            title="From"
                        />)
                case '/buses':
                    return (
                        <SearchInputBusAutoComplete 
                            myanmarCities={busCities}
                            myanmarSearchCities={busSearchCities}
                            title="From"         
                            isFrom={true}
                            selectValue={fromCityTitle}        
                        />
                    )
                case '/tours':
                    return (
                        <SearchInputTourAutoComplete 
                            results={startTripResults}                                                                     
                            myanmarCities={flightsCities}
                            title="From"                                                                                                               
                        />)
                case '/attractions':
                    return (
                        <SearchInputTourAutoComplete 
                            results={startTripResults}                                                                     
                            myanmarCities={flightsCities}
                            title="From"                                                                                                               
                        />)
              
                case '/myanmar_visa':
                    return (
                        <SearchInputAutoComplete 
                            results={startTripResults}                                                                     
                            myanmarCities={flightsCities}
                            title="From"                                                                                                               
                        />
                    )
                case '/car_rental':
                        return (
                            <SearchInputAutoComplete 
                                results={startTripResults}                                                                     
                                myanmarCities={flightsCities}
                                title="From"                                                                                                               
                            />
                        )
                default:
                    break;
            }                    
    }
}
}

export default AutocompleteFromComponent;