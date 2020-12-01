import React from 'react';
import busImage from '../../assests/images/svg/bus-route.svg';


function BusRoute(props) {
    const {busRoute} = props;
    const routes = busRoute.busRoute.split('-');
    return (
        <div className="route">
            <div>
                <p className="time">{busRoute.departureTime}</p>
                <p className="city-code">{routes[0]}</p>
            </div>
            <div className="route-detail">
                <img src={busImage} alt="Bus Route Icon"/>
                <p className="via-block">                    
                    <span className="line"></span>
                    <span className="via-icon"></span>
                    <span className="via-icon"></span>
                </p>                
                <p className='duration'>
                    {busRoute.duration}
                </p>
            </div>
            <div className="to">
                <p className="time">
                    {busRoute.arrivalTime}
                    <span>+1</span>
                </p>
                <p className="city-code">{routes[1]}</p>
            </div>
        </div>
    );
}

export default BusRoute;