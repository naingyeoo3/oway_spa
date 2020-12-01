import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';
import moment from 'moment';
import { 
    Button,
    Tooltip
} from 'antd';
import ContactForm from './ContactForm';
import AdultForm from './AdultForm';
import CustomerCare from '../../components/TravellerDetail/CustomerCare';

import {
    requestCountry
} from '../../actions/countryAction';
import {
    changeFirstName,
    changeLastName,
    changePhoneNum,
    changeEmailInput,
    changeAlsoTravelling,
    changeAdultName,
    changeAdultLastName,
    changeAddPhoneNum,
    changeCountryName,
    changePassportNum,
    createHotelOrder,
    requestAllCheckout
} from '../../actions/hotelCheckoutAction';
import { 
    CONFIRM_API_KEY, 
    CHECKOUT_API_KEY,
    ORDER_API_KEY 
} from '../../constants/credentials';
import HotelCheckoutItem from './HotelCheckoutItem';
import StarRatingIcon from '../../assests/images/svg/star-rating.svg';
import CheckoutProcessBar from '../../components/CheckoutProcessBar';
const dateFormat = 'DD MMM YYYY';
const changeDateFormat = 'ddd, DD MMM YYYY';
import { DEV_URL } from '../../constants/credentials';

class HotelPassengerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        const payload = {
            "apiKey": CONFIRM_API_KEY,
            "channelType": 1
        }
        this.props.requestCountry(payload)
    }
    renderPriceInfo(){
        const { hotelCheckoutReducer } = this.props;
        if(hotelCheckoutReducer.checkout){
            return (
                <div className="card traveller-detail">
                    <h3 className="heading heading-gray heading-sm">Selected rooms</h3>
                    <div className="detail-block">
                        {
                            hotelCheckoutReducer.checkout.rates.deal.hotel.rooms.map((item, index)=>(
                                <div key={index} className="selected-rooms">
                                    <div className="detail-item">
                                    <p className="feature">
                                            <span>{item.numberOfRooms}</span>
                                            <span className="icon">&times;</span>
                                            <span>{item.type}</span>
                                            {/* <span>{item.numberOfExtrabed > 0 ? item.numberOfExtrabed : null}</span> */}
                                        </p>
                                        <p className="value primary">
                                            <span>{hotelCheckoutReducer.checkout.rates.deal.currencyCode} {item.prices.base}</span>
                                            {/* <span>{item.numberOfExtrabed > 0 ? item.prices.extrabed : null}</span> */}
                                        </p>
                                    </div>
                                    {
                                        item.numberOfExtrabed > 0 ?
                                        <div className="detail-item">
                                            <p className="feature">
                                                <span>{item.numberOfExtrabed}</span>
                                                <span className="icon">&times;</span>
                                                <span>Extra Bed</span>
                                            </p>
                                            <p className="value primary">
                                                <span>{hotelCheckoutReducer.checkout.rates.deal.currencyCode} {item.prices.extrabed}</span>
                                            </p>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            ))
                        }                                                                                                
                    </div>
                    <h3 className="heading heading-bg-primary heading-sm">Price Details</h3>
                    <div className="detail-block">
                        <div className="detail-item">
                            <p className="feature">Sub Total</p>
                            <p className="value gray">
                                {`${hotelCheckoutReducer.checkout.rates.deal.currencyCode} ${hotelCheckoutReducer.checkout.rates.deal.hotel.subTotal}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Taxes</p>
                            <p className="value gray">
                                {`+ ${hotelCheckoutReducer.checkout.rates.deal.currencyCode} ${hotelCheckoutReducer.checkout.rates.deal.hotel.taxAmount}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Convenience Fees</p>
                            <p className="value gray">
                                {`+ ${hotelCheckoutReducer.checkout.rates.deal.currencyCode} 00`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Discount</p>
                            <p className="value gray">
                                {`- ${hotelCheckoutReducer.checkout.rates.deal.currencyCode} ${hotelCheckoutReducer.checkout.rates.deal.hotel.discountAmount} `}
                            </p>
                        </div>
                    </div>
                    <div className="detail-block total-block">
                        <div className="detail-item">
                            <p className="feature">Total</p>
                            <p className="value gray">
                                {`${hotelCheckoutReducer.checkout.rates.deal.currencyCode} ${hotelCheckoutReducer.checkout.rates.deal.hotel.total}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Promotion</p>
                            <p className="value gray">
                                {`- ${hotelCheckoutReducer.checkout.rates.deal.currencyCode} 000`}
                            </p>
                        </div>
                    </div>
                    <div className="detail-block grand-total">
                        <div className="detail-item">
                            <p className="feature">Grand Total</p>
                            <p className="value primary">
                                {`${hotelCheckoutReducer.checkout.rates.deal.currencyCode} ${hotelCheckoutReducer.checkout.rates.deal.hotel.total}`}
                            </p>
                        </div>
                    </div>
                    {/* <p className="amount-payable">
                        Amount payable in {`${hotelCheckoutReducer.checkout.rates.deal.currencyCode} 000`}
                    </p> */}
                </div>
            )
        }else{
            return (
                <div>loading ....</div>
            )
        }
        
    }
    renderCustomerCareCenter() {
        return (
            <CustomerCare />
        )        
    }
    renderHotel(){
        const { hotelsListing } = this.props;
        return (
            <HotelCheckoutItem detail={hotelsListing.detail}/>
        )
    }
    renderHotelRoom(){
        const { hotelCheckoutReducer, hotelReservation } = this.props;
        if(hotelCheckoutReducer.checkout && hotelCheckoutReducer.checkout.code == 200 && hotelReservation.roomsList.length > 0) {
            return (
                <div>
                    {
                        hotelReservation.roomsList.map((item, index)=> (
                            <div key={index} className="hotel-room">
                                <div className="col-image">
                                    <img src={item.images.length > 0 ? item.images[0].url : ''} />
                                </div>
                                <div className="col-info">
                                    <h3 className="heading heading-md heading-gray">
                                        {item.rates[0].booked.numberOfRooms} &times; {item.type}
                                        {
                                            item.rates[0].booked.numberOfExtrabed == 0 ?
                                            null
                                            :
                                            <p>{item.rates[0].booked.numberOfExtrabed} &times; Extra bed</p>
                                        }
                                    </h3>
                                    <p className="title">What's included</p>
                                    <div className="services">
                                        {
                                            item.rates[0].services.map((service,index)=>{
                                                return <span key={index}>{service}<span className="comma">&#44; &nbsp;</span></span>
                                            })
                                        }
                                    </div>
                                    {                                                            
                                        item.rates[0].cancellationPolicy.title ?
                                        <p className="cancellation-policy">                                                            
                                            <Tooltip 
                                                placement="top" 
                                                title={item.rates[0].cancellationPolicy.title}
                                                overlayClassName="cancellation-policy">
                                                Cancellation Policy
                                                <img src={require(`../../assests/images/svg/icon-info-white.svg`)} alt="Cancellation Policy"/>
                                            </Tooltip>                                                            
                                        </p>
                                        :
                                        null
                                    }
                                </div>
                                <div className="col-button">
                                    <button onClick={()=> history.goBack()}>
                                        <img src={require(`../../assests/images/svg/edit.svg`)} alt="Change Room" />
                                        change room
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }else{
            return (
                <div>
    
                </div>
            )
        }
        
    }

    renderOwayLogin(){
        return (
            <div className="card oway-login">
                <div className="info">
                    <img src={require(`../../assests/images/svg/home-login.svg`)} alt="Login for Book faster and easier." />
                    <div>
                        <h3 className="heading heading-sm heading-primary">Already a Oway Member?</h3>
                        <p className="text">Login for Book faster and easier.</p>
                    </div>                                
                </div>
                <div className="button" onClick={()=> this.getLink()}>
                    <button type="button" className="btn-blue btn-block" onClick={()=> this.getLink()}>Login</button>
                </div>
            </div>
        )
    }

    renderContactForm(){
        const { hotelCheckoutReducer } = this.props;
        return(
            <ContactForm 
                callbackFirstName={(val)=> this.props.changeFirstName(val)}
                callbackLastName={(val)=> this.props.changeLastName(val)}
                callbackPhoneNum={(val)=> this.props.changePhoneNum(val)}
                callbackEmail={(val)=> this.props.changeEmailInput(val)}
                formValue={hotelCheckoutReducer.contact}
                callbackAlsoTravel={(val)=> this.props.changeAlsoTravelling(val)}
            />
        )
    }
    renderAdultForm(){
        const { countryListing, hotelCheckoutReducer } = this.props
        return (
            <div>
                <AdultForm 
                    callbackAdult={(val)=> this.props.changeAdultName(val)}
                    callbackAdultLast={(val)=> this.props.changeAdultLastName(val)}
                    callbackPhone={(val)=> this.props.changeAddPhoneNum(val)}
                    callbackCountry={(val)=> this.props.changeCountryName(val)}
                    callbackPassport={(val)=> this.props.changePassportNum(val)}
                    formValue={hotelCheckoutReducer.addInfo}
                    countryList={countryListing.countryList}/>
            </div>
        )
    }
    createAllCheckout(){
        const { hotelCheckoutReducer, match } = this.props;
        const payload = {
            "channelType":1,
            "payAtHotelFlag":false,
            "rates": hotelCheckoutReducer.checkout.rates,
            "adult": hotelCheckoutReducer.checkout.adults,
            "child": hotelCheckoutReducer.checkout.children,
            "infant": 0,
            "fareType": hotelCheckoutReducer.checkout.fareType,
            "userRoleId": 4,
            "promoInfo": null,
            "productId":1,
            "source": hotelCheckoutReducer.checkout.source,
            "apiKey":CHECKOUT_API_KEY,
         };
        if(hotelCheckoutReducer.checkout){
            this.props.requestAllCheckout(payload)
            history.push(`/hotels/search/${match.params.hotelSlug}/checkout/payment`)
        }else{
            history.goBack()
        }
        
    }
    renderContinueTopay(){
        const { match } = this.props;
        return (
            <div>
                <Button className="btn btn-orange btn-block" onClick={()=> this.createAllCheckout()}>Continue to Pay</Button>
            </div>
        )
    }
    renderRating(stars) {
        let starArrays = [];
        for (let i = 0; i < stars; i++) {
            let star = <img key={`stars ${i}`}
            src={StarRatingIcon} alt="Star Rating"/>
            starArrays.push(star);
        }
        return starArrays;
    }
    renderTitle(){
        const { hotelsListing,hotelCheckoutReducer,  } = this.props;
        return (
            <div className="booking-detail">
                <div className="info-detail">
                    <div className="name">
                        {hotelsListing.detail.name}
                        <div className="star-rating">{this.renderRating(hotelsListing.detail.ratings.stars)}</div>
                    </div>
                    {
                        hotelCheckoutReducer.checkout &&
                        <div className="info">
                            {moment(hotelCheckoutReducer.checkout.checkIn).format(dateFormat)} - {moment(hotelCheckoutReducer.checkout.checkOut).format(dateFormat)}
                            &nbsp;|&nbsp;
                            {hotelCheckoutReducer.checkout ? hotelCheckoutReducer.checkout.rates.deal.hotel.rooms[0].numberOfRooms : '...'} Room(s)
                            &nbsp;|&nbsp;
                            {hotelCheckoutReducer.checkout ? hotelCheckoutReducer.checkout.adults : '...'} Guest(s)
                        </div>
                    }
                    
                </div>
                <div className="button-change">
                    <button onClick={()=> this.changeSearch()}>
                        <img src={require(`../../assests/images/svg/edit.svg`)} alt="Change Hotel" />
                        change hotel
                    </button>
                </div>
            </div>
        )
    }
    renderStayPeriod(){
        const { hotelCheckoutReducer, hotelsListing } = this.props;
        return (
            <div className="stay-period">
                <div>
                    <p>Check-in</p>
                    <p className="date">{hotelCheckoutReducer.checkout && moment(hotelCheckoutReducer.checkout.checkIn).format(changeDateFormat)}</p>
                    <p>after {hotelsListing.detail.reservationHours.checkin.from}</p>
                </div>
                <div>
                    <p>Check-out</p>
                    <p className="date">{hotelCheckoutReducer.checkout && moment(hotelCheckoutReducer.checkout.checkOut).format(changeDateFormat)}</p>
                    <p>before {hotelsListing.detail.reservationHours.checkout.from}</p>
                </div>
                <div>
                    <p>Stay period</p>
                    <p className="date">{hotelCheckoutReducer.checkout && hotelCheckoutReducer.checkout.numberOfNights} Night(s)</p>
                </div>
            </div>
        )
    }
    changeSearch(){
        const { searchComponentReducers, navbarOptions, locales } = this.props;        
        var child_str = searchComponentReducers.travellers.childAge.length > 0 ? searchComponentReducers.travellers.childAge.map((child, index)=> `enquired_children[${index}]=${child.age}`).join('&') : '';        
        var nationQuery = navbarOptions.nation.type == 'l' ? 'local' : 'foreigner'
        if(child_str){
            child_str = '&'+child_str;
        }
        
        history.push(`/hotels/search/${searchComponentReducers.destination.name}/${searchComponentReducers.destination.slug}/${searchComponentReducers.destination.scope}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.room}/${searchComponentReducers.travellers.adult}/${nationQuery}/${navbarOptions.currency.name}/${navbarOptions.nation.other_name}/${locales.queryName}`)
    }
    getLink(){
        window.open(`${DEV_URL}/sign-in`, '_target')
    }
    
    render() { 
        return (
            <div>
                <CheckoutProcessBar isCheckout={true}/>
                <div className="app-container">
                    <div className="main-grid checkout-container">
                        <div className="col-left">
                            {this.renderTitle()}
                            <div className="listing-container hotel-checkout-container">
                                <div className="card">
                                    {this.renderHotel()}
                                    {this.renderStayPeriod()}
                                    {this.renderHotelRoom()}
                                </div>
                            </div>
                            {this.renderOwayLogin()}
                            {this.renderContactForm()}
                            {/* {this.renderAdditionalForm()} */}
                            {this.renderAdultForm()}
                            {this.renderContinueTopay()}
                        </div>
                        <div className="col-right">
                            {this.renderPriceInfo()}
                            {this.renderCustomerCareCenter()}
                        </div>
                    </div>
                </div>
            </div>            
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        countryListing: state.countryListing,
        hotelsListing: state.hotelsListing,
        hotelCheckoutReducer: state.hotelCheckoutReducer,
        searchComponentReducers: state.searchComponentReducers,
        navbarOptions: state.navbarOptions,
        locales: state.locales,
        hotelReservation: state.hotelReservation
    }
}
const mapDispatchToProps = (dispatch) => {
    return {        
        requestCountry: (payload)=> dispatch(requestCountry(payload)),        
        changeFirstName : (payload)=> dispatch(changeFirstName(payload)),
        changeLastName : (payload)=> dispatch(changeLastName(payload)),
        changePhoneNum : (payload)=> dispatch(changePhoneNum(payload)),
        changeEmailInput : (payload)=> dispatch(changeEmailInput(payload)),
        changeAlsoTravelling : (payload)=> dispatch(changeAlsoTravelling(payload)),
        changeAdultName : (payload)=> dispatch(changeAdultName(payload)),
        changeAdultLastName : (payload)=> dispatch(changeAdultLastName(payload)),
        changeAddPhoneNum : (payload)=> dispatch(changeAddPhoneNum(payload)),
        changeCountryName : (payload)=> dispatch(changeCountryName(payload)),
        changePassportNum : (payload)=> dispatch(changePassportNum(payload)),
        createHotelOrder : (payload)=> dispatch(createHotelOrder(payload)),
        requestAllCheckout : (payload)=> dispatch(requestAllCheckout(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HotelPassengerInfo);