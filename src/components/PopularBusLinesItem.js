import React from 'react';
import '../styles/popular-buslines.scss';

function PopularBusLinesItem(props) {
    return (             
        <img src={require(`../assests/images/jpg/buslinelogos/${props.item.img}`)} alt={props.item.alt} /> // eslint-disable-line no-console
    );   
}   
export default PopularBusLinesItem;