import React, { Component } from 'react';
import { connect } from 'react-redux';

import DateRangeCalendar from './DateRangeCalendar';
import SingleDateCalendar from './SingleDateCalendar';
import HotelsDateRangeCalendar from './HotelsDateRangeCalendar';
import BusDateRangeCalendar from './BusDateRangeCalendar';
import MobileRangeCalendar from './MobileRangeCalendar';
import MobileDatePicker from './MobileDatePicker';
import MobileHotelsRangeCalendar from './MobileHotelsRangeCalendar';
import MobileBusDatePicker from './MobileBusDatePicker';

import { Input, Divider } from 'antd';      
import { Web, Mobile } from '../constants/helper';
import moment from 'moment';

const dateFormat = 'DD MMM YYYY';

import {     
    searchDateFromValue,
    searchDateToValue,    
    searchOneWayDate,
} from '../actions/searchComponentActions'
    
class DateInputComponent extends Component {
    constructor(props){
        super(props);
    }
    handleSelectMobileDate = (startDate, endDate) => {
        const fromDate = moment(startDate).format(dateFormat);
        const toDate  = moment(endDate).format(dateFormat);        
        if(endDate != null){
            this.props.searchDateFromValue(fromDate);
            this.props.searchDateToValue(toDate);  
            if(this.props.isMobileDept){
                this.props.callbackParentDrawerClose()
            }                                  
        }else{
            this.props.searchDateFromValue(fromDate);
            this.props.searchDateToValue(toDate);                        
        }                                        
    }
    handleSelectMobileSingleDate = (date) => {
        const single_date = moment(date).format(dateFormat);
        this.props.searchOneWayDate(single_date)        
        if(this.props.isMobileDate){
            this.props.callbackParentDrawerClose()        
        }        
    }
    getDateInput = (route) => {        
        switch (route) {
            case '/':
                return this.getFlightDate()
                break
            case '/flights':
                return this.getFlightDate()
                break;
            case '/buses':
                return this.getBusesDate()
                break;
            case '/hotels':
                return this.getHotelsDate()
                break;
            case '/tours':
                return this.getBusesDate()
                break;

            default:
                break;
        }
    } 
    getFlightDate = () => {
        const { searchComponentReducers } = this.props;
        if(searchComponentReducers.searchTab == 2){
            return (
                <div className="web-range-picker">                    
                <Web>
                    {                        
                        <DateRangeCalendar callbackMoibleSelectDate={(startDate, endDate)=> this.handleSelectMobileDate(startDate, endDate)}/>                                         
                    }
                </Web>                                        
                <Mobile>
                    <Input
                        value={searchComponentReducers.fromDate.date}
                        aria-label={searchComponentReducers.fromDate.date}
                        onFocus={()=> this.props.onFocus('departure')}
                        readOnly
                        />
                    <Input
                        value={searchComponentReducers.toDate.date}
                        aria-label={searchComponentReducers.fromDate.date}
                        onFocus={()=> this.props.onFocus('departure')}
                        readOnly
                    />                            
                    <Divider />
                </Mobile>                    
            </div>
            )
        }else{
            return (
                <div className="mobile-date-picker">                    
                <Web>
                    <SingleDateCalendar callbackMobileSelectDate={(date)=> this.handleSelectMobileSingleDate(date)}/>
                    <Divider type="vertical" className="search-vertical" />
                    <input type="text" value={moment().format('HH') > 19 ? moment().add(2,'days').format(dateFormat) : moment().add(1, 'days').format(dateFormat)} disabled className="disabled-input" />
                </Web>
                <Mobile>
                    <Input 
                        value={searchComponentReducers.onewayDate.date}                               aria-label={searchComponentReducers.fromDate.date}          
                        onFocus={()=> this.props.onFocus('date')}
                        readOnly
                        />
                    <Divider/>
                </Mobile>                        
            </div>
            )
        }        
    }
    getHotelsDate = () => {
        const { searchComponentReducers } = this.props;
        return (
            <div className="web-range-picker">                    
            <Web>
                {                        
                    <HotelsDateRangeCalendar callbackMoibleSelectDate={(startDate, endDate)=> this.handleSelectMobileDate(startDate, endDate)}/>
                }
            </Web>                                        
            <Mobile>
                <Input
                    value={searchComponentReducers.fromDate.date}
                    onFocus={()=> this.props.onFocus('departure')}
                    readOnly
                    />
                <Input
                    value={searchComponentReducers.toDate.date}
                    onFocus={()=> this.props.onFocus('departure')}
                    readOnly
                />                            
                <Divider />
            </Mobile>                    
        </div>
        )
    }
    getBusesDate = () => {
        const { searchComponentReducers } = this.props;
        if(searchComponentReducers.searchTab == 2){
            return (
                <div className="web-range-picker">                    
                <Web>
                    {                        
                        <BusDateRangeCalendar callbackMoibleSelectDate={(startDate, endDate)=> this.handleSelectMobileDate(startDate, endDate)}/>
                    }
                </Web>                                        
                <Mobile>
                    <Input
                        value={searchComponentReducers.fromDate.date}
                        onFocus={()=> this.props.onFocus('departure')}
                        readOnly
                        />
                    <Input
                        value={searchComponentReducers.toDate.date}
                        onFocus={()=> this.props.onFocus('departure')}
                        readOnly
                    />                            
                    <Divider />
                </Mobile>                    
            </div>
            )
        }else{
            return (
                <div className="mobile-date-picker">                    
                <Web>
                    <SingleDateCalendar isBusRoute={true} callbackMobileSelectDate={(date)=> this.handleSelectMobileSingleDate(date)}/>
                    <Divider type="vertical" className="search-vertical" />
                    <input type="text" value={moment().format('HH') > 16 ? moment().add(3,'days').format(dateFormat) : moment().add(2,'days').format(dateFormat)} disabled className="disabled-input" />
                </Web>
                <Mobile>
                    <Input 
                        value={searchComponentReducers.onewayDate.date}                                         
                        onFocus={()=> this.props.onFocus('date')}
                        readOnly
                        />
                    <Divider/>
                </Mobile>                        
            </div>
            )
        }
    }

