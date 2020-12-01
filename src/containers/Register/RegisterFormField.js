import React from 'react';

const RegisterFormField = (
    { input, label, type, meta: { asyncValidating, touched, error } },
  ) => (
    <div>
      <label>{label}</label>
      <div className={asyncValidating ? 'async-validating' : ''}>
        <input {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
export default RegisterFormField;