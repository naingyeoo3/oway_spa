import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser'
import FlightRoute from '../FlightRoute';
import FlightDetail from '../FlightDetail';
import moment from 'moment';
import './style.scss';

class FlightListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenDetail: false,
            isOpenPolicy: false
        }
        this.handleClickPolicy = this.handleClickPolicy.bind(this);
        this.handleClickDetail = this.handleClickDetail.bind(this);
    }
    renderCancellationPolicy() {
        return (
            <div className='accordion-detail cancellation'>
                <p>{ReactHtmlParser(this.props.outward.rule.others)}</p>
            </div>
        )
    }
    renderFlightDetail() {
        const outward = this.props.outward;
        const routes = outward.route;
       return  routes.map((route,index)=>{
            return (
                <FlightDetail key={index} outward={outward} route={route}/>
            )
        })
    }
    handleClickPolicy() {

        let isOpen = this.state.isOpenPolicy;
        this.setState({
            isOpenPolicy: !isOpen,
            isOpenDetail: false
        });
    }
   //console.log("category",category);
    handleClickDetail() {
        let isOpen = this.state.isOpenDetail;
        this.setState({
            isOpenDetail: !isOpen,
            isOpenPolicy: false
        })
    }
    render() {
        const outward = this.props.outward;
        const isConfirmed = this.props.isConfirmed;
        const dateFormat = 'ddd, DD MMM YYYY';
        // console.log(outward)
        return (
            <div className="card" key={outward.referKey}>
                <div className={isConfirmed ? "listing-item-01 flight-item checkout-flight-item" : "listing-item-01 flight-item"}>
                    <div className="col-info">
                        <div className="info-block">
                            <div className="logo">
                                <img src={outward.route[0].carrier.airlineLogo} alt={`image`} />
                                <div>
                                    {
                                        isConfirmed ?
                                        <p className="date">{moment(outward.route[0].departure.departureDate).format(dateFormat)}</p>
                                        :
                                        null
                                        
                                    }
                                    <h2 className="heading heading-sm heading-dark">
                                        {outward.route[0].carrier.airlineName}
                                        <span>{outward.route[0].carrier.airlineCode}&nbsp;-&nbsp;{outward.route[0].carrier.flightNumber}</span>
                                    </h2>
                                    {
                                        isConfirmed ?
                                        <p className="class-type">{outward.route[0].class}</p>
                                        : 
                                        null
                                    }
                                </div>
                            </div>
                            <FlightRoute outward={outward} />
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
                                        {`${outward.rates.deal.currencyCode} ${outward.rates.deal.total.base}`}
                                    </span>
                                    {/* {
                                        (outward.rates.deal.adult.discount >0)?
                                        <span className="text-gray-light discount">MMK 145,50</span>
                                        :
                                        <span></span>
                                    } */}
                                </p>
                                <p className="b2c-block">
                                    <span className="text-small text-primary price">
                                        <span>B2C price:&nbsp;</span>
                                        <span>{outward.rates.deal.currencyCode} {outward.rates.deal.total.B2CBase}</span>
                                    </span>
                                    <span className="discount">{outward.rates.deal.total.B2CBase}</span>
                                </p>
                            </div>                        
                            <div className="select">
                                <button className="btn btn-orange btn-block" onClick={()=>this.props.onClick(outward.refID,outward.referKey)}>Select</button>
                            </div>
                        </div>
                }
                </div>
                <div className={`listing-accordion ${(this.state.isOpenDetail || this.state.isOpenPolicy) && 'active'}`}>
                    <div className={`${this.state.isOpenDetail && 'active'}`} onClick={this.handleClickDetail}>
                        Flight Details
                    </div>
                    <div className={`${this.state.isOpenPolicy && 'active'}`} onClick={this.handleClickPolicy}>
                        Cancellation Policy
                    </div>
                </div>
                {!!this.state.isOpenPolicy && this.renderCancellationPolicy()}
                {!!this.state.isOpenDetail && this.renderFlightDetail()}                
            </div>
        );
    }
}

export default FlightListItem;