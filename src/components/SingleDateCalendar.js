import React from 'react';
import moment from 'moment';
import omit from 'lodash/omit';

import { SingleDatePicker } from 'react-dates';
import { HORIZONTAL_ORIENTATION } from '../constants/constants';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
const dateFormat = 'DD MMM YYYY';

import IntegreatedIcon from './Icon';

import '../styles/single-date-calendar.scss';

const defaultProps = {    
  initialDate: moment().format('HH') > 19 ? moment().add(2, 'days') : moment().add(1, 'days'), 
  placeholder: 'Date',
  navPrev: <IntegreatedIcon type='left' />,
  navNext: <IntegreatedIcon type='right'/>,
  orientation: HORIZONTAL_ORIENTATION,  
  numberOfMonths: 2,  
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},
  renderCalendarDay: undefined,
  renderDayContents: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isDayHighlighted: () => {},
  displayFormat: () => dateFormat,
  monthFormat: 'MMMM YYYY'
};

class SingleDateCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: props.autoFocus,
      date: props.isBusRoute ? moment().format('HH') > 16 ? moment().add(3,'days') : moment().add(2,'days') : props.initialDate,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date) {
    this.setState({ date });
    this.props.callbackMobileSelectDate(date)
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
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

  render() {
    const { focused, date } = this.state;

    const props = omit(this.props, [
      'autoFocus',
      'initialDate',
      'callbackMobileSelectDate',
      'isBusRoute',
      'isListing',
      'listingSearchDate'
    ]);

    return (
      <SingleDatePicker
        {...props}
        id="date_input"
        date={this.props.isListing ? moment(this.props.listingSearchDate) : date}
        focused={focused}
        onDateChange={this.onDateChange}
        onFocusChange={this.onFocusChange}
        readOnly={true}
        isOutsideRange= {day => !isInclusivelyAfterDay(day, this.isDisabledDate(this.props.isBusRoute))}
      />
     
    );
  }
}

SingleDateCalendar.defaultProps = defaultProps;

export default SingleDateCalendar;