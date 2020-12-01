import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchCities, actionCreator } from '../../actions'
import { fetchBusHotDeals, fetchAllHotDeals } from '../../actions/hotdealActions'

import PopularRoutes from '../../components/PopularRoutes'
import PopularDestination from '../../components/PopularDestination'
import PopularBusLines from '../../components/PopularBusLines'
import SEOList from '../../components/SEOList'
import Newsletter from '../../components/Newsletter'
import BusProductCarousel from './BusProductCarousel'

import './bus-express.scss'

class BusExpressPage extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.loadHotDeals();
    }
    loadHotDeals(){
        let { navbarOptions, hotDealReducer, locales} = this.props;
        const params = {
            nationality : navbarOptions.nation.type,
            currency : navbarOptions.currency.type,
            lang : locales.queryName
        }
        if(hotDealReducer.deals.items.length === 0){
            this.props.fetchBusHotDeals(params);
        }        
    }
    componentDidUpdate(prevProps, prevState) {
        let {navbarOptions} = this.props;
        if(prevProps.navbarOptions.nation.type !== navbarOptions.nation.type || prevProps.navbarOptions.currency.type !== navbarOptions.currency.type || prevProps.navbarOptions.language !== navbarOptions.language){
           this.loadHotDeals();
        }
    }

    detectFinishedApi = (hotDealReducer) => !hotDealReducer.flight.isFetching && !hotDealReducer.deals.isFetching;

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
                    <BusProductCarousel />
                }                                
                <PopularDestination mode="buses"/>
                <PopularBusLines />
                <PopularRoutes name="Bus" />
                <Newsletter />
                <SEOList 
                    isLanding={true} 
                    route={this.props.router.location.pathname} />
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    router        : state.router,
    hotDealReducer: state.hotDealReducer,
    navbarOptions : state.navbarOptions,
    locales : state.locales
 });

const mapDispatchToProps = dispatch => {
    return{     
        handleTextApiCall  : ()=> dispatch(searchCities('yangon')),
        getTestApi         : ()=> dispatch(actionCreator()),
        fetchBusHotDeals   : (params)=> dispatch(fetchBusHotDeals(params)),
        fetchAllHotDeals   : (params)=> dispatch(fetchAllHotDeals(params))     
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BusExpressPage);