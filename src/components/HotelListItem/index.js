import React, { Component } from 'react';
import moment from 'moment';
import './style.scss';
import history from '../../utils/history';
import LocationIcon from '../../assests/images/png/map.png';
import tripAdvisorIcon from '../../assests/images/png/trip-advisor.png';
import StarRatingIcon from '../../assests/images/svg/star-rating.svg';
import {BASE_URL} from '../../constants/credentials';
import { Tooltip } from 'antd';
const dateFormat = 'DD MMM YYYY';

class HotelListItem extends Component {
    constructor(props) {
        super(props);
        this.handleSelectHotel = this.handleSelectHotel.bind(this);
    }
    renderRating(stars) {
        let starArrays = [];
        for (let i = 0; i < stars; i++) {
            let star = <img key={`stars ${i}`}
            src={StarRatingIcon} alt="Star Rating"/>
            starArrays.push(star);
        }
        return starArrays;
    }
    renderAmenities(items){
       return  (items.length > 5)?
         items.map((item,index)=>{
                if(index < 5)
                return (
                    <p key={index}>
                        <Tooltip placement="top" title={item.name}>
                            <img src={item.icon} alt={item.name}/>
                        </Tooltip>
                    </p>
                )
             })
        :  
        items.map((item,index)=>{
            return <p key={index}><img src={item.icon} alt={item.name}/></p>
         })   
    }

    handleSelectHotel(){
        const {params} = this.props;
        let url = `${window.location.origin}/hotels/search/${this.props.hotel.slug}/${params.checkin}/`+
                    `${params.checkout}/${params.currency}/${params.nationality}/${params.lang}/${params.enquiredRooms}/${params.limit}`;
        window.open(url,'_blank');
    }
    render() {
        const promo = this.props.hotel.rooms[0].rates[0];
        return (
            <div className="card" key={this.props.hotel.id} onClick={this.handleSelectHotel}>
                <div className="listing-item">
                    <div className="col-image text-over-image">
                        <div className="promo-box">
                            {
                                (promo.deal.display.discount!='0 %')?
                                <span className="promo promo-rate">{this.props.hotel.rooms[0].rates[0].deal.display.discount} OFF</span>
                                :
                                <span></span>     
                            }
                            {
                                !promo.promotions[0] ?
                                <span></span>
                                :
                                <span className="promo promo-title">{promo.promotions[0].title}</span>
                            }                            
                            {
                                !promo.promotions[0] ?
                                <span></span>
                                :
                                <span className="promo promo-type">
                                    {
                                        promo.promotions[0].subtitles[0].key == 'promo_nature' ?                                        
                                        promo.promotions[0].subtitles[0].title
                                        :
                                        null
                                    }
                                </span>
                            }                            
                        </div>                        
                        {
                            (this.props.hotel.images.length > 0)?
                            <img src={this.props.hotel.images[0].url} alt={`${this.props.hotel.name}`} />
                            :
                            <div>No image</div>
                        }
                    </div>
                    <div className="col-info">
                        <div className="heading-block">
                            <h2 className="heading heading-md heading-gray">
                                {`${this.props.hotel.name}`}                               
                            </h2>
                            <div className="rating">
                                {this.renderRating(this.props.hotel.ratings.stars)}
                            </div>
                        </div>                        
                        <div className="location">
                            <img src={LocationIcon} alt="Location"/>
                            {`${this.props.hotel.location.townshipName},${this.props.hotel.location.cityName}`}
                        </div>
                        {
                            !promo.promotionAnnouncement[0] || promo.promotionAnnouncement[0].length <= 0 ?
                            null
                            :
                            <span className="limited-offer">
                                <img src={require(`../../assests/images/svg/timer.svg`)} alt="Limited Time Offer" />
                                Limited Time Offer - {promo.promotionAnnouncement[0].discountAs} OFF 
                                ({moment(promo.promotionAnnouncement[0].checkInDate).format(dateFormat)}
                                &nbsp;-&nbsp;
                                {moment(promo.promotionAnnouncement[0].checkOutDate).format(dateFormat)})
                            </span>                            
                        }                        
                        <div className="noti">
                            {
                                this.props.hotel.options.payAtHotel == false ?
                                <span></span>
                                :
                                <span className="badge badge-outline-blue font-size-11" key="option-1">Pay at hotel</span>
                            }                            
                            {/* <span className="badge badge-outline-blue font-size-11" key="option-2">Breakfast Included</span> */}
                        </div>
                        <div className="include-features">
                            {this.renderAmenities(this.props.hotel.amenities)}
                        </div>
                    </div>
                    <div className="col-price">
                        {/* <img src={tripAdvisorIcon} alt="Trip Advisor"/> */}
                        <p className="text-small text-gray starting">Starting from</p>
                        {
                            (this.props.hotel.rooms[0].rates[0].deal.discount > 0)?
                            <p className="price-block">
                                <span className="text-gray-dark discount">{this.props.currency.name} {this.props.hotel.rooms[0].rates[0].deal.prices.base}</span>
                                <span className="text-primary price-primary">{this.props.currency.name} {(this.props.hotel.rooms[0].rates[0].deal.prices.base - this.props.hotel.rooms[0].rates[0].deal.discount).toFixed(2) }</span>
                            </p>
                            :
                            <p>
                                <span className="text-primary price-primary">{this.props.currency.name} {(this.props.hotel.rooms[0].rates[0].deal.prices.base).toFixed(2)}</span>
                            </p>
                        }
                        <span className="text-small text-primary">per night/room</span>
                        <button type="button" className="btn btn-orange btn-block">Select</button>
                    </div>
                </div>
                <p className="hotel-remark">Your dates are popular – we've run out of rooms at this property!</p>
            </div>
        );
    }
}

export default HotelListItem;