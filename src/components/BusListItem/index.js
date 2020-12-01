import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser'

import BusRoute from '../BusRoute';
import { BUS_API_KEY } from '../../constants/credentials';
import { connect } from 'react-redux';
import { loadBusDetail } from '../../actions/busListingActions';
import ImageGallery from 'react-image-gallery';
import StarRatingIcon from '../../assests/images/svg/star-rating.svg';
import busImage from '../../assests/images/svg/bus-route.svg';
import './style.scss';
class BusListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenDetail: false,
            isOpenPolicy: false
        };
        this.handleClickDetail = this.handleClickDetail.bind(this);
        this.handleClickPolicy = this.handleClickPolicy.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.busListing.detailRouteId !== this.props.busListing.detailRouteId){
            if(this.props.busRoute.busRouteId !== this.props.busListing.detailRouteId){
                this.setState({
                    isOpenDetail :false
                })
            }
        }
    }
    handleClickPolicy() {

        let isOpen = this.state.isOpenPolicy;
        this.setState({
            isOpenPolicy: !isOpen,
            isOpenDetail: false
        });
    }

    handleClickDetail() {
        const { busListing, busRoute } = this.props;
        let isOpen = this.state.isOpenDetail;
        this.setState({
            isOpenDetail: !isOpen,
            isOpenPolicy: false
        })
        const payload = {
            busId: busRoute.busId,
            busRouteId: busRoute.busRouteId,
            apiKey: BUS_API_KEY
        }
        this.props.loadBusDetail(payload)
    }
    
    
    renderCancellationPolicy() {
        const { busRoute } = this.props;
        return (
            <div className='accordion-detail cancellation'>
                <p>{ReactHtmlParser(busRoute.busPolicy)}</p>
            </div>
        )
    }


    renderRating(stars) {
        let starArrays = [];
        for (let i = 0; i < stars; i++) {
            let star = <img key={`stars ${i}`} src={StarRatingIcon} alt="Rating Icon" />
            starArrays.push(star);
        }
        return starArrays;
    }
    renderImageGallery(images) {
        let hotelImages = [];
        console.log("image", images);
        images.map((image) => {
            const hotelImage = {
                original: image.imagePath,
                originalClass: 'bus-image'
            }
            hotelImages.push(hotelImage)
        });
        console.log("hotel Image", hotelImages);
        if (images.length === hotelImages.length) {
            return (
                <ImageGallery 
                    items={hotelImages}
                    showThumbnails={false}
                    showBullets={true}
                    showFullscreenButton={false}
                    showPlayButton={false} />
            )            
        }
    }
    renderBusDetail() {
        const { busRoute, busListing } = this.props;
        const busDetail = busListing.busDetail;

        return (
            <div className='accordion-detail bus-detail'>
                <div className="bus-facilities">
                    <div className="col-info">
                        <div className="col-image">
                            {
                                !!busDetail.starRating && this.renderImageGallery(busDetail.busImages)
                            }
                        </div>
                        <div className="col-rating">
                            <div>
                                <p>Bus Quality</p>
                                <p>{this.renderRating(busDetail.starRating)}</p>
                            </div>
                            <div>
                                <p>Puntuality</p>
                                <p>{this.renderRating(busDetail.punctualityRating)}</p>
                            </div>
                            <div>
                                <p>Staff Behaviour</p>
                                <p>{this.renderRating(busDetail.staffBehaviorRating)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-amenities">
                        {
                            (busDetail.amenities) ?
                                (busDetail.amenities).map((amenity, index) =>
                                    <p key={index}>
                                        <img src={amenity.amenityImagePath} alt={amenity.amenityName} />
                                        {amenity.amenityName}
                                    </p>
                                )
                                :
                                <div></div>
                        }
                    </div>
                </div>
                <div className="bus-feature">
                    <div className="col-feature detail">
                        <div className="info">
                            <div className="key">Operator Name</div>
                            <div className="value">{busRoute.busName}</div>
                        </div>
                        <div className="info">
                            <div className="key">Number</div>
                            <div className="value">{busRoute.busNumber == "" ? "N/A" : busRoute.busNumber}</div>
                        </div>
                        <div className="info">
                            <div className="key">Seats</div>
                            <div className="value">{busDetail.totalSeats}</div>
                        </div>
                        <div className="info">
                            <div className="key">Bus Type</div>
                            <div className="value">{busRoute.busTypeName}</div>
                        </div>
                        <div className="info">
                            <div className="key">Boarding Point</div>
                            <div className="value">{busRoute.boardingPoint}</div>
                        </div>
                        <div className="info">
                            <div className="key">Dropping Point</div>
                            <div className="value">{busRoute.droppingPoint}</div>
                        </div>
                    </div>
                    <div className="col-feature">
                        {
                            busDetail.remark ?
                            <div className="remark">
                                <p>Remark</p>
                                <p className="info">
                                    {busDetail.remark}
                                </p>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        )
    }
    render() {
        const { busRoute, isConfirmed } = this.props;
        return (
            <div key={busRoute.busRouteId} className="card">
                <div className={isConfirmed ? "listing-item-01 bus-item checkout-bus-item" : "listing-item-01 bus-item"}>
                    <div className="col-info">
                        <div className="info-block">
                            <div className="logo">
                                <img src={busRoute.imagePath} alt={busRoute.busName} />
                                <h2 className="heading heading-sm heading-dark">
                                    {busRoute.busName}
                                    {
                                        busRoute.seatType == "Normal" ? 
                                        <span></span>                                        
                                        :
                                        <span className="badge badge-blue badge-vip font-size-11">vip</span>
                                    }
                                </h2>
                            </div>
                            <BusRoute busRoute={busRoute} />
                        </div>
                    </div>
                    {
                        isConfirmed ?
                        null
                        :
                        <div className="col-price">
                            <div className="price">
                                <span className="text-small text-gray-light">per ticket</span>
                                <p className="price-block two-lines">
                                    <span className="price-blue">
                                        {`${busRoute.rates.deal.currencyCode} ${busRoute.rates.deal.adult.base}`}
                                    </span>
                                    {/* <span className="text-gray-light discount">USD 145</span> */}
                                </p>
                            </div>
                            <div className="select">
                                <button className="btn btn-orange btn-block" onClick={() => this.props.onClick(busRoute.id)}>Select</button>
                            </div>
                        </div>
                    }                    
                </div>
                <div className={`listing-accordion ${(this.state.isOpenDetail || this.state.isOpenPolicy) && 'active'}`}>
                    <div className={`${this.state.isOpenDetail && 'active'}`} onClick={this.handleClickDetail}>
                        Bus Details
                    </div>
                    <div className={`${this.state.isOpenPolicy && 'active'}`} onClick={this.handleClickPolicy}>
                        Cancellation Policy
                    </div>
                </div>
                {!!this.state.isOpenPolicy && this.renderCancellationPolicy()}
                {!!this.state.isOpenDetail && this.renderBusDetail()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        busListing: state.busListing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadBusDetail: (payload) => dispatch(loadBusDetail(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BusListItem)