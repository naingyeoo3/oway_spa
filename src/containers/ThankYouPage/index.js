import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';
import {
    Modal,
    Input,
    Tooltip
} from 'antd';
import TourCheckoutItem from '../TourCheckoutPage/TourCheckoutItem';

import {
    updatePayStatus,
    updatePayStatusRes,
    updateOrderRes,
    confirmOrderRes
} from '../../actions/tourCheckoutActions';

import {
    receivePayUpdate,
    receiveHotelOrderUpdate,
    receiveHotelOrderConfirm,
} from '../../actions/hotelCheckoutAction'
import {
    PAYMENT_API_KEY,
    API_KEY,
    API_URL,
    TOUR_API_KEY,
    DEV_TEST_AI,
    CHECKOUT_API_KEY,
    CONFIRM_API_KEY
} from '../../constants/credentials';
import TravellerInfo from './TravellerInfo';
import CancellationPolicy from './CancellationPolicy';
import ContactInfo from './ContactInfo';
import AdditionalInfo from './AdditionalInfo';
import HotelCheckoutItem from '../../containers/HotelPassengerInfo/HotelCheckoutItem';

import TravellerDetail from '../../components/TravellerDetail';
import { updatePaymentStatus } from '../../actions/makePaymentAction';
import { updateOrder, confirmOrder, loadOrderFromLocalStorage, confirmOrderWithEmail } from '../../actions/orderAction';
import { requestCompleteBooking } from '../../actions/bookingAction';
import './style.scss';
import changeDurationFormat from '../../utils/changeDurationFormat';
import ReactHtmlParser from 'react-html-parser'
import '../../styles/thank-you.scss';
import CheckoutProcessBar from '../../components/CheckoutProcessBar';
import { from } from 'rxjs';
import moment from 'moment';
const dateFormat = 'ddd, DD MMM YYYY';
const routeDateFormat = 'DD MMM YYYY';

class ThankYouPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showEmail: false,
            emailAddress: '',
            isPaymentProcessing: false,
            loadedBooking: false,
            loadedOrder: false
        }
        this.handlEmailModalCancel = this.handlEmailModalCancel.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleEmailModalOkay = this.handleEmailModalOkay.bind(this);
        this.handleEmailButton = this.handleEmailButton.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        const { orderReducer, bookingReducer } = this.props;
        if (this.isFlightPayment()) {
            if (prevProps.makePaymentReducer.isPaymentUpdated !== this.props.makePaymentReducer.isPaymentUpdated && this.props.isPaymentUpdated) {
                const payload = {
                    channelType: 3,
                    orderId: orderReducer.orderId,
                    flightOrderId: orderReducer.flightOrderId,
                    emailFlag: 0,
                    apiKey: "YL/7P6Cp3y043q6pciOhPOUvnR+npllo2QqpHE+Bc7o=",
                    flight_version: "4"
                }
                this.props.confirmOrder(payload);
            }
            if (prevProps.orderReducer.orderConfirmed !== orderReducer.orderConfirmed && orderReducer.orderConfirmed) {
                let { adultPrice, childPrice, infantPrice, taxAmount } = orderReducer.flightInfo.rates.inventory;
                let amount = adultPrice + childPrice + infantPrice + taxAmount;
                const payload = {
                    refCode: orderReducer.flightInfo.referCode.toString(),
                    source: orderReducer.flightInfo.source.toString(),
                    apiKey: "Kpp69BQ8ihwwLsPwSEexjqKAbf+fSSbQ\/qlz9Nuy\/O0=",
                    flight_version: 4,
                    currencyCode: orderReducer.flightInfo.rates.inventory.currencyCode,
                    amount: amount,
                }
                this.props.requestCompleteBooking(payload)
            }
            if (prevProps.bookingReducer.bookingCompleted !== bookingReducer.bookingCompleted && bookingReducer.bookingCompleted) {
                const payload = {
                    "channelType": 3,
                    "orderId": orderReducer.orderId,
                    "flightOrderId": orderReducer.flightOrderId,
                    "productId": 2,
                    "paymentCategoryId": orderReducer.paymentCategoryId,
                    "paymentSubCategoryId": orderReducer.paymentSubCategoryId,
                    "paymentStatus": orderReducer.paymentStatus,
                    "orderStatus": ["Completed"],
                    "paydollarPRN": null,
                    "pnrNUmber": bookingReducer.bookingRefCode,
                    "flight_version": 4,
                    "apiKey": "YL/7P6Cp3y043q6pciOhPOUvnR+npllo2QqpHE+Bc7o="
                }
                this.props.updateOrder(payload)
            }
            if (prevProps.orderReducer.orderUpdated !== orderReducer.orderUpdated && orderReducer.orderUpdated) {
                const payload = {
                    channelType: 3,
                    orderId: orderReducer.orderId,
                    flightOrderId: orderReducer.flightOrderId,
                    emailFlag: 1,
                    apiKey: "YL/7P6Cp3y043q6pciOhPOUvnR+npllo2QqpHE+Bc7o=",
                    flight_version: "4"
                }
                this.props.confirmOrderWithEmail(payload)
            }
        }
    }
    isHotelPayment = () => this.props.location.pathname.includes("hotel/search");

    componentDidMount() {
        if (this.isFlightPayment()) {
            if (localStorage.getItem('bookingReducer') && !this.state.loadedBooking) {
                this.props.loadBookingFromLocalStorage(localStorage.getItem('bookingReducer'))
                if (this.state.loadedBooking == false) {
                    this.setState({
                        loadedBooking: true
                    })
                }
            }
            if (localStorage.getItem('orderReducer') && !this.state.loadedOrder) {
                this.props.loadOrderFromLocalStorage(localStorage.getItem('orderReducer'))
                if (this.state.loadedOrder == false) {
                    this.setState({
                        loadedOrder: true
                    })
                }
            }
            const { location } = this.props;
            const params = new URLSearchParams(location.search);
            const orderId = params.get('orderId');
            const message = params.get('message');
            const paymentType = params.get("paymentType")
            const payload = {
                "apiKey": "GBVL5EKDe7JL7wQuaY9NgAY3xQH9IYuZZCkSilPMmwI=",
                "channelType": 3,
                "orderId": Number(orderId)
            }
            if (message != "Fail" && paymentType != "mobile") {
                this.props.updatePaymentStatus(payload)
            }
        }
        if (this.isTourPayment()) {
            this.loadTourPayment();
        }
        if (this.isHotelPayment()) {
            this.loadHotelPayment();
        }

    }
    handleEmailButton() {
        this.setState({
            showEmail: true
        })
    }
    getOrderId() {
        const { location } = this.props;
        var tour_payment = [];
        location.search.split('&').map((item) => tour_payment.push(item.split('=')))
        return tour_payment[0][1];
    }

    handleEmailModalOkay() {
        this.setState({
            showEmail: false
        })
    }
    handlEmailModalCancel() {
        this.setState({
            showEmail: false
        })
    }
    handleChangeEmail(e) {
        this.setState({
            emailAddress: e.target.value
        })
    }
    loadHotelPayment() {
        const {
            checkoutReducer,
            makePaymentReducer,
            location
        } = this.props;
        const params = new URLSearchParams(location.search);
        const id = params.get('orderId');
        this.setState({ isPaymentProcessing: true })
        fetch(`${API_URL}/pay/updatepaystatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "orderId": Number(id),
                "channelType": 1,
                "apiKey": PAYMENT_API_KEY
            }),
        })
            .then(res => res.json())
            .then(json => {
                if (json.code == 200) {
                    this.props.receivePayUpdate(json);
                    fetch(`https://devtestai.owaytrip.com/order/v2/hotel/update`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "channelType": 1,
                            "orderId": json.payResponse.orderId,//58273,
                            "productId": json.payResponse.productId,//1,
                            "paymentCategoryId": json.payResponse.paymentCategoryId,
                            "paymentSubCategoryId": json.payResponse.paymentSubCategoryId,
                            "paymentStatus": json.payResponse.paymentStatus,
                            "orderStatus": json.payResponse.orderStatus,
                            "paydollarPRN": null,
                            "apiKey": CONFIRM_API_KEY
                        })
                    })
                        .then(res => res.json())
                        .then(json => {
                            this.props.receiveHotelOrderUpdate();
                            if (json.code == 200) {
                                fetch(`${DEV_TEST_AI}/order/v2/hotel/confirm`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        "channelType": 1,
                                        "orderId": Number(id),
                                        "emailFlag": 1,
                                        "apiKey": CONFIRM_API_KEY
                                    })
                                })
                                    .then(res => res.json())
                                    .then(json => {
                                        if (json.code == 200) {
                                            this.props.receiveHotelOrderConfirm(json)
                                            this.setState({ isPaymentProcessing: false })
                                        }
                                    })
                            }
                        })
                }
            })

    }
    loadTourPayment() {
        const {
            checkoutReducer,
            makePaymentReducer,
            location
        } = this.props;
        const params = new URLSearchParams(location.search);
        const id = params.get('orderId');
        if (this.isTourPayment()) {
            if (this.state.isPaymentProcessing == false) {
                this.setState({ isPaymentProcessing: true })
            }
            fetch(`${API_URL}/pay/updatepaystatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "orderId": Number(id),
                    "channelType": 1,
                    "apiKey": PAYMENT_API_KEY
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.props.updatePayStatusRes(data)
                        if (data.payResponse.paymentStatus == 'success') {
                            fetch(`${API_URL}/destination/v2/booking/update`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    "confirmationNumber": checkoutReducer.booking.create.data.confirmationNumber,
                                    "orderStatus": "success",
                                    "apiKey": TOUR_API_KEY
                                })
                            })
                                .then((response) => response.json())
                                .then(data => {
                                    this.props.updateOrderRes(data)
                                })
                        }
                        fetch(`${DEV_TEST_AI}/order/v2/destination/update`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "channelType": 1,
                                "orderId": data.payResponse.orderId, //66285
                                "productId": 7,
                                "paymentCategoryId": data.payResponse.paymentCategoryId,//1,
                                "paymentSubCategoryId": data.payResponse.paymentSubCategoryId,//1,
                                "paymentStatus": data.payResponse.paymentStatus,//"success",
                                "orderStatus": data.payResponse.orderStatus,//"Pending",
                                "pnrNumber": data.payResponse.pnrNumber ? data.payResponse.pnrNumber : null,
                                "paydollarPRN": data.payResponse.paydollarPRN,
                                "apiKey": CHECKOUT_API_KEY
                            })
                        })
                            .then(res => res.json())
                            .then(json => {
                                this.props.updateOrderRes(json)
                                if (json.code == 200) {
                                    fetch(`${DEV_TEST_AI}/order/v2/destination/confirm`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            "channelType": 1,
                                            "orderId": data.payResponse.orderId,
                                            "emailFlag": 1,
                                            "apiKey": CHECKOUT_API_KEY
                                        })
                                    })
                                        .then(res => res.json())
                                        .then(json => {
                                            this.props.confirmOrderRes(json)
                                            if (json.code == 200) {
                                                this.setState({ isPaymentProcessing: false })
                                            }
                                        })
                                }
                            })

                    }
                })

        }
    }
    renderEmailModal() {
        return <Modal
            title="Send Itinerary"
            visible={this.state.showEmail}
            onOk={this.handleEmailModalOkay}
            onCancel={this.handlEmailModalCancel}
            footer={[
                <button key="submit" type="button" onClick={this.handleOk} className="btn btn-orange btn-block">
                    Send
                </button>
            ]}
            wrapClassName="payment-modal send-email-modal"
        >
            <p className="info">We will sent your booking details to following email address.</p>
            <p className="alert">Note: You can only sent to one email at a time.</p>
            <div className="form-container">
                <div className="card form-card">
                    <div className="form-group">
                        <div className="input-card">
                            <label>Email address</label>
                            <Input value={this.state.emailAddress} placeholder="yourname@gmail.com" onChange={this.handleChangeEmail} />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    }
    checkPaymentType() {
        const { orderReducer } = this.props;
        let paymentSubCategoryId = orderReducer.paymentSubCategoryId;
        switch (paymentSubCategoryId) {
            case 1: return "Visa";
            case 2: return "Master";
            case 6: return "Union Pay";
            case 7: return "MPU";
            case 19: return "Cash On Delivery";
            case 20: return "Pay At Shop";
            case 25: return "Oway Wallet";
            case 40: return "KBZ Pay";
            case 41: return "Wave Pay";
            case 42: return "One Pay";
            case 43: return "JCB";
        }
    }
    handleOpenPrinter() {
        window.print();
    }
    renderTourPaymentSuccess() {
        const { isPaymentProcessing } = this.state;
        const { orderReducer } = this.props;
        return (
            <div>
                {
                    isPaymentProcessing ?
                        <div> loading ............................</div>
                        :
                        orderReducer.tour.message != "Fail" ?
                            <div className="payment-status-box">
                                <h3 className="heading heading-dark">
                                    Thank you for your booking.
                        </h3>
                                <img src={require(`../../assests/images/svg/booking-success.svg`)} alt="Thank you for your booking" />
                                <div className="card order-detail">
                                    <div className="payment-success">
                                        <p className="info">
                                            Your order has been received. Once your payment is succeeded, you will get booking<br></br>
                                    confirmation via email or phone.
                                </p>
                                        <p className="payment-type">
                                            Payment type - {this.checkPaymentType()}
                                        </p>
                                        <p className="booking-id">
                                            Your Booking ID : <span>{orderReducer.tourOrderConfirm && orderReducer.tourOrderConfirm.orderId}</span>
                                        </p>
                                    </div>
                                    {/* <p className="big-points">
                                        <span>30 Points</span> have been added into you AirAsia Account.
                                    </p> */}
                                    <div className="booking-status">
                                        <p>
                                            Booking status
                                    <span>Completed</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="payment-status-box">
                                <h3 className="heading heading-dark">
                                    Payment was unsuccessful!
                        </h3>
                                <img src={require(`../../assests/images/svg/booking-unsuccessful.svg`)} alt="Payment was unsuccessful!" />
                                <div className="card order-detail">
                                    <div className="payment-unsuccess">
                                        Your credit card was not charged. Please try again later.<br></br>
                                If this doesn't work contact to our customer service at
                                <a href="tel:+9512318939" title="(+95) 1 231 8939"> (+95) 1 231 8939 </a>
                                or<br></br>
                                        <a href="mailto:support@owaytrip.com" title="support@owaytrip.com">support@owaytrip.com</a>
                                    </div>
                                </div>
                            </div>
                }
            </div>
        )
    }
    isTourPayment() {
        const { location } = this.props;
        if (location.pathname.includes('tour')) {
            return true;
        }
    }
    isBusPayment() {
        const { location } = this.props;
        if (location.pathname.includes('bus')) {
            return true;
        }
    }
    isFlightPayment() {
        const { location } = this.props;
        if (location.pathname.includes('flights')) {
            console.log("True");
            return true;
        }
    }
    travellerDetailPricing() {
        const { checkoutReducer } = this.props;
        return (
            <TravellerDetail
                rates={checkoutReducer.allCheckout && checkoutReducer.allCheckout.rates.deal}
                currencyCode={checkoutReducer.allCheckout && checkoutReducer.allCheckout.rates.deal.currencyCode}
                adult={checkoutReducer.checkout.adult}
                child={checkoutReducer.checkout.child}
                infant={checkoutReducer.checkout.infant}
                isTour={true} />
        )
    }
    renderTourDtailItem() {
        const { tourListing, checkoutReducer } = this.props;
        return (
            <div>
                <h3 className="heading heading-md heading-primary thank-you-heading">
                    {tourListing.detail.data.title}
                </h3>
                <p className="trip-info">
                    {tourListing.detail.data.travelDate} | {Number(checkoutReducer.checkout.adult) + Number(checkoutReducer.checkout.child) + Number(checkoutReducer.checkout.infant)} Traveler(s)
                </p>
                <div className="listing-container tour-checkout-container">
                    {
                        tourListing.detail.data != null &&
                        <TourCheckoutItem item={tourListing.detail.data && tourListing.detail.data} />
                    }
                </div>
            </div>
        )
    }
    renderTravellerInfo() {
        const { tourTravellerInfo } = this.props;
        return (
            <TravellerInfo travellers={tourTravellerInfo.traveller} />
        )
    }
    renderAdditionalInfo() {
        const { tourTravellerInfo } = this.props;
        return (
            null
            // <AdditionalInfo addInfo={tourTravellerInfo}/>
        )
    }
    renderBusContactInfo() {
        const { orderReducer } = this.props;
        const contactInfo = orderReducer.contactInfo;
        return (
            <div className="card contact-info">
                <h3 className="heading heading-sm heading-primary thank-you-heading">
                    Contact Info
            </h3>
                <p>
                    {contactInfo.title}&nbsp;{contactInfo.firstName}&nbsp;{contactInfo.lastName}
                </p>
                <p>
                    {`+ ${contactInfo.phoneCode} ${contactInfo.phoneNumber}`}
                </p>
                <p>
                    {contactInfo.email}
                </p>
            </div>
        )
    }
    renderContactInfo() {
        const { tourTravellerInfo } = this.props;
        return (
            <ContactInfo contactInfo={tourTravellerInfo.contactInfo} />
        )
    }
    renderCalcellationPolicy() {
        const { tourListing } = this.props;
        return (
            <CancellationPolicy detail={tourListing.detail && tourListing.detail.data} />
        )
    }
    gobackToHome() {
        const {
            match,
            location
        } = this.props;
        if (location.pathname.includes("hotel/search")) {
            history.push('/hotels')
        }
        if (this.isTourPayment()) {
            history.push('/tours')
        }
        if(this.isFlightPayment()){
            history.push('/flights');
        }
        if(this.isBusPayment()){
            history.push('/buses')
        }

    }
    renderDoneBtn() {
        return (
            <button className="btn btn-orange btn-block" onClick={() => this.gobackToHome()}> Done </button>
        )
    }
    renderEmailPrintBtn() {
        return (
            <div className="button-group">
                <button onClick={this.handleEmailButton}>
                    <img src={require(`../../assests/images/svg/booking-email.svg`)} alt="Send Email" />
                    Send Email
                </button>
                <button onClick={this.handleOpenPrinter}>
                    <img src={require(`../../assests/images/svg/print.svg`)} alt="Print" />
                    Print
                </button>
                {this.state.showEmail && this.renderEmailModal()}
            </div>
        )
    }
    renderEmailModal() {
        return (
            <Modal
                title="Send Itinerary"
                visible={this.state.showEmail}
                onOk={this.handleEmailModalOkay}
                onCancel={this.handlEmailModalCancel}
                footer={[
                    <button key="submit" type="button" onClick={this.handleOk} className="btn btn-orange btn-block">
                        Send
                    </button>
                ]}
                wrapClassName="payment-modal send-email-modal">
                <p className="info">We will sent your booking details to following email address.</p>
                <p className="alert">Note: You can only sent to one email at a time.</p>
                <div className="form-container">
                    <div className="card form-card">
                        <div className="form-group">
                            <div className="input-card">
                                <label>Email address</label>
                                <Input value={this.state.emailAddress} placeholder="yourname@gmail.com" onChange={this.handleChangeEmail} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
    renderFlightPassengerInfo(adults, childs, infants) {
        return (
            <div>
                <h3 className="heading heading-sm heading-primary">Passenger info:</h3>
                <div className="passenger-info">
                    <div className="title">
                        <div>Name</div>
                        <div>Passenger</div>
                        <div>D.O.B</div>
                        <div>Passport No.</div>
                        <div>Place of issue</div>
                        <div>Date of Enquiry</div>
                        <div>PNR</div>
                    </div>
                    {
                        adults.map((adult, index) => {
                            return (
                                <div key={index} className="info">
                                    <div>{`${adult.title} ${adult.firstName} ${adult.lastName}`}</div>
                                    <div>Adult</div>
                                    <div>{adult.dateOfBirth}</div>
                                    <div>{adult.passportNumber}</div>
                                    <div>{adult.countryOfPassport}</div>
                                    <div>{adult.passportExpiredDate}</div>
                                    <div>123456</div>
                                </div>
                            )
                        })
                    }
                    {
                        childs.map((child, index) => {
                            return (
                                <div key={index} className="info">
                                    <div>{`${child.title} ${child.firstName} ${child.lastName}`}</div>
                                    <div>Adult</div>
                                    <div>{child.dateOfBirth}</div>
                                    <div>{child.passportNumber}</div>
                                    <div>{child.countryOfPassport}</div>
                                    <div>{child.passportExpiredDate}</div>
                                    <div>123456</div>
                                </div>
                            )
                        })
                    }
                    {
                        infants.map((infant, index) => {
                            return (
                                <div key={index} className="info">
                                    <div>{`${infant, index.title} ${infant, index.firstName} ${infant, index.lastName}`}</div>
                                    <div>Adult</div>
                                    <div>{infant, index.dateOfBirth}</div>
                                    <div>{infant, index.passportNumber}</div>
                                    <div>{infant, index.countryOfPassport}</div>
                                    <div>{infant, index.passportExpiredDate}</div>
                                    <div>123456</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    renderFlightRoute(outward, adults, childs, infants) {
        return (
            <div className="card booking-detail-grid">
                <h3 className="heading heading-md heading-primary thank-you-heading">
                    {`Departure - ${outward.route[0].departure.airportName} to ${outward.route[outward.route.length - 1].arrival.airportName}`}
                </h3>
                <p className="trip-info">
                    {`Duration : ${changeDurationFormat(outward.totalDuration)} | ${outward.route.length - 1} stop(s) | Economy Class | Baggage : 20kg`}
                </p>
                <div className="route-info">
                    {
                        outward.route.map((route, index) => {
                            return (
                                <div>
                                    <div className="title">
                                        <div>Departure</div>
                                        <div>Arrival</div>
                                        <div className="col-flight">Flight</div>
                                    </div>
                                    <div className="info" key={index}>
                                        <div>
                                            <p className="main-name">{route.departure.airportName}</p>
                                            <p className="code">{route.departure.airportCode}</p>
                                            <p className="date">{`${route.departure.departureDate},${(route.departure.departureTime == 'Via') ? '' : route.departure.departureTime}`}</p>
                                        </div>
                                        <div>
                                            <p className="main-name">{route.arrival.airportName}</p>
                                            <p className="code">{route.arrival.airportCode}</p>
                                            <p className="date">{`${route.arrival.arrivalDate},${(route.arrival.arrivalTime == 'Via') ? '' : route.arrival.arrivalTime}`}</p>
                                        </div>
                                        <div className="col-flight">
                                            <img src={route.carrier.airlineLogo} alt={route.carrier.airlineName} />
                                            <div>
                                                <p className="main-name">
                                                    {route.carrier.airlineName}
                                                </p>
                                                <p className="code">{route.carrier.airlineCode} {route.carrier.flightNumber}</p>
                                                <p className="duration">{changeDurationFormat(outward.totalDuration)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    this.renderFlightPassengerInfo(adults, childs, infants)
                }
                <h3 className="heading heading-sm heading-primary">Cancellation Policy</h3>
                <p>
                    {ReactHtmlParser(outward.rule.others)}
                </p>
            </div>
        )
    }
    renderFlightPaymentSuccess(orderId, message) {
        return (
            <div>
                {



                    (message != "Fail") ?
                        <div className="payment-status-box">
                            <h3 className="heading heading-dark">
                                Thank you for your booking.
                                            </h3>
                            <img src={require(`../../assests/images/svg/booking-success.svg`)} alt="Thank you for your booking" />
                            <div className="card order-detail">
                                <div className="payment-success">
                                    <p className="info">
                                        Your order has been received. Once your payment is succeeded, you will get booking <br></br>
                                                        confirmation via email or phone.
                                                    </p>
                                    <p className="payment-type">
                                        Payment type - {this.checkPaymentType()}
                                    </p>
                                    <p className="booking-id">
                                        Your Booking ID : <span>{orderId}</span>
                                    </p>
                                </div>
                                {/* <p className="big-points">
                                    <span>30 Points</span> have been added into you AirAsia Account.
                                </p> */}
                                <div className="booking-status">
                                    <p>
                                        Booking status
                                                        <span>Completed</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="payment-status-box">
                            <h3 className="heading heading-dark">
                                Payment was unsuccessful!
                                            </h3>
                            <img src={require(`../../assests/images/svg/booking-unsuccessful.svg`)} alt="Payment was unsuccessful!" />
                            <div className="card order-detail">
                                <div className="payment-unsuccess">
                                    Your credit card was not charged. Please try again later.<br></br>
                                                    If this doesn't work contact to our customer service at
                                                    <a href="tel:+9512318939" title="(+95) 1 231 8939"> (+95) 1 231 8939 </a>
                                                    or<br></br>
                                    <a href="mailto:support@owaytrip.com" title="support@owaytrip.com">support@owaytrip.com</a>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
    renderFLightContactInfo(contactInfo) {
        return (
            <div className="card contact-info">
                <h3 className="heading heading-sm heading-primary thank-you-heading">
                    Contact Info
        </h3>
                <p>
                    {contactInfo.title}&nbsp;{contactInfo.firstName}&nbsp;{contactInfo.lastName}
                </p>
                <p>
                    {`+ ${contactInfo.phoneCode} ${contactInfo.phoneNumber}`}
                </p>
                <p>
                    {contactInfo.email}
                </p>
            </div>
        )
    }
    renderHotelPaymentSuccess() {
        const { isPaymentProcessing } = this.state;
        const { orderReducer } = this.props;
        return (
            <div>
                {
                    isPaymentProcessing ?
                        <div> loading ............................</div>
                        :
                        orderReducer.hotelOrderConfirm && orderReducer.hotelOrderConfirm.message != "Fail" ?
                            <div className="payment-status-box">
                                <h3 className="heading heading-dark">
                                    Thank you for your booking.
                        </h3>
                                <img src={require(`../../assests/images/svg/booking-success.svg`)} alt="Thank you for your booking" />
                                <div className="card order-detail">
                                    <div className="payment-success">
                                        <p className="info">
                                            Your order has been received. Once your payment is succeeded, you will get booking<br></br>
                                    confirmation via email or phone.
                                </p>
                                        <p className="payment-type">
                                            Payment type - {this.checkPaymentType()}
                                        </p>
                                        <p className="booking-id">
                                            Your Booking ID : <span>{orderReducer.hotelOrderConfirm && orderReducer.hotelOrderConfirm.orderId}</span>
                                        </p>
                                    </div>
                                    {/* <p className="big-points">
                                        <span>30 Points</span> have been added into you AirAsia Account.
                                    </p> */}
                                    <div className="booking-status">
                                        <p>
                                            Booking status
                                    <span>Completed</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="payment-status-box">
                                <h3 className="heading heading-dark">
                                    Payment was unsuccessful!
                        </h3>
                                <img src={require(`../../assests/images/svg/booking-unsuccessful.svg`)} alt="Payment was unsuccessful!" />
                                <div className="card order-detail">
                                    <div className="payment-unsuccess">
                                        Your credit card was not charged. Please try again later.<br></br>
                                If this doesn't work contact to our customer service at
                                <a href="tel:+9512318939" title="(+95) 1 231 8939"> (+95) 1 231 8939 </a>
                                or<br></br>
                                        <a href="mailto:support@owaytrip.com" title="support@owaytrip.com">support@owaytrip.com</a>
                                    </div>
                                </div>
                            </div>
                }
            </div>
        )
    }
    renderBusPaymentSucess(orderId, message) {
        const { orderReducer } = this.props;

        return (
            <div>
                {
                    // isPaymentProcessing ? 
                    // <div> loading ............................</div>
                    // :                    
                    message != "Fail" ?
                        <div className="payment-status-box">
                            <h3 className="heading heading-dark">
                                Thank you for your booking.
                        </h3>
                            <img src={require(`../../assests/images/svg/booking-success.svg`)} alt="Thank you for your booking" />
                            <div className="card order-detail">
                                <div className="payment-success">
                                    <p className="info">
                                        Your order has been received. Once your payment is succeeded, you will get booking<br></br>
                                    confirmation via email or phone.
                                </p>
                                    <p className="payment-type">
                                        Payment type - {this.checkPaymentType()}
                                    </p>
                                    <p className="booking-id">
                                        Your Booking ID : <span>{orderId}</span>
                                    </p>
                                </div>
                                {/* <p className="big-points">
                                    <span>30 Points</span> have been added into you AirAsia Account.
                                </p> */}
                                <div className="booking-status">
                                    <p>
                                        Booking status
                                    <span>Completed</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="payment-status-box">
                            <h3 className="heading heading-dark">
                                Payment was unsuccessful!
                        </h3>
                            <img src={require(`../../assests/images/svg/booking-unsuccessful.svg`)} alt="Payment was unsuccessful!" />
                            <div className="card order-detail">
                                <div className="payment-unsuccess">
                                    Your credit card was not charged. Please try again later.<br></br>
                                If this doesn't work contact to our customer service at
                                <a href="tel:+9512318939" title="(+95) 1 231 8939"> (+95) 1 231 8939 </a>
                                or<br></br>
                                    <a href="mailto:support@owaytrip.com" title="support@owaytrip.com">support@owaytrip.com</a>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
    renderFlightAlert() {
        return (
            <div className="alert">
                <img src={require(`../../assests/images/svg/alert.svg`)} alt="Information Alert" />
        This flight availability and price is subject to change. Our team will contact you
        within 24 hours to either confirm the ticket or offer  and alternative flight. Prices may vary.
            </div>
        )
    }
    renderHotelAlert() {
        return (
            <div className="alert">
                <img src={require(`../../assests/images/svg/alert.svg`)} alt="Information Alert" />
                Once your payment is succeeded, you will receive booking confirmation via email or phone.
            </div>
        )
    }
    renderBusAlert() {
        return (
            <div className="alert">
                <img src={require(`../../assests/images/svg/alert.svg`)} alt="Information Alert" />
                Once your payment is succeeded, you will receive booking confirmation via email or phone.
            </div>
        )
    }
    renderBusPassenger() {
        const { orderReducer } = this.props;
        let busInfo = orderReducer.busInfo;
        let travelerInfo = busInfo.travelerInfo;
        let adults = travelerInfo.adult;
        let childs = travelerInfo.child;
        return (
            <div>
                <h3 className="heading heading-sm heading-primary">Passenger info:</h3>
                <div className="passenger-info">
                    <div className="title">
                        <div>Name</div>
                        <div>Passenger</div>
                        <div>D.O.B</div>
                        <div>Passport No.</div>
                        <div>Place of issue</div>
                        <div>Date of Enquiry</div>
                        <div>PNR</div>
                    </div>
                    {
                        adults.map((adult, index) => {
                            return (
                                <div key={index} className="info">
                                    <div>{`${adult.title} ${adult.firstName} ${adult.lastName}`}</div>
                                    <div>Adult</div>
                                    <div>{adult.dateOfBirth}</div>
                                    <div>{adult.passportNumber}</div>
                                    <div>{adult.countryOfPassport}</div>
                                    <div>{adult.passportExpiredDate}</div>
                                    <div>123456</div>
                                </div>
                            )
                        })
                    }
                    {
                        childs.map((child, index) => {
                            return (
                                <div key={index} className="info">
                                    <div>{`${child.title} ${child.firstName} ${child.lastName}`}</div>
                                    <div>Adult</div>
                                    <div>{child.dateOfBirth}</div>
                                    <div>{child.passportNumber}</div>
                                    <div>{child.countryOfPassport}</div>
                                    <div>{child.passportExpiredDate}</div>
                                    <div>123456</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    renderBusRouteInfo(outward) {
        const { orderReducer } = this.props;
        let busInfo = orderReducer.busInfo;
        // let outward = busInfo.busInfo[0];
        return (
            <div>
                <h3 className="heading heading-md heading-primary thank-you-heading">
                    {`Departure - ${outward.origin} to ${outward.destination}`}
                </h3>
                <p className="trip-info">
                    {`Duration : ${outward.duration} | ${outward.busSeatType} | Date : ${moment(outward.departureDate).format(routeDateFormat)}`}
                </p>
                <div className="route-info">
                    <div>
                        <div className="title">
                            <div>Departure</div>
                            <div>Arrival</div>
                            <div className="col-flight">Bus</div>
                        </div>
                        <div className="info">
                            <div>
                                <p className="main-name">{outward.origin}</p>
                                <p className="code">{outward.busBoardingPointName}</p>
                                <p className="date">{outward.departureTime}</p>
                            </div>
                            <div>
                                <p className="main-name">{outward.destination}</p>
                                <p className="code">{outward.busDroppingPointName}</p>
                                <p className="date">
                                    {outward.arrivalTime}
                                </p>
                            </div>
                            <div className="col-flight">
                                <img src={outward.busLogo} alt={outward.busName} />
                                <div>
                                    <p className="main-name">
                                        {outward.busName}
                                    </p>
                                    <p className="code">{outward.busType}</p>
                                    <p className="duration">{outward.busSeatType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderBusTravelerDetail() {
        const { navbarOptions,checkoutReducer } = this.props;
        let adult =  checkoutReducer.checkout.adult ;
        let child = checkoutReducer.checkout.child ;
        let infant = 0;
        let currencyCode = navbarOptions.currency.name;
        return (
            <TravellerDetail
            rates={(currencyCode == 'USD')?checkoutReducer.checkout.rates.deal.bus : checkoutReducer.checkout.rates.inventory.bus}
            adult={adult} child={child} infant={infant}
            currencyCode={currencyCode}
            isBus={true} />
        )
    }
    renderHotel() {
        const { hotelsListing } = this.props;
        return (
            <HotelCheckoutItem detail={hotelsListing.detail} />
        )
    }
    renderStayPeriod() {
        const { hotelsListing, hotelCheckoutReducer } = this.props;
        return (
            <div className="stay-period">
                <div>
                    <p>Check-in</p>
                    <p className="date">{hotelCheckoutReducer.checkout && moment(hotelCheckoutReducer.checkout.checkIn).format(dateFormat)}</p>
                    <p>after {hotelsListing.detail.reservationHours.checkin.from}</p>
                </div>
                <div>
                    <p>Check-out</p>
                    <p className="date">{hotelCheckoutReducer.checkout && moment(hotelCheckoutReducer.checkout.checkOut).format(dateFormat)}</p>
                    <p>before {hotelsListing.detail.reservationHours.checkout.from}</p>
                </div>
                <div>
                    <p>Stay period</p>
                    <p className="date">{hotelCheckoutReducer.checkout && hotelCheckoutReducer.checkout.numberOfNights} Night(s)</p>
                </div>
            </div>
        )
    }
    renderHotelRoom() {
        const { hotelCheckoutReducer, hotelReservation } = this.props;
        if (hotelCheckoutReducer.checkout && hotelCheckoutReducer.checkout.code == 200 && hotelReservation.roomsList.length > 0) {
            return (
                <div>
                    {
                        hotelReservation.roomsList.map((item, index) => (
                            <div key={index} className="hotel-room">
                                <div className="col-image">
                                    <img src={item.images.length > 0 ? item.images[0].url : ''} />
                                </div>
                                <div className="col-info">
                                    <h3 className="heading heading-md heading-gray">
                                        {item.rates[0].booked.numberOfRooms} &times; {item.type}
                                        {
                                            item.rates[0].booked.numberOfExtrabed == 0 ?
                                                null
                                                :
                                                <p>{item.rates[0].booked.numberOfExtrabed} &times; Extra bed</p>
                                        }
                                    </h3>
                                    <p className="title">what's included</p>
                                    <div className="services">
                                        {
                                            item.rates[0].services.map((service, index) => {
                                                return <span key={index}>{service}<span className="comma">&#44; &nbsp;</span></span>
                                            })
                                        }
                                    </div>
                                    {
                                        item.rates[0].cancellationPolicy.title ?
                                            <p className="cancellation-policy">
                                                <Tooltip
                                                    placement="top"
                                                    title={item.rates[0].cancellationPolicy.title}
                                                    overlayClassName="cancellation-policy">
                                                    Cancellation Policy
                                                <img src={require(`../../assests/images/svg/icon-info-white.svg`)} alt="Cancellation Policy" />
                                                </Tooltip>
                                            </p>
                                            :
                                            null
                                    }
                                </div>
                                <div className="col-button">
                                    <button onClick={() => history.push(`/hotels/search/${this.props.match.params.slug}/checkout`)}>
                                        <img src={require(`../../assests/images/svg/edit.svg`)} alt="Change Room" />
                                        change room
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }

    }
    renderHotelContactInfo() {
        const { orderReducer } = this.props;
        if (orderReducer.hotelOrderConfirm) {
            return (
                (
                    <div className="card contact-info">
                        <h3 className="heading heading-sm heading-primary thank-you-heading">
                            Lead Guest Info:
                        </h3>
                        <p>{orderReducer.hotelOrderConfirm.firstName}{" "}{orderReducer.hotelOrderConfirm.lastName}</p>
                        <p>{orderReducer.hotelOrderConfirm.contactNumber}</p>
                        <p>{orderReducer.hotelOrderConfirm.contactEmail}</p>
                    </div>
                )
            )
        }

    }
    isTourPayment = () => this.props.location.pathname.includes('tour/search')
    isFlightPayment = () => this.props.location.pathname.includes('flights/search')
    render() {
        const { flightsListing, orderReducer, travellerInfo, paymentReducer, location, hotelCheckoutReducer } = this.props;
        let contactInfo = orderReducer.contactInfo;
        let flightInfo = orderReducer.flightInfo.flightInfo;
        let busInfo = orderReducer.busInfo;
        let outward = flightsListing.verifiedFlight.outward;
        let returnFlight = flightsListing.verifiedFlight.return;
        let adults = [];
        let childs = [];
        let infants = [];
        if (this.isFlightPayment()) {
            adults = orderReducer.flightInfo.travelerInfo.adult;
            childs = orderReducer.flightInfo.travelerInfo.child;
            infants = orderReducer.flightInfo.travelerInfo.infant;
        }

        let search = location.search;
        const params = new URLSearchParams(search);
        const orderId = params.get('orderId')
        const message = params.get('message')
        return (
            <div>
                <CheckoutProcessBar isComplete={true} />
                <div className="app-container">
                    <div className="main-grid checkout-container thank-you-container">
                        <div className="col-left">
                            {
                                this.isTourPayment() ?
                                    <div>
                                        {(this.isTourPayment() && !this.state.isPaymentProcessing) ? this.renderTourPaymentSuccess() : null}
                                        <div className="card booking-detail-grid">
                                            {this.renderTourDtailItem()}
                                            {this.renderTravellerInfo()}
                                            {this.renderAdditionalInfo()}
                                        </div>
                                        {this.renderContactInfo()}
                                        {/* {this.renderCalcellationPolicy()} */}
                                        {this.renderEmailPrintBtn()}
                                        {this.renderDoneBtn()}
                                    </div>
                                    :
                                    null
                            }
                            {
                                this.isFlightPayment() ?
                                    <div>
                                        {
                                            this.renderFlightPaymentSuccess(orderId, message)
                                        }
                                        {
                                            this.renderFlightAlert()
                                        }
                                        {
                                            this.renderFlightRoute(outward, adults, childs, infants)
                                        }
                                        {
                                            (returnFlight) ?
                                                this.renderFlightRoute(returnFlight, adults, childs, infants)
                                                :
                                                null
                                        }
                                        {
                                            this.renderFLightContactInfo(contactInfo)
                                        }

                                        {
                                            this.renderEmailPrintBtn()
                                        }
                                        {
                                            this.renderDoneBtn()
                                        }
                                    </div>
                                    :
                                    null
                            }
                            {
                                this.isHotelPayment() ?
                                    <div>
                                        {this.renderHotelPaymentSuccess()}
                                        {this.renderHotelAlert()}
                                        <div className="listing-container hotel-checkout-container">
                                            <div className="card">
                                                {this.renderHotel()}
                                                {this.renderStayPeriod()}
                                                {this.renderHotelRoom()}
                                            </div>
                                        </div>
                                        {this.renderHotelContactInfo()}
                                        {this.renderEmailPrintBtn()}
                                        {this.renderDoneBtn()}
                                    </div>
                                    :
                                    null
                            }
                            {
                                this.isBusPayment() ?
                                    <div>
                                        {this.renderBusPaymentSucess(orderId, message)}
                                        {this.renderBusAlert()}
                                        <div className="card booking-detail-grid">
                                            {this.renderBusRouteInfo(busInfo.busInfo[0])}
                                            {this.renderBusPassenger()}
                                        </div>
                                        {
                                            (busInfo.busInfo[1]) ?
                                                <div className="card booking-detail-grid">
                                                    {this.renderBusRouteInfo(busInfo.busInfo[1])}
                                                    {this.renderBusPassenger()}
                                                </div>
                                                :
                                                null
                                        }
                                        {this.renderBusContactInfo()}
                                        {this.renderEmailPrintBtn()}
                                        {this.renderDoneBtn()}
                                    </div>
                                    : null
                            }
                        </div>
                        <div className="col-right">
                            {
                                this.isTourPayment() ?
                                    this.travellerDetailPricing()
                                    :
                                    null
                            }
                            {
                                this.isFlightPayment() ?
                                    <TravellerDetail
                                        rates={paymentReducer.rates.deal}
                                        currencyCode={paymentReducer.rates.deal.currencyCode}
                                        isFlight={true}
                                        adult={adults.length} child={childs.length} infant={infants.length} />
                                    :
                                    null
                            }
                            {
                                this.isHotelPayment() ?
                                    <div>
                                        {
                                            hotelCheckoutReducer.checkout && hotelCheckoutReducer.checkout.code == 200 ?
                                                <TravellerDetail
                                                    checkout={hotelCheckoutReducer.checkout && hotelCheckoutReducer.checkout}
                                                    isHotel={true}
                                                />
                                                :
                                                null
                                        }
                                    </div>
                                    :
                                    null
                            }
                            {
                                this.isBusPayment() ?
                                this.renderBusTravelerDetail()
                                :
                                null
                            }
                        </div>
                        {this.state.showEmail && this.renderEmailModal()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    flightsListing: state.flightsListing,
    searchComponentReducers: state.searchComponentReducers,
    navbarOptions: state.navbarOptions,
    locales: state.locales,
    paymentReducer: state.paymentReducer,
    travellerInfo: state.travellerInfo,
    contactInfoReducer: state.contactInfoReducer,
    bookingReducer: state.bookingReducer,
    orderReducer: state.orderReducer,
    makePaymentReducer: state.makePaymentReducer,
    router: state.router,
    checkoutReducer: state.checkoutReducer,
    tourListing: state.tourListing,
    tourTravellerInfo: state.tourTravellerInfo,
    hotelsListing: state.hotelsListing,
    hotelCheckoutReducer: state.hotelCheckoutReducer,
    hotelReservation: state.hotelReservation
})

const mapDispatchToProps = dispatch => ({
    updatePaymentStatus: (payload) => dispatch(updatePaymentStatus(payload)),
    loadOrderFromLocalStorage: (payload) => dispatch(loadOrderFromLocalStorage(payload)),
    loadBookingFromLocalStorage: (payload) => dispatch(loadBookingFromLocalStorage(payload)),
    requestCompleteBooking: (payload) => dispatch(requestCompleteBooking(payload)),
    updateOrder: (payload) => dispatch(updateOrder(payload)),
    confirmOrderWithEmail: (payload) => dispatch(confirmOrderWithEmail(payload)),
    updatePayStatus: (payload) => dispatch(updatePayStatus(payload)),
    confirmOrder: (payload) => dispatch(confirmOrder(payload)),
    updatePayStatusRes: (payload) => dispatch(updatePayStatusRes(payload)),
    updateOrderRes: (payload) => dispatch(updateOrderRes(payload)),
    confirmOrderRes: (payload) => dispatch(confirmOrderRes(payload)),
    receivePayUpdate: (payload) => dispatch(receivePayUpdate(payload)),
    receiveHotelOrderUpdate: (payload) => dispatch(receiveHotelOrderUpdate(payload)),
    receiveHotelOrderConfirm: (payload) => dispatch(receiveHotelOrderConfirm(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ThankYouPage);