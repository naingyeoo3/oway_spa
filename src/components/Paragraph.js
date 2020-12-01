import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'

function Paragraph(props){
    return(        
       
    <div key={props.footerContent.id}>
        <h2 className="header-title"><FormattedHTMLMessage id={props.footerContent.title} /></h2>
        <p><FormattedHTMLMessage id={props.footerContent.content} /></p> 
        
    </div>  
    )
}

export default Paragraph;