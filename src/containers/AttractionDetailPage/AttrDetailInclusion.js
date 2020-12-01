import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
 
const AttrDetailInclusion  = (props) => (
            <div className="card">
                <h2 className="heading heading-md heading-primary">Inclusion</h2>
                <div>{ReactHtmlParser(props.conditions && props.conditions.inclusion)}</div>
            </div>
        );
 
export default AttrDetailInclusion;