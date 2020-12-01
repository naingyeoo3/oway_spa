import React, { Component } from 'react';

class Route extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                {
                    this.props.routes.map((route)=>{
                        return <div key={route.departure.airpotCode}>
                               <h4>{route.carrier.airlineName}</h4>
                               <ul>
                                   <li>{route.departure.airpotCode} at 
                                   {route.departure.departureTime}</li>
                                   <li>{route.arrival.airpotCode} at 
                                   {route.arrival.arrivalTime}</li>
                               </ul>
                              </div>
                    })
                }
            </div>
        );
    }
}

export default Route;