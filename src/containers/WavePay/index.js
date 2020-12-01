import React, { Component, useDebugValue } from 'react';
import '../../styles/checkout.scss';
import {connect} from 'react-redux';
import  history from '../../utils/history';
import {updatePaymentStatus,requestWavePayStart} from '../../actions/makePaymentAction'
class WavePay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: false,
            phoneNumber : '',
            showMobile: true,
            showHowToPay: false,
            startTimer : false,
            seconds: parseInt(props.startTimeInSeconds, 10) || 0
        }
        this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
        this.tick = this.tick.bind(this);
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
    
      componentDidMount() {
        if(this.state.startTimer){
            this.interval = setInterval(() => this.tick(), 10000);
        }  
        
      }
    componentDidUpdate(prevProps, prevState) {
        const {makePaymentReducer,location} = this.props;
        const params = new URLSearchParams(location.search);
        const orderId = params.get('id');
        if(prevProps.makePaymentReducer.startedWavePay!== this.props.makePaymentReducer.startedWavePay && makePaymentReducer.startedWavePay){
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
            if(makePaymentReducer.payResponse.productId == 2){
                this.props.history.push(`/flights/search/checkout/thank-you?orderId=${orderId}&message=Fail`)
            }
            if(makePaymentReducer.payResponse.productId == 9){
                this.props.history.push(`/bus/search/checkout/thank-you?orderId=${orderId}&message=Fail`)
            }


        }
        if(makePaymentReducer.payResponse.paymentStatus && makePaymentReducer.payResponse.paymentStatus !== "fail"){
            if(makePaymentReducer.payResponse.productId == 2){
            this.props.history.push(`/flights/search/checkout/thank-you?orderId=${orderId}&message=Success&&paymentType="mobile"`)
            }
            if(makePaymentReducer.payResponse.productId == 9){
                this.props.history.push(`/bus/search/checkout/thank-you?orderId=${orderId}&message=Success&&paymentType="mobile"`)
                }

        }
    }
    makePayment() {
        let {location} = this.props;
        const search = location.search;
        const params = new URLSearchParams(search);
        const orderId = params.get('id');
        const amount =params.get('usdAmount')
        const payableAmount = params.get('mmkAmount')
        const payload = {
            orderId: Number(orderId),
            mmkAmount : Number(payableAmount),
            usdAmount : Number(amount),
            phoneNumber : this.state.phoneNumber,
            "channelType":  3,
            "apiKey" : "GBVL5EKDe7JL7wQuaY9NgAY3xQH9IYuZZCkSilPMmwI="
        }
        this.props.requestWavePayStart(payload);
    }
 
    handleChangePhoneNumber(e){
        this.setState({
            phoneNumber : e.target.value
        })
    }
    render() {
        let {location} = this.props;
        const search = location.search;
        const params = new URLSearchParams(search);
        const orderId = params.get('id');
        const channelType = params.get('channelType');
        const url = params.get('url');
        const amount =params.get('usdAmount')
        const payableAmount = params.get('mmkAmount')
        const returnUrl = params.get('return')
        const product = params.get('product')
        console.log("Current::",this.state.seconds);
        return (
            <div className="app-container">
                <div className="main-grid checkout-container">
                    <div className="col-left">
                        <div className="mobile-payment">
                            <div className="total-amount">
                                <p className="paid-text">Total amount to be paid</p>
                                <p className="grand-total text-primary">MMK {payableAmount}</p>
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
                                            <img src={require(`../../assests/images/svg/wave-pay.svg`)} alt="How to pay with WavePay" />
                                        </div>
                                        <div className="make-payment">
                                            <p className="orderno-text text-small">Order Number</p>
                                            <p className="orderno text-primary">{orderId}</p>
                                            {
                                                this.state.showMobile ?
                                                <div className="mobile-number">
                                                    <span className="enter-no">Enter your phone number linked with WavePay Account</span>
                                                    <div className="mobile-column">
                                                        <div className="card">
                                                            <label>Mobile number</label>
                                                            <div className="divide-column">
                                                                <span className="dial-code">+95</span>
                                                                <input type="text" placeholder="9777931353" onChange={this.handleChangePhoneNumber}/>
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
                                                    <span>please make your payment in WavePay app</span>
                                                </div>
                                                :
                                                null
                                            }
                                            
                                        </div>
                                    </div>
                                    <p className="info-text text-small">
                                        Please make sure your WavePay account has enough balance.
                                    </p>
                                </div>
                                {
                                    this.state.showHowToPay ?
                                    <div className="how-to-pay one-wave-pay">
                                        <p className="text-primary title">How to pay with Wavepay App</p>
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
                                                <img src={require(`../../assests/images/svg/how-to-wavepay-01.svg`)} alt="How to pay with WavePay" />
                                            </div>
                                            <div>
                                                <img src={require(`../../assests/images/svg/how-to-wavepay-02.svg`)} alt="How to pay with WavePay" />
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

const mapStateToProps =state=>({
    makePaymentReducer : state.makePaymentReducer,
})
const mapDispatchToProps = dispatch => ({
     updatePaymentStatus : (payload)=> dispatch(updatePaymentStatus(payload)),
     requestWavePayStart : (payload)=> dispatch(requestWavePayStart(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(WavePay);