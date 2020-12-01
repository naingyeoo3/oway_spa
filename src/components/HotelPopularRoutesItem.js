import React, { Component } from 'react';
import '../styles/popular-routes.scss'

class HotelPopularRoutesItem extends Component {                
    constructor(props){
        super(props);
    }    
    handleClick = (item) => {
        const destination = {
            name: item.keyword,
            slug: item.slug,
            scope: item.scope,
            region: item.region
        }        
        this.props.callbackFunDept(destination)
    }    
    render(){
        const { item } = this.props;
        return (
            <div 
                className="route-list" 
                onClick={()=>{this.props.isRoute ? this.handleClickTour(item) : this.handleClick(item)}}>                            
                {item.keyword}
            </div>
        );
    }        
}   
export default HotelPopularRoutesItem;