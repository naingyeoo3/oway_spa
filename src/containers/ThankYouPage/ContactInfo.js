import React, { Component } from 'react';
 
class ContactInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
     
    render() { 
        const { contactInfo } = this.props;
        
            if(contactInfo){
                return (
                    <div className="card contact-info">
                        <h3 className="heading heading-sm heading-primary thank-you-heading">
                            Contact Info
                        </h3>
                        <p>{contactInfo.firstName}{" "}{contactInfo.lastName}</p>                        
                        <p>{contactInfo.phoneNo}</p>
                        <p>{contactInfo.email}</p>
                    </div>
                );
            }else{
                return ( <div />)
            }            
    }
}
 
export default ContactInfo;