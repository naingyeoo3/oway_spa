import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
 
const TourDetailExclusion = (props) =>(        
            <div className="card">
                <h2 className="heading heading-md heading-primary">Exclusion</h2>
                <div>{ReactHtmlParser(props.conditions && props.conditions.exclusion)}</div>
            </div>
        );

export default TourDetailExclusion;