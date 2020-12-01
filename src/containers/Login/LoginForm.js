import React from 'react';
import { Field, reduxForm } from 'redux-form';

import CountryCodeSelect from '../../components/CountryCodeSelect';
import FormField from './FormField';
import validate from './validate';

const LoginForm = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    emailLogin,
    isFetching
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      {emailLogin ? (
        <Field
          name="email"
          type="email"
          component={FormField}
          label="Enter Your Email"
        />
      ) : (
        <div>
          <Field
            name="phoneCode"
            type="text"
            component={CountryCodeSelect}
            label="Dial code"
          />
          <Field
            name="phoneNumber"
            type="text"
            component={FormField}
            label="Enter Your Phone no."
          />
        </div>
      )}

      <Field
        name="password"
        type="password"
        component={FormField}
        label="Password"
      />
      <div>
        <button type="submit" disabled={submitting}>
          {isFetching ? '....' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'login',
  validate,
  asyncBlurFields: ['username'],
})(LoginForm);
