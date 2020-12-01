import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import FlightListItem from '../../components/FlightListItem';
import { passengerInfoText } from '../../constants/constants';
import PassengerInfoItem from '../../components/PassengerInfoItem';
import '../../styles/passenger-info.scss';
import { Button, Input, Select, Alert, Checkbox, AutoComplete } from 'antd';
import TravellerDetail from '../../components/TravellerDetail';
import ContactInfo from '../../components/ContactInfo';
import { requestCountry } from '../../actions/countryAction';
import { CONFIRM_API_KEY} from '../../constants/credentials';
import { addAdultTravellerInfo, 
         addChildTravellerInfo, 
         addInfantTravellerInfo } from '../../actions/travellerInfoActions';
import {addContactInfo} from '../../actions/contactInfoAction';   
import {requestPrepareBooking} from '../../actions/bookingAction';   
import {loadFlightDataFromStorage} from '../../actions/flightsListingAction';   
import history from '../../utils/history';
import {setState} from '../../localStorage';
const Option = AutoComplete.Option;
import moment from 'moment';
const dateFormat = 'DD MMM YYYY';
import CheckoutProcessBar from '../../components/CheckoutProcessBar';
import { DEV_URL } from '../../constants/credentials';

class PassengerInfo extends Component {
    constructor(props) {
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
        this.handleContactInfoInput = this.handleContactInfoInput.bind(this);
        this.handleContinueToPay = this.handleContinueToPay.bind(this);
        this.handleSelectDialCode = this.handleSelectDialCode.bind(this);
        this.handleSelectTitle = this.handleSelectTitle.bind(this);
        this.handleContactInfoCheckChange = this.handleContactInfoCheckChange.bind(this);
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
    componentDidMount() {
        const payload = {
            "apiKey": CONFIRM_API_KEY,
            "channelType": 1
        }
        if(localStorage.getItem('flightsListing')){
            this.props.loadFlightDataFromStorage(localStorage.getItem('flightsListing'))
        }
        console.log("contact Info",this.props.contactInfo)  
        if(this.props.contactInfo){
            this.setState({
                title : this.props.contactInfo.title,
                firstName : this.props.contactInfo.firstName,
                lastName : this.props.contactInfo.lastName,
                phoneCode : this.props.contactInfo.phoneCode,
                email : this.props.contactInfo.email,
                phoneNumber : this.props.contactInfo.phoneNumber,
                isTravelling : this.props.contactInfo.isTravelling
            })
        }
        this.props.requestCountry(payload)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.bookingReducer.isFetching !== this.props.bookingReducer.isFetching){
            if(!this.props.bookingReducer.isFetching){
                this.props.addContactInfo(this.state.contactInfo) 
                if(this.props.bookingReducer.isBookingPrepared){
                    saveState(this.props.bookingReducer);
                }
                let flightType = this.props.flightsListing.verifiedFlight.flightType;
                this.props.history.push(`/flights/search/detail/${flightType}/checkout/payment`)
            }
        }
    }

