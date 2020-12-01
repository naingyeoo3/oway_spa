import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../utils/history'
import update from 'react-addons-update'
import AppMenuBar from './AppMenuBar'
import { DEV_URL } from '../../constants/credentials'
import { FormattedMessage } from 'react-intl'
import NewsletterModelbox from '../../components/NewsletterModelbox';

import moment from 'moment';
const dateFormat = 'DD MMM YYYY';

import { 
    Drawer, 
    Button,
    Avatar,
    Modal,
    Collapse
} from 'antd'
import { 
    updatePromotionShow,
    closePromotionShow
} from '../../actions/applicationBarActions';


import { sentUserSubscribe } from '../../actions/subscribeActions';

import { SUBSCRIBE_API_KEY } from '../../constants/credentials';

import './mobile-nav-bar.scss';

import IntegreatedIcon from '../../components/Icon';
import Subscribe from '../../components/Subscribe'

const logo_img  = require('../../assests/images/oway-blue-logo.png')
const menuIcon = require('../../assests/images/svg/menu.svg')
const mobileInstall = require('../../assests/images/svg/oway-mobile-install.svg')

const android_download_link = `https://play.google.com/store/apps/details?id=com.mobile.oway.myapplication`;
const ios_download_link = `https://itunes.apple.com/us/app/oway-travel/id1314252839?ls=1&mt=8`;

const advImage = require('../../assests/images/png/thingyan-adv.png')
const aboutImage = require('../../assests/images/svg/m_about.svg')
const otherImage = require('../../assests/images/svg/m_others.svg')

const { Panel } = Collapse;
const getAboutIcon = () => (
    <img src={aboutImage} alt="About Oway" width="100%" />
);
const getOtherIcon = () => (
    <img src={otherImage} alt="Others" width="100%" />
);

class MobileNavBar extends Component {
    constructor(props){
        super(props);
        this.state={
            visible: false,
            userInfo: null,
            isAppInstall: true,
            visibleModal: true,
            expandIconPosition: 'right',
            showArrow: false,
            isPromoOpen: false
        }
    } 
    // handleClickMenu = (e) => {    
    //     history.push(e.key)            
    //     this.props.callbackParentMenuChange(e)
    //     this.setState(update(this.state,{$set:{visible:false,}}));
    //   }; 
    componentDidMount(){
        this.setState({userInfo: JSON.parse(localStorage.getItem('oway_user_info'))}) 
        this.loadPromotionModal();
        setTimeout(() => {
            !this.state.isPromoOpen ? this.setState({isPromoOpen: true}) : null
        }, 7000);   
    }
    showDrawer = () => {
        this.setState(update(this.state,{$set:{visible: true}}));            
    };
    
