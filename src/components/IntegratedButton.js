import React, { Component } from 'react';


function IntegratedButton(props) {
    return(
        <button 
            variant = {!!props.variant ? props.variant : 'contained'}
            color   = {!!props.color ? props.color : 'default'}   

        >
            {!!props.text ? props.text : 'Default'}
        </button>
    )
}

export default IntegratedButton;