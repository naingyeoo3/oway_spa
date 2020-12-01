import React from 'react';
import { DatePicker } from 'antd';

const renderDOB = ({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error},  
}) => (
  <div>
    <label>{label}</label>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <DatePicker         
        onChange={(date, dateString) => input.onChange(dateString)} 
      />
      { error && <span>{error}</span>}
    </div>
  </div>
);

export default renderDOB;
