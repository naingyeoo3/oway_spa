
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import history from '../../utils/history';

import validate from './validate';
import renderField from './renderField';
import renderError from './renderError';
import { ports } from '../../constants/visaConstants';

class VisaFirstForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
     
    render(){
        const { handleSubmit, visaInfo } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label>Email Address</label>
                    <Field
                        name="emailId"
                        component="input"
                        type="email"
                        component={renderField}
                        placeholder="Enter Your Email"
                        />
                </div>
                <div className="form-control">
                    <label>Retype Email Address</label>
                    <Field
                        name="re_email"
                        component="input"
                        type="email"
                        component={renderField}
                        placeholder="Enter Your Email"
                        />
                </div>
                <div className="form-control">
                    <label>Port of Entry</label>
                    <div>
                        <Field name="portOfEntry" component="select">
                            <option value="">Select Entry Port</option>
                            {ports.map( port => (
                            <option value={port} key={port}>
                                {port}
                            </option>
                            ))}
                        </Field>
                        <Field name="portOfEntry" component={renderError} />
                    </div>
                </div>
                <div className="form-control">
                    <label>Passport No.</label>
                    <Field
                        name="passportNumber"
                        component="input"
                        type="text"
                        component={renderField}
                        placeholder="Enter Your Passport Number"
                        />  
                </div>
                <div>
                    <button className="back" onClick={()=> history.goBack()}>back</button>
                    <button type="submit" className="next">Next</button>
                </div>
            </form>
        );
    }
  
};

VisaFirstForm = reduxForm({
  form: 'visaInfo',  
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, 
  validate
})(VisaFirstForm);

const mapStateToProps = state => ({     
    initialValues : state.formReducer.init,
    visaInfo          : state.form.visaInfo
 });

const mapDispatchToProps = dispatch => {
    return{
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VisaFirstForm);