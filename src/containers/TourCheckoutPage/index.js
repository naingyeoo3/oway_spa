import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import history from '../../utils/history';
import { requestTourDetail } from '../../actions/toursListingActions';
import { requestCountry } from '../../actions/countryAction';
import { loadTraveller } from '../../actions/tourCheckoutActions';
import { CONFIRM_API_KEY } from '../../constants/credentials';

import CheckoutProcessBar from '../../components/CheckoutProcessBar';
import TourCheckoutItem from './TourCheckoutItem';
import AdditionalInfoForm from './AdditionalInfoForm';
import ContactInfoForm from './ContactInfoForm';
import AdultInfoForm from './AdultInfoForm';
import CustomerCare from '../../components/CustomerCareCenter';
import { Button } from 'antd';

import { 
    requestAllCheckout,
    requestCheckoutConfirm,
    createTourBooking
} from '../../actions/tourCheckoutActions';

import { ALL_CHECKOUT_API_KEY, TOUR_API_KEY } from '../../constants/credentials';
import '../../styles/passenger-info.scss'
import '../../styles/traveller-details.scss'

const dateFormat = 'YYYY-MM-DD';
const changeDateFormat = 'DD MMM YYYY';

class TourCheckoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        const { 
            tourListing, 
            countryListing, 
            searchComponentReducers,
            checkoutReducer } = this.props;
        
        if(tourListing.detail.data == null){    
            this.loadTourDetail()
        }        
        const payload = {
            "apiKey": CONFIRM_API_KEY,
            "channelType": 1
        }
        // if(countryListing.countryList.length == 0){
            this.props.requestCountry(payload)
        // }
        this.props.loadTraveller(searchComponentReducers.travellers.adult);
        // if(checkoutReducer.checkout == null){
        //     this.loadTourCheckout()   
        // }             
    }

    loadTourCheckout(){
        const { searchComponentReducers, tourListing, navbarOptions} = this.props;
                
        const payload = { 
            "channelType": 1,         
            "productId": 7,         
            "source": tourListing.detail.data.owayExclusive.source, // "OWAYDB" // change depend on soruce         
            "fareType": navbarOptions.nation.other_name, // "local"         
            "adult": searchComponentReducers.travellers.adult, //4          
            "child": searchComponentReducers.travellers.child, // 0         
            "infant": searchComponentReducers.travellers.infant, // 0         
            "rates": {         
                "deal": {         
                    "adult": {         
                        "base": detail.rates[0].deal.adult.base, //30         
                        "discounted": detail.rates[0].deal.adult.discounted, // 30         
                        "code": detail.rates[0].deal.adult.code  // "adult"         
                    },         
                    "currencyCode": detail.rates[0].deal.currencyCode,//"USD"
                    "discount": detail.rates[0].deal.discount //null     
                },         
                "inventory": {         
                    "adult": {         
                        "base": detail.rates[0].inventory.adult.base,//30         
                        "discounted": detail.rates[0].inventory.adult.discounted,//30         
                        "code": detail.rates[0].inventory.adult.code //"adult"         
                    },         
                    "currencyCode": detail.rates[0].inventory.currencyCode,//"USD"         
                    "discount":  detail.rates[0].inventory.discount//null         
                }         
            },         
            "tier": {         
                "type": "%",         
                "amount": 15 
            },         
            "apiKey": CHECKOUT_API_KEY
        } 
        this.props.requestCheckoutConfirm(payload)
    }
    formatedDate = (param) => moment(param).format(dateFormat);

    loadTourDetail(){
        const { 
            match, 
            searchComponentReducers, 
            navbarOptions,
            locales
        } = this.props;
        const payload = {
            "code": match.params.tourId,
            "requestDate": {
             "from": this.formatedDate(searchComponentReducers.fromDate.date),
              "to": this.formatedDate(searchComponentReducers.toDate.date)
            },
            "traveler": {
            //   "adult": searchComponentReducers.travellers.adult,
              "adult": 2,
              "child": searchComponentReducers.travellers.child,
              "infant": searchComponentReducers.travellers.infant
            },
            "language": locales.queryName,
            "fareType": navbarOptions.nation.other_name,
            "currencyCode": navbarOptions.currency.name,
            "apiKey": TOUR_API_KEY,
            "client": {
              "ip": "123.123.123.123",
              "name": "Mozilla",
              "locality": "Yangon"
            }
    }        
        
        this.props.requestTourDetail(payload)
    }
    getPricing(){
        const { searchComponentReducers, tourListing} = this.props;
        return (tourListing.detail.data != null ? tourListing.detail.data.rates[0].deal.adult.base : 0) * (searchComponentReducers.travellers.adult + searchComponentReducers.travellers.child + searchComponentReducers.travellers.infact );
    }
    goToPayment(){
        const { checkoutReducer, tourListing, match } = this.props;
        // const payload = { 
        //     "channelType": 1,         
        //     "adult": checkoutReducer.checkout.adult,        
        //     "child": checkoutReducer.checkout.child,         
        //     "infant": checkoutReducer.checkout.infant,         
        //     "rates": {         
        //         "inventory": {         
        //             "currencyCode": checkoutReducer.checkout.rates.inventory.currencyCode, 
        //             "destination": {  
        //                 "adultBase": checkoutReducer.checkout.rates.inventory.destination.adultBase,         
        //                 "childBase": checkoutReducer.checkout.rates.inventory.destination.childBase,         
        //                 "infantBase": checkoutReducer.checkout.rates.inventory.destination.infantBase,         
        //                 "taxAmount": checkoutReducer.checkout.rates.inventory.destination.taxAmount,         
        //                 "subTotal": checkoutReducer.checkout.rates.inventory.destination.subTotal,         
        //                 "tierAmount": checkoutReducer.checkout.rates.inventory.destination.tierAmount,         
        //                 "discountPercent": checkoutReducer.checkout.rates.inventory.destination.discountPercent,         
        //                 "discountAmount": checkoutReducer.checkout.rates.inventory.destination.discountAmount,         
        //                 "total": checkoutReducer.checkout.rates.inventory.destination.total
        //             }         
        //         },         
        //         "deal": {         
        //             "currencyCode": checkoutReducer.checkout.rates.deal.currencyCode,         
        //             "destination": {         
        //                 "adultBase": checkoutReducer.checkout.rates.deal.destination.adultBase,         
        //                 "childBase": checkoutReducer.checkout.rates.deal.destination.childBase,         
        //                 "infantBase": checkoutReducer.checkout.rates.deal.destination.infantBase,         
        //                 "taxAmount": checkoutReducer.checkout.rates.deal.destination.taxAmount,         
        //                 "subTotal": checkoutReducer.checkout.rates.deal.destination.subTotal,         
        //                 "tierAmount": checkoutReducer.checkout.rates.deal.destination.tierAmount,         
        //                 "discountPercent": checkoutReducer.checkout.rates.deal.destination.discountPercent,         
        //                 "discountAmount": checkoutReducer.checkout.rates.deal.destination.discountAmount,         
        //                 "total": checkoutReducer.checkout.rates.deal.destination.total
        //             }         
        //         }         
        //     },         
        //     "fareType": checkoutReducer.checkout.fareType,         
        //     "userRoleId": 4,         
        //     "productId": 7,         
        //     "source": checkoutReducer.checkout.source,         
        //     "apiKey": ALL_CHECKOUT_API_KEY,         
        //     "version": "v2"         
        // } 
        // this.props.requestAllCheckout(payload);
        
        const bookingPayload = { 
            "date": tourListing.detail.data.travelDate,         //"2020-05-25"
            "bookingReference": tourListing.detail.data.bookingNumber, // "8671563b7decc320"         
            "traveler": {         
                "adult": checkoutReducer.checkout.adult //1        
            },         
            "rate": {         
                "adult": checkoutReducer.checkout.rates.deal.destination.adultBase //111407         
            },         
            "contact": {         
                "salutation": "Mr.",         
                "firstName": "kaday",         
                "lastName": "Htun",         
                "email": "kaday@owaytrip.com",         
                "phone": "95 32435654554",         
                "address": "test"         
            },         
            "fareType": checkoutReducer.checkout.fareType,         // "local"
            "currencyCode": checkoutReducer.checkout.rates.deal.currencyCode ,//"MMK"         
            "apiKey": TOUR_API_KEY,                         
        } 
        this.props.createTourBooking(bookingPayload)
        history.push(`/tours/search/detail/${match.params.tourId}/checkout/payment`);                 
    }
    chnageSearch(){
        const { searchComponentReducers, navbarOptions, locales } = this.props;
        history.push(`/tours/search/${searchComponentReducers.tourDestination.name}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/${navbarOptions.currency.name}/${navbarOptions.nation.other_name}/${locales.queryName}`)
    }
    render() { 
        const { 
            tourListing, 
            searchComponentReducers, 
            countryListing, 
            tourTravellerInfo, 
            match, 
            navbarOptions } = this.props;
        return (
            <div>
                <CheckoutProcessBar isCheckout={true}/>
                <div className="app-container">                
                    <div className="main-grid checkout-container">
                        <div className="col-left">
                            <div className="booking-detail">
                                <div className="info-detail">
                                    <div className="name">
                                        {tourListing.detail && tourListing.detail.data.title}
                                    </div>
                                    <div className="info">
                                        {moment(tourListing.detail && tourListing.detail.data.travelDate).format(changeDateFormat)}
                                        &nbsp;|&nbsp;
                                        {searchComponentReducers.travellers.adult} Traveler(s)
                                    </div>
                                </div>
                                <div className="button-change">
                                    <button onClick={()=> this.chnageSearch()}>
                                        <img src={require(`../../assests/images/svg/edit.svg`)} alt="Change Tour" />
                                        change tour
                                    </button>
                                </div>
                            </div>
                            <div className="listing-container tour-checkout-container">
                                {
                                tourListing.detail.data != null &&
                                    <TourCheckoutItem item={tourListing.detail.data && tourListing.detail.data}/>
                                }
                            </div>
                            <ContactInfoForm />
                            {/* <AdditionalInfoForm /> */}
                            <div>
                                <h3 className="heading heading-dark heading-checkout">Passenger info</h3>
                                {
                                    tourTravellerInfo.traveller.length > 0 && tourTravellerInfo.traveller.map((adult, index)=>(
                                        <AdultInfoForm 
                                            countryList={countryListing.countryList} 
                                            adult={adult} 
                                            key={index} 
                                            id={index}/>
                                    ))                                    
                                }
                            </div>
                            <div className="go-to-payment">
                                <button onClick={()=> this.goToPayment()} className="btn btn-orange btn-block">Continue to pay</button>
                            </div>
                        </div>
                        <div className="col-right">
                            <div className="card traveller-detail">
                                <h3 className="heading heading-gray heading-sm">Traveller Details</h3>
                                <div className="detail-block">
                                    <div className="detail-item">
                                        <p className="feature">
                                            <span>{searchComponentReducers.travellers.adult + searchComponentReducers.travellers.child + searchComponentReducers.travellers.infact}</span>
                                            <span className="icon">&times;</span>
                                            <span>Adult(s)</span>
                                        </p>
                                        <p className="value primary">
                                            {navbarOptions.currency.name} {this.getPricing()}
                                        </p>
                                    </div>
                                </div>
                                <h3 className="heading heading-bg-primary heading-sm">Price Details</h3>
                                <div className="detail-block">
                                    <div className="detail-item">
                                        <p className="feature">
                                            Sub Total
                                        </p>                                
                                        <p className="value gray">
                                            {/* <span> {searchComponentReducers.travellers.adult} x Adult(s)</span> */}
                                            {navbarOptions.currency.name} {this.getPricing()}
                                        </p>
                                    </div>
                                    <div className="detail-item">
                                        <p className="feature">
                                            Taxes 
                                        </p>
                                        <p className="value gray">
                                            + {navbarOptions.currency.name} 00000
                                        </p>
                                    </div>       
                                    <div className="detail-item">
                                        <p className="feature">
                                            Convenience Fees 
                                        </p>
                                        <p className="value gray">
                                            + {navbarOptions.currency.name} 00000
                                        </p>
                                    </div>                  
                                    <div className="detail-item">
                                        <p className="feature">
                                            Discount  
                                        </p>
                                        <p className="value gray">
                                            - {navbarOptions.currency.name} 00000
                                        </p>
                                    </div>                                    
                                </div>
                                <div className="detail-block total-block">
                                    <div className="detail-item">
                                        <p className="feature">Total</p>
                                        <p className="value gray">
                                            MMK 0000
                                        </p>
                                    </div>
                                    <div className="detail-item">
                                        <p className="feature">Promotion</p>
                                        <p className="value gray">
                                            - {navbarOptions.currency.name} 000
                                        </p>
                                    </div>                                    
                                </div>
                                <div className="detail-block grand-total">
                                    <div className="detail-item">
                                        <p className="feature">
                                            Grand Total
                                        </p>
                                        <p className="value primary">
                                            {navbarOptions.currency.name} {this.getPricing()}
                                        </p>
                                    </div>
                                </div>
                                {/* <p className="amount-payable">
                                    Amount payable in {navbarOptions.currency.name} 0000
                                </p> */}
                            </div>
                            <CustomerCare />
                        </div>                        
                    </div>
                </div>                
            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        searchComponentReducers : state.searchComponentReducers,
        navbarOptions : state.navbarOptions,
        locales : state.locales,
        tourListing: state.tourListing,
        router: state.router,
        countryListing: state.countryListing,
        tourTravellerInfo: state.tourTravellerInfo,
        checkoutReducer: state.checkoutReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestTourDetail: (payload)=> dispatch(requestTourDetail(payload)),
        requestCountry: (payload)=> dispatch(requestCountry(payload)),
        loadTraveller: (payload)=> dispatch(loadTraveller(payload)), //need to give selected traveller count 
        requestAllCheckout : (payload)=> dispatch(requestAllCheckout(payload)),
        createTourBooking: (payload)=> dispatch(createTourBooking(payload)),
        requestCheckoutConfirm: (payload)=> dispatch(requestCheckoutConfirm(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TourCheckoutPage);