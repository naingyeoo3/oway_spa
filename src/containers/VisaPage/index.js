import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchVisaDeals } from '../../actions/hotdealActions'

import ProductCarousel from '../../components/ProductCarousel';
import PopularDestinationAllProducts from '../../components/PopularDestinationAllProducts';
import Newsletter from '../../components/Newsletter'
import './visa-page.scss';
import VisaProductCarousel from './VisaProductCarousel';

class VisaPage extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.loadHotDeals()       
    }
    loadHotDeals(){
        let { navbarOptions, hotDealReducer, locales} = this.props;
        const params = {
            nationality : navbarOptions.nation.type,
            currency : navbarOptions.currency.type,
            lang : locales.queryName
        }
        if(hotDealReducer.visa.items.length === 0){
            this.props.fetchVisaDeals(params)
        }        
    }
    detectFinishedApi = (hotDealReducer) => !hotDealReducer.flight.isFetching && !hotDealReducer.deals.isFetching;

    hasOnePay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment ? !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.onepay_token : true;
    hasWavePay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment ? !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.wavepay_token : true;
    hasKbzPay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment ? !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.kbzpay_token : true;    

    isPayment = () => this.hasOnePay() || this.hasWavePay() || this.hasKbzPay();

    render() {
        const { hotDealReducer } = this.props;
        const hot_deals = hotDealReducer.deals.items;        
        return (
            <div>
                {
                    this.isPayment() ?
                    null
                    :
                    <VisaProductCarousel />
                }                
                <PopularDestinationAllProducts />
                <Newsletter />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    router        : state.router,
    navbarOptions : state.navbarOptions,
    hotDealReducer: state.hotDealReducer,
    locales : state.locales
});
const mapDispatchToProps = dispatch => {
    return{                                     
        fetchVisaDeals: (params)=> dispatch(fetchVisaDeals(params))        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VisaPage);
