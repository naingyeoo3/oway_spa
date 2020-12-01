import React, { Component } from 'react';
import '../../styles/checkout.scss';
import {connect} from 'react-redux';
import {requestKbzPayStart,updatePaymentStatus} from '../../actions/makePaymentAction'

class KBZPay extends Component {
    constructor(props){
        super(props);
        this.state ={
            startTimer : false,
            seconds: parseInt(props.startTimeInSeconds, 10) || 0
        }
        this.tick = this.tick.bind(this);
    }
    componentDidMount(){
        if(this.state.startTimer){
            this.interval = setInterval(() => this.tick(), 10000);
        }
        let {location} = this.props;
        const search = location.search;
        const params = new URLSearchParams(search);
        const orderId = params.get('id');
        const payload = {
            "orderId": Number(orderId),
            "apiKey" : "GBVL5EKDe7JL7wQuaY9NgAY3xQH9IYuZZCkSilPMmwI="
        }
        this.props.requestKbzPayStart(payload);
        
    }
    tick() {
        const {makePaymentReducer,location} = this.props;
        const params = new URLSearchParams(location.search);
        const orderId = params.get('id');
        const payload = {
            "apiKey": "GBVL5EKDe7JL7wQuaY9NgAY3xQH9IYuZZCkSilPMmwI=",
            "channelType": 3,
            "orderId": Number(orderId)
        }
        console.log("calling Api Update Status")
        this.props.updatePaymentStatus(payload)
        this.setState(state => ({
          seconds: state.seconds + 10
        }));
    }
    
    componentDidUpdate(prevProps, prevState) {
        const {makePaymentReducer,location} = this.props;
        const params = new URLSearchParams(location.search);
        const orderId = params.get('id');
        if(prevProps.makePaymentReducer.startedKbzPay!== this.props.makePaymentReducer.startedKbzPay && makePaymentReducer.startedKbzPay){
            this.setState({
                showLoading: true,
                showMobile: false,
                showHowToPay: true,
                startTimer : true
            })
            this.interval = setInterval(() => this.tick(), 10000);
        }
        if(prevState.seconds !== this.state.seconds && this.state.seconds > 180){
            //setInterval(this.timer(),30000);
            console.log("Payment Time Out");
            this.props.history.push(`/checkout/thank-you?orderId=${orderId}&message=Fail`)

        }
        if(makePaymentReducer.payResponse.paymentStatus && makePaymentReducer.payResponse.paymentStatus == "success"){
            this.props.history.push(`/checkout/thank-you?orderId=${orderId}&message=Success&paymentType="mobile"`)

        }
    }
    render() {
        let {location} = this.props;
        const search = location.search;
        const params = new URLSearchParams(search);
        const orderId = params.get('id');
        const qrCode = params.get('qrCode');
        const channelType = params.get('channelType');
        const url = params.get('url');
        const returnUrl = params.get('return')
        const amount =params.get('amount')
        const payableAmount = params.get('payableAmount')
        const product = params.get('product')
        console.log("orderId",url);

        return (
            <div className="app-container">
                <div className="main-grid checkout-container">
                    <div className="col-left">
                        <div className="mobile-payment">
                            <div className="total-amount">
                                <p className="paid-text">Total amount to be paid</p>
                             <p className="grand-total text-primary">{payableAmount}</p>
                                <span className="amount-payable text-small">{`amount payable in USD ${amount}`}</span>
                            </div>
                            <p className="alert">
                                <img src={require(`../../assests/images/svg/alert.svg`)} alt="Information Alert" />
                                Payment timeout after 3 minutes
                            </p>
                            <div className="payment-block">
                                <div className="card">
                                    <div className="payment-process">
                                        <div className="qr-code">
                                            <img src={qrCode} alt="How to pay with KBZPay" />
                                        </div>
                                        <div className="make-payment">
                                            <p className="orderno-text text-small">Order Number</p>
                                            <p className="orderno text-primary">{orderId}</p>
                                            <div className="loading">
                                                <p className="loading-img"></p>
                                                <span>please make your payment in KBZPay app</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="info-text text-small">
                                        Please make sure your KBZpay account has enough balance.
                                    </p>
                                </div>
                                <div className="how-to-pay">
                                    <div>
                                        <img src={require(`../../assests/images/svg/kbz-pay.svg`)} alt="How to pay with KBZPay" />
                                    </div>
                                    <div className="steps">
                                        <p className="text-primary">How to pay with KBZPay</p>
                                        <ul className="text-small">
                                            <li>1 - Open App</li>
                                            <li>2 - Press Scan and Pay</li>
                                            <li>3 - Scan our QR code to make payment</li>
                                            <li>4 - Press Continue Payment button on Oway Payment page</li>
                                        </ul>
                                    </div>
                                </div>
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
const mapStateToProps =state=>({
    makePaymentReducer : state.makePaymentReducer,
})
const mapDispatchToProps = dispatch => ({
    requestKbzPayStart :(payload) => dispatch(requestKbzPayStart(payload)),
    updatePaymentStatus :(payload)=> dispatch(updatePaymentStatus(payload)),
    
})

export default connect(mapStateToProps,mapDispatchToProps)(KBZPay);