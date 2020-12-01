import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestCheckoutVisa } from '../../actions/visaActions';
import { CHECKOUT_API_KEY } from '../../constants/credentials';

class RenderVisaInfo extends Component{ 
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleVisaCheckout(){
        const payload = { 
            "channelType": 1,         
            "productId": 8,         
            "source": "OWAYDB",         
            "fareType": "foreigner",         
            "rates": {         
                "deal": {         
                    "currencyCode": "USD",         
                    "taxAmount": "",         
                    "subTotal": "60",         
                    "tierAmount": "",         
                    "discountAmount": "",         
                    "total": "60"         
                },         
                "inventory": {         
                    "currencyCode": "USD",         
                    "taxAmount": "",         
                    "subTotal": "60",         
                    "tierAmount": "",         
                    "discountAmount": "",         
                    "total": "60"         
                }         
            },         
            "apiKey": CHECKOUT_API_KEY 
        } 
        this.props.requestCheckoutVisa(payload)
    }
    render(){
        const { info } = this.props;
        return(
            <div>
                <div className="left">
                    <div>
                        <span>Passport No.</span>
                        <span>{info.data && info.data.passportNumber}</span>
                    </div>
                    <div>
                        <span>Country of Issue</span>
                        <span>{info.data && info.data.nationality}</span>
                    </div>
                    <div>
                        <span>Date of Issue</span>
                        <span>{info.data && info.data.dateOfIssue}</span>
                    </div>
                    <div>
                        <span>Date of Expiry</span>
                        <span>{info.data && info.data.dateOfExpiry}</span>
                    </div>

                    <div className="">
                        <div>
                            <span>Address in Myanmar</span>
                            <span>{info.data && info.data.addressInMyanmar}</span>
                        </div>
                        <div>
                            <span>Contact No</span>
                            <span>{'...'}</span>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div>
                        <span>First Name</span>
                        <span>{info.data && info.data.firstName}</span>
                    </div>
                    <div>
                        <span>Last Name</span>
                        <span>{info.data && info.data.lastName}</span>
                    </div>
                    <div>
                        <span>Nationality</span>
                        <span>{info.data && info.data.nationality}</span>
                    </div>
                    <div>
                        <span>Gender</span>
                        <span>{info.data && info.data.gender}</span>
                    </div>
                    <div>
                        <span>Date of birth</span>
                        <span>{info.data && info.data.dateOfBirth}</span>
                    </div>
                    <div>
                        <span>Country of birth</span>
                        <span>{info.data && info.data.placeOfBirth}</span>
                    </div>
                    <div>
                        <span>Occupation</span>
                        <span>{info.data && info.data.occupation}</span>
                    </div>
                    <div>
                        <span>Purpose of Entry</span>
                        <span>{info.data && info.data.purposeOfEntry}</span>
                    </div>
                    <div>
                        <span>Email Address</span>
                        <span>{info.data && info.data.emailId}</span>
                    </div>
                    <div>
                        <span>Permanent Address</span>
                        <span>{info.data && info.data.permanentAddress}</span>
                    </div>
                </div>
                <button onClick={()=> this.handleVisaCheckout()}>confirm</button>
            </div>
        )}  
    }

const mapStateToProps = state => ({
    
});
const mapDispatchToProps = dispatch => {
    return{                                     
        requestCheckoutVisa: (payload)=> dispatch(requestCheckoutVisa(payload))        
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(RenderVisaInfo);