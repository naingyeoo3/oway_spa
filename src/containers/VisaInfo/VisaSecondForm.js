import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import { ports, genders } from '../../constants/visaConstants';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import renderDOB from './renderDOB';
import renderFileUpload from './renderFileUpload';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

class VisaSecondForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){    
    const { handleSubmit, previousPage, visaInfo } = this.props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="personal-info">
                <div className="title">Personal Information</div>
                <div className="input-group">
                    <div className="form-control">
                        <label>First Name</label>
                        <Field
                            name="firstName"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder="Enter Your First Name"
                            />
                    </div>
                    <div className="form-control">
                        <label>Last Name</label>
                        <Field
                            name="lastName"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder="Enter Your Last Name"
                            />
                    </div>
                    <div className="form-control">
                        <label>Nationality</label>
                        <Field
                            name="nationality"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder="Select Nationality"
                            />
                    </div>
                    <div className="form-control">
                        <label>Select Gender</label>                        
                            <Field name="gender" component="select">
                                <option value="">Select Gender</option>
                                {genders.map( port => (
                                    <option value={port} key={port}>
                                        {port}
                                    </option>
                                ))}
                            </Field>
                            {/* <Field name="gender" component={renderError} /> */}
                    </div>
                    <div className="form-control">
                        <label>Date of Birth</label>
                        <Field
                            name="dateOfBirth"
                            component="input"
                            type="text"                            
                            component={renderDOB}
                            placeholder="Select Date of birth"
                            />
                    </div>
                    <div className="form-control">
                        <label>Country of Birth</label>
                        <Field
                            name="placeOfBirth"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder="Select Gender"
                            />
                    </div>
                    <div className="form-control">
                        <label>Father's Name</label>
                        <Field
                            name="fatherName"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder="Enter your father's name"
                            />
                    </div>
                    <div className="form-control">
                        <label>Religion</label>
                        <Field
                            name="religion"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder="Enter your Religion"
                            />
                    </div>
                    <div className="form-control">
                        <label>Race</label>
                        <Field
                            name="race"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder="Enter your Race"
                            />
                    </div>
                    <div className="form-control">
                        <label>Occupation</label>
                        <Field
                            name="occupation"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder="Enter Your Occupation"
                            />
                    </div>
                    <div className="form-control">
                        <label>Permanent Address</label>
                        <Field
                            name="permanentAddress"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder="Enter Your Permanent address"
                            />
                    </div>
                    <div className="form-control">
                        <label>Passport Copy</label>
                        <Field
                            name="passportCopyFilename"
                            component="input"
                            // type="file"
                            component={renderFileUpload}
                            placeholder="Upload Passport Copy"
                            />
                    </div>
                    <div className="form-control">
                        <label>Passport Size Copy</label>
                        <Field
                            name="passportSizePhotoFilename"
                            component="input"
                            // type="file"
                            component={renderFileUpload}
                            placeholder="Upload photo"
                            />
                    </div>
                </div>
            </div>
            <div className="address-info">
                <div className="title">Passport Information</div>
                <div className="input-group">
                    <div className="input-group-row">                    
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
                            </div>
                            <span>
                                {(visaInfo && visaInfo.fields && visaInfo.fields.portOfEntry && visaInfo.syncErrors.portOfEntry  && visaInfo.fields.portOfEntry.touched ) ? 
                                    visaInfo.syncErrors.portOfEntry : null}
                            </span>
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
                        <div className="form-control">
                            <label>Date of Issue</label>
                            <Field
                                name="dateOfIssue"
                                component="input"
                                type="text"
                                component={renderDOB}
                                placeholder=""
                                />
                        </div>
                    </div>
                    <div className="input-group-row">
                        <div className="form-control">
                            <label>Place of Issue</label>
                            <Field
                                name="placeOfIssue"
                                component="input"
                                type="text"
                                component={renderField}
                                placeholder=""
                                />
                        </div>
                        <div className="form-control">
                            <label>Date of expiry</label>
                            <Field
                                name="dateOfExpiry"
                                component="input"
                                type="text"
                                component={renderDOB}
                                placeholder=""
                                />
                        </div>
                        {/* <div className="form-control">
                            <label>Issuing Authority</label>
                            <Field
                                name="issueAuthority"
                                component="input"
                                type="text"
                                component={renderField}
                                placeholder="Upload photo"
                                />
                        </div> */}
                    </div>
                    <div className="input-group-row">
                        <div className="form-control">
                            <label>Issuing Authority</label>
                            <Field
                                name="issueAuthority"
                                component="input"
                                type="text"
                                component={renderField}
                                placeholder=""
                                />
                        </div>
                    </div>
                </div>
            </div>
            <div className="passport-info">
                <div className="title">Travel Plan</div>
                    <div className="form-control">
                        <label>Address in Myanmar</label>
                        <Field
                            name="addressInMyanmar"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder=""
                            />
                    </div>
                    <div className="form-control">
                        <label>Travel Plan</label>
                        <Field
                            name="travelPlan"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder=""
                            />
                    </div>
                    <div className="form-control">
                        <label>Purpose of entry</label>
                        <Field
                            name="purposeOfEntry"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder=""
                            />
                    </div>
                    <div className="form-control">
                        <label>Arival Date</label>
                        <Field
                            name="arrivalDate"
                            component="input"
                            type="text"
                            component={renderDOB}
                            placeholder=""
                            />
                    </div>
                    <div className="form-control">
                        <label>Arival Flight</label>
                        <Field
                            name="arrivalFlight"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder="Upload photo"
                            />
                    </div>
                    <div className="form-control">
                        <label>Depart Date</label>
                        <Field
                            name="departureDate"
                            component="input"
                            type="text"
                            component={renderDOB}
                            placeholder="Upload photo"
                            />
                    </div>
                    <div className="form-control">
                        <label>Departure Flight</label>
                        <Field
                            name="departureFlight"
                            component="input"
                            type="text"
                            component={renderField}
                            placeholder="Upload photo"
                            />
                    </div>
            </div>        
        <div>
            <button type="button" className="previous" onClick={previousPage}>
            Previous
            </button>
            <button type="submit" className="next">Next</button>
        </div>
        </form>
    );
    }
};

VisaSecondForm = reduxForm({
  form: 'visaInfo', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true,
  validate,
})(VisaSecondForm);

const mapStateToProps = state => ({     
    initialValues : state.formReducer.init,
    visaInfo          : state.form.visaInfo
 });

const mapDispatchToProps = dispatch => {
    return{
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisaSecondForm)
