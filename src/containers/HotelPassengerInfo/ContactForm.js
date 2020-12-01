import React, { Component } from 'react';
import { Input, Checkbox } from 'antd'
 
class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
     
    render() { 
        const { formValue } = this.props;
        return (
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
                                        value={formValue && formValue.firstname}
                                        onChange={(e)=> this.props.callbackFirstName(e.target.value)}/>
                                </div>
                                <div className="card input-card">
                                    <label>Last name</label>
                                    <Input 
                                        placeholder="enter your last name" 
                                        type="text"
                                        value={formValue && formValue.lastname}
                                        onChange={(e)=> this.props.callbackLastName(e.target.value)}/>
                                </div>
                                <div className="card input-card">
                                    <label>Phone no.</label>
                                    <Input 
                                        placeholder="9123456789" 
                                        type="number"
                                        value={formValue && formValue.phone}
                                        onChange={(e)=> this.props.callbackPhoneNum(e.target.value)}/>
                                </div>
                                <div className="card input-card">
                                    <label>Email to receive booking info</label>
                                    <Input 
                                        placeholder="username@gmail.com" 
                                        type="email"
                                        value={formValue && formValue.email}
                                        onChange={(e)=> this.props.callbackEmail(e.target.value)}/>
                                </div>
                                <div className="card input-card check-card">
                                    <Checkbox onChange={(e)=> this.props.callbackAlsoTravel(e.target.checked)}>
                                        I'm also travelling
                                    </Checkbox>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
 
export default ContactForm;