import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import history from '../../utils/history'
import { Affix } from 'antd';

import AttrDetailChangeDate from './AttrDetailChangeDate';
import { searchDateFromValue, searchDateToValue } from '../../actions/searchComponentActions';
import { requestCheckoutConfirm } from '../../actions/tourCheckoutActions'
const dateFormat = 'DD MMM YYYY';
import { travellerNum } from '../../constants/constants';
import { CHECKOUT_API_KEY } from '../../constants/credentials'
 
class AttrOptionPricing extends Component {
    constructor(props){
        super(props);
        this.state={
            showDate: false,
            displayMenu: false,
            startTime: null,
            endTime: null,
            isShow: false
        }
        this.showDateDropdown = this.showDateDropdown.bind(this);
        this.hideDateDropdown = this.hideDateDropdown.bind(this);
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);       
    }
    getPrice(price){
        const { traveler} = this.props;

        return( <span>{(traveler.adult + traveler.child + traveler.infact) * Number(price)}</span>) 
    }
    handleSelectMobileDate = (startDate, endDate) => {
        const fromDate = moment(startDate).format(dateFormat);
        const toDate = moment(endDate).format(dateFormat);
        if (endDate != null) {
          this.props.searchDateFromValue(fromDate);
          this.props.searchDateToValue(toDate);          
        } else {
          this.props.searchDateFromValue(fromDate);
          this.props.searchDateToValue(toDate);
        }
      };
    showDateDropdown(event) {
        event.preventDefault();
        this.setState({ showDate: true }, () => {
        document.addEventListener('click', this.hideDateDropdown);
        });
    }
    
    hideDateDropdown() {
        this.setState({ showDate: false }, () => {
            document.removeEventListener('click', this.hideDateDropdown);
        });
    }
    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
        document.addEventListener('click', this.hideDropdownMenu);
        });
    }
    
    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });
    }
    selectTimeSlot(start, end){
        this.setState({
            startTime: start,
            endTime : end
        })
    }
    goToCheckout(){
        const { searchComponentReducers, detail, navbarOptions} = this.props;
        const payload = { 
            "channelType": 1,         
            "productId": 7,         
            "source": detail.owayExclusive.source, // "OWAYDB" // change depend on soruce         
            "fareType": navbarOptions.nation.other_name, // "local"         
            "adult": Number(searchComponentReducers.travellers.adult) + Number(searchComponentReducers.travellers.child) + Number(searchComponentReducers.travellers.infact), //4          
            "child": 0, // 0         
            "infant": 0, // 0         
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
        history.push(`/tours/search/detail/${detail.code}/checkout`)
    }
    calculatePrice(adult, price){

    }
    showPricingDetail(){
        this.setState({isShow: !this.state.isShow})
    }
    calculatePrice(adult){
        const { tourListing } = this.props;
        if(tourListing.dailyRate == null){
            return null
        }
        if(adult == 1){
            return adult * tourListing.dailyRate.data.rates[0].deal.adult.base;
        }        
    }
    render() { 
        const { rates, traveler, timeslots, searchComponentReducers} = this.props;
        const { showDate } = this.state;
        return (
            <div>
                <h2 className="heading heading-md heading-primary">Options and Pricing</h2>
                <div className="card">
                    <div className="traveller-select">
                        <h3 className="heading heading-sm">Choose visit date: </h3>
                        <button onClick={this.showDateDropdown} className="date">
                            {searchComponentReducers.fromDate.date}
                        </button>
                        {
                            showDate &&
                            <div className="visit-date">
                                <AttrDetailChangeDate 
                                    callbackFun={(startDate, endDate)=> this.handleSelectMobileDate(startDate, endDate)}
                                    selectedDate={searchComponentReducers.fromDate.date}
                                    />                            
                            </div>
                        }
                        
                        <h3 className="heading heading-sm">Travel Time</h3>

                        <button className="time" onClick={(e)=> this.showDropdownMenu(e)}>
                            {
                                this.state.startTime ?
                                <span>{this.state.startTime}{this.state.endTime}</span>
                                :
                                <div>
                                    <span>{timeslots && timeslots.length > 0 ? timeslots[0].startTime : '...'}</span>
                                    <span>{timeslots && timeslots.length > 0 ? timeslots[0].endTime : '...'}</span>
                                </div>
                            }                            
                        </button>
                        <div style={{position:"relative"}}>
                        {
                            this.state.displayMenu ?
                            <ul style={{position:"absolute", background:"#fff"}}>                            
                            {
                                (timeslots && timeslots.length >0) ?
                                timeslots.map((time, index)=>
                                    <li key={index} onClick={()=> this.selectTimeSlot(time.startTime, time.endTime)}>
                                        <span>{time.startTime}</span>
                                        <span>{time.endTime}</span>
                                    </li>
                                )
                                :
                                '...'
                            }
                            </ul>
                            :
                            null
                        }
                        </div>
                        <h3 className="heading heading-sm">
                            {/* <span>{traveler.adult}</span> */}
                            Travellers:
                        </h3>
                        <span className="traveller-info">
                            * for more than 9 pax, please send email to
                            <a href="mailto:support@owaytrip.com" title="support@owaytrip.com"> support@owaytrip.com</a>
                        </span>
                        <div>
                            <select defaultValue={traveler.adult} onChange={(e)=> this.props.countTraveler(Number(e.target.value))} className="traveller">
                                {
                                    travellerNum.map((num)=> (
                                        <option onClick={()=> console.info(num)} key={num} value={num}>{num}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    {/* <Affix offsetTop={100}> */}
                        <div className="reservation">
                            <p className="title">Reservation</p> 
                            <p className="detail-tag" onClick={()=> this.showPricingDetail()}>{this.state.isShow ? 'close detail': 'open detail'}</p>
                            <div className="reservation-detail">
                                <div className="room-item">
                                    {
                                        this.state.isShow ?
                                        <div>
                                            <div className="room-item-detail">
                                                <div className="room-type">
                                                    {1}<span> x Adult(s)</span>
                                                </div>
                                                <div className="room-price">
                                                    <span>{rates ? rates[0].deal.currencyCode : '...'} 
                                                    {rates ? this.calculatePrice(1) : '...'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="room-item-detail">
                                                <div className="room-type">
                                                    {searchComponentReducers.travellers.child > 0? 1 : 0}<span> x Child</span>
                                                </div>
                                                <div className="room-price">
                                                    <span>{rates ? rates[0].deal.currencyCode : '...'} 
                                                    {rates ? this.calculatePrice(traveler.child) : '...'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="room-item-detail">
                                                <div className="room-type">
                                                {searchComponentReducers.travellers.child > 0? 1 : 0}<span> x Infant</span>
                                                </div>
                                                <div className="room-price">
                                                    <span>{rates ? rates[0].deal.currencyCode : '...'} 
                                                    {rates ? this.calculatePrice(traveler.infact) : '...'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                        
                                    <div className="room-item-detail">
                                        <div className="room-type">
                                            {Number(traveler.adult) + Number(traveler.child) + Number(traveler.infact)}<span> x Adult(s)</span>
                                        </div>
                                        <div className="room-price">
                                            <span>{rates ? rates[0].deal.currencyCode : '...'} {rates ? this.getPrice(rates[0].deal.adult.base) : '...'}</span>
                                        </div>
                                    </div>                                
                                </div>
                                <button 
                                    type="button" 
                                    className="btn btn-orange btn-block" 
                                    onClick={()=> this.goToCheckout()}>
                                        Book Now
                                    </button>                       
                            </div>
                        </div>
                    {/* </Affix> */}
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
        tourListing: state.tourListing
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        searchDateFromValue: date => dispatch(searchDateFromValue(date)),
        searchDateToValue: date => dispatch(searchDateToValue(date)),
        requestCheckoutConfirm: (payload)=> dispatch(requestCheckoutConfirm(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttrOptionPricing);