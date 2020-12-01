import React, { Component } from 'react';
import { connect } from 'react-redux'
import history from '../../utils/history'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import { Menu, Avatar, Dropdown} from 'antd';
import { Mobile, Web } from '../../constants/helper';

import { 
    setOptionMenu,
    handleLocaleChange, 
    changeNationalType, 
    changeCurrencyUnit
} from '../../actions/applicationBarActions';

import {     
    handleRefreshState,
    handleRefreshStateEnd,
    handleDefaultValueSearchComponent    
} from '../../actions/searchComponentActions'

import { setVisaFormData } from '../../actions/formActions'

import { 
    flightState, 
    busesState, 
    hotelsState, 
    toursState,
    toursattractionState 
} from '../../constants/defaultSearchStates';

import { DEV_URL } from '../../constants/credentials';
import IntegreatedIcon from '../../components/Icon';

const logo_img  = require('../../assests/images/oway_logo.png');
const oway_logo_blue= require('../../assests/images/oway-blue-logo.png');

import messages_mm from "../../assests/resources/i18n/mm.json";
import messages_en from "../../assests/resources/i18n/en.json";

const { SubMenu } = Menu;

class AppMenuBar extends Component {
    constructor(props){
        super(props);
        this.state={
            visibleAccount: false,
            scrollStepInPx: 50, 
            delayInMs: 16.66,
            intervalId: 0,
            userInfo: null
        }
    }
    componentDidMount(){
        const { router } = this.props;    
        this.setState({userInfo: JSON.parse(localStorage.getItem('oway_user_info'))})    
        if(this.props.isSticky == undefined){
            this.setDefaultValueSearchComponent(router.location.pathname);        
        }        
        this.props.handleRefreshState()
        setTimeout(() => {
            this.props.handleRefreshStateEnd()    
        }, 300);
        this.props.setOptionMenu(router.location.pathname);
    }
    scrollStep() {
        if(this.props.isListing){
            clearInterval(this.state.intervalId);
            return;
        }
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.state.scrollStepInPx);
    }
      
    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.state.delayInMs);
        this.setState({ intervalId: intervalId });
    }
    refreshState(){
        this.props.handleRefreshState()
        setTimeout(() => {
            this.props.handleRefreshStateEnd()    
        }, 100);
    }
    setFlightValue(){
        this.props.handleDefaultValueSearchComponent(flightState)
        this.refreshState()
    }
    setBusesValue(){
        this.props.handleDefaultValueSearchComponent(busesState)
        this.refreshState()
    }
    setHotelsValue(){
        this.props.handleDefaultValueSearchComponent(hotelsState)
        this.refreshState()
    }
    setToursValue(){
        this.props.handleDefaultValueSearchComponent(toursState)
        this.refreshState()
    }
    setToursAttractionValue(){
        this.props.handleDefaultValueSearchComponent(toursattractionState)
        this.refreshState()
    }
    setvisaValue(){
        this.props.handleDefaultValueSearchComponent(hotelsState)
        this.props.setVisaFormData()
    }
    setDefaultValueSearchComponent = (menu) => {                 
        switch (menu) {
            case '/':
                return this.setFlightValue();
                break;
            case '/flights':
                return this.setFlightValue();
                break;
            case '/buses':
                return this.setBusesValue();
                break;
            case '/hotels':
                return this.setHotelsValue();
                break;
            case '/tours':
                return this.setToursValue();
                break;
            case '/attractions':
                    return this.setToursAttractionValue();
                    break;
            case '/myanmar_visa':
                return this.setvisaValue();
            default:
                break;
        }
    }
    checkTopHeaderAction = (route) => {        
        switch (route) {
            case '/national_myanmar':                 
                this.props.changeNationalType('l','Myanmar Citizen','local')
                this.props.callbackNavDrawer()
                break;
            case '/foreigner':                    
                this.props.changeNationalType('f','Foreigner','foreign')
                this.props.callbackNavDrawer()
                break;
            case '/my':                    
                this.props.handleLocaleChange('my',messages_mm, 'mm');
                this.props.callbackNavDrawer()
                break;
            case '/en':                
                this.props.handleLocaleChange('en',messages_en, 'en');
                this.props.callbackNavDrawer()
                break;
            case '/usd':                    
                this.props.changeCurrencyUnit('usd','USD')
                this.props.callbackNavDrawer()
                break;
            case '/mmk':                    
                this.props.changeCurrencyUnit('mmk','MMK')
                this.props.callbackNavDrawer()
                break;
            default:
            break;
        }
    }
    handleClick = e => {   
        // if submenu action         
        if(e.keyPath[1] == 'sub_menu_1' || e.keyPath[1] == 'sub_menu_2' || e.keyPath[1] == 'sub_menu_3'){
            this.checkTopHeaderAction(e.key);
        }else{        
                history.push(e.key);
                // if(e.key == '/car_rental'){
                //     window.open('http://cars.oway.com.mm/resportaloway.htm', '_blank')  
                //     history.push('/')              
                // }                                
                this.setDefaultValueSearchComponent(e.key);
                this.props.setOptionMenu(e.key);
                if(this.props.isSticky){                    
                    this.scrollToTop()
                    this.props.handleRefreshState()
                    setTimeout(() => {
                        this.props.handleRefreshStateEnd()    
                    }, 300);
                }
                if(this.props.isMobile){
                    this.props.callbackNavDrawer()
                }
                if(this.props.isMobileSticky){
                    this.scrollToTop()
                }                               
        }                
    };

    handleAccountVisible = () => {
        this.setState({visibleAccount: true})
    }
    handleAccountChange(keyword){
        if(keyword == 'login'){
            window.open(`${DEV_URL}/sign-in`, '_self')
        }
        if(keyword == 'agent'){
            window.open(`${DEV_URL}/agent-sign-in`, '_self')
        }
        if(keyword == 'register'){
            window.open(`${DEV_URL}/register`, '_self')
        }
        if(keyword == 'logout'){
            window.localStorage.removeItem('oway_user_info')
            window.open(`${DEV_URL}/logout`, '_self')
        }
        if(keyword == 'profile'){            
            window.open(`${DEV_URL}/personal-information/${this.state.userInfo.token}`, '_self')
        }        
    }
    getActiveClass = (type,value) => {
        if(type==value){
            return 'active'
        }else{
            return ''
        }
    }
    checkUserLogin = () => this.state.userInfo != null;
    checkAgentLogin = () => !!this.state.userInfo.hasOwnProperty('agentsignIn');
    checkProfileImg = () => !!this.state.userInfo.hasOwnProperty('profileImage') && !!this.state.userInfo.profileImage;
    render() {        
        const { userInfo } = this.state;
        return (
            <div className="menu-header">            
                <div className="menu-header-layout">
                {
                    this.props.isSticky ?                    
                        <div className="app-logo" onClick={()=> this.scrollToTop()}>
                            <Link to="/" title="Oway Travel and Tours">
                                <img onClick={()=> this.handleClick({key:"/", keyPath:"/"})} src={oway_logo_blue} alt="Oway Travel and Tours" />
                            </Link>
                        </div>
                    
                        :
                        <Web>
                            <div className="app-logo">
                                <Link to="/" title="Oway Travel and Tours">
                                    <img onClick={()=> this.handleClick({key:"/", keyPath:"/"})} src={logo_img} alt="Oway Travel and Tours" />
                                </Link>
                                <p>Your Travel Partner in Myanmar</p>
                            </div>
                        </Web>
                }                
                <div className="app-menu"
                    style={
                        this.props.locales.lang == 'en' ? {fontFamily:"'Lato', sans-serif"} : {fontFamily:"Pyidaungsu"}
                        }
                >
                    <Menu 
                        onClick={this.handleClick} 
                        selectedKeys={this.props.navbarOptions.menu == '/'? ['/flights']:[this.props.navbarOptions.menu]} 
                        mode={this.props.menuMode}
                        defaultSelectedKeys={['1']} 
                        defaultOpenKeys={['sub1']}
                        theme="light"                       
                    >                        
                        <Menu.Item className="menu-item home" key="/" title="Oway Travel &amp; Tours">
                            <img src={require('../../assests/images/svg/m_home.svg')} alt="Home" />            
                            <h5><FormattedMessage id="header.menu.home" /></h5>
                        </Menu.Item>
                        <Menu.Item className="menu-item" key="/flights" title="Flight Booking | Oway Travel &amp; Tours">
                            <img src={require('../../assests/images/svg/m_flight.svg')} alt="Flights" />            
                            <h5><FormattedMessage id="header.menu.flight" /></h5>
                        </Menu.Item>
                        <Menu.Item className="menu-item" key="/hotels" title="Hotel Booking | Oway Travel &amp; Tours">
                            <img src={require('../../assests/images/svg/m_hotel.svg')} alt="Hotels" />                        
                            <h5><FormattedMessage id="header.menu.hotel" /></h5>
                        </Menu.Item>           
                        <Menu.Item className="menu-item" key="/buses" title="Bus Booking | Oway Travel &amp; Tours">
                            <img src={require('../../assests/images/svg/m_bus.svg')} alt="Bus" />            
                            <h5><FormattedMessage id="header.menu.bus" /></h5> 
                        </Menu.Item>
                        <Menu.Item className="menu-item" key="/tours" title="Famous Destinations | Oway Travel &amp; Tours">
                            <img src={require('../../assests/images/svg/23_tournew.svg')} alt="Tours" />            
                            <h5><FormattedMessage id="header.menu.tour" /></h5> 
                        </Menu.Item>
                        <Menu.Item className="menu-item" key="/attractions" title="Famous Attractions | Oway Travel &amp; Tours">
                            <img src={require('../../assests/images/svg/24_attraction.svg')} alt="Tours" />            
                            <h5><FormattedMessage id="header.menu.tourattraction" /></h5> 
                        </Menu.Item>
                        <Menu.Item className="menu-item" key="/myanmar_visa" title="Myanmar Visa Application | Oway Travel &amp; Tours">
                            <img src={require('../../assests/images/svg/m_visa.svg')} alt="Myanmar Visa" />            
                            <h5><FormattedMessage id="header.menu.visa" /></h5>
                        </Menu.Item>
                        <Menu.Item className="menu-item" key="/car_rental" title="Car Rental | Oway Travel &amp; Tours">
                            <img src={require('../../assests/images/svg/m_car_rental.svg')}  alt="Car Rental" />
                            <h5><FormattedMessage id="header.menu.carrental" /></h5>
                        </Menu.Item>
                        <Menu.Item className="menu-item" key="/oway_ride" title="Oway Ride | Oway Travel &amp; Tours">
                            <img src={require('../../assests/images/svg/m_owayride.svg')}  alt="Oway Ride" />            

                            <h5><FormattedMessage id="header.menu.owayride" /></h5>
                        </Menu.Item>
                        <SubMenu 
                            title={
                                <span>
                                    <img src={require('../../assests/images/svg/m_nationality.svg')}/> 
                                    <span><FormattedMessage id="menu.nationality" /></span>
                                    {
                                        this.props.locales.lang == 'my' ?
                                        <span className="menu-detail menu-detail-my">
                                            {
                                                this.props.navbarOptions.nation.name == 'Foreigner' ?
                                                <FormattedMessage id="menu.nationality.foreigner" />
                                                :
                                                <FormattedMessage id="menu.nationality.myanmar" />
                                            }
                                        </span>
                                        :
                                        <span className="menu-detail">
                                            {
                                                this.props.navbarOptions.nation.name == 'Foreigner' ?
                                                <FormattedMessage id="menu.nationality.foreigner" />
                                                :
                                                <FormattedMessage id="menu.nationality.myanmar" />
                                            }
                                        </span>
                                    }                                    
                                </span>  
                            }                            
                            key="sub_menu_1"
                            className="nationality-submenu"
                            >
                            <Menu.Item className={this.getActiveClass(this.props.navbarOptions.nation.type,'l')} key="/national_myanmar" title="Choose Myanmar citizen">
                                <FormattedMessage id="menu.nationality.myanmar" />
                            </Menu.Item>
                            <Menu.Item className={this.getActiveClass(this.props.navbarOptions.nation.type, 'f')} key="/foreigner" title="Choose Foreigner">
                                <FormattedMessage id="menu.nationality.foreigner" />
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu 
                            title={
                                <span>
                                    <img src={require('../../assests/images/svg/m_language.svg')}/> 
                                    <span><FormattedMessage id="menu.language" /></span>
                                    <span className="menu-detail">
                                    {
                                        this.props.locales.lang == 'my' ?
                                        <img src={require('../../assests/images/svg/myanmar_language.svg')}/>
                                        :
                                        <img src={require('../../assests/images/svg/english_language.svg')}/>
                                    }
                                    </span>
                                </span>  
                            }
                            key="sub_menu_2"
                            >
                            <Menu.Item className={this.getActiveClass(this.props.locales.queryName,'en')} key="/en" title="Choose English Language">
                                <img src={require('../../assests/images/svg/english_language.svg')}/>
                                <FormattedMessage id="menu.language.english" />
                            </Menu.Item>
                            <Menu.Item className={this.getActiveClass(this.props.locales.queryName,'mm')} key="/my" title="Choose Myanmar Language">
                                <img src={require('../../assests/images/svg/myanmar_language.svg')}/>
                                <FormattedMessage id="menu.language.myanmar" />
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu 
                            title={
                                <span>
                                    <img src={require('../../assests/images/svg/m_currency.svg')}/> 
                                    <span><FormattedMessage id="menu.currency" /></span>
                                    {
                                        this.props.locales.lang == 'my' ?
                                        <span className="menu-detail menu-detail-my">                                        
                                            {
                                                this.props.navbarOptions.currency.name == 'USD' ?
                                                <FormattedMessage id="menu.currency.USD" />
                                                :
                                                <FormattedMessage id="menu.currency.MMK" />
                                            }
                                        </span>
                                        :
                                        <span className="menu-detail">                                        
                                            {
                                                this.props.navbarOptions.currency.name == 'USD' ?
                                                <FormattedMessage id="mobile.currency.USD" />
                                                :
                                                <FormattedMessage id="mobile.currency.MMK" />
                                            }
                                        </span>
                                    }
                                </span>  
                            }                            
                            key="sub_menu_3"
                            >
                            <Menu.Item className={this.getActiveClass(this.props.navbarOptions.currency.type,'usd')} key="/usd" title="Change to US Dollar">
                                <FormattedMessage id="menu.currency.USD" />
                            </Menu.Item>
                            <Menu.Item className={this.getActiveClass(this.props.navbarOptions.currency.type,'mmk')} key="/mmk" title="Change to Myanmar Kyat">
                                <FormattedMessage id="menu.currency.MMK" />
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                </div>    
                {
                    this.props.isSticky && (
                        <div className="sticky-user-profile">  
                            <div className="sticky-topup" id="sticky-topup">                                
                                <div className="topup">
                                    {
                                        this.checkUserLogin() ?
                                            this.checkAgentLogin() ?                                
                                                <Dropdown
                                                    overlayClassName="top-header-dropdown"
                                                    trigger={['click']}
                                                    overlayClassName="topup-dropdown"
                                                    getPopupContainer={()=> document.querySelector('#sticky-topup')}
                                                    placement="bottomCenter" 
                                                    overlay={
                                                        <ul>
                                                            <li>
                                                                <a href={`${DEV_URL}/add-top-up`} title="Myanmar Kyat - MMK">MMK {parseInt(userInfo.mmkBalance).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</a>
                                                            </li>
                                                            <li>
                                                                <a href={`${DEV_URL}/add-top-up`} title="United States Dollar - USD">USD {userInfo.balance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</a>
                                                            </li>
                                                        </ul>
                                                    }
                                                    trigger="hover"
                                                >
                                                    <a href={`${DEV_URL}/add-top-up`} title="Topup">
                                                        <img src={require('../../assests/images/svg/topup-menu-gray.svg')} alt="Topup" />
                                                    </a>
                                                </Dropdown>                                                        
                                                :
                                                <a href={`${DEV_URL}/add-top-up`} title="Topup">
                                                    <img src={require('../../assests/images/svg/topup-menu-gray.svg')} alt="Topup" />
                                                    <span>{parseInt(userInfo.balance).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>    
                                                </a>                                   
                                        :
                                        <a href={`${DEV_URL}/sign-in`} title="Topup">
                                            <img src={require('../../assests/images/svg/topup-menu-gray.svg')} alt="Topup" />
                                        </a>
                                    }
                                </div>                                
                            </div>
                            <div className="user-profile-dropdown" id="user-profile-dropdown">
                                <Dropdown                     
                                    overlay={
                                        this.checkUserLogin() ?
                                        <ul className="account-profile">
                                            <li onClick={()=>this.handleAccountChange('profile')}>                                                                                                            
                                                <span title="Oway Login">
                                                    <Avatar icon="user" className="usericon"/>
                                                    <FormattedMessage id="menu.myprofile" />
                                                </span>
                                            </li> 
                                            <li onClick={()=>this.handleAccountChange('logout')}>                                                                                                            
                                                <span title="Oway Agent Login">
                                                    <img src={require('../../assests/images/svg/logoutgray.svg')} alt="Oway Agent Logout" />
                                                    <FormattedMessage id="menu.logout" />
                                                </span>
                                            </li>
                                        </ul>
                                        :
                                        <ul>
                                            <li onClick={()=>this.handleAccountChange('login')}>                                                                                                            
                                                <span title="Oway Login">
                                                    <img src={require('../../assests/images/svg/logingray.svg')} alt="Oway Login" />
                                                    <FormattedMessage id="menu.login" />
                                                </span>
                                            </li> 
                                            <li onClick={()=>this.handleAccountChange('agent')}>                                                                                                            
                                                <span title="Oway Agent Login">
                                                    <img src={require('../../assests/images/svg/agent_login.svg')} alt="Oway Agent Login" />                                                    
                                                    <FormattedMessage id="menu.agentlogin" />
                                                </span>
                                            </li>            
                                            <li onClick={()=>this.handleAccountChange('register')}>                                                                                                            
                                                <span title="Oway Register">
                                                    <img src={require('../../assests/images/svg/register.svg')} alt="Oway Register" />
                                                    <FormattedMessage id="menu.register" />
                                                </span>
                                            </li>                                            
                                        </ul>
                                    }
                                    trigger={['click']}
                                    overlayClassName="profile-dropdown"                           
                                    getPopupContainer={()=> document.querySelector('#user-profile-dropdown')}
                                >                
                                    <div className="dropdown-menu">
                                        { 
                                            this.checkUserLogin() ? 
                                            <p className="account-name">
                                                {
                                                    this.checkProfileImg() ?
                                                    <img src={`https://cdn-sandbox.owaytrip.com/user/${userInfo.profileImage}`} />
                                                    :
                                                    <Avatar icon="user" className="usericon"/>
                                                }                                                
                                                <span>{userInfo.userName}</span>
                                            </p> 
                                            :
                                            <p><FormattedMessage id="menu.account" /></p>
                                        }
                                                      
                                        <div className="arrow">
                                            {
                                                this.state.visibleAccount ?
                                                    <IntegreatedIcon type="up" />
                                                    :
                                                    <IntegreatedIcon type="down"/>
                                            }
                                        </div>                              
                                    </div>
                                </Dropdown>                                
                            </div>
                        </div>
                    )
                }
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
        setOptionMenu     : (value) => dispatch(setOptionMenu(value)),
        handleDefaultValueSearchComponent : (payload) => dispatch(handleDefaultValueSearchComponent(payload)),
        handleLocaleChange  : (lang, messages, query)=> dispatch(handleLocaleChange(lang, messages, query)),
        changeNationalType  : (type, name, other) => dispatch(changeNationalType(type, name, other)),
        changeCurrencyUnit  : (type, name) => dispatch(changeCurrencyUnit(type, name)),
        handleRefreshState: ()=> dispatch(handleRefreshState()),        
        handleRefreshStateEnd: ()=> dispatch(handleRefreshStateEnd()),
        setVisaFormData : ()=> dispatch(setVisaFormData())       
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppMenuBar);
