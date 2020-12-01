import React from 'react'
import moment from 'moment';


import ImageLink from '../../components/ImageLink'
import List from '../../components/List'
import Image from '../../components/Image'
import FooterService from './FooterService'
import { DEV_URL } from '../../constants/credentials'



import { 
    payment,
    autorizeImg,
    privacy,
    products,
    company,
    appDownload,
    mobileSocialMenu 
}  from '../../constants/constants';


import './application-footer.scss'

import './application-footer.scss'
import { FormattedMessage } from 'react-intl'

const logo_img  = require('../../assests/images/oway-logo-white.png')
import { connect } from 'react-redux'


class ApplicationFooter extends React.Component{
    
    
    render(){
        return(
            <div className="footer-container">    
                 
                    <div className={this.props.router.location.pathname=='/myanmar_visa' || this.props.router.location.pathname=='/car_rental'  || this.props.router.location.pathname=='/oway_ride' ? 'footer-service bg-color hidden-xs clearfix' : 'footer-service hidden-xs clearfix'}>
                        <FooterService />
                    </div>    
                    <div className="footer-link  hidden-xs">
                        <div className="app-container ">
                            <div className="row">
                                
                                <div className="col-md-4">
                                    <a href="http://oway.com.mm" title="Oway Travel &amp; Tours" className="logo">
                                        <img src={logo_img} alt="Oway Travel &amp; Tours" />
                                    </a>
                                    <div className=" oway-contact clearfix">  
                                        <span className='contact-us'>
                                            <FormattedMessage id="footer.contact.us" />
                                            <a href="tel:+95-1-231-8939" title ="Call Us" className="clearfix">+95-1-231-8939</a>
                                        </span>    
                                    </div> 
                                    <div className="left-img">
                                        {
                                        autorizeImg.map( (data,index)=> (
                                            <Image key={index} img={data} />
                                        ))
                                    }
                                    </div>
                                    
                                    <div className=" clearfix col-md-9 row">
                                    <h2><FormattedMessage id="footer.we.accept" /></h2>
                                        {
                                        payment.map( (data,index)=> (
                                            <Image key={index} img={data} />
                                        ))
                                        }
                                    </div> 
                                </div>
                                <div className="col-md-8">
                                    <div className="col-md-4 "> 
                                        <List listname={products} productsList={true} name={<FormattedMessage id="footer.products" />} />
                                        <div className="app-download">
                                            <h2><FormattedMessage id="footer.apps" /></h2>
                                            {
                                                appDownload.map( (data,index)=> (
                                                <ImageLink key={index} img_link={data} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-4"> <List listname={company} name={<FormattedMessage id="footer.about.oway" />} /></div>
                                    <div className="col-md-4">
                                        <List listname={privacy} name={<FormattedMessage id="footer.others" />} />
                                        <div className="social-icon">
                                            <h2><FormattedMessage id="footer.socials" /></h2>
                                            {
                                                mobileSocialMenu.map( (data,index)=> (
                                                    <ImageLink key={index} img_link={data} />
                                                ))
                                            }
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bar clearfix ">
                        <div className="app-container">
                            <div className="mobile-social-icon hidden-md">
                                {
                                    mobileSocialMenu.map( (data,index)=> (
                                    <ImageLink key={index} img_link={data} />
                                    ))
                                }
                            </div>
                            <div className=" text-center copyright-bar">                        
                                <p>Copyright © {moment().year()} oway.com.mm</p>                                
                            </div>
                        </div>
                    </div>
                          
            </div>
        )
    }  
    
}
const mapStateToProps = state => ({
    router : state.router,
    
});
const mapDispatchToProps = dispatch => {
    return{                     

    }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(ApplicationFooter);