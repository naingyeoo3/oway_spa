import React, { Component } from 'react';

import CheckoutProcessBar from '../../components/CheckoutProcessBar';
 
class TourPaymentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
     
    render() { 
        return (
            <div>
                <CheckoutProcessBar isPayment={true}/>
                <div className="payment-page-title">
                    <h4>Choose Payment Type</h4>
                    <p>Transaction fee may be applied for selected payment type</p>
                </div>
                
            </div>
        );
    }
}
 
export default TourPaymentPage;