    detectHotelRoute = (route) => route == '/hotels';    

    detectBusRoute = (route) => route == '/buses';    

    getMobileDeparture = () => { 
            const { router } = this.props;       
            if(this.detectHotelRoute(router.location.pathname)){
                return (<MobileHotelsRangeCalendar callbackMoibleSelectDate={(startDate, endDate)=> this.handleSelectMobileDate(startDate, endDate)}/>)
            }else if(this.detectBusRoute(router.location.pathname)){
                return (<MobileRangeCalendar isBusRoute={true} callbackMoibleSelectDate={(startDate, endDate)=> this.handleSelectMobileDate(startDate, endDate)}/>)        
            }else{
                return (<MobileRangeCalendar callbackMoibleSelectDate={(startDate, endDate)=> this.handleSelectMobileDate(startDate, endDate)}/>)        
            }            
    }
    getMobileDate = () => {
        const { router } = this.props;  
        
        if(this.detectBusRoute(router.location.pathname)){
            return (<MobileBusDatePicker callbackMobileSelectDate={(date)=> this.handleSelectMobileSingleDate(date)}/>)                
        }else{
            return (<MobileDatePicker callbackMobileSelectDate={(date)=> this.handleSelectMobileSingleDate(date)}/>)            
        }        
    }
    render() {
        const { router, isMobileDept, isMobileDate, isWebView } = this.props;
        return (
            <div style={{height:"100%"}}>

                {isWebView ? this.getDateInput(router.location.pathname) : null}
                {isMobileDept ? this.getMobileDeparture() : null}
                {isMobileDate ? this.getMobileDate() : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({     
    searchResults: state.searchResults,
    searchComponentReducers: state.searchComponentReducers,
    router        : state.router    
 });

const mapDispatchToProps = dispatch => {
    return{                             
        searchDateFromValue : (date)=> dispatch(searchDateFromValue(date)), 
        searchDateToValue: (date)=> dispatch(searchDateToValue(date)),    
        searchOneWayDate: (date)=> dispatch(searchOneWayDate(date)),    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateInputComponent);