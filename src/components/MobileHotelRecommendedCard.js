import React, { Component } from 'react';
import { Card } from 'antd';
        
const MobileHotelRecommendedCard = (props) =>          
    <div className="city-layout">
        {
            props.mobileRegionCities.map((country)=> (
                <Card 
                    key={country.id}
                    size="small"
                    bordered={false}
                    title={country.region}>                                                                         
                    {
                        country.cities.map((city)=> (
                            <div 
                                onClick={()=> props.callbackParent(city)}  
                                key={city.id}
                                className="card-text"
                                >
                                {city.name}                                
                            </div>
                        ))
                    }                                    
                </Card>
            ))
        }    
    </div>

export default MobileHotelRecommendedCard;