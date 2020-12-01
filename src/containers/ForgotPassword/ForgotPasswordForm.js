import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from './renderField';
import CountryCodeSelect from '../../components/CountryCodeSelect';
import validate from './validate';

const ForgotPasswordForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, isEmail, isFetching } = props
    return (
      <form onSubmit={handleSubmit}>
          {
              isEmail ?
              <Field name="email" type="email" component={renderField} label="Email"/>
              :
              <div>
                  <Field
                        name="phoneCode"
                        type="text"
                        component={CountryCodeSelect}
                        label="Dial code"
                    />
                  <Field name="phoneNumber" type="text" component={renderField} label="Phone No."/>
              </div>              
          }
        
        <div>
        <button type="submit" disabled={submitting}>{isFetching ? '.......': 'Submit'}</button>
        </div>
      </form>
    )
  }
  
  export default reduxForm({
    form: 'forgotform', 
    validate,               
  })(ForgotPasswordForm)