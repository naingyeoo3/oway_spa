import React, { Component } from 'react';
import '../styles/popular-routes.scss'

class PopularRoutesItem extends Component {                
    constructor(props){
        super(props);
    }
    
    render(){
        const { item } = this.props;
        return (
            <div 
                className="route-list" 
                onClick={()=> this.props.callbackFunDept(item.from, item.fromKeyword, item.to, item.toKeyword)}>            
                {this.props.name == 'flight' ? item.fromName : item.from}
                <span className="route-icon"></span>
                {this.props.name == 'flight' ? item.toName : item.to}
            </div>
        );
    }        
}   
export default PopularRoutesItem;