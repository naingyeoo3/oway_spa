import React from 'react';
import FileUpload from './FileUpload';

const renderFileUpload = ({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error},  
}) => (
  <div>
    <label>{label}</label>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <FileUpload renderOnChange={(val)=> input.onChange(val)}/>
      { error && <span>{error}</span>}
    </div>
  </div>
);

export default renderFileUpload;