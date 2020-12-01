import React, { Component } from 'react';
import { connect } from 'react-redux';
import PopularDestinationAllProducts from '../../components/PopularDestinationAllProducts';
import { fetchCarDeals } from '../../actions/hotdealActions';
    
import '../VisaPage/visa-page.scss'
import OwayRideCarousel from './OwayRideCarousel';
import Newsletter from '../../components/Newsletter'

class OwayRidePage extends Component {
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
        if(hotDealReducer.car.items.length === 0){
            this.props.fetchCarDeals(params);    
        }        
    }
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
                    <OwayRideCarousel />
                }                      
                <PopularDestinationAllProducts />
                <Newsletter />
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
        fetchCarDeals: (params)=> dispatch(fetchCarDeals(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwayRidePage);