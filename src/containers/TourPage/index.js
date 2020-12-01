import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchTourHotDeals, fetchAllHotDeals } from '../../actions/hotdealActions'

import ProductCarousel from '../../components/ProductCarousel'
import RecommendedProduct from '../../components/RecommendedProduct'
import PopularDestination from '../../components/PopularDestination'
import Newsletter from '../../components/Newsletter'
import SEOList from '../../components/SEOList';
import TourProductCarousel from './TourProductCarousel';

class TourPage extends Component {
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
        if(hotDealReducer.tour.items.length === 0){
            this.props.fetchTourHotDeals(params);
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
                    <TourProductCarousel />
                }
                <RecommendedProduct mode="tours"/>
                <PopularDestination mode="tours"/>
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
        fetchTourHotDeals: (params)=> dispatch(fetchTourHotDeals(params)),
        fetchAllHotDeals : (params)=> dispatch(fetchAllHotDeals(params))        
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TourPage);