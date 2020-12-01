import React from 'react';
import '../styles/popular-name.scss';

function PopularAirlinesItem(props) {
    return (
        <img src={require(`../assests/images/jpg/airlinelogos/${props.subitem.img}`)} alt={props.subitem.alt} />
    );   
}   
export default PopularAirlinesItem;