import React, {  PureComponent } from 'react';

import Paragraph from '../../components/Paragraph.js';

import {flightFooterContent} from  '../../constants/constants';

class FooterService extends PureComponent {
  render() {
    return (
      <div className="app-container footer-paragraph">
        <div className="row">
            {
                flightFooterContent.map((data,index) => {
                
                return ( <div className="col-md-6" key={index}>  <Paragraph footerContent={data}/> </div> )
                })
          }
        </div>
      </div> 
    )
  }
 }

export default FooterService;