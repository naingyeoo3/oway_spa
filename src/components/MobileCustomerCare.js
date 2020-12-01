import React, { Component } from 'react';

import CustomerCare from './CustomerCare';

import { customerCareContent } from '../constants/constants'

class MobileCustomerCare extends Component {
    render() {
        return (            
          <div className="app-container content-padding hidden-md customer-care-warp"> 
            <h2 className='header-title'>
                Why Booking with Oway
            </h2>
            <div className="row">
                {
                    customerCareContent.map((item,index) => {
                        return(
                            <div className="col-md-4">
                                <CustomerCare desData={item} key={index} />
                            </div>
                        )
                    })
                }
            </div>
          </div>
        );
    }
}
export default MobileCustomerCare;