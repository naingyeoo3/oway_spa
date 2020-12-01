import React from 'react';
import moment from 'moment';
import omit from 'lodash/omit';

import { DayPickerRangeController } from 'react-dates';
import { START_DATE, END_DATE, VERTICAL_ORIENTATION } from '../constants/constants';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
const dateFormat = 'DD MMM YYYY';

import '../styles/datepicker.css';
import '../styles/mobile-range-calendar.scss';

const defaultProps = {    
  isDayBlocked: () => false,
  // isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,
  enableOutsideDays: false,
  orientation: VERTICAL_ORIENTATION,
  verticalHeight: 600,
  withPortal: false,  
  numberOfMonths: 12,
  minimumNights: 0,
  onOutsideClick() {},  
  onPrevMonthClick() {},
  onNextMonthClick() {},
  monthFormat: 'MMMM YYYY',  
  initialEndDate: moment().format('HH') > 19 ? moment().add(2, 'days') : moment().add(1, 'days'),
  initialStartDate: moment().format('HH') > 19 ? moment().add(2, 'days') : moment().add(1, 'days')
};
class MobileRangeCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
      startDate: props.isBusRoute ? moment().format('HH') > 16 ? moment().add(3,'days') : moment().add(2,'days') : props.initialStartDate,
      endDate: props.isBusRoute ? moment().format('HH') > 16 ? moment().add(4,'days') : moment().add(3,'days') : props.initialEndDate,
      activeStartDate: true,
      activeEndDate: false
    };
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  } 
  isDisabledDate(isBusRoute){
    if(isBusRoute){
      if(moment().format('HH') > 16){
        return moment().add(3, 'days')
      }else{
        return moment().add(2, 'days')
      }
    }else{
      if(moment().format('HH') > 19){
        return moment().add(2, 'days')
      }else{
        return moment().add(1, 'days')
      }
    }    
  } 
  onDatesChange({ startDate, endDate }) {    
    this.setState({ startDate, endDate });        
  }

  onFocusChange(focusedInput) {    
    if(focusedInput == null){
      this.setState({activeStartDate: false, activeEndDate: true})
    }else if(focusedInput == 'endDate'){
      this.setState({activeStartDate: true, activeEndDate: false})
    }
        
    this.setState({      
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  }
  handleConfirm = () => {
      const { startDate, endDate } = this.state;
    this.props.callbackMoibleSelectDate(startDate, endDate);
  }  
  reformatMobileDate = (dateString) =>  {      
      return (
        <div className="date-string">                                     
          <div>{dateString.format(dateFormat).split(" ")[0]}</div>
          <div>
            <span>{dateString.format(dateFormat).split(" ")[1]}</span>
            <span>{dateString.format(dateFormat).split(" ")[2]}</span>
            <span>{dateString.format('dddd')}</span>
          </div>          
        </div>
      )
  }
  render() {    
    const { 
      focusedInput, 
      startDate, 
      endDate,
      activeStartDate,
      activeEndDate 
    } = this.state;

    const props = omit(this.props, [
      'autoFocus',
      'autoFocusEndDate',
      'initialStartDate',
      'initialEndDate',
      'showInputs',
      'callbackMoibleSelectDate',
      'isBusRoute'
    ]);

    const startDateString = startDate ? startDate.format(dateFormat) : '';
    const endDateString = endDate ? endDate.format(dateFormat) : '';    

    return (
      <div className="mobile-calendar">        
        <div className="mobile-calendar-input">          
          <div className={activeStartDate ? "active":''}>
            <span className="title">Depart</span>
            {this.reformatMobileDate(startDate) }
          </div>
          <div className={activeEndDate ? "active":""}>
            <span className="title">Return</span>
            {endDate == null ? this.reformatMobileDate(moment()) : this.reformatMobileDate(endDate)}
          </div>          
        </div>        
        
        <DayPickerRangeController
          {...props}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          isOutsideRange= {day => !isInclusivelyAfterDay(day, this.isDisabledDate(this.props.isBusRoute))}
        />
        <button className="btn-orange" onClick={()=> this.handleConfirm()}>Done</button>
      </div>
    );
  }
}

MobileRangeCalendar.defaultProps = defaultProps;

export default MobileRangeCalendar;