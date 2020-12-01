import React, { Component } from 'react'
import { connect } from 'react-redux'

import PopularRoutes from '../../components/PopularRoutes'
import ProductCarousel from '../../components/ProductCarousel'
import PopularDestination from '../../components/PopularDestination'
import MobileCustomerCare from '../../components/MobileCustomerCare'
import PopularAirlines from '../../components/PopularAirlines'
import {requestFlightData} from '../../actions/flightsListingAction';

import SEOList from '../../components/SEOList'
import Newsletter from '../../components/Newsletter'
import FlightProductCarousel from './FlightProductCarousel'


import { 
    fetchFlightHotDeals, 
    fetchAllHotDeals 
} from '../../actions/hotdealActions';

class FlightPage extends Component {
    constructor(props){
        super(props);
        this.state={
            viewPort: null,
            navbarTabId: "Home",
        }
    }
 
    componentDidMount(){
        this.loadHotDeals();
    }

    loadHotDeals(){
        let { navbarOptions, hotDealReducer, locales } = this.props;
        const params = {
            nationality : navbarOptions.nation.type,
            currency : navbarOptions.currency.type,
            lang : locales.queryName
        }        
        if(hotDealReducer.flight.items.length == 0){
            this.props.fetchFlightHotDeals(params);
        }        
    }
    
    componentDidUpdate(prevProps, prevState) {
        let {navbarOptions} = this.props;
        if(prevProps.navbarOptions.nation.type !== navbarOptions.nation.type || prevProps.navbarOptions.currency.type !== navbarOptions.currency.type || prevProps.navbarOptions.language !== navbarOptions.language){
           this.loadHotDeals();
        }
    }
    handleSearchFlight(keyword, title){
        this.goToFlightQuery()
    }
    goToFlightQuery(){
        const { searchComponentReducers } = this.props;
        window.open(`${DEV_URL}/flights/search/${searchComponentReducers.searchTab}/${searchComponentReducers.from.fromCity}/${searchComponentReducers.to.toCity}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/ ${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/Flexi/${searchComponentReducers.travellerClass.key}/Flexi/Flexi/${searchComponentReducers.nationType}`, '_self');
    }
    
    detectFinishedApi = (hotDealReducer) => !hotDealReducer.flight.isFetching;

    hasOnePay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment ? !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.onepay_token : true;
    hasWavePay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment ? !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.wavepay_token : true;
    hasKbzPay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment ? !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.kbzpay_token : true;

    isPayment = () => this.hasOnePay() || this.hasWavePay() || this.hasKbzPay();

    render() {              
        return (
            <div>                
                {
                    this.isPayment() ?
                    null
                    :
                    <FlightProductCarousel />    
                }
                <PopularDestination 
                    mode="flights" 
                    callbackParent={(keyword, title)=> this.handleSearchFlight(keyword, title)}
                />
                <PopularAirlines />
                <PopularRoutes />
                <Newsletter />
                <SEOList 
                    isLanding={true}
                    route={this.props.router.location.pathname} />                
                {/* <MobileCustomerCare /> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    router        : state.router,
    flights       : state.flights,
    searchComponentReducers: state.searchComponentReducers,    
    hotDealReducer : state.hotDealReducer,
    navbarOptions : state.navbarOptions,
    locales : state.locales,

});

const mapDispatchToProps = dispatch => {
    return{                             
        autocompleteSelectToValue : (keyword, title)=> dispatch(autocompleteSelectToValue(keyword, title)),        
        handleRefreshState: ()=> dispatch(handleRefreshState()),
        handleRefreshStateEnd: ()=> dispatch(handleRefreshStateEnd()),    
        requestFlightData : ()=>  dispatch(requestFlightData()),  
        fetchFlightHotDeals: (parmas)=> dispatch(fetchFlightHotDeals(parmas)),        
        fetchAllHotDeals: (parmas)=> dispatch(fetchAllHotDeals(parmas)),

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(FlightPage);