    onClose = () => {
        this.setState(update(this.state,{$set:{visible: false}}));         
    };   
    checkUserLogin = () => this.state.userInfo != null;
    checkAgentLogin = () => !!this.state.userInfo.hasOwnProperty('agentsignIn');  
    handleAccountChange(keyword){        
        if(keyword == 'logout'){
            window.localStorage.removeItem('oway_user_info')
            window.open(`${DEV_URL}/logout`, '_self')
        }
        if(keyword == 'profile'){            
            window.open(`${DEV_URL}/personal-information/${this.state.userInfo.token}`, '_self')
        }     
    }
    checkPlatform = () => {
        const detect_str = window.navigator.userAgent;        
        if(detect_str.includes("Android")){
          return android_download_link;
        }
        if(detect_str.includes("iPhone OS")){
          return ios_download_link;
        }
        if(window.navigator.userAgent.indexOf('Mac OS X') != -1){
            return ios_download_link;
        }
        return android_download_link;
    }
    closeAppInstall () {
        this.setState({
            isAppInstall: !this.state.isAppInstall
        })
      }
    gotPromotion(){
        const { navbarOptions, locales } = this.props;
        window.open(`${DEV_URL}/thingyan-hotel-sale/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_blank')
    }
    loadPromotionModal(){
        const { navbarOptions } = this.props;                   
        var date1 = new Date(navbarOptions.promotion.show_date);        
        var date2 = new Date();
        var long_time = Math.abs(date2.getTime() - date1.getTime());
        var day = Math.ceil(long_time / (1000 * 3600 * 24));

        if(day > 1){
            this.props.updatePromotionShow(new Date());
        }else{
            this.props.closePromotionShow(new Date());
        }        
    }
    closePromotionModal = e => this.props.closePromotionShow(new Date())

    hasOnePay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.onepay_token;
    hasWavePay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.wavepay_token;
    hasKbzPay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.kbzpay_token;

    isPayment = () => this.hasOnePay() || this.hasWavePay() || this.hasKbzPay();

    subscribeemail(val){
        const payload = {            
            "email": val,             
            "ipAddress": "122.248.100.141",             
            "apiKey": SUBSCRIBE_API_KEY
        } 
        this.props.sentUserSubscribe(payload); 
      } 

    getPromotionModal(){     
        if(this.isPayment()){
            return null;
        }else{
            return (                
                <Modal
                    // visible={this.props.navbarOptions.promotion.open}                    
                    // onCancel={this.closePromotionModal}
                    // footer={null}
                    // className="advertising"
                    // centered
                    visible={this.props.navbarOptions.promotion.open}                                        
                    title={false}                    
                    // onOk={this.handleOk}
                    onCancel={this.closePromotionModal}
                    width={500}
                    wrapClassName="newsletter-modal"
                    
                >                
                    <Subscribe 
                        subscribeemail={(params) => this.subscribeemail(params)}
                    />
                    <div style={{textAlign:"center", paddingBottom:"10px"}}>
                        <a link="#" key="back" size="large" style={{textDecoration:"underline",color:'#002955'}} onClick={this.closePromotionModal}>No, thanks!</a>
                    </div>
                    
                    {/* <img src={advImage}  alt="Thingyang Hotel Sale" width="100%" onClick={()=> this.gotPromotion()} />                     */}
                </Modal>
            )        
        }        
    }
    render() {
        const { userInfo, expandIconPosition, showArrow } = this.state;
        const { isOnAnotherApp } = this.props;
        return (
            <div>                 
                <div>                    
                    { this.state.isPromoOpen && this.getPromotionModal()}
                </div> 
                {
                    !isOnAnotherApp &&  (
                        <div>
                        {
                            this.state.isAppInstall &&
                            <div className="mobile-install">
                                <span
                                    onClick={this.closeAppInstall.bind(this)}
                                >
                                    <IntegreatedIcon type="close" />
                                </span>
                                <div className="info">
                                    <img src={mobileInstall} alt="Oway App" />
                                    <p>
                                        Oway Travel <span>Download Free</span>
                                    </p>
                                </div>
                                <div className="button">
                                    <a href={this.checkPlatform()} target="_blank" rel="noopener" title="Oway Mobile App Download">
                                        Install
                                    </a>
                                </div>
                            </div>
                        }
                    </div>
                    )
                }
                <div className={this.props.router.location.pathname == '/' ? "mobile-top-menu" : "mobile-top-menu scroll-menu" }>
                    <div>
                        <img src={logo_img} alt="logo image" />
                    </div>
                    <div>  
                        <Button onClick={this.showDrawer}>
                            <img src={menuIcon} alt="menu icon" />                                                 
                        </Button>                        
                    </div>                    
                   <div className="drawer-wrapper">
                    <Drawer                        
                            placement="left"
                            closable={true}
                            width="85%"
                            onClose={this.onClose}
                            visible={this.state.visible}
                            className="mobile-menu-drawer"
                        >
                            <AppMenuBar                                 
                                currentMenu={this.props.currentMenu}
                                menuMode="inline"
                                callbackNavDrawer={()=> this.onClose()}
                                isMobile={true}
                            />
                            <ul className="mobile-extra-menu"
                            style={
                                this.props.locales.lang == 'en' ? {fontFamily:"'Lato', sans-serif"} : {fontFamily:"Pyidaungsu"}
                                }
                            >
                                {
                                this.checkUserLogin() ?
                                    <div>
                                        <li onClick={()=>this.handleAccountChange('profile')}>                                                                                                            
                                            <a href="#" title="My Profile | Oway Travel &amp; Tours">
                                                <img src={require('../../assests/images/svg/m_account.svg')} alt="account svg"/>
                                                <FormattedMessage id="menu.myprofile" />
                                            </a>
                                        </li> 
                                        <li>
                                            <a href={`${DEV_URL}/add-top-up`} title="Add Top Up | Oway Travel &amp; Tours">                                                        
                                                <img src={require('../../assests/images/svg/m_topup.svg')} alt="Top Up" />
                                                <FormattedMessage id="menu.topup" />
                                            </a>
                                        </li>
                                        <li onClick={()=>this.handleAccountChange('logout')}>                                                                                                            
                                            <a  href="#" title="Log Out | Oway Travel &amp; Tours">
                                                <img src={require('../../assests/images/svg/m_logout.svg')} alt="Logout" />
                                                <FormattedMessage id="menu.logout" />
                                            </a>
                                        </li>                                                                                                                        
                                    </div>
                                    :
                                    <div>
                                        <li>
                                            <a href={`${DEV_URL}/sign-in`} title="Oway Login | Oway Travel &amp; Tours">
                                                <img src={require('../../assests/images/svg/m_login.svg')} alt="Oway mobile login"/>
                                                <FormattedMessage id="menu.login" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={`${DEV_URL}/agent-sign-in`} title="Oway Agent Login | Oway Travel &amp; Tours">
                                                <img src={require('../../assests/images/svg/m_agent_login.svg')} alt="Oway mobile Agent login" />
                                                <FormattedMessage id="menu.agentlogin" />
                                            </a>
                                        </li>
                                    </div>
                                }                                
                                <li>
                                    <a href={`${DEV_URL}/track-booking-status`} title="Track Booking | Oway Travel &amp; Tours">
                                        <img src={require('../../assests/images/svg/m_track_booking.svg')} alt="Oway mobile login" />
                                        <FormattedMessage id="menu.trackbooking" />
                                    </a>      
                                </li>                         
                                <li>
                                    <a href="tel:+9512318939" title="(+95) 1 231 8939">
                                        <img src={require('../../assests/images/svg/m_callus.svg')} alt="Oway mobile Callcenter" />
                                        <FormattedMessage id="menu.callus" />
                                    </a>      
                                </li>                                
                            </ul>                            
                            <ul className="mobile-extra-menu extra-footer-menu"
                            style={
                                this.props.locales.lang == 'en' ? {fontFamily:"'Lato', sans-serif"} : {fontFamily:"Pyidaungsu"}
                                }
                            >
                                <Collapse bordered={false} expandIconPosition={expandIconPosition} className="mobile-sub-extra">
                                    <Panel header={<FormattedMessage id="footer.about.oway" />} extra={getAboutIcon()} showArrow={showArrow}>
                                        <a href={`${DEV_URL}/about-us`} title="About Us | Oway Travel &amp; Tours">
                                            <FormattedMessage id="footer.menu.about" />
                                        </a>
                                        <a href={`${DEV_URL}/our-team`} title="Learn more about Oway Team | Oway Travel &amp; Tours">
                                            <FormattedMessage id="footer.menu.team" />
                                        </a>
                                        <a href={`${DEV_URL}/our-partners`} title="Learn more about Oway's Partners | Oway Travel &amp; Tours">
                                            <FormattedMessage id="footer.menu.partner" />
                                        </a>
                                        <a href={`${DEV_URL}/testimonials`} title="The testimonials of Oway's Clients | Oway Travel &amp; Tours">
                                            <FormattedMessage id="footer.menu.testimonials" />
                                        </a>
                                        <a href={`https://blog.oway.com.mm/`} title="Blog | Oway Travel &amp; Tours" target="_blank">
                                            <FormattedMessage id="footer.menu.blog" />
                                        </a>
                                    </Panel>
                                </Collapse>
                                <li>
                                    <a href={`${DEV_URL}/faq`} title="Frequently Asked Questions | Oway Travel &amp; Tours">
                                        <img src={require('../../assests/images/svg/m_faqs.svg')} alt="FAQs" />
                                        <FormattedMessage id="menu.faqs" />
                                    </a>      
                                </li>
                                <li>
                                    <a href={`${DEV_URL}/careers`} title="Careers | Oway Travel &amp; Tours">
                                        <img src={require('../../assests/images/svg/m_careers.svg')} alt="Careers" />
                                        <FormattedMessage id="footer.menu.career" />
                                    </a>      
                                </li> 
                                <li>
                                    <NewsletterModelbox 
                                    callbackNavDrawer={()=> this.onClose()}
                                    isMobile={true}  
                                    />
                                </li>                        
                                <li>
                                    <a href={`${DEV_URL}/contact-us`} title="Contact Us | Oway Travel &amp; Tours">
                                        <img src={require('../../assests/images/svg/m_contactus.svg')} alt="Contact Us" />
                                        <FormattedMessage id="footer.menu.contact" />
                                    </a>
                                </li>
                               
                                <Collapse bordered={false} expandIconPosition={expandIconPosition} className="mobile-sub-extra">
                                    <Panel header={<FormattedMessage id="footer.others" />} extra={getOtherIcon()} showArrow={showArrow}>
                                        <a href={`${DEV_URL}/privacy-notice`} title="Privacy Policy | Oway Travel &amp; Tours">
                                            <FormattedMessage id="footer.menu.privacynotice" />
                                        </a>
                                        <a href={`${DEV_URL}/information-security-policy`} title="Information Security Policy | Oway Travel &amp; Tours">
                                            <FormattedMessage id="footer.menu.informationsecuritypolicy" />
                                        </a>
                                        <a href={`${DEV_URL}/terms-of-services`} title="Terms &amp; Conditions | Oway Travel &amp; Tours">
                                            <FormattedMessage id="footer.menu.termsofservices" />
                                        </a>
                                        <a href={`${DEV_URL}/website-terms-of-use`} title="Website Terms of Use | Oway Travel &amp; Tours">
                                            <FormattedMessage id="footer.menu.websitetermsofuse" />
                                        </a>
                                    </Panel>
                                </Collapse>
                                <li className="mobile-app-download">                                 
                                    <a href={this.checkPlatform()} rel="noopener" target="_blank" title="Download the app now!">
                                        <img src={require('../../assests/images/svg/m_download.svg')} alt="Download the app now!" />
                                        <FormattedMessage id="footer.mobile.apps" />
                                    </a>
                                </li>
                            </ul>
                        </Drawer>
                   </div>
                </div>           
               
                   
            </div>
        );
    }
}
const mapStateToProps = state => ({ 
    navbarOptions : state.navbarOptions,
    locales       : state.locales,
    router        : state.router
 }); 
 const mapDispatchToProps = dispatch => {
    return{     
        updatePromotionShow : (date) => dispatch(updatePromotionShow(date)),
        closePromotionShow : (date) => dispatch(closePromotionShow(date)),
        sentUserSubscribe: (params)=> dispatch(sentUserSubscribe(params))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MobileNavBar);