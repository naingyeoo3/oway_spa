import React from 'react';

const renderError = ({ meta: { touched, error } }) => touched && error ? <span>{error}</span> : false;
  
export default renderError;