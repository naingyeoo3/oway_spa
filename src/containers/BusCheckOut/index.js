import React, { Component } from 'react';
import '../../styles/passenger-info.scss';
import BusListItem from '../../components/BusListItem';
import TravellerDetail from '../../components/TravellerDetail';
import ContactInfo from '../../components/ContactInfo';
import { requestCountry } from '../../actions/countryAction';
import { CONFIRM_API_KEY } from '../../constants/credentials';
import {
    addAdultTravellerInfo,
    addChildTravellerInfo,
    addInfantTravellerInfo
} from '../../actions/travellerInfoActions';
import {addContactInfo} from '../../actions/contactInfoAction';
import {connect} from 'react-redux'
import { passengerInfoText } from '../../constants/constants';
import PassengerInfoItem from '../../components/PassengerInfoItem';
import CheckoutProcessBar from '../../components/CheckoutProcessBar';
import { Button, Input, Select, Alert, Checkbox, AutoComplete } from 'antd';
import {confirmBusCheckout} from '../../actions/busCheckoutAction';
import {createBusBooking} from '../../actions/bookingAction';
const Option = AutoComplete.Option;
import moment from 'moment';
import history from '../../utils/history';
const dateFormat = 'DD MMM YYYY';
const dateFormatForBooking = 'YYYY-MM-DD';
import { DEV_URL } from '../../constants/credentials';

class BusCheckout extends Component {
    constructor(props){
        super(props);
        this.state = {
            contactInfo: {
                title: 'Mr',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                phoneCode: '95',
                email: '',
                isTravelling: false
            },
            options: []

        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelectDialCode = this.handleSelectDialCode.bind(this);
        this.handleSelectTitle = this.handleSelectTitle.bind(this);
        this.handleContactInfoInput = this.handleContactInfoInput.bind(this);
        this.handleContactInfoCheckChange = this.handleContactInfoCheckChange.bind(this);
        this.handleContinueToPay = this.handleContinueToPay.bind(this);
    }
    componentDidMount(){
        const {busListing} = this.props;
        let confirmedBus = busListing.confirmBusResponse;
        const payload = {
            "apiKey": CONFIRM_API_KEY,
            "channelType": 1,
        }
        this.props.requestCountry(payload)
        let rates = [];
        if(confirmedBus.outward){
            const  outwardRates = {
                "inventory":{
                    "adult":{
                        "base": confirmedBus.outward.rates.inventory.adult.base
                    },
                    "child": {
                        "base": confirmedBus.outward.rates.inventory.child.base
                    },
                    "currencyCode": confirmedBus.outward.rates.inventory.currencyCode
                },
                "deal":{
                    "adult": {
                        "base": confirmedBus.outward.rates.deal.adult.base
                    },
                    "child": {
                        "base": confirmedBus.outward.rates.deal.child.base
                    },
                    "currencyCode": confirmedBus.outward.rates.deal.currencyCode
                }
            }
            rates.push(outwardRates)
        }
        if(confirmedBus.hasOwnProperty('return')){
            const returnRates = {
                "inventory":{
                    "adult":{
                        "base": confirmedBus.return.rates.inventory.adult.base
                    },
                    "child": {
                        "base": confirmedBus.return.rates.inventory.child.base
                    },
                    "currencyCode": confirmedBus.return.rates.inventory.currencyCode
                },
                "deal":{
                    "adult": {
                        "base": confirmedBus.return.rates.deal.adult.base
                    },
                    "child": {
                        "base": confirmedBus.return.rates.deal.child.base
                    },
                    "currencyCode": confirmedBus.return.rates.deal.currencyCode
                }
            }
            rates.push(returnRates);
        }
        if(confirmedBus.outward){   
            console.log("fetching Checkout")     
            const checkOutPayload ={
                "channelType":1,
                "productId":9,
                "source":"OWAYDB",
                "fareType":"local",
                "adult":1,
                "child":0,
                "rates":rates,
                "tier":{
                    "type":confirmedBus.outward.rates.deal.currencyCode,
                    "amount":confirmedBus.outward.rates.deal.adult.tier.amount + confirmedBus.outward.rates.deal.child.tier.amount
                },
                "apiKey":"YL/7P6Cp3y043q6pciOhPOUvnR+npllo2QqpHE+Bc7o="
            }
            this.props.confirmBusCheckout(checkOutPayload);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.bookingReducer.bookingPrepared !== this.props.bookingReducer.bookingPrepared && this.props.bookingReducer.bookingPrepared){
            this.props.addContactInfo(this.state.contactInfo) 
            history.push(`/bus/search/detail/${123}/checkout/payment`);
        }
    }
    renderAdultForm(adult,nrcNeeded) {
        let adultFormArray = [];
        let adultTitle = ["Mr.","Mrs.","Ms."];
        let info =  this.state.contactInfo;
        for (let i = 0; i < adult; i++) {
            let adultForm = <PassengerInfoItem key={`adult ${i}`} id={i} type={"Adult"} 
            titles = {adultTitle}
            contactInfo={(i == 0)? info : undefined}
            nrcNeeded ={nrcNeeded}
            handleCompleteTravellerInfo={(type, info) => this.handleCompleteTravellerInfo(type, info)} />
            adultFormArray.push(adultForm);
        }
        return adultFormArray;
    }
    renderChildForm(child,nrcNeeded) {
        let childFormArray = [];
        let childTitle = ["Mstr.","Miss."];
        for (let i = 0; i < child; i++) {
            let childForm = <PassengerInfoItem key={`child ${i}`} id={i} type={"Child"} 
            titles = {childTitle}
            nrcNeeded ={nrcNeeded}
            handleCompleteTravellerInfo={(type, info) => this.handleCompleteTravellerInfo(type, info)} />
            childFormArray.push(childForm);
        }
        return childFormArray;
    }
    renderInfantForm(infant,nrcNeeded) {
        let infantFormArray = [];
        let infantTitle = ["Mstr.","Miss."];
        for (let i = 0; i < infant; i++) {
            let infantForm = <PassengerInfoItem key={`infant ${i}`} 
             id={i} type={"Infant"} titles ={infantTitle}
             nrcNeeded ={nrcNeeded}
             handleCompleteTravellerInfo={(type, info) => this.handleCompleteTravellerInfo(type, info)} />
            infantFormArray.push(infantForm);
        }
        return infantFormArray;
    }
    handleCompleteTravellerInfo(type, info) {
        console.log("Type",info)
        switch (type) {
            case "Adult": return this.props.addAdultTravellerInfo(info)
            case "Child": return this.props.addChildTravellerInfo(info)
            case "Infant": return this.props.addInfantTravellerInfo(info)
        }
    }

    searchResult(query) {
        let countries = this.props.countryListing.countryList;
        let options = [];
        if (query.length > 1) {
            let matchedOptions = countries.filter((country) => country.name.includes(query))
            // console.log("matchedOptions", matchedOptions);
            matchedOptions.map((item) => {
                let option = <Option key={item.name} value={String(item.callingCode)}>
                    {item.name} {item.callingCode}</Option>
                options.push(option)
                if (options.length == matchedOptions.length) {
                    this.setState({
                        options: [...options]
                    })
                }
            })

            // console.log("state", this.state.options);
        }


    }

    handleSearch(value) {
        this.searchResult(value);
    }
    
    handleSelectTitle(value) {
        let contactInfo = this.state.contactInfo;
        contactInfo["title"] =value
        this.setState({
            contactInfo
        })
    }
    handleSelectDialCode(value) {
        let contactInfo = this.state.contactInfo;
        contactInfo["phoneCode"] =value
        this.setState({
            contactInfo
        })
    }
    handleContactInfoInput(e) {
        console.log(e.target.value);
        let contactInfo = this.state.contactInfo;
        contactInfo[e.target.name] =e.target.value
        this.setState({
            contactInfo
        })
        // console.log("State",this.state)
    }
    handleContactInfoCheckChange(e){
        console.log(e);
        let contactInfo = this.state.contactInfo;
        contactInfo["isTravelling"] =e.target.checked
        this.setState({
            contactInfo
        })
    }
    handleContinueToPay(){
        let { busListing, searchComponentReducers,travellerInfo,checkoutReducer} = this.props;
        let totalTravellers = checkoutReducer.checkout.adult + checkoutReducer.checkout.child;
        let selectedBusRoute = busListing.selectedBusRoute;
        let selectedReturn= busListing.selectedReturn;
        let departureDate = searchComponentReducers.fromDate.date;
        let arrivalDate = searchComponentReducers.toDate.date;
        const tripType = searchComponentReducers.searchTab;
        let origin = searchComponentReducers.from.fromCityTitle;
        let destination = searchComponentReducers.to.toCityTitle;
        let totalAmount = checkoutReducer.checkout.rates.deal.bus.total;
        let busInfo = [];
        if(selectedBusRoute.hasOwnProperty('busRouteId')){
            const busDepet = {
                "departureDate":moment(departureDate).format(dateFormatForBooking),
                "busRouteId": selectedBusRoute.busRouteId,
                "busRoute": selectedBusRoute.busRoute,
                "departureTime":selectedBusRoute.departureTime,
                "arrivalTime":selectedBusRoute.arrivalTime,
                "busBoardingPointName": selectedBusRoute.boardingPoint,
                "busDroppingPointName": selectedBusRoute.droppingPoint,
                "busLogo": selectedBusRoute.imagePath,
                "busSeatType": selectedBusRoute.seatType,
                "origin":origin,
                "destination":destination,
                "busName":selectedBusRoute.busName,
                "busNumber":selectedBusRoute.busNumber,
                "busType":selectedBusRoute.busTypeName,
                "duration":selectedBusRoute.duration
            }
            busInfo.push(busDepet);
        }
        if(selectedReturn.hasOwnProperty('busRouteId')){
            const busReturn = {
                "departureDate":moment(arrivalDate).format(dateFormatForBooking),
                "busRouteId": selectedReturn.busRouteId,
                "busRoute": selectedReturn.busRoute,
                "departureTime":selectedReturn.departureTime,
                "arrivalTime":selectedReturn.arrivalTime,
                "busBoardingPointName": selectedReturn.boardingPoint,
                "busDroppingPointName": selectedReturn.droppingPoint,
                "busLogo": selectedReturn.imagePath,
                "busSeatType": selectedReturn.seatType,
                "origin":destination,
                "destination":origin,
                "busName":selectedReturn.busName,
                "busNumber":selectedReturn.busNumber,
                "busType":selectedReturn.busTypeName,
                "duration":selectedReturn.duration
            }
            busInfo.push(busReturn);
        }
        const bookingPayload ={
            "tripType":tripType,
            "bookingNumber":busListing.confirmBusResponse.bookingNumber,
            "currencyCode":"USD",
            "busInfo":busInfo,
            "passengerNo":totalTravellers,
            "amount":totalAmount,
            "travelerInfo":travellerInfo,
            "contactInfo":{  
               "email":this.state.contactInfo.email,
               "phoneNumber":this.state.contactInfo.phoneNumber
            },
            "apiKey":"dZIA6qy8Q4Sxfg\/+IsCS44pwnkzp7se2bhQJJ8dLwzg="
        }
        this.props.createBusBooking(bookingPayload);

    }
    getLink(){
        window.open(`${DEV_URL}/sign-in`, '_target')
    }
    changeBus(){
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
        if(tripPlan === 1){
            history.push(`/buses/search/${tripPlan}/${fromCity}/${fromCityId}/${toCity}/${toCityId}/${fromDate}/${toDate}/${adult}/${child}/${currency}/${nation}/${locale}`);
        }else{
            history.push(`/buses/search/${tripPlan}/${fromCity}/${fromCityId}/${toCity}/${toCityId}/${fromDate}/${toDate}/${adult}/${child}/${currency}/${nation}/${locale}`);
        }
    }

    render() {
        const { busListing, searchComponentReducers,navbarOptions,checkoutReducer } = this.props;
        let nation_type = navbarOptions.nation.other_name;
        let selectedBusRoute = busListing.selectedBusRoute;
        let selectedReturn = busListing.selectedReturn;
        let confirmedBus = busListing.confirmBusResponse;
        let adult = (checkoutReducer.checkout)? checkoutReducer.checkout.adult : searchComponentReducers.travellers.adult ;
        let child = (checkoutReducer.checkout)?checkoutReducer.checkout.child :searchComponentReducers.travellers.child;
        let currencyCode = navbarOptions.currency.name;
        let infant = 0;
        let totalTravellers = adult + child + infant;
        let nrcNeeded = (nation_type === "local")? true : false;
        console.log("nrcNeed",nrcNeeded);
        return (
            <div>
            <CheckoutProcessBar isCheckout={true}/>
            <div className="app-container">
            <div className="main-grid checkout-container">
                <div className="col-left">
                    <div className="booking-detail">
                        <div className="info-detail">
                            <div className="name">
                                {searchComponentReducers.from.fromCityTitle}
                                <img src={require(`../../assests/images/svg/route-hover.svg`)} alt="Route" className="route" />
                                {searchComponentReducers.to.toCityTitle}                                
                            </div>
                            <div className="info">
                                {
                                    searchComponentReducers.searchTab == 1 ?
                                    moment(searchComponentReducers.oneWayDate).format(dateFormat)
                                    :
                                    <span>
                                        {moment(searchComponentReducers.fromDate.date).format(dateFormat)}
                                        &nbsp;-&nbsp;
                                        {moment(searchComponentReducers.toDate.date).format(dateFormat)}
                                    </span>
                                }                                
                                &nbsp;|&nbsp;
                                {totalTravellers} &nbsp;Travler(s)
                                &nbsp;|&nbsp;
                                {searchComponentReducers.travellerClass.name}
                            </div>
                        </div>
                        <div className="button-change">
                            <button type="button" onClick={()=> this.changeBus()}>
                                <img src={require(`../../assests/images/svg/edit.svg`)} alt="Change Bus" />
                                change bus
                            </button>
                        </div>
                    </div>
                    {
                        (selectedBusRoute.busRouteId) ?
                            <div className="listing-container-01 checkout-listing">
                                <span className="tag">Depart</span>
                                <BusListItem
                                    key={selectedBusRoute.busRouteId}
                                    busRoute={selectedBusRoute} 
                                    isConfirmed={true}
                                />
                            </div>
                            :
                            <div></div>
                    }
                    {
                        (selectedReturn.busRouteId) ?
                            <div className="listing-container-01 checkout-listing return">
                                <span className="tag">Return</span>
                                <BusListItem
                                    key={selectedReturn.busRouteId}
                                    busRoute={selectedReturn} 
                                    isConfirmed={true}
                                />
                            </div>
                            :
                            <div></div>
                    }
                    <div className="card oway-login">
                        <div className="info">
                            <img src={require(`../../assests/images/svg/home-login.svg`)} alt="Login for Book faster and easier." />
                            <div>
                                <h3 className="heading heading-sm heading-primary">Already a Oway Member?</h3>
                                <p className="text">Login for Book faster and easier.</p>
                            </div>                                
                        </div>
                        <div className="button">
                            <button type="button" className="btn-blue btn-block" onClick={()=> this.getLink()}>Login</button>
                        </div>

                    </div>
                    <ContactInfo
                      title = {this.state.contactInfo.title}
                      firstName = {this.state.contactInfo.firstName}
                      lastName  = {this.state.contactInfo.lastName}
                      email = {this.state.contactInfo.email}
                      mobileNumber = {this.state.contactInfo.phoneNumber}
                      phoneCode = {this.state.contactInfo.phoneCode}
                      options = {this.state.options}
                      isTravelling = {this.state.contactInfo.isTravelling}
                      handleContactInfoInput = {this.handleContactInfoInput}
                      handleContactInfoCheckChange = {this.handleContactInfoCheckChange}
                      handleSelectDialCode = {this.handleSelectDialCode}
                      handleSearch = {this.handleSearch} 
                    />
                    <h3 className="heading heading-dark heading-checkout">Passenger info</h3>
                    <div className="passenger-alert">
                        <img src={require(`../../assests/images/svg/alert.svg`)} alt="Passenger Info Alert" />
                        {passengerInfoText}
                    </div>
                    {
                        (adult > 0) ?
                            this.renderAdultForm(adult,nrcNeeded)
                            :
                            <div></div>
                    }
                    {
                        (child > 0) ?
                            this.renderChildForm(child,nrcNeeded)
                            :
                            <div></div>
                    }
                    {
                        (infant > 0) ?
                            this.renderInfantForm(infant,nrcNeeded)
                            :
                            <div></div>
                    }
                    <button className="btn btn-orange btn-block" onClick={this.handleContinueToPay}>
                        Continue to Pay
                    </button>
                </div>
                <div className="col-right">
                    {
                        (checkoutReducer.checkout)?
                        <TravellerDetail
                        rates={(currencyCode == 'USD')?checkoutReducer.checkout.rates.deal.bus : checkoutReducer.checkout.rates.inventory.bus}
                        adult={adult} child={child} infant={infant}
                        currencyCode={currencyCode}
                        isBus={true} />
                        :
                        <div>Fetching Amount</div>

                    }

                </div>
            </div>
        </div>
        </div>
        );
    }
}
const mapStateToProps = state => ({
    busListing: state.busListing,
    searchComponentReducers: state.searchComponentReducers,
    navbarOptions: state.navbarOptions,
    locales: state.locales,
    countryListing: state.countryListing,
    travellerInfo: state.travellerInfo,
    contactInfo : state.contactInfoReducer.contactInfo,
    bookingReducer : state.bookingReducer,
    checkoutReducer : state.checkoutReducer
})
const mapDispatchToProps = dispatch => ({
    requestCountry: (payload) => dispatch(requestCountry(payload)),
    addAdultTravellerInfo: (payload) => dispatch(addAdultTravellerInfo(payload)),
    addChildTravellerInfo: (payload) => dispatch(addChildTravellerInfo(payload)),
    addInfantTravellerInfo: (payload) => dispatch(addInfantTravellerInfo(payload)),
    addContactInfo : (payload) => dispatch(addContactInfo(payload)),
    confirmBusCheckout :(payload) => dispatch(confirmBusCheckout(payload)),
    createBusBooking : (payload)=>dispatch(createBusBooking(payload))
})

export default connect(mapStateToProps,mapDispatchToProps) (BusCheckout);