    handleContinueToPay() {
        let { flightsListing, searchComponentReducers,travellerInfo} = this.props;
        let verifiedFlight = flightsListing.verifiedFlight;
        let confirmedFlight = flightsListing.confirmedFlight;
        let adult = Number(confirmedFlight.adult);
        let child = Number(confirmedFlight.child);
        let infant = Number(confirmedFlight.child);
        let totalTravellers = adult + child + infant;
        let outward =[]; 
        let routeId =[];
        let returnFlight = [];
        console.log("routeId",verifiedFlight.return);
        verifiedFlight.outward.route.map((route)=>{
            const flightRoute = {
             departureAirportCode: route.departure.airportCode,
             departureAirportLocation:route.departure.airportName,
             arrivalAirportCode:route.arrival.airportCode,
             arrivalAirportLocation:route.arrival.airportName,
             departureDate:route.departure.departureDate,
             departureTime:route.departure.departureTime,
             arrivalDate:route.arrival.arrivalDate,
             arrivalTime:route.arrival.arrivalTime,
             airlineCode:route.carrier.airlineCode,
             airlineName:route.carrier.airlineName,
             flightNumber:Number(route.carrier.flightNumber),
             flightIndicator:"",
             bookingClass:route.bookingClass,
             duration:route.duration,
             class:route.class,
             ticketIssueDate:null,
             cancellationPolicy:"Non-refundable",
             referKey : verifiedFlight.outward.referKey,
             }
             outward.push(flightRoute)
            
         })
         if(verifiedFlight.return && verifiedFlight.return.route.length > 0){
            verifiedFlight.return.route.map((route)=>{
                const flightRoute = {
                 departureAirportCode: route.departure.airportCode,
                 departureAirportLocation:route.departure.airportName,
                 arrivalAirportCode:route.arrival.airportCode,
                 arrivalAirportLocation:route.arrival.airportName,
                 departureDate:route.departure.departureDate,
                 departureTime:route.departure.departureTime,
                 arrivalDate:route.arrival.arrivalDate,
                 arrivalTime:route.arrival.arrivalTime,
                 airlineCode:route.carrier.airlineCode,
                 airlineName:route.carrier.airlineName,
                 flightNumber:Number(route.carrier.flightNumber),
                 flightIndicator:"",
                 bookingClass:route.bookingClass,
                 duration:route.duration,
                 class:route.class,
                 ticketIssueDate:null,
                 cancellationPolicy:"Non-refundable",
                 referKey : verifiedFlight.return.referKey,
                 }
                 returnFlight.push(flightRoute)
                //  routeId.push(flightsListing.verifiedFlight.routeID)
             })
         }
         routeId =flightsListing.verifiedFlight.routeID;
        const payload = {
            channelType : 1,
            productId:2,
            userTypeId:2,
            userId:1,
            tripType : 1,
            fareType:"foreign",
            flightType:(returnFlight.length > 0)? 2: 1,
            apiKey : "Kpp69BQ8ihwwLsPwSEexjqKAbf+fSSbQ\/qlz9Nuy\/O0=",
            routingId :routeId,
            source : verifiedFlight.source,
            cacheKey: verifiedFlight.cacheKey,
            currencyCode : confirmedFlight.rates.deal.currencyCode,
            passengers: totalTravellers,
            adult : adult,
            child : child,
            infant : infant,
            travelerInfo : {
                adult : travellerInfo.adult,
                child : travellerInfo.child,
                infant : travellerInfo.infant
            },
            contactInfo : this.state.contactInfo,
            flightInfo : {
                outward : outward,
                return :returnFlight
            },
            endUserIp:"203.81.75.50",
            endUserBrowser:"Mozilla\/5.0 (Linux; Android 6.0; vivo 1601 Build\/MRA58K; wv) AppleWebKit\/537.36 (KHTML, like Gecko) Version\/4.0 Chrome\/78.0.3904.90 Mobile Safari\/537.36",
            endUserOrigin:"Myanmar",
            endUserData:"saintnadihtun@owaytrip.com,Ms TestSaint TestNadi,3769799464846"

        }
        this.props.requestPrepareBooking(payload)


    }

