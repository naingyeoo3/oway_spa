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
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment().format('HH') > 16 ? moment().add(2,'days') : moment().add(1,'days')),
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
  initialStartDate: moment().format('HH') > 16 ? moment().add(2,'days') : moment().add(1,'days'),
  initialEndDate: moment().format('HH') > 16 ?  moment().add(3,'days') : moment().add(2,'days'),  
};
class MobileHotelsRangeCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
      activeStartDate: true,
      activeEndDate: false
    };
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
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
      'callbackMoibleSelectDate'
    ]);

    const startDateString = startDate ? startDate.format(dateFormat) : '';
    const endDateString = endDate ? endDate.format(dateFormat) : '';    

    return (
      <div className="mobile-calendar">        
        <div className="mobile-calendar-input">          
          <div className={activeStartDate ? "active":''}>
            <span className="title">Check-in</span>
            {this.reformatMobileDate(startDate) }
          </div>
          <div className={activeEndDate ? "active":""}>
            <span className="title">Check-out</span>
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
        />
        <button className="btn-orange" onClick={()=> this.handleConfirm()}>Done</button>
      </div>
    );
  }
}

MobileHotelsRangeCalendar.defaultProps = defaultProps;

export default MobileHotelsRangeCalendar;