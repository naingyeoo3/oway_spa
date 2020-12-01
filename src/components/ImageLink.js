import React, { Component } from 'react';

function ImageLink(props) {                
    return (
        <div key={props.img_link.id}>
            <a href={props.img_link.link_url} rel="noopener" target="_blank" title={props.img_link.title}>
                <img src={require(`../assests/images/svg/${props.img_link.img_url}`)} alt={props.img_link.alt} /> 
            </a> 
        </div> 
    );    
}   
export default ImageLink;