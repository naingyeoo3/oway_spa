import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import update from 'react-addons-update';
import history from '../utils/history';
import {
    Card,
    Form,
    Drawer,
    Input,
    Divider
} from 'antd';

import {
    autocompleteSelectFromValue,
    autocompleteSelectToValue,
    handlingSwapSearchValue,
    selectTravellerClass,
    handleRefreshState,
    selectDestinationValue,
    selectTourDestinationValue
} from '../actions/searchComponentActions'
import { changeNationalType } from '../actions/applicationBarActions';
import { Web, Mobile } from '../constants/helper';
import FlightSearchTabs from './FlightSearchTabs';
import SelectTravelers from './SelectTravelers';
import SearchInputClass from './SearchInputClass';
import SearchNationRadioGroup from './SearchNationRadioGroup';
import TrendingSearchs from './TrendingSearchs';
import AutocompleteFromComponent from './AutocompleteFromComponent';
import AutocompleteToComponent from './AutocompleteToComponent';
import DateInputComponent from './DateInputComponent';
import MobileDrawerComponents from './MobileDrawerComponents';
import Button from './Button';
import { requestFlightData } from '../actions/flightsListingAction';

import { busCities } from '../constants/busConstants';
import { flightCities } from '../constants/flightConstants';
import { hotelCities } from '../constants/hotelConstants';
import { DEV_URL } from '../constants/credentials';

import {
    getLabelFormService,
    getLabelToService,
    getClassNameDepServices,
    getLableDateInput
} from '../constants/searchComponentHelper';

import '../styles/search-components.scss';
import '../styles/calendar.scss';

class SearchComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            currentFormItem: 'from',
            changeRenderCity: false,
            isLoadingMobileInput: false,
            validFormSubmit: false,
            visibleOpt: '/',

        };

    }          
    componentWillMount(){
        // this.state = null;
    }
    detectSearchPlan = (route) => route == '/flights' || route == '/' || route == '/buses';
    detectHomeRoute = (route) => route == '/';
    detectBusRoute = (route) => route == '/buses';
    detectHotelRoute = (route) => route == '/hotels';  
    detectHotelBusRoute = (route) => route == '/hotels' || route == '/buses';  
    detectFlightRoute = ( route ) => route == '/flights';
    detectTourRoute = ( route ) => route == '/tours' ;
    detectTourAttractionRoute = ( route ) => route == '/attractions' ;
    detectHotelTourRoute = (route) => route == '/hotels' || route == '/tours';
    handleSelectMobileCity = (type, keyword, title) => {
        if (type == 'from') {
            this.props.autocompleteSelectFromValue(keyword, title)
            this.setState(update(this.state, { $set: { visible: false } }))
        } else {
            this.props.autocompleteSelectToValue(keyword, title)
            this.setState(update(this.state, { $set: { visible: false } }))
        }
    }
    handleHotelMobileSelect = (data) => {
        const destination = {
            name: data.keyword,
            slug: data.slug,
            scope: data.scope,
        }
        this.props.selectDestinationValue(destination)
        this.setState(update(this.state, { $set: { visible: false } }))
    }
    handleSelectRadio = (e) => {
        if (e.target.value == 'l') {
            this.props.changeNationalType(e.target.value, 'Myanmar Citizen', 'local', 'ntl')
        } else {
            this.props.changeNationalType(e.target.value, 'Foreigner', 'foreign', 'ntf')
        }
    }
    handleSwaptripPlan = () => {
        this.props.handleRefreshState()
        setTimeout(() => {
            this.props.handlingSwapSearchValue()
        }, 300);
    }

    validDate = () => this.props.searchComponentReducers.searchTab == 2 ?
        (!!this.props.searchComponentReducers.fromDate.date && this.props.searchComponentReducers.fromDate.date != "Invalid date") &&
        (!!this.props.searchComponentReducers.toDate.date && this.props.searchComponentReducers.toDate.date != "Invalid date")
        :
        !!this.props.searchComponentReducers.onewayDate.date && this.props.searchComponentReducers.onewayDate.date != "Invalid date";

    showDateErrMessage = () => "Please select date"

    onFocusMobile = (item) => {
        this.setState(update(this.state, { $set: { visibleOpt: item, visible: true, isLoadingMobileInput: true } }))
        setTimeout(() => { this.setState(update(this.state, { $set: { isLoadingMobileInput: false } })) }, 500);
    }
    openSelectDrawer = (item) => {
        this.setState(update(this.state, { $set: { visible: true, currentFormItem: item } }))
    }
    handleSelectTourCity = (cityId, name) => {
        const tourDestination = {
            cityId: cityId,
            name: name
        }
        this.props.selectTourDestinationValue(tourDestination)
        this.setState(update(this.state, { $set: { visible: false } }))
    }

    goToFlightQuery = () => {
        const { searchComponentReducers, navbarOptions, locales } = this.props;
        const tripPlan = searchComponentReducers.searchTab;
        let payload = {};
        if (this.formValidation()) { 
           if(tripPlan === 1) {
            history.push(`/flights/search/${searchComponentReducers.searchTab}/${searchComponentReducers.from.fromCity}/${searchComponentReducers.to.toCity}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/${searchComponentReducers.travellerClass.key}/${navbarOptions.currency.name}/${locales.queryName}/`);
           }else{
            history.push(`/flights/search/${searchComponentReducers.searchTab}/${searchComponentReducers.from.fromCity}/${searchComponentReducers.to.toCity}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/${searchComponentReducers.travellerClass.key}/${navbarOptions.currency.name}/${locales.queryName}/`);  
           } 
           
                   
        }else{
            console.log("Error");
        }
        
           
    }
    goToBusesQuery = () => {
        const { searchComponentReducers, navbarOptions, locales } = this.props;        
        const fromCityId = searchComponentReducers.from.id;
        const toCityId  = searchComponentReducers.to.id;
        const fromCity = searchComponentReducers.from.fromCity;
        const toCity = searchComponentReducers.to.toCity;
        const tripPlan = searchComponentReducers.searchTab;
        const fromDate = searchComponentReducers.fromDate.date;
        const toDate = searchComponentReducers.toDate.date;
        const adult = searchComponentReducers.travellers.adult;
        const child = searchComponentReducers.travellers.child;
        const currency = navbarOptions.currency.name;
        const nation = navbarOptions.nation.other_name;
        const locale = locales.queryName;

        if (this.busFormValid()) {
            if(tripPlan === 1){
                history.push(`/buses/search/${tripPlan}/${fromCity}/${fromCityId}/${toCity}/${toCityId}/${fromDate}/${toDate}/${adult}/${child}/${currency}/${nation}/${locale}`);
            }else{
                history.push(`/buses/search/${tripPlan}/${fromCity}/${fromCityId}/${toCity}/${toCityId}/${fromDate}/${toDate}/${adult}/${child}/${currency}/${nation}/${locale}`);
            }            
        } else {
            console.log('not complete')
        }
    }
    
    getHotelUrl = () => {
        const { searchComponentReducers, navbarOptions, locales } = this.props;        
        var child_str = searchComponentReducers.travellers.childAge.length > 0 ? searchComponentReducers.travellers.childAge.map((child, index)=> `enquired_children[${index}]=${child.age}`).join('&') : '';        
        var nationQuery = navbarOptions.nation.type == 'l' ? 'local' : 'foreigner'
        if(child_str){
            child_str = '&'+child_str;
        }
        console.info(searchComponentReducers.travellers.childAge)
        history.push(`/hotels/search/${searchComponentReducers.destination.name}/${searchComponentReducers.destination.slug}/${searchComponentReducers.destination.scope}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.room}/${searchComponentReducers.travellers.adult}/${nationQuery}/${navbarOptions.currency.name}/${navbarOptions.nation.other_name}/${locales.queryName}`)
        // const country = searchComponentReducers.destination.country == 'Myanmar' ? 'local' : 'foreign';
        
        // if(searchComponentReducers.destination.scope == 'hotel'){
        //     if(searchComponentReducers.destination.country == 'Myanmar'){
        //         return `${DEV_URL}/hotels/search?hotel_city=${searchComponentReducers.destination.name}&hotel_search_term=${searchComponentReducers.destination.hotel_slug}&hotel_search_scope=${searchComponentReducers.destination.scope}&hotel_search_region=${country}&checkin_date=${searchComponentReducers.fromDate.date}&checkout_date=${searchComponentReducers.toDate.date}&enquired_rooms=${searchComponentReducers.travellers.room}&enquired_adults=${searchComponentReducers.travellers.adult}&${child_str}&citizien=${navbarOptions.nation.other_name}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`    
        //     }else{
        //         return `${DEV_URL}/hotels/search?hotel_city=${searchComponentReducers.destination.name}&hotel_search_term=${parseInt(searchComponentReducers.destination.id)}&hotel_search_scope=${searchComponentReducers.destination.scope}&hotel_search_region=${country}&checkin_date=${searchComponentReducers.fromDate.date}&checkout_date=${searchComponentReducers.toDate.date}&enquired_rooms=${searchComponentReducers.travellers.room}&enquired_adults=${searchComponentReducers.travellers.adult}&${child_str}&citizien=${navbarOptions.nation.other_name}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`    
        //     }            
        // }else if(searchComponentReducers.destination.scope == 'township'){
        //     return `${DEV_URL}/hotels/search?hotel_city=${searchComponentReducers.destination.name}&hotel_search_term=${searchComponentReducers.destination.township_slug}&hotel_search_scope=${searchComponentReducers.destination.scope}&hotel_search_region=${country}&checkin_date=${searchComponentReducers.fromDate.date}&checkout_date=${searchComponentReducers.toDate.date}&enquired_rooms=${searchComponentReducers.travellers.room}&enquired_adults=${searchComponentReducers.travellers.adult}&${child_str}&citizien=${navbarOptions.nation.other_name}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`
        // }else{
        //     return `${DEV_URL}/hotels/search?hotel_city=${searchComponentReducers.destination.name}&hotel_search_term=${searchComponentReducers.destination.slug}&hotel_search_scope=${searchComponentReducers.destination.scope}&hotel_search_region=${country}&checkin_date=${searchComponentReducers.fromDate.date}&checkout_date=${searchComponentReducers.toDate.date}&enquired_rooms=${searchComponentReducers.travellers.room}&enquired_adults=${searchComponentReducers.travellers.adult}&${child_str}&citizien=${navbarOptions.nation.other_name}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`
        // }
        
        
        // if(searchComponentReducers.destination.scope === "hotel"){
        //     return `${DEV_URL}/hotels/search?hotel_city=${searchComponentReducers.destination.name}&hotel_search_term=${searchComponentReducers.destination.slug}&hotel_search_scope=${searchComponentReducers.destination.scope}&checkin_date=${searchComponentReducers.fromDate.date}&checkout_date=${searchComponentReducers.toDate.date}&enquired_rooms=${searchComponentReducers.travellers.room}&enquired_adults=${searchComponentReducers.travellers.adult}&${child_str}&citizien=${navbarOptions.nation.other_name}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`    
        // }else{
        //     return `${DEV_URL}/hotels/search?hotel_city=${searchComponentReducers.destination.name}&hotel_search_term=${searchComponentReducers.destination.slug}&hotel_search_scope=${searchComponentReducers.destination.scope}&checkin_date=${searchComponentReducers.fromDate.date}&checkout_date=${searchComponentReducers.toDate.date}&enquired_rooms=${searchComponentReducers.travellers.room}&enquired_adults=${searchComponentReducers.travellers.adult}&${child_str}&citizien=${navbarOptions.nation.other_name}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`
        // }           
    }
    goToHotelQuery = () => {
        if (this.formValidationHotel()) {
           history.push(this.getHotelUrl()) ;
        }
    }
    goToTourQuery = () => {
        const { searchComponentReducers, navbarOptions, locales } = this.props;
        if (this.formValidTour()) {
            history.push(`/tours/search/${searchComponentReducers.tourDestination.name}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/${navbarOptions.currency.name}/${navbarOptions.nation.other_name}/${locales.queryName}`)
        }
    }
    goToTourAttractionQuery = () => {
        const { searchComponentReducers, navbarOptions, locales } = this.props;
        if(this.formValidTour()){
            // return window.open(`${DEV_URL}/attractions/${searchComponentReducers.tourDestination.cityId}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/0/0/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self')
            history.push(`/attractions/search/${searchComponentReducers.tourDestination.name}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/${navbarOptions.currency.name}/${navbarOptions.nation.other_name}/${locales.queryName}`)
        }        
    }
    formValidTour = () =>   !!this.props.searchComponentReducers.tourDestination.name && 
                            !!this.props.searchComponentReducers.tourDestination.cityId
        
    
    handleSubmit(){  
        const { router } = this.props;        
        this.setState({validFormSubmit: true})        
        switch (router.location.pathname) {
            case '/':
                this.goToFlightQuery();
                break;
            case '/flights':
                this.goToFlightQuery();
                break;
            case '/buses':
                this.goToBusesQuery();
                break;
            case '/hotels':
                this.goToHotelQuery();
                break;
            case '/tours':
                this.goToTourQuery();
                break;
            case '/attractions':
                this.goToTourAttractionQuery();
                break;
            default:
                break;
        }
        setTimeout(() => {
            this.setState({ validFormSubmit: false })
        }, 1000);
    }
    formValidationHotel = () => !!this.props.searchComponentReducers.destination.name &&
        !!this.props.searchComponentReducers.destination.slug &&
        !!this.props.searchComponentReducers.destination.scope &&
        !!this.props.searchComponentReducers.fromDate.date &&
        !!this.props.searchComponentReducers.toDate.date &&
        this.props.searchComponentReducers.fromDate.date != "Invalid date" &&
        this.props.searchComponentReducers.toDate.date != "Invalid date"

    formValidation = () => !!this.props.searchComponentReducers.from.fromCity && 
                           !!this.props.searchComponentReducers.to.toCity &&
                           !!this.props.searchComponentReducers.fromDate.date && 
                           !!this.props.searchComponentReducers.toDate.date &&
                           (this.props.searchComponentReducers.from.fromCity != this.props.searchComponentReducers.to.toCity) &&
                           this.checkDate(this.props.searchComponentReducers.searchTab)
                           
    checkDate = (tripType) => tripType === 1 ? this.props.searchComponentReducers.fromDate.date != 'Invalid date' : this.props.searchComponentReducers.fromDate.date != "Invalid date" && this.props.searchComponentReducers.toDate.date != "Invalid date"
    
    busFormValid = () => !!this.props.searchComponentReducers.from.id &&
                         !!this.props.searchComponentReducers.to.id &&
                         this.props.searchComponentReducers.from.id != this.props.searchComponentReducers.to.id
                        //  this.checkDate(this.props.searchComponentReducers.searchTab)

    validAutocomplete = (value) => this.hasAutocompleteValue(value)    
    hasAutocompleteValue = (value) => value ? null : 'error'
    autocompleteDestAlertMsg = (value) => !!value ? null : 'Please provide arrival city';
    autocompleteDepAlertMsg = (value) => !!value ? null : 'Please provide departure city';
    autocompleteHotelAlertMsg = (value) => !!value ? null : 'Please search hotel or location';
    autocompleteTourAlertMsg = (value) => !!value ? null : 'Please select city';
    sameDepAlertMsg = () => this.state.fromCity == this.state.destCity && 'Origin & Destination Cities Must Be Different.'
    hasNotSameDeparture = () => this.props.searchComponentReducers.from.fromCity == this.props.searchComponentReducers.to.toCity
    showErrMessage = (type) => type == 'from' ? "Please provide departure city" : "Please provide arrival city";
    showDrawer = () => this.setState(update(this.state, { $set: { visible: true } }))
    onClose = () => this.setState(update(this.state, { $set: { visible: false } }))
    checkDrawerHeightClass = () => this.state.visibleOpt == 'select_travel' || this.state.visibleOpt == 'select_class' || this.state.visibleOpt == 'select_room';
    validToCityAutocomplete = () => {
        if (this.props.searchComponentReducers.to.toCity == '') {
            return 'error';
        } else if (this.hasNotSameDeparture()) {
            return 'error';
        } else {
            return null;
        }
    }
    validToCityAutocompleteHelper = () => {
        if (this.props.searchComponentReducers.to.toCity == '') {
            return this.autocompleteDestAlertMsg(this.props.searchComponentReducers.to.toCity)
        } else if (this.hasNotSameDeparture()) {
            return this.sameDepAlertMsg()
        } else {
            return null;
        }
    }

    getTravelerLayout = () => {
        const { searchComponentReducers, router } = this.props;
        return (
            <div
                className="popover-open-btn"
                onClick={() => {
                    this.detectHotelRoute(router.location.pathname) ?
                        this.onFocusMobile('select_room') :
                        this.onFocusMobile('select_travel')
                }
                }
            >
                {this.detectHotelRoute(router.location.pathname) ? <span><FormattedMessage id="search.room.guests" /></span> : <span><FormattedMessage id="search.room.travellers" /></span>}
                <div className="traveler-title">
                    {this.detectHotelRoute(router.location.pathname) ? <span className="room">{searchComponentReducers.travellers.room}</span> : null}
                    <span className="adult">{searchComponentReducers.travellers.adult}</span>
                    <span className="child">{searchComponentReducers.travellers.child}</span>
                    {this.detectHotelBusRoute(router.location.pathname) ? null : <span className="infant">{searchComponentReducers.travellers.infact}</span>}
                </div>
            </div>
        )
    }

    getFromAutocompleteInput = () => {
        const { searchComponentReducers, searchResults, router } = this.props;
        return (
            <AutocompleteFromComponent
                isRefreshing={searchComponentReducers.isRefreshing}
                router={router}
                flightsCities={flightCities}
                hotelCities={hotelCities}
                busCities={busCities}
                startTripResults={searchResults.startTrip}
                hotelResults={searchResults.hotelDest}
                fromCityTitle={searchComponentReducers.from.fromCityTitle}
            />
        )
    }
    handleSelectClass(title, keyword) {
        this.setState({ visible: false })
        this.props.selectTravellerClass(title, keyword)
    }
    render() {
        const {
            router,
            searchComponentReducers,
            searchResults
        } = this.props;
        return (
            <div className={getClassNameDepServices(router.location.pathname)}>
                {
                    this.detectSearchPlan(router.location.pathname) && (<FlightSearchTabs />)
                }
                <Drawer
                    title={<FormattedMessage id={this.state.visibleOpt} />}
                    placement='bottom'
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    style={
                        this.props.locales.lang == 'en' ? 
                        {fontFamily:'Lato,sans-serif'} 
                            : 
                        {fontFamily:'Pyidaungsu, sans-serif'}
                    }
                    className={this.checkDrawerHeightClass() ? 'select-drawer-height mobile-select-drawer' : 'mobile-select-drawer'}
                >
                    <MobileDrawerComponents
                        visibleOpt={this.state.visibleOpt}
                        isLoading={this.state.isLoadingMobileInput}
                        tourName={searchComponentReducers.tourDestination.name}
                        flightToName={searchComponentReducers.to.toCityTitle}
                        flightFromName={searchComponentReducers.from.fromCityTitle}
                        callbackHideMobileDrawer={() => this.setState({ visible: false })}
                        selectTravellerClass={(title, keyword) => this.handleSelectClass(title, keyword)}
                    />
                </Drawer>
                {
                    this.detectHotelRoute(router.location.pathname) ? <h2 className="mobile-title"><FormattedMessage id="mobile.hotel.title" /></h2> : null
                }
                {
                    this.detectTourRoute(router.location.pathname) ? <h2 className="mobile-title"><FormattedMessage id="mobile.tour.title" /></h2> : null
                }
                {
                    this.detectTourAttractionRoute(router.location.pathname) ? <h2 className="mobile-title"><FormattedMessage id="mobile.attraction.title" /></h2> : null
                }
                <div className="search-input-section">
                    <Card className="search-section-card" bordered={false}>
                        {
                            this.detectTourRoute(router.location.pathname) || this.detectTourAttractionRoute(router.location.pathname) ?
                            <Form layout="inline">
                                <Form.Item                                                              
                                    validateStatus={!!this.state.validFormSubmit ? this.validAutocomplete(searchComponentReducers.tourDestination.name) : null}
                                    help={!!this.state.validFormSubmit ? this.autocompleteTourAlertMsg(searchComponentReducers.tourDestination.name) : null}
                                    className="city-column"
                                    label={getLabelFormService(router.location.pathname)}
                                >
                                    <Web>
                                        { this.getFromAutocompleteInput()}                                                                      
                                    </Web>
                                    <Mobile>
                                        <Input 
                                            value={ searchComponentReducers.tourDestination.name }
                                            onFocus={()=> this.onFocusMobile('tour_dest')}
                                            readOnly
                                        />                                                                                
                                        <Divider />
                                    </Mobile>                             
                                </Form.Item>
                            </Form>
                            :
                                <Form layout="inline">
                                    <Form.Item
                                        validateStatus={!!this.state.validFormSubmit ?
                                            this.detectHotelRoute(router.location.pathname) ?
                                                this.validAutocomplete(searchComponentReducers.destination.name) : this.validAutocomplete(searchComponentReducers.from.fromCity) : null}
                                        help={!!this.state.validFormSubmit ?
                                            this.detectHotelRoute(router.location.pathname) ?
                                                this.autocompleteHotelAlertMsg(searchComponentReducers.destination.name)
                                                :
                                                this.autocompleteDepAlertMsg(searchComponentReducers.from.fromCity) : null}
                                        className="city-column"
                                        label={getLabelFormService(router.location.pathname)}
                                    >
                                        <Web>
                                            {this.getFromAutocompleteInput()}
                                        </Web>
                                        <Mobile>
                                            {
                                                this.detectHotelRoute(router.location.pathname) &&
                                                <Input
                                                    value={searchComponentReducers.destination.name} onFocus={() => this.onFocusMobile('hotel_dest')}
                                                    aria-label={getLabelFormService(router.location.pathname)}
                                                    readOnly
                                                />
                                            }
                                            {
                                                this.detectHomeRoute(router.location.pathname) &&
                                                <Input
                                                    value={searchComponentReducers.from.fromCityTitle} onFocus={() => this.onFocusMobile('flight_from')}
                                                    aria-label={searchComponentReducers.from.fromCity}
                                                    readOnly
                                                />
                                            }
                                            {
                                                this.detectFlightRoute(router.location.pathname) &&
                                                <Input
                                                    value={searchComponentReducers.from.fromCityTitle}
                                                    onFocus={() => this.onFocusMobile('flight_from')}
                                                    aria-label={searchComponentReducers.from.fromCity}
                                                    readOnly
                                                />
                                            }
                                            {
                                                this.detectBusRoute(router.location.pathname) &&
                                                <Input
                                                    value={searchComponentReducers.from.fromCityTitle} onFocus={() => this.onFocusMobile('bus_from')}
                                                    readOnly
                                                />
                                            }
                                            <Divider />
                                        </Mobile>
                                    </Form.Item>
                                    {this.detectHotelRoute(router.location.pathname) ? null : <Divider type="vertical" className="search-vertical" />}
                                    {this.detectHotelRoute(router.location.pathname) ? null : (
                                        <div className="swap-content">
                                            <span onClick={() => this.handleSwaptripPlan()} className="swap-button"></span>
                                        </div>
                                    )}
                                    {
                                        this.detectHotelRoute(router.location.pathname) ? null :
                                            (
                                                <Form.Item
                                                    validateStatus={!!this.state.validFormSubmit ? this.validToCityAutocomplete() : null}
                                                    help={!!this.state.validFormSubmit ? this.validToCityAutocompleteHelper() : null}
                                                    className="city-column to-search"
                                                    label={getLabelToService(router.location.pathname)}
                                                >
                                                    <Web>
                                                        <AutocompleteToComponent
                                                            searchComponentReducers={searchComponentReducers}
                                                            router={router}
                                                            searchResults={searchResults}
                                                            myanmarCities={flightCities}
                                                            myanmarBusCities={busCities}
                                                        />
                                                    </Web>
                                                    <Mobile>
                                                        {
                                                            this.detectFlightRoute(router.location.pathname) &&
                                                            <Input
                                                                value={searchComponentReducers.to.toCityTitle} aria-label={searchComponentReducers.to.toCity}
                                                                onFocus={() => this.onFocusMobile('flight_to')}
                                                                readOnly
                                                            />
                                                        }
                                                        {
                                                            this.detectHomeRoute(router.location.pathname) &&
                                                            <Input
                                                                value={searchComponentReducers.to.toCityTitle} aria-label={searchComponentReducers.to.toCity}
                                                                onFocus={() => this.onFocusMobile('flight_to')}
                                                                readOnly
                                                            />
                                                        }
                                                        {
                                                            this.detectBusRoute(router.location.pathname) &&
                                                            <Input value={searchComponentReducers.to.toCityTitle}
                                                                onFocus={() => this.onFocusMobile('bus_to')}
                                                                readOnly
                                                            />
                                                        }
                                                        <Divider />
                                                    </Mobile>
                                                </Form.Item>
                                            )
                                    }
                                    <Divider type="vertical" className="search-vertical" />
                                    <Form.Item
                                        className="date-column search-date"
                                        validateStatus={!!this.state.validFormSubmit ? !this.validDate() ? "error" : null : null}
                                        help={!!this.state.validFormSubmit ? !this.validDate() ? this.showDateErrMessage() : null : null}
                                        label={getLableDateInput(router.location.pathname, searchComponentReducers.searchTab)}
                                    >
                                        <DateInputComponent
                                            onFocus={(keyword) => this.onFocusMobile(keyword)} isWebView={true} />
                                    </Form.Item>
                                    <Divider type="vertical" className="search-vertical" />
                                    <Form.Item
                                        className="traveller-column"
                                    >
                                        <Web>
                                            <SelectTravelers />
                                        </Web>
                                        <Mobile>
                                            {this.getTravelerLayout()}
                                            <Divider />
                                        </Mobile>
                                    </Form.Item>
                                    {
                                        router.location.pathname == '/flights' || router.location.pathname == '/' ?
                                            <Divider type="vertical" className="search-vertical" />
                                            :
                                            null
                                    }
                                    {
                                        this.detectHomeRoute(router.location.pathname) || this.detectFlightRoute(router.location.pathname) ?
                                            (
                                                <Form.Item
                                                    className="last-item class-column select-class"
                                                    label={<FormattedMessage id="search.text.class" />}
                                                    overlayClassName="search-dropdown-class"
                                                >
                                                    <Web>
                                                        <SearchInputClass />
                                                    </Web>
                                                    <Mobile>
                                                        <div className="popover-open-btn select-class" onClick={() => this.onFocusMobile('select_class')}>
                                                            <span></span>
                                                            {searchComponentReducers.travellerClass.name}
                                                        </div>
                                                        <Divider />
                                                    </Mobile>
                                                </Form.Item>
                                            )
                                            :
                                            null
                                    }
                                </Form>
                        }
                    </Card>
                    <Form className="sub-form-layout">
                        <div>
                            <SearchNationRadioGroup
                                callbackSelectRadio={this.handleSelectRadio}
                                nationalValue={this.state.nationalValue}
                            />
                            <Mobile>
                                <Divider />
                            </Mobile>
                        </div>
                        <div className="form-search-btn">
                            <Button callbackParent={() => this.handleSubmit()} />
                        </div>
                    </Form>
                </div>
                <TrendingSearchs />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    searchResults: state.searchResults,
    searchComponentReducers: state.searchComponentReducers,
    router: state.router,
    navbarOptions: state.navbarOptions,
    locales: state.locales,
});

const mapDispatchToProps = dispatch => {
    return {
        autocompleteSelectFromValue: (keyword, title) => dispatch(autocompleteSelectFromValue(keyword, title)),
        autocompleteSelectToValue: (keyword, title) => dispatch(autocompleteSelectToValue(keyword, title)),
        handlingSwapSearchValue: () => dispatch(handlingSwapSearchValue()),
        selectTravellerClass: (title, keyword) => dispatch(selectTravellerClass(title, keyword)),
        changeNationalType: (type, name, other, value) => dispatch(changeNationalType(type, name, other, value)),
        handleRefreshState: () => dispatch(handleRefreshState()),
        requestFlightData: (data) => dispatch(requestFlightData(data)),
        selectDestinationValue: (destination) => dispatch(selectDestinationValue(destination)),
        selectTourDestinationValue: (destination) => dispatch(selectTourDestinationValue(destination))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponents);