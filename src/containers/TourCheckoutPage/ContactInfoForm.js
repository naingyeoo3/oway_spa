import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Input, Checkbox } from 'antd';

import {
    changeContactFirstName,
    changeContactLastName,
    changeContactPhone,
    changeContactEmail,
    changeContactInclude,
    changeContactEasyBook
} from '../../actions/tourCheckoutActions';
 
class ContactInfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
     
    render() { 
        return (
            <div>
                <div className="contact-info">
                    <h3 className="heading heading-dark heading-checkout">Contact Info</h3>
                    <div className="form-container">
                        <div className="card form-card">
                            <div className="form-group">
                                <div className="card input-card">
                                    <label>First name</label>
                                    <Input 
                                        placeholder="enter your first name" 
                                        type="text"
                                        onChange={(e)=> this.props.changeContactFirstName(e.target.value)}/>
                                </div>
                                <div className="card input-card">
                                    <label>Last name</label>
                                    <Input 
                                        placeholder="enter your last name" 
                                        type="text"
                                        onChange={(e)=> this.props.changeContactLastName(e.target.value)}/>
                                </div>
                                <div className="card input-card">
                                    <label>Phone no.</label>
                                    <Input 
                                        placeholder="9123456789" 
                                        type="number"
                                        onChange={(e)=> this.props.changeContactPhone(e.target.value)}/>
                                </div>
                                <div className="card input-card">
                                    <label>Email to receive booking info</label>
                                    <Input 
                                        placeholder="username@gmail.com" 
                                        type="email"
                                        onChange={(e)=> this.props.changeContactEmail(e.target.value)}/>
                                </div>
                                <div className="card input-card check-card">
                                    <Checkbox onChange={(e)=> this.props.changeContactInclude(e.target.checked)}>
                                        I'm also travelling
                                    </Checkbox>
                                </div>
                                <div className="card input-card check-card">
                                    <Checkbox onChange={(e)=> this.props.changeContactEasyBook(e.target.checked)}>
                                        Save info for easy booking
                                    </Checkbox>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {       
        tourTravellerInfo: state.tourTravellerInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeContactFirstName : (val)=> dispatch(changeContactFirstName(val)),
        changeContactLastName : (val)=> dispatch(changeContactLastName(val)),
        changeContactPhone : (val)=> dispatch(changeContactPhone(val)),
        changeContactEmail : (val)=> dispatch(changeContactEmail(val)),
        changeContactInclude : (val)=> dispatch(changeContactInclude(val)),
        changeContactEasyBook : (val)=> dispatch(changeContactEasyBook(val)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ContactInfoForm);