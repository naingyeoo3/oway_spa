import React from 'react';
import moment from 'moment';
import omit from 'lodash/omit';

import { DayPickerSingleDateController } from 'react-dates';
import { VERTICAL_ORIENTATION } from '../../constants/constants';
import isInclusivelyAfterDay from '../../utils/isInclusivelyAfterDay';
const dateFormat = 'DD MMM YYYY';

import IntegreatedIcon from '../../components/Icon';

import '../../styles/single-date-calendar.scss';

const defaultProps = {
    // example props for the demo
    autoFocus: false,
    initialDate: moment().format('HH') > 16 ? moment().add(5,'days') : moment().add(4, 'days'),
    showInput: false,
    // day presentation and interaction related props
    renderCalendarDay: undefined,
    renderDayContents: null,
    isDayBlocked: () => false,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment().format('HH') > 16 ? moment().add(5,'days') : moment().add(4, 'days')),
    isDayHighlighted: () => false,
    enableOutsideDays: false,
    hideKeyboardShortcutsPanel: true,
  
    // calendar presentation and interaction related props
    orientation: VERTICAL_ORIENTATION,
    withPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 1,
    onOutsideClick() {},
    keepOpenOnDateSelect: false,
    renderCalendarInfo: null,
    isRTL: false,
  
    // navigation related props
    navPrev: <IntegreatedIcon type='left' />,
    navNext: <IntegreatedIcon type='right'/>,
    // renderNavPrevButton: null,
    // renderNavNextButton: null,
    onPrevMonthClick() {},
    onNextMonthClick() {},
  
    // internationalization
    monthFormat: 'MMMM YYYY',
  };

class TourDetailChangeDate extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          focused: true,
          date: this.props.selectedDate ? moment(this.props.selectedDate) : props.initialDate,
        };
    
        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
      }
    
      onDateChange(date) {
        this.setState({ date });
        this.props.callbackFun(date, date)
      }
    
      onFocusChange() {
        // Force the focused states to always be truthy so that date is always selectable
        this.setState({ focused: true });
      }

  render() {
    const { showInput } = this.props;
    const { focused, date } = this.state;

    const props = omit(this.props, [
      'autoFocus',
      'initialDate',
      'showInput',
      'callbackFun',
      'selectedDate'
    ]);

    return (
        <DayPickerSingleDateController
            {...props}
            onDateChange={this.onDateChange}
            onFocusChange={this.onFocusChange}
            focused={focused}
            date={date}
        />
     
    );
  }
}

TourDetailChangeDate.defaultProps = defaultProps;

export default TourDetailChangeDate;