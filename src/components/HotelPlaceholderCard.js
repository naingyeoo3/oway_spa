import React, { Component } from 'react';
import { Card } from 'antd';

class HotelPlaceholderCard extends Component {
    render() {
        return (
            <div className="city-layout">
                {this.props.mobileHotels.map(country=>
                    <Card 
                        key={country.id}
                        size="small"
                        bordered={false}
                        title={country.name}>                                                                         
                        {
                            country.cities.map((city)=> (
                                <div 
                                    onClick={()=> this.props.callbackParent(city)}  
                                    key={city.id}
                                    className="card-text"
                                    >
                                    {city.name}                                
                                </div>
                            ))
                        }                                    
                    </Card>
                )}
            </div>
        );
    }
}

export default HotelPlaceholderCard;