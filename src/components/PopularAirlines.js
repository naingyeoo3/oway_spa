import React, { Component } from 'react';
import PopularAirlinesItem from './PopularAirlinesItem';
import { popularAirlines } from '../constants/flightConstants';
import { FormattedMessage } from 'react-intl';

class PopularAirlines extends Component {
    render() {
        return (
            <div className="popular-airline hidden-xs"> 
                <div className="app-container">
                    <div className="airline-block">
                        <div className="col-title">
                            <h2 className="header-title"><FormattedMessage id="popular.airlines" /><small><FormattedMessage id="popular.airlines.small" /></small></h2>
                        </div>
                        <div className="col-image">
                            <h3><FormattedMessage id="popular.international" /></h3>
                            {                                            
                                popularAirlines.map((item, index)=> 
                                <div key={index}>
                                    {
                                        (typeof(item.internationl) == 'object') ? 
                                        <div>
                                            {
                                                item.internationl.map((subitem, id) => <PopularAirlinesItem key={id} subitem={subitem}/>)
                                            }
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                )
                            }
                        </div>
                        <div className="col-image">
                            <h3><FormattedMessage id="popular.domestic" /></h3>
                            {                                            
                                popularAirlines.map((item, index)=> 
                                <div key={index}>
                                    {
                                        (typeof(item.domestic) == 'object') ? 
                                        <div>
                                            {
                                                item.domestic.map((subitem, id) => <PopularAirlinesItem key={id} subitem={subitem}/>)
                                            }
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                )
                            }
                        </div>
                    </div>
                </div>               
            </div>
        );  
    }
}

export default PopularAirlines;