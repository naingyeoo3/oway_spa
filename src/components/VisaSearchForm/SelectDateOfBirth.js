import React, { Component } from 'react';
import moment from 'moment';
import omit from 'lodash/omit';

import { Web, Mobile} from '../../constants/helper'

import { SingleDatePicker, DayPickerSingleDateController } from 'react-dates';
import { HORIZONTAL_ORIENTATION } from '../../constants/constants';
import { VERTICAL_ORIENTATION } from '../../constants/constants';
import isInclusivelyAfterDay from '../../utils/isInclusivelyAfterDay';

import IntegreatedIcon from '../Icon';

const dateFormat = 'DD MMM YYYY';

const defaultProps = {    
    autoFocus: false,
    initialDate: moment(),
    id: 'date',
    placeholder: 'Date',
    disabled: false,
    required: false,
    screenReaderInputMessage: '',
    showClearDate: false,
    showDefaultInputIcon: false,
    customInputIcon: null,
    block: false,
    small: false,
    regular: false,
    verticalSpacing: undefined,
    keepFocusOnInput: false,
    renderMonthText: null,
    orientation: HORIZONTAL_ORIENTATION,    
    horizontalMargin: 0,
    withPortal: false,
    withFullScreenPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 1,
    keepOpenOnDateSelect: false,
    reopenPickerOnClearDate: false,
    isRTL: false,
    navPrev: <IntegreatedIcon type='left' />,
    navNext: <IntegreatedIcon type='right' />,
    onPrevMonthClick() {},
    onNextMonthClick() {},
    onClose() {},
    renderCalendarDay: undefined,
    renderDayContents: null,
    enableOutsideDays: false,
    isDayBlocked: () => false,
    isOutsideRange: day => false,
    isDayHighlighted: () => {},    
    displayFormat: dateFormat,
    monthFormat: 'MMMM YYYY',
  };
class SelectDateOfBirth extends Component {
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
        this.props.callbackParent(moment(date).format(dateFormat))
      }
    
      onFocusChange({ focused }) {
        this.setState({ focused });
      }
    
    
      render() {
        const { focused, date } = this.state;

        const props = omit(this.props, [
          'autoFocus',
          'initialDate',
          'callbackParent',
          'dob',
          'callbackMobileDrawer'
        ]);
    
        return (
            <div className="form-item date-of-birth">
                <label>Date of Birth</label>
                <Web>
                  <SingleDatePicker
                      {...props}
                      id="date_input"
                      date={date}
                      focused={focused}
                      onDateChange={this.onDateChange}
                      onFocusChange={this.onFocusChange}                    
                  />
                </Web>
                <Mobile>
                  <button onClick={()=> this.props.callbackMobileDrawer('mobile_visa_date')}>{this.props.dob.value}</button>                  
                </Mobile>
                
            </div>
                     
        );
      }
}

SelectDateOfBirth.defaultProps = defaultProps;

export default SelectDateOfBirth;