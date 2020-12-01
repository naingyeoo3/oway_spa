import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
 
const TourDetailChildPolicy = (props) =>(
    <div className="card">
        <h2 className="heading heading-md heading-primary">Child Policy</h2>
        <div>{ReactHtmlParser(props.policies && props.policies.child)}</div>
    </div>
)
 
export default TourDetailChildPolicy;