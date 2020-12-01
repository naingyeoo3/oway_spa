import React from 'react';
import changeDurationFormat from '../../utils/changeDurationFormat';

// function changeDurationFormat(second){
//      if(second >3600){
//          let hour = Math.floor(second/3600);
//          let minutes = Math.ceil((second-(hour*3600))/60);
//          return `${hour} Hours and ${minutes} Minutes`
//      }else{
//          let minutes = Math.ceil(second/60);
//          return `${minutes} Minutes`
//      }
// }

function FlightRoute(props) {
    return (
        <div className="route">
            <div>
                <p className="time">{props.outward.route[0].departure.departureTime}</p>
                <p className="city-code">{props.outward.route[0].departure.airportCode}</p>
            </div>
            <div className="route-detail">
                <p>
                    {props.outward.route.length-1} stop(s)
                </p>
                <Via outward={props.outward}/>                
                <p>
                    {changeDurationFormat(props.outward.totalDuration)}
                </p>
            </div>
            <div className="to">
                <p className="time">
                    {[...props.outward.route].pop().arrival.arrivalTime}
                    <span>+1</span>
                </p>
                <p className="city-code">{[...props.outward.route].pop().arrival.airportCode}</p>
            </div>
        </div>
    );
}

function Via(props){
    const stops_no = props.outward.route.length - 1;
    // console.log("number of stops",stops_no);
    return (
        (stops_no==0)?
        <p className="via-block">
            <span className="line"></span>
            <img src="https://oway.com.mm/images//icon/2019/m-flight-way-icon.svg" />
        </p>
        :
        (stops_no == 1)?
        <p className="via-block">
            <span className="line"></span>
            <span className="via-icon"></span>
            <img src="https://oway.com.mm/images//icon/2019/m-flight-way-icon.svg" />
        </p>
        :
        (stops_no == 2)?
        <p className="via-block">
            <span className="line"></span>
            <span className="via-icon"></span>
            <span className="via-icon"></span>
            <img src="https://oway.com.mm/images//icon/2019/m-flight-way-icon.svg" />
        </p>
        :
        <p className="via-block">
            <span className="line"></span>
            <span className="via-icon"></span>
            <span className="via-icon"></span>
            <span className="via-icon"></span>
            <img src="https://oway.com.mm/images//icon/2019/m-flight-way-icon.svg" />
        </p>
    )
}

export default FlightRoute;