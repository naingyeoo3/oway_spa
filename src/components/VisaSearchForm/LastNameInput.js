import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

const LastNameInput = (props) => (
    <div className="form-item input-column">
        <label><FormattedMessage id="search.visa.lastname" /></label>
        <input onChange={(e)=> props.callbackParent(e.target.value)} value={props.lastName.value} placeholder='Enter your last name' />
        {props.formSubmit && props.lastName.valid ==  false ? <p className="visa-form-required">Please enter last name</p> : null}
    </div>
)

export default LastNameInput;