    handleCompleteTravellerInfo(type, info) {
        console.log("Type",info)
        switch (type) {
            case "Adult": return this.props.addAdultTravellerInfo(info)
            case "Child": return this.props.addChildTravellerInfo(info)
            case "Infant": return this.props.addInfantTravellerInfo(info)
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
    changeFlight(){
        const { searchComponentReducers, navbarOptions, locales } = this.props;
        history.push(`/flights/search/${searchComponentReducers.searchTab}/${searchComponentReducers.from.fromCity}/${searchComponentReducers.to.toCity}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/${searchComponentReducers.travellerClass.key}/${navbarOptions.currency.name}/${locales.queryName}/`);
    }
    getLink(){
        window.open(`${DEV_URL}/sign-in`, '_target')
    }

    render() {
        const { flightsListing, searchComponentReducers,navbarOptions } = this.props;
        let verifiedFlight = flightsListing.verifiedFlight;
        let confirmedFlight = flightsListing.confirmedFlight;
        let outwardRouteLength = verifiedFlight.outward.route.length - 1;
        let adult = Number(confirmedFlight.adult);
        let child = Number(confirmedFlight.child);
        let infant = Number(confirmedFlight.child);
        let totalTravellers = adult + child + infant;
        let nation_type = navbarOptions.nation.other_name; 
        let nrcNeeded = (nation_type == "local" && verifiedFlight.flightType == 1)? true : false;      
 
        return (
            <div>
                <CheckoutProcessBar isCheckout={true}/>
                <div className="app-container">
                <div className="main-grid checkout-container">
                    <div className="col-left">
                        <div className="booking-detail">
                            <div className="info-detail">
                                <div className="name">
                                    {verifiedFlight.outward.route[0].departure.airportName}&nbsp;
                                    ({verifiedFlight.outward.route[0].departure.airportCode})
                                    <img src={require(`../../assests/images/svg/route-hover.svg`)} alt="Route" className="route" />
                                    {(verifiedFlight.outward.route.length > 1)? verifiedFlight.outward.route[outwardRouteLength].departure.airportName : verifiedFlight.outward.route[outwardRouteLength].arrival.airportName}
                                </div>
                                <div className="info">
                                    {moment(verifiedFlight.outward.route[0].departure.departureDate).format(dateFormat)}
                                    &nbsp;-&nbsp;
                                    {
                                        verifiedFlight.return ?
                                            verifiedFlight.outward.route.length > 1 ?
                                            moment(verifiedFlight.return.route[0].arrival.arrivalDate).format(dateFormat)
                                            :
                                            moment(verifiedFlight.return.route[outwardRouteLength].arrival.arrivalDate).format(dateFormat)                                        
                                        :
                                        moment(verifiedFlight.outward.route[outwardRouteLength].departure.departureDate).format(dateFormat)
                                    }
                                    {/* {moment(verifiedFlight.outward.route[outwardRouteLength].departure.departureDate).format(dateFormat)} */}
                                    &nbsp;|&nbsp;
                                    {totalTravellers} &nbsp;Travler(s)
                                    &nbsp;|&nbsp;
                                    {searchComponentReducers.travellerClass.name}
                                </div>
                            </div>
                            <div className="button-change">
                                <button type="button" onClick={()=> this.changeFlight()}>
                                    <img src={require(`../../assests/images/svg/edit.svg`)} alt="Change Flight" />
                                    change flight
                                </button>
                            </div>
                        </div>
                        {
                            (verifiedFlight.outward.referKey) ?
                                <div className="listing-container-01 checkout-listing">
                                    <span className="tag">Depart</span>
                                    <FlightListItem
                                        key={verifiedFlight.outward.referKey}
                                        checkedBtoC={this.props.flightsListing.isBtoC}
                                        outward={verifiedFlight.outward}
                                        isConfirmed={true}
                                    />
                                </div>
                                :
                                <div></div>
                        }
                        {
                            (verifiedFlight.return) ?
                                <div className="listing-container-01 checkout-listing return">
                                    <span className="tag">Return</span>
                                    <FlightListItem
                                        key={verifiedFlight.return.referKey}
                                        checkedBtoC={this.props.flightsListing.isBtoC}
                                        outward={verifiedFlight.return}
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
                        <TravellerDetail
                            rates={confirmedFlight.rates.deal.flight}
                            adult={adult} child={child} infant={infant}
                            currencyCode={confirmedFlight.rates.deal.currencyCode} 
                            isFlight={true}/>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    flightsListing: state.flightsListing,
    searchComponentReducers: state.searchComponentReducers,
    navbarOptions: state.navbarOptions,
    locales: state.locales,
    countryListing: state.countryListing,
    travellerInfo: state.travellerInfo,
    contactInfo : state.contactInfoReducer.contactInfo,
    bookingReducer : state.bookingReducer
})
const mapDispatchToProps = dispatch => ({
    requestCountry: (payload) => dispatch(requestCountry(payload)),
    addAdultTravellerInfo: (payload) => dispatch(addAdultTravellerInfo(payload)),
    addChildTravellerInfo: (payload) => dispatch(addChildTravellerInfo(payload)),
    addInfantTravellerInfo: (payload) => dispatch(addInfantTravellerInfo(payload)),
    addContactInfo : (payload) => dispatch(addContactInfo(payload)),
    requestPrepareBooking :(payload)=>dispatch(requestPrepareBooking(payload)),
    loadFlightDataFromStorage :(payload)=>dispatch(loadFlightDataFromStorage(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(PassengerInfo);