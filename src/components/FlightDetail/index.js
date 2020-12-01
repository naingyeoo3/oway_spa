import React, { Component } from 'react';
import changeDurationFormat from '../../utils/changeDurationFormat';
const dateFormat = 'ddd, DD MMM YYYY';
import moment from 'moment';

class FlightDetail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let outward = this.props.outward;
        let route = this.props.route;
        let baggage = "";
        console.log("baggage",outward.service.baggage);
        if(route.class == "Nok Lite" || route.class == "Nok X-tra" || route.class == "Nok Max")
           baggage = outward.service.baggage
        else if(route.class == "NF Fly")
           baggage = "Cabin baggage 7 kg"
        
        if(outward.service.baggage == "")
           baggage = "Cabin baggage 7 kg"
        else    
           baggage = `${outward.service.baggage}, Cabin baggage 7kg`
           
        return (
            <div>
                <div className="accordion-detail flight-detail">
                    <div className="flight-detail-item">
                        <div className="col-info">
                            <div>
                                <img src={route.carrier.airlineLogo} alt={`${route.carrier.airlineName} image`} />
                            </div>
                            <div className="detail-info">
                                <p>{route.carrier.airlineName}</p>
                                <p className="airline-code">{`${route.carrier.airlineCode} - ${route.carrier.flightNumber}`}</p>
                                <p>{route.class}</p>
                            </div>
                        </div>
                        <div className="col-route">
                            <div className="scheldule">
                                <div>
                                    <p className="time">{route.departure.departureTime}</p>
                                    <p className="date">{moment(route.departure.departureDate).format(dateFormat)}</p>                                    
                                </div>
                                <div>
                                    <p className="time">{route.arrival.arrivalTime}</p>
                                    <p className="date">{moment(route.arrival.arrivalDate).format(dateFormat)}</p>
                                </div>                        
                            </div>
                            <div>
                                <p className="circle"></p>
                                <p className="vertical-line"></p>
                                <p className="circle"></p>
                            </div>
                            <div className="duration">
                                <p className="route">{`${route.departure.airportCode} - ${route.departure.airportName}`}</p>
                                <p className="route-duration">{changeDurationFormat(route.duration) }</p>
                                <p className="route">{`${route.arrival.airportCode} - ${route.arrival.airportName}`}</p>
                            </div>
                        </div>
                        <div className="col-facilities">
                            <div>
                                {
                                    (outward.service.meal) ?
                                    <div>
                                        <img src={require(`../../assests/images/svg/meal.svg`)} alt="Meal Icon"/>
                                        Meal : ${outward.service.meal}
                                    </div>
                                    :
                                    <div></div>
                                }
                                {
                                    (outward.service.baggage) ?
                                    <div>
                                        <img src={require(`../../assests/images/svg/baggage.svg`)} alt="Baggage Icon"/>
                                        Baggage : {baggage}
                                    </div>
                                    :
                                    <div></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    (route.layOverTime > 0) ?
                    <div className="transist-block">
                        <div className="transist-info">
                            <p className="heading">{`transist in  ${route.arrival.airportName} | ${changeDurationFormat(route.layOverTime)}`} </p>                            
                            <p>A Transit Visa may be required for this journey, please ensure you have all necessary documents before a reservation. Noibai Intl</p>
                        </div>
                    </div>
                    :
                    <div></div>
                }
            </div>
 
        );
    }
}

export default FlightDetail;