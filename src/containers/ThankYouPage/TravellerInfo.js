import React, { Component } from 'react';
 
class TravellerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
     
    render() { 
        const { travellers } = this.props;
        if(travellers){
            return (
                <div>
                    <h3 className="heading heading-sm heading-primary">Traveller info:</h3>
                    <div className="passenger-info">
                        <div className="title">
                            <div>Name</div>                            
                            <div>Place of issue</div>
                            <div>Passport No.</div>                            
                            <div>Date of Expiry</div>
                        </div>
                        {
                        travellers && travellers.map((traveller, index)=>(
                            <div key={index} className="info">
                                <div>{traveller.firstName}{" "}{traveller.lastName}</div>                                
                                <div>{traveller.country}</div>
                                <div>{traveller.passportNum}</div>
                                <div>{traveller.passportExpire}</div>
                            </div>
                        ))
                        }
                    </div>
                    
                </div>
            );
        }else{
            return ( <div />)
        }
        
    }
}
 
export default TravellerInfo;