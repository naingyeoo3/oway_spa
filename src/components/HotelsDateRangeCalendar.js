import React from 'react';
import moment from 'moment';
import omit from 'lodash/omit';
import { DateRangePicker } from 'react-dates';

import IntegreatedIcon from './Icon';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION } from '../constants/constants';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
const dateFormat = 'DD MMM YYYY';

import '../styles/datepicker.css';
import '../styles/date-range-calendar.scss';

const defaultProps = {    
  startDateId: START_DATE,
  startDatePlaceholderText: 'Start Date',
  endDateId: END_DATE,
  endDatePlaceholderText: 'End Date',  
  orientation: HORIZONTAL_ORIENTATION,   
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  navPrev: <IntegreatedIcon type='left' />,
  navNext: <IntegreatedIcon type='right'/>,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},
  renderCalendarDay: undefined,
  renderDayContents: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment().format('HH') > 16 ? moment().add(2,'days') : moment().add(1,'days')),
  isDayHighlighted: () => false,  
  monthFormat: 'MMMM YYYY',
  displayFormat: dateFormat,
  initialStartDate: moment().format('HH') > 16 ? moment().add(2,'days') : moment().add(1,'days'),
  initialEndDate: moment().format('HH') > 16 ?  moment().add(3,'days') : moment().add(2,'days'),  
  customArrowIcon: <div className='vertical-line'/>,
}

class HotelsDateRangeCalendar extends React.Component {
  constructor(props) {
    super(props);

    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = START_DATE;
    } else if (props.autoFocusEndDate) {
      focusedInput = END_DATE;
    }

    this.state = {
      focusedInput,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);    
  }      
  onDatesChange({ startDate, endDate }) {    
    this.setState({
      startDate: startDate && startDate,
      endDate: endDate && endDate,
    });
    this.props.callbackMoibleSelectDate(startDate, endDate)
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }
  
  render() {    
    const { focusedInput, startDate, endDate } = this.state;    
    const props = omit(this.props, [
      'autoFocus',
      'autoFocusEndDate',
      'initialStartDate',
      'initialEndDate',
      'stateDateWrapper',
      'callbackMoibleSelectDate',
      'isListing',
      'lisitngFromDate',
      'listingToDate'
    ])
    

    return (                               
        <DateRangePicker
          {...props}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={this.props.isListing ? moment(this.props.lisitngFromDate) : startDate}
          endDate={this.props.isListing ? moment(this.props.listingToDate) : endDate}
          readOnly={true}          
        />                
    );
  }
}

HotelsDateRangeCalendar.defaultProps = defaultProps;

export default HotelsDateRangeCalendar;