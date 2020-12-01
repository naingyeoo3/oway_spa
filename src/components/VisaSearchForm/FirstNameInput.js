import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

const FirstNameInput = (props) => (
        <div className="form-item input-column">
            <label><FormattedMessage id="search.visa.firstname" /></label>
            <input onChange={(e)=> props.callbackParent(e.target.value)} value={props.firstName.value} placeholder='Enter your first name' />
            {props.formSubmit && props.firstName.valid == false ? <p className="visa-form-required">Please enter first name</p> : null}
        </div>
)

export default FirstNameInput;