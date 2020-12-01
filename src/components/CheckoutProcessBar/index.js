import React, { Component } from 'react';
import './process-bar.scss';
 
class CheckoutProcessBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
     
    render() { 
        const { isCheckout, isPayment, isComplete } = this.props;
        return (
            <div className="progress-bar">
                <div className={isCheckout || isComplete ? 'step-bar active' : 'step-bar'}>
                    <span className={isPayment || isComplete ? 'step-no active' : 'step-no'}>1</span>
                    <span className={isPayment || isComplete ? 'step-name active' : 'step-name'}>Passenger Info</span>
                </div>
                <div className={isPayment || isComplete ? 'step-bar active' : 'step-bar'}>
                    <span className={isComplete ? 'step-line active' : 'step-line'}>&nbsp;</span>
                    <span className={isComplete ? 'step-no active' : 'step-no'}>2</span>
                    <span className={isComplete ? 'step-name active' : 'step-name'}>Pay</span>
                </div>
                <div className={isComplete ? 'step-bar active' : 'step-bar'}>
                    <span className={isComplete ? 'step-line active' : 'step-line'}>&nbsp;</span>
                    <span className={isComplete ? 'step-no active' : 'step-no'}>3</span>
                    <span className={isComplete ? 'step-name active' : 'step-name'}>Complete</span>
                </div>
            </div>
        );
    }
}
 
export default CheckoutProcessBar;