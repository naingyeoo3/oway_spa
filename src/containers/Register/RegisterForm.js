import React from 'react';
import { Field, reduxForm } from 'redux-form';

import CountryCodeSelect from '../../components/CountryCodeSelect';
import RegisterFormField from './RegisterFormField';
import validate from './validate';

const RegisterForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="phoneCode"
          type="text"
          component={CountryCodeSelect}
          label="Dial Code"
        />
        <Field
          name="phoneNumber"
          type="text"
          component={RegisterFormField}
          label="Enter your phone no"
        />
        <Field
          name="email"
          type="email"
          component={RegisterFormField}
          label="Enter your email"
        />
        <Field
          name="password"
          type="password"
          component={RegisterFormField}
          label="password"
        />
        <Field
          name="confirmPassword"
          type="password"
          component={RegisterFormField}
          label="confirm password"
        />
        <div>
          <button type="submit" disabled={submitting}>Register</button>          
        </div>
      </form>
    );
  };
  
  export default reduxForm({
    form: 'register', 
    validate,
    asyncBlurFields: ['email'],
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
  })(RegisterForm);