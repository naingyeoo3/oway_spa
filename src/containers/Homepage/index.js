import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCarousel from '../../components/ProductCarousel';
import FlightPage from '../FlightPage/Loadable'
import { mobileMenu } from '../../constants/constants'
import '../Homepage/home.scss'
import { Mobile, Web } from '../../constants/helper';
import MobileMenu from '../../components/MobileMenu';
import Newsletter from '../../components/Newsletter';
import FlightProductCarousel from '../FlightPage/FlightProductCarousel'
import { DEV_URL } from '../../constants/credentials'

import { fetchFlightHotDeals } from '../../actions/hotdealActions'    

class Homepage extends Component {
    constructor(props) {
        super(props);
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

    detectUserInfo = () => !!window.localStorage.hasOwnProperty('oway_user_info');

    hasOnePay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment ? !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.onepay_token : true;
    hasWavePay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment ? !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.wavepay_token : true;
    hasKbzPay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment ? !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.kbzpay_token : true;    

    isPayment = () => this.hasOnePay() || this.hasWavePay() || this.hasKbzPay();

    render() {
        return (
            <div>
                <Web>
                    <FlightPage />
                </Web>
                <Mobile>
                    <div className="mobile-home">
                        <div className="top-image">
                            <img src={require(`../../assests/images/jpg/banner-small.jpg`)} alt="Oway Travel &amp; Tours" width="100%" className="small" />
                            <img src={require(`../../assests/images/jpg/banner-big.jpg`)} alt="Oway Travel &amp; Tours" width="100%" className="big" />
                        </div>
                        <div className="mobile-menu">
                            <h2>Book Your Travel Now</h2>
                            <ul>
                                {
                                    mobileMenu.map((item, index)=> <MobileMenu key={index} item={item} />)
                                }
                            </ul>
                        </div>
                        <div className="mobile-carousel">
                        {
                            this.isPayment() ?
                            null
                            :
                            <FlightProductCarousel />
                        }                            
                        </div>
                        {
                            this.detectUserInfo() ? 
                            null 
                            :
                            <a href={`${DEV_URL}/sign-in`} title="Sign In">
                                <div className="member-block">
                                    <div>
                                        <img src={require(`../../assests/images/svg/home-login.svg`)} alt="Login or Register!" />
                                    </div>
                                    <div>
                                        <p>
                                            Login or Register!
                                            <span>to enjoy your member benefits.</span>
                                        </p>                               
                                    </div>
                                    <div>
                                        <img src={require(`../../assests/images/svg/home-arrow.svg`)} alt="Login or Register!" className="arrow" />
                                    </div>                                
                                </div>
                            </a>
                        } 
                        <Newsletter />                        
                        {/* <button onClick={()=> this.makeCall()}>
                            call
                        </button> */}
                    </div>
                </Mobile>
            </div>
            
        );
    }
}

const mapStateToProps = state => ({
    router        : state.router,
    hotDealReducer : state.hotDealReducer,
    navbarOptions : state.navbarOptions,
    locales : state.locales
});

const mapDispatchToProps = dispatch => {
    return{                             
        fetchFlightHotDeals: (parmas)=> dispatch(fetchFlightHotDeals(parmas))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);