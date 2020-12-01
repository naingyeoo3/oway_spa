import React, { Component } from 'react';
import PopularBusLinesItem from './PopularBusLinesItem';
import { popularBusLines } from '../constants/busConstants';
import { FormattedMessage } from 'react-intl';

class PopularBusAirlines extends Component {
    render() {
        return (
            <div className="popular-busline hidden-xs"> 
                <div className="app-container">
                    <div className="busline-block">
                        <div className="col-title">
                            <h2 className="header-title"><FormattedMessage id="popular.buslines" /><small><FormattedMessage id="popular.buslines.small" /></small></h2>
                        </div>
                        <div className="col-image">
                            {
                                popularBusLines.map((item, index)=> <PopularBusLinesItem key={index} item={item} />)
                            }
                        </div>
                    </div>
                </div>               
            </div>
        );  
    }
}

export default PopularBusAirlines;