import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';
import { Button, Input, Modal, Radio, Select, AutoComplete, message, Tooltip } from 'antd';
import { requestPaymentType } from '../../actions/paymentAction';
import { CONFIRM_API_KEY, API_URL, DEV_TEST_AI, HOTEL_ORDER_INSERT } from '../../constants/credentials';
import TravellerDetail from '../../components/TravellerDetail';
import {
    insertOrder,
    insertBusOrder
} from '../../actions/orderAction';
import {
    requestMakePayment,
    alertMsg
} from '../../actions/makePaymentAction';
import FlightListItem from '../../components/FlightListItem';
import '../../styles/payment-type.scss';
import CheckoutProcessBar from '../../components/CheckoutProcessBar';
import { DEV_URL } from '../../constants/credentials';
import { ALL_CHECKOUT_API_KEY } from '../../constants/credentials';
import moment from 'moment';
import AirasiaBigPoint from '../../components/AirasiaBigPoint';
import PromoCode from '../../components/PromoCode';
import { loadBookingFromLocalStorage } from '../../actions/bookingAction';
const dateFormat = 'DD MMM YYYY';
const dateFormatForBooking = 'YYYY-MM-DD';
const changeDateFormat = 'ddd, DD MMM YYYY';
import { payAtShop } from '../../constants/payAtShopConstants';
import { makeTourPayment } from '../../actions/tourCheckoutActions';
import { requestCountry } from '../../actions/countryAction';
import { PAYMENT_API_KEY, ORDER_API_KEY } from '../../constants/credentials';
import BusListItem from '../../components/BusListItem'
import {
    requestAllCheckout,
    createTourInsertOrder
} from '../../actions/tourCheckoutActions';
import { saveState } from '../../localStorage';
import {
    createHotelOrder,
    requestHotelOrderInsert,
    makeHotelPayment,
    receiveHotelPayment
} from '../../actions/hotelCheckoutAction';
import TourCheckoutItem from '../TourCheckoutPage/TourCheckoutItem';
import HotelCheckoutItem from '../HotelPassengerInfo/HotelCheckoutItem';
import StarRatingIcon from '../../assests/images/svg/star-rating.svg';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showPayment: '',
            showCodModal: false,
            showShopModal: false,
            selectedSubCatId: null,
            selectedCatId: null,
            showBookingDetail: false,
            promoCode: '',
            airAsiaMemberId: '',
            options: [],
            deliveryInfo: {
                phoneNumber: '',
                phoneCode: '',
                city: ''
            }
        }
        this.myForm = React.createRef();
        this.tourPaymentForm = React.createRef();
        this.handleModalOkay = this.handleModalOkay.bind(this);
        this.handleModalCancel = this.handleModalCancel.bind(this);
        this.handleOnClickPayment = this.handleOnClickPayment.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleContinueToPay = this.handleContinueToPay.bind(this);
        this.handleShowBookingDetail = this.handleShowBookingDetail.bind(this);
        this.handleBookingDetailOkay = this.handleBookingDetailOkay.bind(this);
        this.handleBookingCancel = this.handleBookingCancel.bind(this);
        this.handleOpenCod = this.handleOpenCod.bind(this);
        this.handleOpenShop = this.handleOpenShop.bind(this);
        this.handleAirAsiaBigPoint = this.handleAirAsiaBigPoint.bind(this);
        this.handlePromoCode = this.handlePromoCode.bind(this);
        this.handleCodCancel = this.handleCodCancel.bind(this);
        this.handleShopCancel = this.handleShopCancel.bind(this);
        this.handleSelectDialCode = this.handleSelectDialCode.bind(this);
        this.searchResult = this.searchResult.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCODPayment = this.handleCODPayment.bind(this);
        this.requestBusPayment = this.requestBusPayment.bind(this);
        this.busOrderInsert = this.busOrderInsert.bind(this);
    }
    handleModalOkay() {
        this.setState({
            showModal: false
        })
    }
    handleModalCancel() {
        this.setState({
            showModal: false
        })
    }
    handleSelectDialCode(value) {
        let deliveryInfo = this.state.deliveryInfo;
        deliveryInfo["phoneCode"] = value
        this.setState({
            deliveryInfo
        })
    }
    searchResult(query) {
        let countries = this.props.countryListing.countryList;
        let options = [];
        if (query.length > 1) {
            let matchedOptions = countries.filter((country) => country.name.includes(query))
            // console.log("matchedOptions", matchedOptions);
            matchedOptions.map((item) => {
                let option = <Option key={item.name} value={String(item.callingCode)}>
                    {item.name} {item.callingCode}</Option>
                options.push(option)
                if (options.length == matchedOptions.length) {
                    this.setState({
                        options: [...options]
                    })
                }
            })

            // console.log("state", this.state.options);
        }


    }
    handleSearch(value) {
        this.searchResult(value);
    }
    handleAirAsiaBigPoint(memberId) {
        this.setState({
            airAsiaMemberId: memberId
        })
        this.requestPayment({}, memberId, '')
    }

    handlePromoCode(promoCode) {
        this.setState({
            promoCode: promoCode
        })
        this.requestPayment({}, '', promoCode)
    }
    handlePayAtShop() {
        let { paymentReducer } = this.props;
        let payAtShop = paymentReducer.payAtShops;
        this.setState({
            selectedCatId: payAtShop[0].categoryId,
            selectedSubCatId: payAtShop[0].subCategoryId
        })
        this.requestPayment({ subCategoryId: payAtShop[0].subCategoryId, categoryId: payAtShop[0].categoryId })
    }
    handleRadioChange(subCategoryId, categoryId) {
        let { match } = this.props;
        this.setState({
            selectedSubCatId: subCategoryId,
            selectedCatId: categoryId
        })
        console.info(subCategoryId)
        console.info(categoryId)

        if (match.params.flightType) {
            this.requestPayment({ subCategoryId, categoryId })
        }
        if (match.params.busRouteId) {
            console.log("checkout Bus");
            this.requestBusPayment({ subCategoryId, categoryId })
        }
    }
    handleOnClickPayment(type) {
        this.setState({
            showModal: true,
            showPayment: type
        })
    }
    handleOpenCod() {
        this.setState({
            showCodModal: true
        })
    }
    handleOpenShop() {
        this.setState({
            showShopModal: true
        })
    }

    handleShowBookingDetail() {
        this.setState({
            showBookingDetail: true
        })
    }
    handleBookingDetailOkay() {
        this.setState({
            showBookingDetail: false
        })
    }
    handleBookingCancel() {
        this.setState({
            showBookingDetail: false
        })
    }
    handleCodCancel() {
        this.setState({
            showCodModal: false
        })
    }
    handleCodOkay() {
        this.setState({
            showCodModal: false
        })
    }
    handleShopCancel() {
        this.setState({
            showShopModal: false
        })
    }
    handleShopOkay() {
        this.setState({
            showShopModal: false
        })
    }
    handleCityChange(value) {
        let deliveryInfo = this.state.deliveryInfo;
        deliveryInfo["city"] = value
        this.setState({
            deliveryInfo
        })
    }

    handlePhoneNumberChange(e) {
        let deliveryInfo = this.state.deliveryInfo;
        deliveryInfo["phoneNumber"] = e.target.value
        this.setState({
            deliveryInfo
        })
    }
    handleCODPayment() {
        let { paymentReducer } = this.props;
        let cod = paymentReducer.cods;
        this.setState({
            selectedCatId: cod[0].categoryId,
            selectedSubCatId: cod[0].subCategoryId,
            showCodModal: false
        })
        if (this.isFlightPayment())
            this.requestPayment({ subCategoryId: cod[0].subCategoryId, categoryId: cod[0].categoryId })
        if (this.isBusPayment())
            this.requestBusPayment({ subCategoryId: cod[0].subCategoryId, categoryId: cod[0].categoryId })

    }
    handleContinueToPay() {
        const { match, orderReducer, paymentReducer } = this.props;
        if (match.params.hotelSlug) {
            this.createHotelOrderProcess();
        }
        if (match.params.tourId) {
            this.tourOrderInsert()
        }
        if (match.params.flightType) {
            this.flightOrderInsert()
        }
        if (match.params.busRouteId) {
            this.busOrderInsert()
        }

    }
    getRoomItems() {
        const { hotelReservation, searchComponentReducers, hotelsListing } = this.props;
        var room_items = []
        hotelReservation.roomsList.map((item) => {
            var item = {
                "accomPromotionId": item.rates[0].promotions.length > 0 ? item.rates[0].promotions[0].id : 0,
                "rateCategoryId": item.rates[0].category.id,
                "noOfRooms": item.rates[0].booked.numberOfRooms,
                "cancellationPolicySettingId": item.rates[0].cancellationPolicy.id,
                "roomTypeId": item.rates[0].id,
                "roomRateId": item.rates[0].roomId,
                "adults": searchComponentReducers.travellers.adult,
                "children": searchComponentReducers.travellers.child,
                "infants": searchComponentReducers.travellers.infact,
                "extraBed": item.rates[0].booked.numberOfExtrabed,
                "specialRequest": "it is a Notice",
                "amount": item.rates[0].deal.prices.base,
                "extrabedAmount": item.rates[0].deal.prices.extrabed,
                "discount": item.rates[0].deal.discount,
                "discountAs": item.rates[0].deal.display.discount,
                "deliveryPhoneNumber": '088788998988',
                "deliveryPhoneCode": 95,
                "deliveryCityName": "yangon",
                "deliveryBillingAddress": "",
                "accommodationId": hotelsListing.detail.id
            }
            room_items.push(item)
        })
        return room_items;
    }
    getRoomInventory() {
        const { hotelReservation } = this.props;
        var room_inventory = [];
        hotelReservation.roomsList.map((item) => {
            var data = {
                "roomTypeId": item.rates[0].id,
                "roomRateId": item.rates[0].roomId,
                "currencyCode": item.rates[0].inventory.currencyCode,
                "noOfRooms": item.rates[0].booked.numberOfRooms,
                "extraBed": item.rates[0].booked.numberOfExtrabed,
                "amount": item.rates[0].inventory.prices.base,
                "extrabedAmount": item.rates[0].inventory.prices.extrabed,
                "taxAmount": item.rates[0].inventory.taxes.base,
                "extrabedTaxAmount": item.rates[0].inventory.taxes.extrabed,
                "discount": item.rates[0].inventory.discount
            }
            room_inventory.push(data);
        })
        return room_inventory;

    }
    createHotelOrderProcess() {
        const {
            hotelCheckoutReducer,
            hotelsListing
        } = this.props;
        const payload = {
            "checkIn": hotelCheckoutReducer.checkout.checkIn,//"2019-02-15",
            "checkOut": hotelCheckoutReducer.checkout.checkOut,// "2019-02-16",
            "channelType": hotelCheckoutReducer.checkout.channelType, //8,
            "owayUserId": 51297,//44412 need to add when user feature,                
            "orderUserType": "Member",//"Guest" need to add when user feature,
            "aggrementStatus": hotelsListing.detail.owayExclusives.aggrementStatus,//1,
            "fareType": hotelCheckoutReducer.checkout.fareType,//"foreign",
            "traveler": {
                "travelerSalutation": "Mr",
                "travelerFirstName": hotelCheckoutReducer.contact.firstname,//"Ctrip",
                "travelerLastName": hotelCheckoutReducer.contact.lastname,//"Team",
                "travelerCountryCode": 95,
                "travelerPhoneNumber": hotelCheckoutReducer.contact.phone,//"0086-513-65066224",
                "travelerPassport": "",
                "travelerNationality": "",
                "travelerEmail": hotelCheckoutReducer.contact.email,//"ctriphotelreshk@ctrip.com",
                "travelerEstCheckinTime": hotelsListing.detail.reservationHours.checkin.from,//"14:30", // user selected reservation checkin checkout
                "travelerAddress": "",
                "travelerCity": ""
            },
            "additionalTravelers": [
                {
                    "travelerSalutation": "Mrs",
                    "travelerFirstName": hotelCheckoutReducer.addInfo.firstname,//"San",
                    "travelerLastName": hotelCheckoutReducer.addInfo.lastname,//"Zhang",
                    "travelerCountryCode": 95,
                    "travelerPhoneNumber": hotelCheckoutReducer.addInfo.phone,//"123456",
                    "travelerPassport": "12\/tapana(N)333333", //hotelCheckoutReducer.addInfo.passport,//"CT9876",
                    "travelerNationality": "Myanmar",//hotelCheckoutReducer.addInfo.country,//"CN",
                    "travelerEmail": null,
                    "travelerEstCheckinTime": "",
                    "travelerAddress": null,
                    "travelerCity": null
                }
            ],
            "status": "Initialized",
            "amount": hotelCheckoutReducer.checkout.rates.deal.hotel.subTotal,//44,
            "taxAmount": hotelCheckoutReducer.checkout.rates.deal.hotel.taxAmount,//6,
            "currencyCode": hotelCheckoutReducer.checkout.rates.deal.currencyCode,//"USD",
            "currencyExchangeRate": 0,
            "payment": {
                "paymentCategoryId": 5,
                "authorizePayStatus": "fail",
                "paymentSubCategoryId": 19
            },
            "grandTotal": hotelCheckoutReducer.checkout.rates.deal.hotel.total,//50,
            "items": this.getRoomItems(),
            "inventoryRates": this.getRoomInventory(),
            "apiKey": ORDER_API_KEY
        }
        fetch(`${API_URL}/hotel/v2/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(json => {
                if (json.code == 200) {
                    this.hotelOrderStore(json);
                    this.props.requestHotelOrderInsert(json);
                }
            })


    }
    hotelOrderStore(json) {
        const {
            hotelCheckoutReducer,
            searchComponentReducers,
            hotelsListing
        } = this.props;
        const payload = {
            "userTypeId": 1,
            "userId": 1,
            "channelTypeId": 1,
            "productId": 1,
            "referCode": "",
            "paymentCategoryId": 5,
            "paymentSubCategoryId": 19,
            "deliveryInfo": {
                "city": "Yangon",
                "township": "Yangon",
                "address": "Ahlone",
                "phoneCode": 95,
                "phoneNumber": "09421172247"
            },
            "mBankingInfo": {
                "phoneCode": "95",
                "phoneNumber": "9250098989"
            },
            "rates": {
                "inventory": {
                    "currencyCode": hotelCheckoutReducer.checkout.rates.inventory.currencyCode,// "USD",
                    "taxAmount": hotelCheckoutReducer.checkout.rates.inventory.hotel.taxAmount,//0,
                    "taxPercent": 0,
                    "tierAmount": 3.6937901,
                    "discountAmount": hotelCheckoutReducer.checkout.rates.inventory.hotel.discountAmount,// 0,
                    "discountPercent": hotelCheckoutReducer.checkout.rates.inventory.hotel.discountPercent,//0,
                    "paymentProcessingAmount": 0,//0,
                    "paymentProcessingFee": 0,
                    "subTotal": hotelCheckoutReducer.checkout.rates.inventory.hotel.subTotal,//23,
                    "grandTotal": hotelCheckoutReducer.checkout.rates.inventory.hotel.total//12.761541704
                },
                "deal": {
                    "currencyCode": hotelCheckoutReducer.checkout.rates.deal.currencyCode,//"USD",
                    "taxAmount": hotelCheckoutReducer.checkout.rates.deal.hotel.taxAmount,//0,
                    "taxPercent": 0,//0,
                    "tierAmount": 3.6937901,
                    "discountAmount": hotelCheckoutReducer.checkout.rates.deal.hotel.discountAmount,//0,
                    "discountPercent": hotelCheckoutReducer.checkout.rates.deal.hotel.discountPercent,//0,
                    "paymentProcessingAmount": 0,
                    "paymentProcessingFee": 0,
                    "subTotal": hotelCheckoutReducer.checkout.rates.deal.hotel.subTotal,//23,
                    "grandTotal": hotelCheckoutReducer.checkout.rates.deal.hotel.total//12.761541704
                }
            },
            "fareType": hotelCheckoutReducer.checkout.fareType,//"local",
            "travelerInfo": [{
                "salutation": "Ms",
                "firstName": hotelCheckoutReducer.addInfo.firstname,//"Shwe ",
                "lastName": hotelCheckoutReducer.addInfo.lastname,//"Yee",
                "countryCode": 95,
                "contactNumber": hotelCheckoutReducer.addInfo.phone,//"09421172247",
                "travelerType": 1,
                "nrcNumber": "12\/ALN(N)047993",//hotelCheckoutReducer.addInfo.passport,//"12\/ALN(N)047993",
                "countryOfPassport": hotelCheckoutReducer.addInfo.country,//"Myanmar",
                "passportNumber": ""
            }],
            "contactTitle": "Ms",
            "firstName": hotelCheckoutReducer.contact.firstname,//"Shwe ",
            "lastName": hotelCheckoutReducer.contact.lastname,//"Yee",
            "countryCode": 95,
            "contactNumber": hotelCheckoutReducer.contact.phone,//"09421172247",
            "contactEmail": hotelCheckoutReducer.contact.email,//"nandaraung@owaytrip.com",
            "adults": searchComponentReducers.travellers.adult,
            "children": searchComponentReducers.travellers.child,
            "apiKey": CONFIRM_API_KEY,//HOTEL_ORDER_INSERT,
            "hotelAmenity": this.getAminity(hotelsListing.detail.amenities),
            "hotelInfo": this.getHotelInfo(),
            "promoInfo": [], // get promo promotion return from checkout add this
            "mtmOrderId": json.data.orderId
        }
        fetch(`https://devtestai.owaytrip.com/order/v2/hotel/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(json => {
                if (json.code == 200) {
                    this.props.createHotelOrder(json);
                    this.makePaymentHotel(json);
                }
            })
    }
    makePaymentHotel(payload) {
        const data = {
            "version": "v2",
            "topUpFlag": "true",
            "orderId": payload.orderId,//3685,
            "paymentCategoryId": 5,
            "paymentSubCategoryId": 19,
            "userId": payload.userId,
            "userTypeId": payload.userTypeId,
            "currencyCode": payload.currencyCode,
            "usdAmount": payload.currencyCode == "USD" ? payload.grandTotal : payload.exchangeTotalAmount[0].grandTotal, //108.00,
            "mmkAmount": payload.currencyCode == "MMK" ? payload.grandTotal : payload.exchangeTotalAmount[0].grandTotal, //120000.00,
            "sgdAmount": payload.exchangeTotalAmount[1].grandTotal, //123.00,            
            "productId": payload.productId,
            "contactName": payload.firstname + payload.lastName,
            "contactEmail": payload.contactEmail,
            "source": payload.source,
            "channelType": 3,
            "frontUrl": "http://localhost:3000/hotel/search/checkout/thank-you",
            "backUrl": "http://localhost:3000/checkout/paymentResponse",
            "apiKey": PAYMENT_API_KEY
        }
        // this.props.makeHotelPayment(data);
        fetch(`${API_URL}/pay/makepayment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(data => {
                let formStart = data.search('<form');
                let formEnd = data.search('form>');
                let paymentForm = data.substring(formStart - 1, formEnd + 5)
                paymentForm = paymentForm.replace('method="POST"', 'method="POST" target="_blank"');
                this.props.receiveHotelPayment(paymentForm)
            })
    }

    getHotelInfo() {
        const { hotelCheckoutReducer, hotelsListing, hotelReservation } = this.props;
        var info = [];
        hotelReservation.roomsList.map((item) => {
            const data = {
                "checkIn": hotelCheckoutReducer.checkout.checkIn,//"2018-06-14",
                "checkInTime": "",//"14:00",
                "checkOut": hotelCheckoutReducer.checkout.checkOut, //"2018-06-15",
                "checkOutTime": "",//"12:00",
                "accommodationName": hotelsListing.detail.name,//"Nature Land Hotel 1",
                "noOfGuest": hotelCheckoutReducer.checkout.adults,//2,
                "noOfBookedRoom": item.rates[0].booked.numberOfRooms,//1,
                "roomTypeName": item.type,//"Standard Twin",
                "extraBed": item.rates[0].booked.numberOfExtrabed,//0,
                "specialRequest": "",
                "hotelPrimaryImage": hotelsListing.detail.images[0].url,//"1510135755244.jpg",
                "roomPrimaryImage": item.images[0].url,//"1510140615397.jpg",
                "hotelAddress": hotelsListing.detail.location.address,//"No. 29, Quarter 6, Tharyarkone Street, Kalaw, Myanmar.",
                "source": hotelCheckoutReducer.checkout.source,//"OWAYDB",
                "aggrementStatus": hotelsListing.detail.owayExclusives.aggrementStatus,//"0",
                "starRating": hotelsListing.detail.ratings.stars,//2,
                "estimateCheckInTime": "Normal Check-in",
                "hotelCityName": hotelsListing.detail.location.cityName,//"Kalaw",
                "category": "Standard Rate",
                "markupDiscount": 0, // promotion[] == empty => rates.deal.discount
                "inventory": {
                    "amount": item.rates[0].inventory.prices.base,//500,
                    "extraBedAmount": item.rates[0].inventory.prices.extrabed, //10,
                    "extraBedTaxAmount": item.rates[0].inventory.taxes.extrabed,//2,
                    "taxAmount": item.rates[0].inventory.taxes.base,//0,
                    "taxPercent": parseInt(item.rates[0].inventory.display.tax),
                    "tierAmount": 0,//3.6937901,
                    "discountAmount": item.rates[0].inventory.discount,//0,
                    "discountPercent": parseInt(item.rates[0].inventory.display.discount),//0,
                    "paymentProcessingAmount": 0,
                    "paymentProcessingFee": 0

                },
                "deal": {
                    "amount": item.rates[0].inventory.prices.base,//500,
                    "extraBedAmount": item.rates[0].inventory.prices.extrabed,//10,
                    "extraBedTaxAmount": item.rates[0].inventory.taxes.extrabed,//2,
                    "taxAmount": item.rates[0].inventory.taxes.base,//0,
                    "taxPercent": parseInt(item.rates[0].inventory.display.tax),//0,
                    "tierAmount": 0,//3.6937901,
                    "discountAmount": item.rates[0].inventory.discount,//0,
                    "discountPercent": parseInt(item.rates[0].inventory.display.discount),//0,
                    "paymentProcessingAmount": 0,
                    "paymentProcessingFee": 0
                },
                "cancellationPolicy": item.rates.cancellationPolicy,
                "amenityInfo": this.getAminity(item.amenities),
                "roomAnnouncement": item.rates.promotionAnnouncement
            }
            info.push(data);
        })
        return info;
    }

    getAminity(list) {
        var amt_arr = []
        list.map(item => {
            const data = {
                "amenityName": item.name,
                "amenityIcon": item.icon
            }
            amt_arr.push(data)
        })
        return amt_arr;
    }
    tourOrderInsert() {
        const {
            paymentReducer,
            checkoutReducer,
            tourListing,
            searchComponentReducers
        } = this.props;
        const departureDate = moment(searchComponentReducers.fromDate.date).format('YYYY-MM-DD');
        var city_array = [];
        tourListing.detail.data.cities.map((city) => {
            city_array.push(city.name);
        })

        if (checkoutReducer.allCheckout == null) {
            return;
        }
        if (checkoutReducer.checkout == null) {
            return;
        }

        const payload = {
            "channelType": 1,
            "productId": 7,
            "userTypeId": 1,
            "userId": 2,
            "paymentCategoryId": 5, //paymentReducer.selectedPayment.categoryId
            "paymentSubCategoryId": 19, //paymentReducer.selectedPayment.subCategoryId
            "tourType": "Tour",
            "fareType": checkoutReducer.checkout.fareType,
            "source": checkoutReducer.checkout.source, //"OWAYDB"
            "pnrNumber": null, // "1234567891234567"
            "rates": {
                "inventory": checkoutReducer.allCheckout.rates.inventory,
                "deal": checkoutReducer.allCheckout.rates.deal,
                "payable": checkoutReducer.allCheckout.rates.deal
            },
            "deliveryInfo": {
                "city": "Yangon",
                "township": "Lanmadaw",
                "address": "No(80), Minn Ye Kyaw Swar Road",
                "phoneCode": "95",
                "phoneNumber": "091234567890"
            }, // cash on deliver
            "destinationInfo": {
                "imagePath": tourListing.detail.data.images[0].path, // "https://devtestserver.owaytrip.com/data/tour/thumbnail-800x450/1481532215940.jpg", 
                "activityCode": tourListing.detail.data.code, // "892938"
                "departureDate": departureDate,//tourListing.detail.data.travelDate, // "2018-12-11"
                "cities": city_array, //["Yangon","Bago"],
                "title": tourListing.detail.data.title,//"Bago - (Full Day Tour)",
                "tripType": tourListing.detail.data.type, // "inbound"
                "duration": tourListing.detail.data.duration, //3
                "cancellationPolicy": tourListing.detail.data.policies.cancellation, //"To Know: Minimum 2 persons.\r\nTransportation: Private luxury transportation: vehicle based upon size of tour group\r\nWhat to Bring: Towel, Sunblock, Hat, Sunglasses, Slippers, Drinking Water\r\nWhat to Wear: Please dress for the weather conditions on that given day. Long pants or skirts are suitable as our tour includes visiting pagodas.\r\nOther Rules: "
                "itemsRemember": tourListing.detail.data.conditions.itemsToBring, // "What to Wear: Please dress for the weather conditions on that given day. Long pants or skirts are suitable as the clients. \r\n What to Bring: Towel, Sunblock, Hat, Sunglasses, Slippers, Drinking water"
                "inclusion": tourListing.detail.data.conditions.inclusion,// "Private air-conditioned car\r\n- English speaking station guide\r\n- Entrance fees for mentioned place",
                "exclusion": tourListing.detail.data.conditions.exclusion,//"Hotel Accommodation\r\n- Other visit NOT mentioned in the program\r\n- Meals\r\n- Personal Expenses & Tips\r\n- Porter charges\r\n- Travel Insurance in Myanmar",
                "childPolicy": tourListing.detail.data.policies.child, //"-60% of our Published rates for 4 to 10 Year old\r\n- Free for under 4 Year Old.",
                "shortDescription": tourListing.detail.data.description.detail, //"Hotel Accommodation\r\n- Other visit NOT mentioned in the program\r\n- Meals\r\n- Personal Expenses & Tips\r\n- Porter charges\r\n- Travel Insurance in Myanmar",
                "hasFlight": tourListing.detail.data.features.flight, //false,
                "hasAccommodation": tourListing.detail.data.features.accommodation, //false,
                "hasTransportation": tourListing.detail.data.features.transportation, //false,
                "hasMeal": tourListing.detail.data.features.meal, //true,
                "hasTourGuide": tourListing.detail.data.features.tourGuide,//true,
                "hasEntranceFee": tourListing.detail.data.features.entranceFee, //true,
                "additionalInfo": tourListing.detail.data.additionalInfo, //"{\"entrance\":\"Entrance 3\",\"pickupPoint\":\"Test\"}",
                "travelTime": tourListing.detail.data.timeslots[0]//"14:00 - 18:00"
            },
            "contactInfo": {
                "title": "Mr",
                "firstName": "Nay",
                "lastName": "Aung",
                "phoneCode": "95",
                "phoneNumber": "09789456123",
                "email": "lwinmyothu@owaytrip.com",
                "pickUpPoint": null,
                "arrivalDate": null,
                "stayHotel": null
            },
            "travelerInfo": {
                "adult": [
                    {
                        "title": "Mr",
                        "firstName": "Nay",
                        "lastName": "Aung",
                        "dateOfBirth": "1978-10-10",
                        "nationality": "Myanmar",
                        "passportNumber": "MM123456",
                        "passportExpiredDate": "2020-09-20",
                        "weight": null,
                        "height": null,
                        "additionalInfo": "{\"guestAge\": \"45\",\"gender\": \"Male\"}"
                    },
                    {
                        "title": "Mrs",
                        "firstName": "Khine",
                        "lastName": "Aung",
                        "dateOfBirth": "1978-10-10",
                        "nationality": "Myanmar",
                        "passportNumber": "MM123456",
                        "passportExpiredDate": "2020-09-20",
                        "weight": null,
                        "height": null,
                        "additionalInfo": "{\"guestAge\": \"67\",\"gender\": \"Female\"}"
                    }
                ],
                "child": [],
                "infant": []
            },
            "apiKey": CONFIRM_API_KEY
        }
        this.props.createTourInsertOrder(payload)
    }
    busOrderInsert() {
        let { paymentReducer, searchComponentReducers, busListing, bookingReducer, checkoutReducer, travellerInfo, contactInfoReducer } = this.props;
        const tripType = searchComponentReducers.searchTab;
        let selectedBusRoute = busListing.selectedBusRoute;
        let selectedBusReturn = busListing.selectedReturn;
        let paymentMethodDetailInfo = paymentReducer.selectedPayment;
        let departureDate = searchComponentReducers.fromDate.date;
        let origin = searchComponentReducers.from.fromCityTitle;
        let destination = searchComponentReducers.to.toCityTitle;

        let payload = {
            "channelTypeId": 1,
            "productId": 9,
            "userTypeId": 1,
            "userId": 1,
            "paymentCategoryId": paymentMethodDetailInfo.selectedCatId,
            "paymentSubCategoryId": paymentMethodDetailInfo.selectedSubCatId,
            "fareType": (searchComponentReducers.nationType == "f") ? "foreign" : "local",
            "source": checkoutReducer.checkout.source,
            "tripType": tripType,
            "bookingNumber": bookingReducer.busInfo.data.bookingNumber,
            "rates": paymentReducer.rates,
            "promoInfo": paymentReducer.promoInfo,
            "contactInfo": contactInfoReducer.contactInfo,
            "travelerInfo": {
                adult: travellerInfo.adult,
                child: travellerInfo.child
            },
            busInfo: bookingReducer.busInfo.bookingPayload.busInfo,
            "apiKey": "YL/7P6Cp3y043q6pciOhPOUvnR+npllo2QqpHE+Bc7o="

        }
        if (Object.keys(paymentMethodDetailInfo).length !== 0 && paymentMethodDetailInfo.constructor === Object) {
            payload = {
                ...payload, paymentCategoryId: paymentMethodDetailInfo.categoryId,
                paymentSubCategoryId: paymentMethodDetailInfo.subCategoryId,
            }
            if (paymentMethodDetailInfo.categoryId == 5 && paymentMethodDetailInfo.subCategoryId == 19) {
                payload = {
                    ...payload, deliveryInfo: {
                        "city": this.state.deliveryInfo.city ? this.state.deliveryInfo.city : 'Yangon',
                        "phoneCode": 95,//this.state.deliveryInfo.phoneCode,
                        "phoneNumber": this.state.deliveryInfo.phoneNumber,
                        "address": "Yangon,Tamwe"//default address
                    },
                }
            }
        }

        this.props.insertBusOrder(payload);

    }
    flightOrderInsert() {
        let {
            paymentReducer,
            searchComponentReducers,
            flightsListing,
            bookingReducer,
            travellerInfo,
            contactInfoReducer
        } = this.props;
        let verifiedFlight = flightsListing.verifiedFlight;
        let paymentMethodDetailInfo = paymentReducer.selectedPayment;
        let outward = [];
        let returnFlight = [];
        console.log("booking Ref Code", bookingReducer.bookingRefCode)
        verifiedFlight.outward.route.map((route) => {
            const flightRoute = {
                departureAirportCode: route.departure.airportCode,
                departureAirportLocation: route.departure.airportName,
                arrivalAirportCode: route.arrival.airportCode,
                arrivalAirportLocation: route.arrival.airportName,
                departureDate: route.departure.departureDate,
                departureTime: route.departure.departureTime,
                arrivalDate: route.arrival.arrivalDate,
                arrivalTime: route.arrival.arrivalTime,
                airlineCode: route.carrier.airlineCode,
                airlineName: route.carrier.airlineName,
                flightNumber: route.carrier.flightNumber,
                flightIndicator: null,
                duration: route.duration,
                class: route.class,
                ticketIssueDate: null,
                cancellationPolicy: "Non-refundable",
                pnrNumber: bookingReducer.bookingRefCode ? bookingReducer.bookingRefCode[0].toString() : ''
            }
            outward.push(flightRoute)
        })
        if(verifiedFlight.return){
            verifiedFlight.return.route.map((route) => {
                const flightRoute = {
                    departureAirportCode: route.departure.airportCode,
                    departureAirportLocation: route.departure.airportName,
                    arrivalAirportCode: route.arrival.airportCode,
                    arrivalAirportLocation: route.arrival.airportName,
                    departureDate: route.departure.departureDate,
                    departureTime: route.departure.departureTime,
                    arrivalDate: route.arrival.arrivalDate,
                    arrivalTime: route.arrival.arrivalTime,
                    airlineCode: route.carrier.airlineCode,
                    airlineName: route.carrier.airlineName,
                    flightNumber: route.carrier.flightNumber,
                    flightIndicator: null,
                    duration: route.duration,
                    class: route.class,
                    ticketIssueDate: null,
                    cancellationPolicy: "Non-refundable",
                    pnrNumber: bookingReducer.bookingRefCode ? bookingReducer.bookingRefCode[1].toString() : ''
                }
                returnFlight.push(flightRoute)
            })
        }
        
        console.log("paymentMethod", paymentMethodDetailInfo);
        console.log("inserting Order");
        let payload = {
            channelType: 1,
            productId: 2,
            userTypeId: 1,
            source: verifiedFlight.source,
            referCode: bookingReducer.refCode,
            userId: 1,
            fareType: (searchComponentReducers.nationType == "f") ? "foreign" : "local",
            tripType: 2,
            flightType: 1,
            totalDuration: verifiedFlight.outward.totalDuration,
            rates: paymentReducer.rates,
            promoInfo: paymentReducer.promoInfo,
            contactInfo: contactInfoReducer.contactInfo,
            flightInfo: {
                outward: outward,
                return: returnFlight
            },
            travelerInfo: {
                adult: travellerInfo.adult,
                child: travellerInfo.child,
                infant: travellerInfo.infant
            },
            "apiKey": "YL/7P6Cp3y043q6pciOhPOUvnR+npllo2QqpHE+Bc7o=",
            "api_response_data": {
                bookingRefCode: bookingReducer.bookingRefCode,
                source: bookingReducer.source,
                refCode: bookingReducer.refCode,
                rates: bookingReducer.rates
            },
            "flight_version": 4
        }
        if (paymentMethodDetailInfo == undefined) {
            this.props.alertMsg();
            message.info('Please select what your payment');
        }
        if (Object.keys(paymentMethodDetailInfo).length !== 0 && paymentMethodDetailInfo.constructor === Object) {
            payload = {
                ...payload, paymentCategoryId: paymentMethodDetailInfo.categoryId,
                paymentSubCategoryId: paymentMethodDetailInfo.subCategoryId,
            }
            if (paymentMethodDetailInfo.categoryId == 5 && paymentMethodDetailInfo.subCategoryId == 19) {
                payload = {
                    ...payload, deliveryInfo: {
                        "city": this.state.deliveryInfo.city ? this.state.deliveryInfo.city : 'Yangon',
                        "phoneCode": 95,//this.state.deliveryInfo.phoneCode,
                        "phoneNumber": this.state.deliveryInfo.phoneNumber,
                        "address": "Yangon,Tamwe"//default address
                    },
                }
            }
        }
        this.props.insertOrder(payload)
    }
    renderBookingDetail() {
        let {
            flightsListing,
            tourListing,
            busListing,
            hotelsListing,
            hotelCheckoutReducer,
            hotelReservation
        } = this.props;
        let verifiedFlight = flightsListing.verifiedFlight;
        let selectedBusRoute = busListing.selectedBusRoute;
        let selectedBusReturn = busListing.selectedReturn;
        return <Modal title="Booking Details"
            visible={this.state.showBookingDetail}
            onOk={this.handleBookingDetailOkay}
            onCancel={this.handleBookingCancel}
            footer={null}
            wrapClassName="booking-details-modal"
            width="60%"
        >
            <div>
                {
                    this.isFlightPayment() &&
                    <div>
                        {
                            (verifiedFlight.outward.referKey) ?
                                <div className="listing-container-01 checkout-listing">
                                    <span className="tag">Depart</span>
                                    <FlightListItem
                                        key={verifiedFlight.outward.referKey}
                                        checkedBtoC={flightsListing.isBtoC}
                                        outward={verifiedFlight.outward}
                                        isConfirmed={true}
                                    />
                                </div>
                                :
                                <div></div>
                        }
                        {
                            (verifiedFlight.return) ?
                                <div className="listing-container-01 checkout-listing">
                                    <span className="tag">Return</span>
                                    <FlightListItem
                                        key={verifiedFlight.outward.referKey}
                                        checkedBtoC={flightsListing.isBtoC}
                                        outward={verifiedFlight.return}
                                        isConfirmed={true}
                                    />
                                </div>
                                :
                                <div></div>
                        }
                    </div>
                }
                {
                    this.isBusPayment() && 
                    <div>
                       {
                           selectedBusRoute.busRouteId ?
                           <div className="listing-container-01 checkout-listing">
                                    <span className="tag">Depart</span>
                           <BusListItem
                                    key={selectedBusReturn.busRouteId}
                                    busRoute={selectedBusReturn} 
                                    isConfirmed={true}
                                />
                            </div>    
                            :
                            null    
                       }
                       {
                           selectedBusReturn.busRouteId ?
                           <div className="listing-container-01 checkout-listing">
                                    <span className="tag">Return</span>
                           <BusListItem
                                    key={selectedBusRoute.busRouteId}
                                    busRoute={selectedBusRoute} 
                                    isConfirmed={true}
                                />
                            </div>    
                            :
                            null  
                       }
                    </div>
                }
                {
                    this.isTourPayment() &&
                    <div className="listing-container tour-checkout-container">
                        {
                            tourListing.detail.data != null &&
                            <TourCheckoutItem item={tourListing.detail.data && tourListing.detail.data} isPayment={true} />
                        }
                    </div>
                }
                {
                    this.isHotelPayment() &&
                    <div className="listing-container hotel-checkout-container">
                        <div className="card">
                            <HotelCheckoutItem detail={hotelsListing.detail && hotelsListing.detail} />
                            <div className="stay-period">
                                <div>
                                    <p>Check-in</p>
                                    <p className="date">{hotelCheckoutReducer.checkout && moment(hotelCheckoutReducer.checkout.checkIn).format(changeDateFormat)}</p>
                                    <p>after {hotelsListing.detail.reservationHours.checkin.from}</p>
                                </div>
                                <div>
                                    <p>Check-out</p>
                                    <p className="date">{hotelCheckoutReducer.checkout && moment(hotelCheckoutReducer.checkout.checkOut).format(changeDateFormat)}</p>
                                    <p>before {hotelsListing.detail.reservationHours.checkout.from}</p>
                                </div>
                                <div>
                                    <p>Stay period</p>
                                    <p className="date">{hotelCheckoutReducer.checkout && hotelCheckoutReducer.checkout.numberOfNights} Night(s)</p>
                                </div>
                            </div>
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
                                                            return <span>{service}<span className="comma">&#44; &nbsp;</span></span>
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
                                                            <img src={require(`../../assests/images/svg/icon-info-white.svg`)} alt="Cancellation Policy"/>
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
                        </div>
                    </div>
                }
            </div>
        </Modal>
    }
    renderCODDetail() {
        return <Modal
            title="Cash on delivery "
            visible={this.state.showCodModal}
            onOk={this.handleCodOkay}
            onCancel={this.handleCodCancel}
            footer={null}
            wrapClassName="payment-modal cod-modal"
        >
            <p className="info">
                Our team will contact to you within <span>2 hrs - 24 hrs</span> for the payment. <br></br>We will collect the payment through bank transfer.
                    </p>
            <p className="remark">
                Note: This ticket is not confirmed until the payment is received. Subject to availability.
                    </p>
            <h3 className="heading heading-sm heading-dark">Contact Info</h3>
            <div className="form-container">
                <div className="card form-card">
                    <div className="form-group">
                        <div className="card input-card select-card">
                            <label>City to deliver</label>
                            <Select defaultValue={"Yangon"} onChange={this.handleCityChange} dropdownClassName="form-select">
                                <Select.Option value="Yangon">Yangon</Select.Option>
                                <Select.Option value="Mandalay">Mandalay</Select.Option>
                                <Select.Option value="Naypyitaw">Naypyitaw</Select.Option>
                            </Select>
                        </div>
                        <div className="card input-card select-card">
                            <label>Mobile number</label>
                            <div className="two-column">
                                <AutoComplete
                                    dataSource={this.state.options}
                                    onSelect={this.handleSelectDialCode}
                                    onSearch={this.handleSearch}
                                    placeholder="95"
                                    defaultValue="95"
                                    optionLabelProp="value"
                                    dropdownClassName="form-select dialcode-select"
                                />
                                <Input name="mobile-no" value={this.state.deliveryInfo.phoneNumber} onChange={this.handlePhoneNumberChange} placeholder="123456" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-orange btn-block" onClick={this.handleCODPayment}>Save</button>
        </Modal>
    }
    renderShopDetail() {
        return <Modal
            title="Official Payment Partners"
            visible={this.state.showShopModal}
            onOk={this.handleShopOkay}
            onCancel={this.handleShopCancel}
            footer={null}
            wrapClassName="payment-modal shop-modal"
        >
            <p className="info">
                Payment must be completed within <span>24 hours</span>.<br></br>
                        Pay at our payment partner shops listed below.
                    </p>
            <div className="shop-block">
                {
                    payAtShop.map((value, index) => (
                        <div className="shop" key={index}>
                            <img src={require(`../../assests/images/pay-at-shop/${value.image}`)} alt={value.name} />
                            <p>{value.name}</p>
                        </div>
                    ))
                }

            </div>
            <p className="powered-by">
                Powered by
                        <img src={require(`../../assests/images/svg/123-service.svg`)} alt="Powered by" />
            </p>
        </Modal>
    }
    renderFlightBookingDetail() {

    }
    renderPaymentDetail() {
        let { paymentReducer } = this.props;
        let paymentTypes = paymentReducer[this.state.showPayment];
        return <Modal
            title="Choose Payment Type"
            visible={this.state.showModal}
            onOk={this.handleModalOkay}
            onCancel={this.handleModalCancel}
            footer={null}
            wrapClassName="payment-modal"
        >
            <p className="info">
                Payment must be completed within<span> 3 minutes</span>.
            </p>
            {
                paymentTypes.map((type) => {
                    return <div className="payment-item" key={type.subCategoryId}>
                        <Radio
                            name={"selectedPyament"}
                            value={type.name}
                            onChange={() => this.handleRadioChange(type.subCategoryId, type.categoryId)}
                            checked={this.state.selectedSubCatId == type.subCategoryId}>
                            <div className="payment-desc">
                                <span className="payment-name">{type.name}</span>
                                {
                                    type.promoCode == null ?
                                        <span></span>
                                        :
                                        <span className="payment-promo">{type.promoCode}</span>
                                }
                                <p>{`${type.paymentProcessingFee}% transaction fees will apply`}</p>
                            </div>
                            <div className="payment-img">
                                <img src={type.imagePath} alt={type.name} />
                            </div>
                        </Radio>
                    </div>
                })
            }
        </Modal>
    }
    componentDidMount() {
        const { match } = this.props;
        if (localStorage.getItem('bookingReducer')) {
            this.props.loadBookingFromLocalStorage(localStorage.getItem('bookingReducer'))
        }

        // if(match.params.tourId){
        //     this.requestTourPayment();
        // }

        console.log("Payment Document in CDM", this.myForm);
        console.info(moment(this.props.searchComponentReducers.fromDate.date).format('YYYY-MM-DD'))
        if (match.params.tourId) {
            this.requestTourPayment();
        }
        if (match.params.flightType) {
            this.requestPayment();
        }
        if (match.params.busRouteId) {
            console.log("checkout Bus");
            this.requestBusPayment()
        }
        if (match.params.hotelSlug) {
            this.requestHotelCheckout();
        }

        // this.requestPayment();
        const payload = {
            "apiKey": CONFIRM_API_KEY,
            "channelType": 1
        };
        this.props.requestCountry(payload)
        console.log("Payment Document in CDM", this.myForm);
    }
    requestHotelCheckout() {

    }
    requestTourPayment() {
        const { checkoutReducer, tourListing, match } = this.props;
        const payload = {
            "channelType": 1,
            "adult": checkoutReducer.checkout.adult,
            "child": checkoutReducer.checkout.child,
            "infant": checkoutReducer.checkout.infant,
            "rates": {
                "inventory": {
                    "currencyCode": checkoutReducer.checkout.rates.inventory.currencyCode,
                    "destination": {
                        "adultBase": checkoutReducer.checkout.rates.inventory.destination.adultBase,
                        "childBase": checkoutReducer.checkout.rates.inventory.destination.childBase,
                        "infantBase": checkoutReducer.checkout.rates.inventory.destination.infantBase,
                        "taxAmount": checkoutReducer.checkout.rates.inventory.destination.taxAmount,
                        "subTotal": checkoutReducer.checkout.rates.inventory.destination.subTotal,
                        "tierAmount": checkoutReducer.checkout.rates.inventory.destination.tierAmount,
                        "discountPercent": checkoutReducer.checkout.rates.inventory.destination.discountPercent,
                        "discountAmount": checkoutReducer.checkout.rates.inventory.destination.discountAmount,
                        "total": checkoutReducer.checkout.rates.inventory.destination.total
                    }
                },
                "deal": {
                    "currencyCode": checkoutReducer.checkout.rates.deal.currencyCode,
                    "destination": {
                        "adultBase": checkoutReducer.checkout.rates.deal.destination.adultBase,
                        "childBase": checkoutReducer.checkout.rates.deal.destination.childBase,
                        "infantBase": checkoutReducer.checkout.rates.deal.destination.infantBase,
                        "taxAmount": checkoutReducer.checkout.rates.deal.destination.taxAmount,
                        "subTotal": checkoutReducer.checkout.rates.deal.destination.subTotal,
                        "tierAmount": checkoutReducer.checkout.rates.deal.destination.tierAmount,
                        "discountPercent": checkoutReducer.checkout.rates.deal.destination.discountPercent,
                        "discountAmount": checkoutReducer.checkout.rates.deal.destination.discountAmount,
                        "total": checkoutReducer.checkout.rates.deal.destination.total
                    }
                }
            },
            "fareType": checkoutReducer.checkout.fareType,
            "userRoleId": 4,
            "productId": 7,
            "source": checkoutReducer.checkout.source,
            "apiKey": ALL_CHECKOUT_API_KEY,
            "version": "v2"
        }
        this.props.requestAllCheckout(payload);
    }
    requestBusPayment(paymentDetail = {}, memberId = '', promoCode = '') {
        let { busListing, checkoutReducer, searchComponentReducers } = this.props;
        let payload = {
            "channelType": 1,
            "adult": Number(checkoutReducer.checkout.adult),
            "child": Number(checkoutReducer.checkout.child),
            "infant": 0,
            "rates": checkoutReducer.checkout.rates,
            "source": checkoutReducer.checkout.source,
            "fareType": (searchComponentReducers.nationType == "f") ? "foreigner" : "local",
            "productId": 9,
            "userRoleId": 4,
            "apiKey": CONFIRM_API_KEY,
        }
        if (Object.keys(paymentDetail).length !== 0 && paymentDetail.constructor === Object) {
            payload = { ...payload, paymentMethodDetailInfo: paymentDetail }
        }
        if (memberId.length > 0) {
            payload = { ...payload, airAsiaMemberId: memberId }
        }
        if (promoCode.length > 0) {
            const promoInfo = {
                "departureDate": "2020-05-27",
                "tripType": 1,
                "busId": 49,
                "busName": "Shwe Mandalar Express",
                "originCityId": 5001,
                "originCity": "Yangon",
                "destinationCityId": 1913,
                "destinationCity": "Mandalay",
                "nationality": "foreigner",
                "userTypeId": 1,
                "userId": 61396,
                "promoCode": promoCode
            }
            payload = { ...payload, promoInfo }
        }

        if (this.state.selectedSubCatId && this.state.selectedCatId) {
            payload = {
                ...payload,
                paymentMethodDetailInfo: {
                    categoryId: this.state.selectedCatId,
                    subCategoryId: this.state.selectedSubCatId
                }
            }
        }
        if (this.state.airAsiaMemberId.length > 0) {
            payload = { ...payload, airAsiaMemberId: this.state.airAsiaMemberId }
        }
        if (this.state.promoCode.length > 0) {
            const promoInfo = {
                "departureDate": "2020-05-27",
                "tripType": 1,
                "busId": 49,
                "busName": "Shwe Mandalar Express",
                "originCityId": 5001,
                "originCity": "Yangon",
                "destinationCityId": 1913,
                "destinationCity": "Mandalay",
                "nationality": "foreigner",
                "userTypeId": 1,
                "userId": 61396,
                "promoCode": this.state.promoCode
            }
            payload = { ...payload, promoInfo: promoInfo }
        }
        this.props.requestPaymentType(payload)
    }

    componentDidUpdate(prevProps, prevState) {
        let {
            orderReducer,
            paymentReducer,
            flightsListing,
            makePaymentReducer,
            checkoutReducer,
            match
        } = this.props;
        let verifiedFlight = flightsListing.verifiedFlight;
        let frontUrl = '';
        if (match.params.flightType) {
            frontUrl = 'http://localhost:3000/flights/search/checkout/thank-you'
        }
        if (match.params.busRouteId) {
            frontUrl = 'http://localhost:3000/bus/search/checkout/thank-you'
        }
        if (prevProps.orderReducer.orderId !== orderReducer.orderId) {
            saveState(this.props.orderReducer);

            let payload = {
                version: "v2",
                topUpFlag: false,
                orderId: Number(orderReducer.orderId),
                paymentCategoryId: Number(orderReducer.paymentCategoryId),
                paymentSubCategoryId: Number(orderReducer.paymentSubCategoryId),
                userId: Number(orderReducer.userId),
                userTypeId: Number(orderReducer.userTypeId),
                currencyCode: orderReducer.originTotalAmount.currencyCode,
                usdAmount: orderReducer.originTotalAmount.grandTotal,
                mmkAmount: orderReducer.exchangeTotalAmount[0].grandTotal,
                sgdAmount: orderReducer.exchangeTotalAmount[1].grandTotal,
                productId: orderReducer.productId,
                contactName: `${orderReducer.contactInfo.firstName} ${orderReducer.contactInfo.secondName}`,
                contactEmail: orderReducer.contactInfo.email,
                source: orderReducer.source,
                channelType: 3,
                "requestDevice": "webBrowser",
                frontUrl: frontUrl,
                backUrl: "https://development.owaytrip.com/process_response_all_payment_api.php",
                apiKey: "GBVL5EKDe7JL7wQuaY9NgAY3xQH9IYuZZCkSilPMmwI="
            }
            console.log(payload);
            this.props.requestMakePayment(payload);
        }
        if (prevProps.makePaymentReducer.paymentStatus !== makePaymentReducer.paymentStatus) {
            //  if(makePaymentReducer.paymentStatus == "success"){
            //     this.props.history.push('/checkout/thank-you')
            //  }  
            if (makePaymentReducer.paymentStatus == "success") {
                console.log("Payment Document in Update", this.myForm.current.childNodes[1].submit());
            }
        }

        if (prevProps.orderReducer.tour != orderReducer.tour) {
            const data = {
                "version": "v2",
                "topUpFlag": "true",
                "orderId": Number(orderReducer.tour.orderId),//3685,
                "paymentCategoryId": 5, //Number(orderReducer.tour.paymentCategoryId),//,//1,
                "paymentSubCategoryId": 19,//Number(orderReducer.tour.paymentSubCategoryId),//,//1,
                "userId": Number(orderReducer.tour.userId), //null,
                "userTypeId": Number(orderReducer.tour.userTypeId),//null,
                "currencyCode": orderReducer.tour.originTotalAmount.currencyCode,//"USD",
                "usdAmount": orderReducer.tour.originTotalAmount.currencyCode == "USD" ? orderReducer.tour.originTotalAmount.grandTotal : orderReducer.tour.exchangeTotalAmount[0].currencyRate,//108.00,originTotalAmount.grandTotal
                "mmkAmount": orderReducer.tour.originTotalAmount.currencyCode == "MMK" ? orderReducer.tour.originTotalAmount.grandTotal : orderReducer.tour.exchangeTotalAmount[0].currencyRate,  //120000.00,
                "sgdAmount": orderReducer.tour.exchangeTotalAmount[1].currencyRate,//123.00, 
                "productId": orderReducer.tour.productId,
                "contactName": orderReducer.tour.contactInfo.firstName + orderReducer.tour.contactInfo.lastName,
                "contactEmail": orderReducer.tour.contactInfo.email,
                "source": orderReducer.tour.source,//"TF",
                "channelType": 3,//1,
                "frontUrl": "http://localhost:3000/tour/search/checkout/thank-you",
                "backUrl": "http://localhost:3000/checkout/paymentResponse",
                "apiKey": PAYMENT_API_KEY
            }
            this.props.makeTourPayment(data)
        }
        if (prevProps.makePaymentReducer.htmlPage) {
            this.tourPaymentForm.current.childNodes[1].submit();
        }
    }
    //redner bus traveller Detail
    renderBusTravelerDetail() {
        const { navbarOptions, checkoutReducer } = this.props;
        let adult = checkoutReducer.checkout.adult;
        let child = checkoutReducer.checkout.child;
        let infant = 0;
        let currencyCode = navbarOptions.currency.name;
        return (
            <TravellerDetail
                rates={(currencyCode == 'USD') ? checkoutReducer.checkout.rates.deal.bus : checkoutReducer.checkout.rates.inventory.bus}
                adult={adult} child={child} infant={infant}
                currencyCode={currencyCode}
                isBus={true} />
        )
    }
    renderBusBookingDetailInfo() {
        const {busListing,searchComponentReducers,checkoutReducer} =this.props;
        let selectedBusRoute = busListing.selectedBusRoute;
        let departureDate = searchComponentReducers.fromDate.date;
        let arrivalDate = searchComponentReducers.toDate.date;
        let origin = searchComponentReducers.from.fromCityTitle;
        let destination = searchComponentReducers.to.toCityTitle;
        let totalTravellers = checkoutReducer.checkout.adult + checkoutReducer.checkout.child;
        return (
            <div className="booking-detail">
                <div className="info-detail">
                    <div className="name">
                        {origin}
                        <img src={require(`../../assests/images/svg/route-hover.svg`)} alt="Route" className="route" />
                        {destination}
                    </div>
                    <div className="info">
                        {moment(departureDate).format(dateFormat)}
                                                    &nbsp;-&nbsp;
                                                    {moment(arrivalDate).format(dateFormat)}
                                                    &nbsp;|&nbsp;
                                                    {`${totalTravellers} Traveler(s)`}
                                                    
                    </div>
                </div>
            </div>
        )
    }
    requestPayment(paymentDetail = {}, memberId = '', promoCode = '') {
        let { flightsListing, searchComponentReducers } = this.props;
        let payload = {
            "channelType": 1,
            "adult": Number(flightsListing.confirmedFlight.adult),
            "child": Number(flightsListing.confirmedFlight.child),
            "infant": Number(flightsListing.confirmedFlight.infant),
            "rates": flightsListing.confirmedFlight.rates,
            "source": flightsListing.confirmedFlight.source,
            "fareType": (searchComponentReducers.nationType == "f") ? "foreigner" : "local",
            "productId": 2,
            "userRoleId": 4,
            "apiKey": CONFIRM_API_KEY,
            "flight_version": 4
        }

        if (Object.keys(paymentDetail).length !== 0 && paymentDetail.constructor === Object) {
            payload = { ...payload, paymentMethodDetailInfo: paymentDetail }
        }
        if (memberId.length > 0) {
            payload = { ...payload, airAsiaMemberId: memberId }
        }
        if (promoCode.length > 0) {
            const promoInfo = {
                "departureDate": "2020-05-27",
                "tripType": 1,
                "busId": 49,
                "busName": "Shwe Mandalar Express",
                "originCityId": 5001,
                "originCity": "Yangon",
                "destinationCityId": 1913,
                "destinationCity": "Mandalay",
                "nationality": "foreigner",
                "userTypeId": 1,
                "userId": 61396,
                "promoCode": promoCode
            }
            payload = { ...payload, promoInfo }
        }

        if (this.state.selectedSubCatId && this.state.selectedCatId) {
            payload = {
                ...payload,
                paymentMethodDetailInfo: {
                    categoryId: this.state.selectedCatId,
                    subCategoryId: this.state.selectedSubCatId
                }
            }
        }
        if (this.state.airAsiaMemberId.length > 0) {
            payload = { ...payload, airAsiaMemberId: this.state.airAsiaMemberId }
        }
        if (this.state.promoCode.length > 0) {
            const promoInfo = {
                "departureDate": "2020-05-27",
                "tripType": 1,
                "busId": 49,
                "busName": "Shwe Mandalar Express",
                "originCityId": 5001,
                "originCity": "Yangon",
                "destinationCityId": 1913,
                "destinationCity": "Mandalay",
                "nationality": "foreigner",
                "userTypeId": 1,
                "userId": 61396,
                "promoCode": this.state.promoCode
            }
            payload = { ...payload, promoInfo: promoInfo }
        }
        this.props.requestPaymentType(payload)
    }
    isTourPayment = () => !!this.props.match.params.tourId;
    isFlightPayment = () => this.props.location.pathname.includes('flights/search')
    isHotelPayment = () => !!this.props.match.params.hotelSlug;
    isBusPayment = () => !!this.props.match.params.busRouteId;
    renderRating(stars) {
        let starArrays = [];
        for (let i = 0; i < stars; i++) {
            let star = <img key={`stars ${i}`}
                src={StarRatingIcon} alt="Star Rating" />
            starArrays.push(star);
        }
        return starArrays;
    }
    render() {
        let {
            paymentReducer,
            flightsListing,
            checkoutReducer,
            tourListing,
            hotelCheckoutReducer,
            hotelsListing,
            busListing,
            makePaymentReducer } = this.props;
        let adult = Number(flightsListing.confirmedFlight.adult);
        let child = Number(flightsListing.confirmedFlight.child);
        let infant = Number(flightsListing.confirmedFlight.infant);
        let outward = flightsListing.verifiedFlight.outward;
        return (
            <div>
                <CheckoutProcessBar isPayment={true} />
                <div className="app-container">
                    <div className="main-grid checkout-container payment-container">
                        <div className="col-left">
                            <h3 className="heading heading-sm">Choose Payment Type</h3>
                            <p className="small-heading">Transaction fee may be applied for selected Payment</p>
                            <div className="payment-type">
                                <div className="card payment-type-item"
                                    onClick={() => this.handleOnClickPayment("cards")}>
                                    <h4 className="heading heading-sm">Card</h4>
                                    <div className="payment-categories">
                                        {
                                            (!paymentReducer.isFetching) ?
                                                paymentReducer.cards.map(
                                                    (card) =>
                                                        <p key={card.subCategoryId} className={(card.subCategoryId == this.state.selectedSubCatId) ? `payment-img payment-selected` : `payment-img`}>
                                                            <img src={card.imagePath} alt={card.name} />
                                                        </p>
                                                )
                                                :
                                                <div>fetching Payments ....</div>
                                        }
                                    </div>

                                </div>
                                <div className="card payment-type-item"
                                    onClick={() => this.handleOnClickPayment("mobilePayments")}
                                >
                                    <h4 className="heading heading-sm">Mobile Payment</h4>
                                    <div className="payment-categories">
                                        {
                                            (!paymentReducer.isFetching) ?
                                                paymentReducer.mobilePayments.map(
                                                    (mobilePayment) =>
                                                        <p key={mobilePayment.subCategoryId} className={(mobilePayment.subCategoryId == this.state.selectedSubCatId) ? `payment-img payment-selected` : `payment-img`}>
                                                            <img src={mobilePayment.imagePath} alt={mobilePayment.name} />
                                                        </p>
                                                )
                                                :
                                                <div>fetching Payments ....</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="payment-type">
                                <div className="card payment-type-item"
                                    onClick={() => this.handleOpenCod()}>
                                    <h4 className="heading heading-sm">Cash On Delivery</h4>
                                    <div className="payment-categories">
                                        {
                                            (!paymentReducer.isFetching) ?
                                                paymentReducer.cods.map(
                                                    (cod) =>
                                                        <p key={cod.subCategoryId} className={(cod.subCategoryId == this.state.selectedSubCatId) ? `payment-img payment-selected` : `payment-img`}>
                                                            <img src={cod.imagePath} alt={cod.name} />
                                                        </p>
                                                )
                                                :
                                                <div>fetching Payments ....</div>
                                        }
                                    </div>
                                </div>
                                <div className="card payment-type-item"
                                    onClick={() => this.handlePayAtShop()}
                                >
                                    <h4 className="heading heading-sm">Pay at Shop</h4>
                                    <span className="shop-lists" onClick={() => this.handleOpenShop()}>view shops list</span>
                                    <div className="payment-categories">
                                        {
                                            (!paymentReducer.isFetching) ?
                                                paymentReducer.payAtShops.slice(0, 4).map(
                                                    (payAtShop) =>
                                                        <p key={payAtShop.subCategoryId} className={(payAtShop.subCategoryId == this.state.selectedSubCatId) ? `payment-img payment-selected` : `payment-img`}>
                                                            <img src={payAtShop.imagePath} alt={payAtShop.name} />
                                                        </p>
                                                )
                                                :
                                                <div>fetching Payments ....</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="payment-type wallet-type">
                                <div className="card payment-type-item">
                                    <h4 className="heading heading-sm">Oway Wallet</h4>
                                    <div className="payment-categories">
                                        <p className="payment-img">
                                            <img src={paymentReducer.wallet.imagePath} alt="Oway Wallet" />
                                        </p>
                                        <p>
                                            Please <a href={`${DEV_URL}/sign-in`} title="Oway Login">login</a> to your account
                                            to make payment using credits from Oway wallet.
                                        </p>
                                        {/* Show Currency After Login */}
                                        {/* <div className="after-login">
                                            <p className="currency">
                                                <span>
                                                    MMK 2,234,3423
                                                </span>
                                                <span className="last">
                                                    USD 2000
                                                </span>
                                            </p>                                        
                                            <p className="current-balance">
                                                Current Balance
                                            </p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            {/* Enough Balance or Not Enough Balance Images */}
                            {/* <div className="more-balance">
                                <p>                                
                                    <img src={require(`../../assests/images/svg/not-enough-balance.svg`)} alt="Not Enough Balance" />
                                    /
                                    <img src={require(`../../assests/images/svg/enough-balance.svg`)} alt="Enough Balance" />
                                    <span>You have <span className="red">not enough balance</span>/<span className="highlight">enough balance</span> to make this booking. If you want to add 
                                    more balance in your Oway Wallet,</span>
                                </p>
                                <a href="/" title="Top Up">
                                    <span>top up</span>
                                    <img src={require(`../../assests/images/svg/topup-menu-gray.svg`)} alt="Top Up" />
                                </a>
                            </div> */}
                            <PromoCode handleApply={(code) => this.handlePromoCode(code)} message={
                                (paymentReducer.promoInfo.length > 0 && paymentReducer.promoInfo[0].code != 200) ? paymentReducer.promoInfo[0].message : ""
                            } />
                            <AirasiaBigPoint handleApply={(code) => this.handleAirAsiaBigPoint(code)} />

                            <h3 className="heading heading-sm heading-payment">Cancellation Policies</h3>
                            <div className="card cancellation-policy">
                                <p>
                                    Once booked, it is not refundable.
                                </p>
                            </div>
                            <p className="terms-conditions">
                                I understand and agree with the
                                <a href={`${DEV_URL}/terms-of-services`} title="Terms &amp; Conditions" target="_blank"> Terms &amp; Conditions </a> and
                                <a href={`${DEV_URL}/privacy-notice`} title="Privacy Policy" target="_blank"> Privacy Policy </a>
                                of Oway.
                            </p>
                            {
                                (this.props.makePaymentReducer.paymentStatus == "success") ?
                                    <div style={{ display: 'none' }} ref={this.myForm} dangerouslySetInnerHTML={{ __html: this.props.makePaymentReducer.htmlPage }}></div>
                                    :
                                    <div></div>
                            }
                            {
                                !!checkoutReducer.makePayment.payment ?
                                    <div style={{ display: 'none' }} ref={this.tourPaymentForm} dangerouslySetInnerHTML={{ __html: this.props.checkoutReducer.makePayment.payment }}></div>
                                    :
                                    <div></div>
                            }

                            <button className="btn btn-orange btn-block" onClick={this.handleContinueToPay}>
                                Continue to Pay
                            </button>
                        </div>
                        {/* {
                            (this.props.makePaymentReducer.paymentStatus == "success")?
                            <div style={{display:'none'}} ref={this.myForm} dangerouslySetInnerHTML={{ __html: this.props.makePaymentReducer.htmlPage }}></div>
                            :
                            <div></div>
                        }
                        {
                            makePaymentReducer.paymentStatus == "success" ?
                            <div ref={this.tourPaymentForm} dangerouslySetInnerHTML={{ __html: this.props.makePaymentReducer.htmlPage }}></div>
                            :
                            <div></div>
                        }
                        
                        <button className="btn btn-orange btn-block" onClick={this.handleContinueToPay}>
                            Continue to Pay
                        </button> */}
                        <div className="col-right">
                            <div className="card">
                                <div className="booking-detail-title">
                                    <h3 className="heading heading-gray heading-sm">Booking Details</h3>
                                    <button onClick={this.handleShowBookingDetail}>view details</button>
                                </div>
                                {
                                    this.isHotelPayment() ?
                                        <div>
                                            {
                                                !!hotelCheckoutReducer.checkout && hotelCheckoutReducer.checkout.code == 200 ?
                                                    <div className="booking-detail">
                                                        <div className="info-detail">
                                                            <div className="name">
                                                                {hotelsListing.detail && hotelsListing.detail.name}
                                                                <div className="star-rating">{hotelsListing.detail && this.renderRating(hotelsListing.detail.ratings.stars)}</div>

                                                            </div>
                                                            <div>
                                                                {hotelCheckoutReducer.checkout && hotelCheckoutReducer.checkout.checkIn}
                                                                {hotelCheckoutReducer.checkout && hotelCheckoutReducer.checkout.checkOut}
                                                                {hotelCheckoutReducer.checkout && hotelCheckoutReducer.checkout.rates.deal.hotel.rooms.length}Rooms
                                                    {hotelCheckoutReducer.checkout && hotelCheckoutReducer.checkout.adults}Guests
                                                </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </div>
                                        :
                                        null
                                }
                                {
                                    this.isTourPayment() ?
                                        <div>
                                            {
                                                !!checkoutReducer.allCheckout && checkoutReducer.allCheckout.code == 200 ?
                                                    <div className="booking-detail">
                                                        <div className="info-detail">
                                                            <div className="name">
                                                                {tourListing.detail && tourListing.detail.data.title}
                                                            </div>
                                                            <div>
                                                                {moment(tourListing.detail.data.travelDate).format(dateFormat)}
                                                &nbsp;|&nbsp;
                                                {checkoutReducer.checkout && checkoutReducer.checkout.adult} Traveler(s)
                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </div>
                                        :
                                        null
                                }
                                {
                                    this.isFlightPayment() ?
                                        <div>
                                            {
                                                !!checkoutReducer.allCheckout && checkoutReducer.allCheckout.code == 200 ?
                                                    <div className="booking-detail">
                                                        <div className="info-detail">
                                                            <div className="name">
                                                                {outward.route[0].departure.airportName}
                                                                <img src={require(`../../assests/images/svg/route-hover.svg`)} alt="Route" className="route" />
                                                                {outward.route[outward.route.length - 1].arrival.airportName}
                                                            </div>
                                                            <div className="info">
                                                                {moment(outward.route[0].departure.departureDate).format(dateFormat)}
                                                    &nbsp;-&nbsp;
                                                    {moment(outward.route[outward.route.length - 1].arrival.arrivalDate).format(dateFormat)}
                                                    &nbsp;|&nbsp;
                                                    {`${adult} Adult(s)`}
                                                    &nbsp;|&nbsp;
                                                    {outward.route[0].class}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </div>
                                        :
                                        null
                                }
                                {
                                    this.isBusPayment() ?
                                        // <div>
                                        //  Booking Detail Info
                                        // </div>
                                        this.renderBusBookingDetailInfo()
                                        :
                                        null
                                }
                            </div>
                            {
                                this.isFlightPayment() ?
                                    <div>
                                        {
                                            (!paymentReducer.isFetching) ?
                                                <TravellerDetail
                                                    rates={paymentReducer.rates.deal}
                                                    currencyCode={paymentReducer.rates.deal.currencyCode}
                                                    adult={adult} child={child} infant={infant}
                                                    isFlight={true} />
                                                :
                                                <div>Loading</div>
                                        }
                                    </div>
                                    :
                                    null
                            }
                            {
                                this.isTourPayment() ?
                                    <div>
                                        {
                                            checkoutReducer.allCheckout && checkoutReducer.allCheckout.code == 200 ?
                                                <TravellerDetail
                                                    rates={checkoutReducer.allCheckout && checkoutReducer.allCheckout.rates.deal}
                                                    currencyCode={checkoutReducer.allCheckout && checkoutReducer.allCheckout.rates.deal.currencyCode}
                                                    adult={checkoutReducer.checkout.adult}
                                                    child={checkoutReducer.checkout.child}
                                                    infant={checkoutReducer.checkout.infant}
                                                    isTour={true} />
                                                :
                                                null
                                        }
                                    </div>
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
                    </div>

                    {this.state.showModal && this.renderPaymentDetail()}
                    {this.state.showBookingDetail && this.renderBookingDetail()}
                    {this.state.showCodModal && this.renderCODDetail()}
                    {this.state.showShopModal && this.renderShopDetail()}
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
    checkoutReducer: state.checkoutReducer,
    tourListing: state.tourListing,
    countryListing: state.countryListing,
    hotelCheckoutReducer: state.hotelCheckoutReducer,
    hotelsListing: state.hotelsListing,
    hotelReservation: state.hotelReservation,
    busListing: state.busListing
})
const mapDispatchToProps = dispatch => ({
    requestPaymentType: (payload) => dispatch(requestPaymentType(payload)),
    insertOrder: (payload) => dispatch(insertOrder(payload)),
    requestMakePayment: (payload) => dispatch(requestMakePayment(payload)),
    loadBookingFromLocalStorage: (payload) => dispatch(loadBookingFromLocalStorage(payload)),
    requestAllCheckout: (payload) => dispatch(requestAllCheckout(payload)), // all checkout confirm tour
    createTourInsertOrder: (payload) => dispatch(createTourInsertOrder(payload)),
    makeTourPayment: (payload) => dispatch(makeTourPayment(payload)),
    requestCountry: (payload) => dispatch(requestCountry(payload)),
    createHotelOrder: (payload) => dispatch(createHotelOrder(payload)),
    requestHotelOrderInsert: (payload) => dispatch(requestHotelOrderInsert(payload)),
    insertBusOrder: (payload) => dispatch(insertBusOrder(payload)),
    makeHotelPayment: (payload) => dispatch(makeHotelPayment(payload)),
    receiveHotelPayment: (payload) => dispatch(receiveHotelPayment(payload)),
    alertMsg: () => dispatch(alertMsg())
})
export default connect(mapStateToProps, mapDispatchToProps)(Payment);