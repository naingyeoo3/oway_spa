import React, { Component } from 'react';
function Image(props) {                
    return (
        <div className='payment-icon' key={props.img.id}>
            <img src={require(`../assests/images/svg/${props.img.img_url}`)} alt={props.img.alt} title={props.img.title} /> 
        </div> 
    );    
}   
export default Image;