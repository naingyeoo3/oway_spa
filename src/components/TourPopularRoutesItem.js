import React, { Component } from 'react';
import '../styles/popular-routes.scss'

class TourPopularRoutesItem extends Component {                
    constructor(props){
        super(props);
    }    
    handleClick = (item) => {
        const tourDestination = {
            cityId: item.cityId,
            name: item.cityName
        }
        this.props.callbackFunDept(tourDestination);
    }    
    render(){
        const { item } = this.props;
        return (
            <div 
                className="route-list" 
                onClick={()=> this.handleClick(item)}>                            
                {item.cityName}
            </div>
        );
    }        
}   
export default TourPopularRoutesItem;