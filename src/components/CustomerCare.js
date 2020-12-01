import React, { Component } from 'react';

function CustomerCare(props){
    return(        
    <div key={props.desData.id} className="customer-care text-center">  
       <a href={props.desData.link} title="Customer Care"> <img src={require(`../assests/images/svg/${props.desData.img_url}`)}/>             
        <p>{props.desData.desc}</p>  </a>          
    </div>   
    )
}

export default CustomerCare;
