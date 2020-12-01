import React, { Component } from 'react';

import { Collapse } from 'antd';

const { Panel } = Collapse;
 
class TourDetailInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
     
    render() { 
        return (
            <div className="card itinerary-info" id="itinerary-info">
                <h2 className="heading heading-md heading-primary">Itinerary info</h2>
                <Collapse bordered={false} defaultActiveKey={['1']} expandIconPosition="right">
                    {
                        this.props.itineraries && this.props.itineraries.map((item, index)=> (
                            <Panel 
                                header={
                                    <div className="title">
                                        <span className="badge badge-primary font-size-15">Day - {item.dayNumber + 1}</span>
                                        <h2 className="heading heading-md heading-gray">{item.title}</h2>
                                    </div>
                                } 
                                key={index.toString()}>                                
                                <div>
                                    <img src={item.image.path} alt={item.title} />
                                    <div style={{backgroundImage: `url(${item.image.path})`,}}/>
                                    <p>{item.description}</p>
                                </div>                                                                    
                            </Panel>
                        ))
                    }                    
                </Collapse>
            </div>
        );
    }
}
 
export default TourDetailInfo;