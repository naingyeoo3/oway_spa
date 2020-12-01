import React, { Component } from 'react';
import { Tooltip } from 'antd';
import './hotel-checkout-item.scss';
 
class HotelCheckoutItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    renderAmenities(items){
        return  (items.length > 5)?
          items.map((item,index)=>{
                 if(index < 5)
                 return (
                    <p key={index}>
                        <Tooltip placement="top" title={item.name}>
                            <img src={item.icon} alt={item.name}/>
                        </Tooltip>
                    </p>
                 ) 
                 
              })
         :  
         items.map((item,index)=>{
             return (
                <p key={index}>
                    <Tooltip placement="top" title={item.name}>
                        <img src={item.icon} alt={item.name}/>
                    </Tooltip>
                </p>
             )
          })   
     }     
    render() { 
        const { detail } = this.props;
        if(detail){
            return (
                <div className="listing-item">
                    <div className="col-image text-over-image">
                        <img src={detail.images[0].url}  />
                    </div>
                    <div className="col-info">
                        <div className="location">
                            <img src={require(`../../assests/images/png/map.png`)} alt="Location"/>
                            <span>{detail.location.address}</span>
                        </div>
                        <div className="include-features">
                            {this.renderAmenities(detail.amenities)}
                        </div>
                    </div>
                </div>
            );
        }else{
            <div />
        }
        
    }
}
 
export default HotelCheckoutItem;