import React from 'react';
import moment from 'moment';
import omit from 'lodash/omit';

import { DayPickerSingleDateController } from 'react-dates';

import { VERTICAL_ORIENTATION } from '../constants/constants';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';

const dateFormat = 'DD MMM YYYY';

const defaultProps = {    
    renderCalendarDay: undefined,        
    isDayBlocked: () => false,
    isDayHighlighted: () => false,
    enableOutsideDays: false,  
    orientation: VERTICAL_ORIENTATION,
    verticalHeight: 600,        
    numberOfMonths: 12,
    onOutsideClick() {},    
    onPrevMonthClick() {},
    onNextMonthClick() {},
    monthFormat: 'MMMM YYYY',
    initialDate: moment().format('HH') > 16 ? moment().add(3,'days') : moment().add(2,'days') 
  };

class MobileBusDatePicker extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          focused: true,
          date: props.initialDate,
        };
    
        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
      }
    
      onDateChange(date) {
        this.setState({ date });
        
      }
    
      onFocusChange() {        
        this.setState({ focused: true });
      }
      confirmDate = () => {
          const { date } = this.state;
        this.props.callbackMobileSelectDate(date);
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
    isDisabledDate(){      
        if(moment().format('HH') > 16){
            return moment().add(3, 'days')
        }else{
            return moment().add(2, 'days')
        }      
    }
  render() {    
    const { focused, date } = this.state;

    const props = omit(this.props, [
      'autoFocus',
      'initialDate',
      'showInput',
      'callbackMobileSelectDate',
      'isBusRoute'
    ]);
    return (      
        <div className="mobile-calendar">
          <div className="mobile-calendar-input">          
            <div className="active">
              <span className="title active">Depart</span>
              {this.reformatMobileDate(date) }
            </div>
            <div className="oneway-info">
              Book round trip<br></br> for great saving
            </div>
          </div>
        <DayPickerSingleDateController
          {...props}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          focused={focused}
          date={date}
          isOutsideRange= {day => !isInclusivelyAfterDay(day, this.isDisabledDate())}
        />
        <button onClick={()=> this.confirmDate()} className="btn-orange">Done</button>
        </div>  
    );
  }
}


MobileBusDatePicker.defaultProps = defaultProps;

export default MobileBusDatePicker;