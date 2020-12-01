
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import renderField from './renderField';
import validate from './validate';

const PasswordForm = props => {
    const { error, handleSubmit, pristine, reset, submitting } = props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="newPassword"
          type="date"
          component={renderField}
          label="New Password"
        />
        <Field
          name="confirmNewPassword"
          type="password"
          component={renderField}
          label="Retype Password"
        />
        {error && <strong>{error}</strong>}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  };
  
  export default reduxForm({
    form: 'changePassword',
    validate,
    asyncBlurFields: ['newPassword'],
  })(PasswordForm);

  