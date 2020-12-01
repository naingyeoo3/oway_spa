import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
 
const AttrDetailCancellation = (props) =>(
    <div className="card">
        <h2 className="heading heading-md heading-primary">Cancellation</h2>
        <div>{ReactHtmlParser(props.policies && props.policies.cancellation)}</div>
    </div>
)    
 
export default AttrDetailCancellation;