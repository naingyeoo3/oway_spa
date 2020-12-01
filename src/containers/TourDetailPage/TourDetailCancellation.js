import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
 
const TourDetailCancellation = (props) =>(
    <div className="card">
        <h2 className="heading heading-md heading-primary">Cancellation</h2>
        <div>{ReactHtmlParser(props.policies && props.policies.cancellation)}</div>
    </div>
)    
 
export default TourDetailCancellation;