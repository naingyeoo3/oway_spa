import React, { Component } from 'react';
import { first_row_popular, second_row_popular } from '../constants/visaPageConstants';
import PopularCard from './PopularCard';
import { FormattedMessage } from 'react-intl';

class PopularDestinationAllProducts extends Component {
    render() {
        return (
            <div className="visa-popular-destination">
                <div className="app-container">
                    <h2 className='header-title'>
                    <FormattedMessage id="popular.destination" />
                        <small><FormattedMessage id="popular.destination.small" /></small>                        
                    </h2>
                    <div className="destination-row">
                    {
                        first_row_popular.map((item,index)=> (
                            <PopularCard city={item} key={index}/>
                        ))
                    }
                    </div>
                    <div className="destination-row">
                    {
                        second_row_popular.map((item,index)=> (
                            <PopularCard city={item} key={index}/>
                        ))
                    }
                    </div>
                </div>
            </div>            
        );
    }
}

export default PopularDestinationAllProducts;