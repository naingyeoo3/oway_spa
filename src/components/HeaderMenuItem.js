import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

function HeaderMenuItem(props){
    return(
        <li key={props.menuData.id}>            
            <img src={require(`../assests/images/svg/${props.menuData.icon}`)}/>            
            <div><FormattedMessage id={props.menuData.title} /></div>            
        </li>        

    )
}

export default HeaderMenuItem;