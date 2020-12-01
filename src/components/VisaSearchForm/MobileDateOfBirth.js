import React from 'react';
import moment from 'moment';
import omit from 'lodash/omit';

import { DayPickerSingleDateController } from 'react-dates';
import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants/constants';
import isInclusivelyAfterDay from '../../utils/isInclusivelyAfterDay';
const dateFormat = 'DD MMM YYYY';

import IntegreatedIcon from '../Icon';

const defaultProps = {    
  renderCalendarDay: undefined,  
  navPrev: <IntegreatedIcon type='left' />,
  navNext: <IntegreatedIcon type='right'/>,      
  isDayBlocked: () => false,
  isOutsideRange: day => false,
  isDayHighlighted: () => false,
  enableOutsideDays: false,  
  orientation: VERTICAL_ORIENTATION,
  verticalHeight: 600,        
  numberOfMonths: 1,
  onOutsideClick() {},    
  onPrevMonthClick() {},
  onNextMonthClick() {},  
  monthFormat: 'MMMM YYYY',
  initialDate: moment()
};

class MobileDateOfBirth extends React.Component {
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
    const value = date.format(dateFormat)
    this.setState({ date });
    this.props.callbackParent(value)
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  render() {
    const { focused, date } = this.state;

    const props = omit(this.props, [
      'autoFocus',
      'initialDate',
      'callbackParent'
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

MobileDateOfBirth.defaultProps = defaultProps;

export default MobileDateOfBirth;