import React, { Component } from 'react';
import { Affix } from 'antd';
 
const TourDetailTitle = (props) =>(
            <div className="detail-card card">
                <div className="info-block">
                    <div className="col-info">
                        <div className="heading-block">
                            <h1 className="heading heading-lg heading-gray">{props.title}</h1>
                            <p className="noti">
                                {props.data && Number(props.data.duration) > 0 ? <span className="badge badge-outline-blue font-size-15"> {props.data.duration} Day(s)</span> : null}
                                <span className=" badge badge-blue font-size-15">min {props.tickets && props.tickets.min} ticket(s)</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-price">
                        <div>
                            <p className="price-block">
                                <span className="text-gray-dark discount">{props.price ? props.price[0].deal.discount == null ? null : props.price[0].deal.discount : '...'}</span>
                                <span className="text-primary price-primary">{props.price ? props.price[0].deal.adult.base : 'usd'}</span>
                            </p>
                            <span className="text-small text-primary">per person</span>
                        </div>
                    </div>
                </div>
                {/* <Affix offsetTop={110}> */}
                    <div className="tab-design">
                        <div className="selected">
                            <a href="#overview">Overview</a>
                            <span className="line">&nbsp;</span>
                        </div>
                        <div>
                            <a href="#itinerary-info">Itinerary Info</a>
                            <span className="line">&nbsp;</span>
                        </div>
                        <div>
                            <a href="#inclusion">Inclusion</a>
                            <span className="line">&nbsp;</span>
                        </div>
                        <div>
                            <a href="#exclusion">Exclusion</a>
                            <span className="line">&nbsp;</span>
                        </div>
                        <div>
                            <a href="#child-policy">Child Policy</a>
                            <span className="line">&nbsp;</span>
                        </div>
                        <div>
                            <a href="#cancellation">Cancellation</a>
                            <span className="line">&nbsp;</span>
                        </div>
                    </div>
                {/* </Affix> */}
            </div>
        );    
export default TourDetailTitle;