import React, { Component } from 'react';
import omit from 'lodash/omit';

import moment from 'moment'
import { SingleDatePicker } from 'react-dates';
import { HORIZONTAL_ORIENTATION } from '../../constants/constants';
import isInclusivelyAfterDay from '../../utils/isInclusivelyAfterDay';

import IntegreatedIcon from '../../components/Icon';

const defaultProps = {
    // example props for the demo
    autoFocus: false,
    initialDate: null,
    // day presentation and interaction related props
    renderCalendarDay: undefined,
    renderDayContents: null,
    isDayBlocked: () => false,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    isDayHighlighted: () => false,
    enableOutsideDays: false,
    hideKeyboardShortcutsPanel: true,
  
    // calendar presentation and interaction related props
    orientation: HORIZONTAL_ORIENTATION,
    withPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 1,
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
 
class VisaDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
          focused: props.autoFocus,
          date: props.initialDate,
        };
    
        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
      }
    
      onDateChange(date) {
        this.setState({ date });
        this.props.callbackFun(date)
      }
    
      onFocusChange({ focused }) {
        this.setState({ focused });
      }
    render() { 
        const { focused, date } = this.state;

        const props = omit(this.props, [
          'autoFocus',
          'initialDate',
          'id',
          'callbackFun'
        ]);
        return (
            <div>
                <SingleDatePicker 
                    id={this.props.id}
                    {...props}
                    onDateChange={this.onDateChange}
                    onFocusChange={this.onFocusChange}
                    focused={focused}
                    date={date}
                    placeholder="Passport Expiry"
                />
            </div>
        );
    }
}
 
VisaDatePicker.defaultProps = defaultProps;

export default VisaDatePicker;