import React, { Component } from 'react';
import { Card } from 'antd';

class BusPlaceholderCard extends Component {
    render() {
        return (
            <div className="city-layout">
                {
                    this.props.mobileBuses.map(country=> 
                        <Card 
                            key={country.id}
                            size="small"
                            bordered={false}
                            title={country.region}>                                                                         
                            {
                                country.cities.map((city)=> (
                                    <div 
                                        onClick={()=> this.props.callbackParent(city.keyword, city.name)}  
                                        key={city.id}
                                        className="card-text"
                                        >
                                        {city.name}                                
                                    </div>
                                ))
                            }                                    
                        </Card>
                    )
                }
            </div>
        );
    }
}

export default BusPlaceholderCard;