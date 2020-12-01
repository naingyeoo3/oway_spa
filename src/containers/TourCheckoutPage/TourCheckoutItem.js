import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './tour-checkout-item.scss';
import { Tooltip, Button }from 'antd'
 
class TourCheckoutItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getPrice(){
        const { navbarOptions, item }  = this.props;
        if(navbarOptions.currency.name === 'USD'){
            if(item.rates[0].deal.currencyCode==='USD'){
                return item.rates[0].deal.adult.base;
            }else{
                return item.rates[0].inventory.adult.base
            }
        }else{
            if(item.rates[0].deal.currencyCode==='MMK'){
                return item.rates[0].deal.adult.base;
            }else{
                return item.rates[0].inventory.adult.base
            }
        }
    }
    getDiscount(){
        const { item } = this.props;
        if(item.rates[0].deal.discount != null){
            return item.rates[0].deal.discount.label;
        }else{
            return null
        }
    }
    getCategoryIcon(type) {
        switch (type) {
          case 'Health and Wellness':
            return (<img src={require(`../../assests/images/svg/healthandwellness.svg`)} alt="Health and Wellness" />);
            break;
          case 'Tour':
            return (<img src={require(`../../assests/images/svg/tour-triptype.svg`)} alt="Tour" />);
            break;
          case 'Transport':
            return (<img src={require(`../../assests/images/svg/transport.svg`)} alt="Transport" />);
            break;
          case 'Combo Deal':
            return (<img src={require(`../../assests/images/svg/combo.svg`)} alt="Combo Deal" />);
            break;
          case 'Learning':
            return (<img src={require(`../../assests/images/svg/learning.svg`)} alt="Learning" />);
            break;
          case 'Family':
            return (<img src={require(`../../assests/images/svg/family.svg`)} alt="Family" />);
            break;
          case 'Honeymoon':
            return (<img src={require(`../../assests/images/svg/honeymoon.svg`)} alt="Honeymoon" />);
            break;
          case 'Beach':
            return (<img src={require(`../../assests/images/svg/beach.svg`)} alt="Beach" />);
            break;
          case 'Leisure':
            return (<img src={require(`../../assests/images/svg/leisure.svg`)} alt="Leisure" />);
            break;
          case 'Culture':
            return (<img src={require(`../../assests/images/svg/culture.svg`)} alt="Culture" />);
            break;
          case 'Popular':
            return (<img src={require(`../../assests/images/svg/popular.svg`)} alt="Popular" />);
            break;
          default:
            break;
        }
      }
    render() { 
        const { item, key, isPayment } = this.props;
        return (
            <div className="card" key={key}>
                <div className="listing-item">
                    <div className="col-image text-over-image">
                        {/* <div className="promo-box">
                            <span className="promo promo-rate">50% OFF</span>
                            <span className="promo promo-title">Thingyan Special</span>
                            <span className="promo promo-type">Another Promotion Type</span>
                        </div> */}
                        <img src={`${item.images[0].path}`} alt={item.title} />
                    </div>                    
                    <div className="col-info">
                        {
                            isPayment ?
                            <div className="heading-block">
                                <h2 className="heading heading-md heading-gray">                                
                                    {item.title}                              
                                </h2>
                            </div>
                            :
                            null
                        }
                        <div className="location">
                            <img src={require(`../../assests/images/png/map.png`)} alt="Location"/>
                            {item.cities[0].name}, {item.cities[0].state.country.name}
                        </div>
                        <div className="noti">
                            {
                                Number(item.duration) > 0 ? 
                                <span className="badge badge-outline-blue font-size-13">{item.duration} Day(s)</span> 
                                : 
                                null
                            }
                            <span className="badge badge-blue font-size-13">min {item.ticket.min} ticket(s)</span>
                            {/* <span>Max - </span><span>{item.ticket.max}</span> */}
                        </div>
                        {
                            isPayment ?
                            null
                            :
                            <div className="travel-time">
                                Travel Time: <span>00 - 00</span>
                            </div>
                        }
                        
                        <div className="include-features">
                            {
                                item.features.flight || item.features.accommodation || item.features.transportation || 
                                item.features.meal || item.features.tourGuide || item.features.entranceFee ?
                                <span className="text-small text-primary">Price Included:</span>
                                :
                                <span></span>
                            }
                            {item.features ? (
                                <div>
                                    {item.features.flight ? 
                                        <p>
                                            <Tooltip placement="top" title="Flight">
                                                <img src={require(`../../assests/images/svg/flight-gray.svg`)} alt="Flight" />
                                            </Tooltip>
                                        </p>
                                        :
                                        null
                                    }
                                    {item.features.accommodation ? 
                                        <p>
                                            <Tooltip placement="top" title="Hotel">
                                                <img src={require(`../../assests/images/svg/hotel-gray.svg`)} alt="Hotel" />
                                            </Tooltip>
                                        </p>
                                        :
                                        null
                                    }
                                    {item.features.transportation ? 
                                        <p>
                                            <Tooltip placement="top" title="Transport">
                                                <img src={require(`../../assests/images/svg/transport-gray.svg`)} alt="Transport" />
                                            </Tooltip>
                                        </p>
                                        :
                                        null
                                    }
                                    {item.features.meal ? 
                                        <p>
                                            <Tooltip placement="top" title="Meal">
                                                <img src={require(`../../assests/images/svg/meal-gray.svg`)} alt="Meal" />
                                            </Tooltip>
                                        </p>
                                        :
                                        null
                                    }
                                    {item.features.tourGuide ? 
                                        <p>
                                            <Tooltip placement="top" title="Tour Guide">
                                                <img src={require(`../../assests/images/svg/tour-gray.svg`)} alt="Tour Guide" />
                                            </Tooltip>
                                        </p>
                                        :
                                        null
                                    }
                                    {item.features.entranceFee ? 
                                        <p>
                                            <Tooltip placement="top" title="Entrance Fees">
                                                <img src={require(`../../assests/images/svg/entrance-gray.svg`)} alt="Entrance Fees" />
                                            </Tooltip>
                                        </p>
                                        :
                                        null
                                    }
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="trip-type">
                    <div className="title">
                        <h3 className="heading heading-sm">Trip Type</h3>
                    </div>
                    <div className="feature">
                        {item.categories &&
                        item.categories.map((cat, index) => (
                            <div key={index}>{this.getCategoryIcon(cat.name)}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        navbarOptions: state.navbarOptions
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TourCheckoutItem)