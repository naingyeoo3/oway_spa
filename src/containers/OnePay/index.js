import React, { Component } from 'react';
import '../../styles/checkout.scss';

class OnePay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: false,
            showMobile: true,
            showHowToPay: false
        }
    }
    makePayment() {
        this.setState({
            showLoading: true,
            showMobile: false,
            showHowToPay: true
        })
    }
    render() {
        return (
            <div className="app-container">
                <div className="main-grid checkout-container">
                    <div className="col-left">
                        <div className="mobile-payment">
                            <div className="total-amount">
                                <p className="paid-text">Total amount to be paid</p>
                                <p className="grand-total text-primary">MMK 144,801</p>
                                <span className="amount-payable text-small">amount payable in USD 29.90</span>
                            </div>
                            <p className="alert">
                                <img src={require(`../../assests/images/svg/alert.svg`)} alt="Information Alert" />
                                Payment timeout after 3 minutes
                            </p>
                            <div className="payment-block">
                                <div className="card">
                                    <div className="payment-process">
                                        <div className="qr-code">
                                            <img src={require(`../../assests/images/svg/one-pay.svg`)} alt="How to pay with OnePay" />
                                        </div>
                                        <div className="make-payment">
                                            <p className="orderno-text text-small">Order Number</p>
                                            <p className="orderno text-primary">112957</p>
                                            {
                                                this.state.showMobile ?
                                                <div className="mobile-number">
                                                    <span className="enter-no">Enter your phone number linked with OnePay Account</span>
                                                    <div className="mobile-column">
                                                        <div className="card">
                                                            <label>Mobile number</label>
                                                            <div className="divide-column">
                                                                <span className="dial-code">+95</span>
                                                                <input type="text" placeholder="9777931353" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button type="button" onClick={() => this.makePayment()}>Submit</button>
                                                        </div>
                                                    </div>
                                                    <span className="error">Please add phone number!</span>
                                                </div>
                                                :
                                                null
                                            }
                                            {
                                                this.state.showLoading ?
                                                <div className="loading">
                                                    <p className="loading-img"></p>
                                                    <span>please make your payment in OnePay app</span>
                                                </div>
                                                :
                                                null
                                            }
                                            
                                        </div>
                                    </div>
                                    <p className="info-text text-small">
                                        Please make sure your OnePay account has enough balance.
                                    </p>
                                </div>
                                {
                                    this.state.showHowToPay ?
                                    <div className="how-to-pay one-wave-pay">
                                        <p className="text-primary title">How to pay with Onepay App</p>
                                        <div className="how-to-row">
                                            <div className="how-to-column">
                                                <p className="no">1</p>
                                                <p>Check notification in your phone</p>
                                            </div>
                                            <div className="how-to-column">
                                                <p className="no">2</p>
                                                <p>Confirm payment using your PIN</p>
                                            </div>
                                        </div>                                    
                                        <div className="how-to-row">
                                            <div>
                                                <img src={require(`../../assests/images/svg/how-to-onepay-01.svg`)} alt="How to pay with OnePay" />
                                            </div>
                                            <div>
                                                <img src={require(`../../assests/images/svg/how-to-onepay-02.svg`)} alt="How to pay with OnePay" />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                                }                                
                            </div>
                        </div>
                    </div>
                    <div className="col-right">

                    </div>
                </div>
            </div>
        );
    }
}

export default OnePay;