import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

function Button(props) {
    return (
        <button 
            style={{border:"0"}} 
            type="primary"                                        
            className="btn-orange btn-search-big"   
            onClick={()=> props.callbackParent()}                                                                     
        >                                
            <FormattedMessage id="search.btn.search" />
        </button>
    )
}

export default Button;