import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import history from '../utils/history';
import moment from 'moment';
const dateFormat = 'DD MMM YYYY';

import { 
    Popover,
    Modal,
    Avatar
} from 'antd';

import { 
    handleLocaleChange, 
    changeNationalType, 
    changeCurrencyUnit,
    updatePromotionShow,
    closePromotionShow
} from '../actions/applicationBarActions';

import { 
    fetchFlightHotDeals,
    fetchHotelHotDeals,
    fetchBusHotDeals,
    fetchTourHotDeals,
    fetchVisaDeals,
    fetchCarDeals
} from '../actions/hotdealActions';

import { sentUserSubscribe } from '../actions/subscribeActions';

import { DEV_URL } from '../constants/credentials';
import { SUBSCRIBE_API_KEY } from '../constants/credentials';

import messages_mm from "../assests/resources/i18n/mm.json";
import messages_en from "../assests/resources/i18n/en.json";
import Subscribe from './Subscribe';

const nationalityIcon = require('../assests/images/svg/flight.svg')
const advImage = require('../assests/images/png/thingyan-adv.png')


class TopHeaderMenuItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            visibleNation : false,
            visibleLang   : false,
            visibleCurrency: false,
            visibleAccount: false,
            visibleTopup: false,
            userInfo: null,
            visibleModal: true,
            storage_currency: null,
            storage_lang: null,
            storage_nationality: null,
            isPromoOpen: false
        }
    }
    componentDidMount(){
        this.setState({
            userInfo: JSON.parse(localStorage.getItem('oway_user_info')), 
            storage_lang: localStorage.getItem('lang'),
            storage_currency: localStorage.getItem('currency'),
            storage_nationality: localStorage.getItem('nationality')
        })
        this.setDefaultValueFromRedirect()
        this.loadPromotionModal()
        setTimeout(() => {
            !this.state.isPromoOpen ? this.setState({isPromoOpen: true}) : null
        }, 7000);                
    }  

    setDefaultValueFromRedirect = () => {
        if(localStorage.getItem('lang')){
            if(localStorage.getItem('lang').toString() == 'mm') {                
                this.props.handleLocaleChange('my',messages_mm,localStorage.getItem('lang'));            
            }else{         
                this.props.handleLocaleChange('en',messages_en,localStorage.getItem('lang'));
            }
        }  
        if(localStorage.getItem('currency')){
            if(localStorage.getItem('currency').toString() == 'mmk'){
                this.props.changeCurrencyUnit('mmk','MMK')
            }else{
                this.props.changeCurrencyUnit('usd','USD')
            }
        }      
        if(localStorage.getItem('nationality')){
            if(localStorage.getItem('nationality').toString() == 'l'){
                this.props.changeNationalType('l','Myanmar Citizen', 'local', 'ntl')
            }else{
                this.props.changeNationalType('f','Foreigner', 'foreign', 'ntf')
            }        
        }        
        setTimeout(() => {
            localStorage.getItem('lang') && localStorage.removeItem('lang');
            localStorage.getItem('currency') && localStorage.removeItem('currency');
            localStorage.getItem('nationality') && localStorage.removeItem('nationality');
        }, 300);        
    }
    handleNationVisible = (visible) => {
        this.setState({visibleNation: visible})
    }
    handleChangeNation(keyword, name, other, value){
        this.setState({visibleNation: false});
        this.props.changeNationalType(keyword, name, other, value);
        this.loadBannerUpdate(keyword, null, null);
    }
    handleLangVisible = (visible) => {
        this.setState({visibleLang: visible})
    }
    handleLangChange(keyword, name, query){
        this.setState({visibleLang: false});
        this.props.handleLocaleChange(keyword, name, query);
        this.loadBannerUpdate(null, keyword, null);
    }
    handleCurrencyVisible = (visible) => {
        this.setState({visibleCurrency: visible})
    }
    handleCurrencyChange(keyword, name){
        this.setState({visibleCurrency: false});
        this.props.changeCurrencyUnit(keyword,name);
        this.loadBannerUpdate(null, null, keyword);
    }
    handleAccountVisible = (visible) => {
        this.setState({visibleAccount: visible})
    }
    loadBannerUpdate(nationtype, language, currency){
        let { navbarOptions, router, locales } = this.props;
        const params = {
            nationality : !!nationtype ? nationtype : navbarOptions.nation.type,
            currency : !!currency ? currency : navbarOptions.currency.type,
            lang : !!language ? language : locales.queryName
        }
        switch (router.location.pathname) {
            case '/':
                this.props.fetchFlightHotDeals(params);
                break;
            case '/flights':
                this.props.fetchFlightHotDeals(params);
                break;
            case '/hotels':
                this.props.fetchHotelHotDeals(params);
                break;
            case '/buses':
                this.props.fetchBusHotDeals(params);
                break;
            case '/tours':
                this.props.fetchTourHotDeals(params);
                break;
            case '/attractions':
                this.props.fetchTourHotDeals(params);
                break;
            case '/myanmar_visa':
                this.props.fetchVisaDeals(params);
                break;
            case '/car_rental':
                this.props.fetchCarDeals(params);
                break;
            default:
                break;
        }
    }
    handleAccountChange(keyword){
        if(keyword == 'login'){
            history.push('/sign-in')
            // window.open(`${DEV_URL}/sign-in`, '_self')
        }
        if(keyword == 'agent'){
            history.push('/agent-sign-in')
            // window.open(`${DEV_URL}/agent-sign-in`, '_self')
        }
        if(keyword == 'register'){
            history.push('/register')
            // window.open(`${DEV_URL}/register`, '_self')
        }
        if(keyword == 'logout'){
            window.localStorage.removeItem('oway_user_info')
            // window.open(`${DEV_URL}/logout`, '_self')
        }
        if(keyword == 'profile'){            
            window.open(`${DEV_URL}/personal-information/${this.state.userInfo.token}`, '_self')
        }        
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
    checkUserLogin = () => this.state.userInfo != null;
    checkAgentLogin = () => !!this.state.userInfo.hasOwnProperty('agentsignIn');
    checkProfileImg = () => !!this.state.userInfo.hasOwnProperty('profileImage') && !!this.state.userInfo.profileImage;
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
                    visible={this.props.navbarOptions.promotion.open}                                        
                    title={false}                    
                    // onOk={this.handleOk}
                    onCancel={this.closePromotionModal}
                    width={500}
                    wrapClassName="newsletter-modal"
                    footer={[
                        <a link="#" key="back" size="large" onClick={this.closePromotionModal} style={{textDecoration:"underline",color:'#002955'}} >No, thanks!</a>
                    ]}
                >                
                    <Subscribe 
                        subscribeemail={(params) => this.subscribeemail(params)}
                    />
                    {/* <img src={advImage}  alt="Thingyang Hotel Sale" width="100%" onClick={()=> this.gotPromotion()} /> */}
                </Modal>
            )
        }        
    }

    hasOnePay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment ? !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.onepay_token : true;
    hasWavePay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment ? !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.wavepay_token : true;
    hasKbzPay =()=> !!window.localStorage.hasOwnProperty('oway_travel') && !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment ? !!JSON.parse(window.localStorage.oway_travel).navbarOptions.payment.kbzpay_token : true;    

    isPayment = () => this.hasOnePay() || this.hasWavePay() || this.hasKbzPay();
        
    detectListing = (route) => route.includes('search');

    render() {
        const { navbarOptions, locales, router } = this.props;
        const { userInfo } = this.state;        
        return(
            <div>
                {/* deals with marketing  */}
                <div>
                    { this.state.isPromoOpen && this.getPromotionModal() }
                </div>
                <ul>
                    <li>
                        <a href={`${DEV_URL}/track-booking-status`} title="Track Booking">
                            <FormattedMessage id="menu.trackbooking" />    
                        </a>      
                    </li>
                    <Popover         
                        visible={this.state.visibleNation}                                                            
                        onVisibleChange={this.handleNationVisible}
                        overlayClassName="top-header-dropdown"
                        overlayStyle={
                            this.props.locales.lang == 'en' ? 
                            {fontFamily:'Lato,sans-serif'} 
                                : 
                            {fontFamily:'Pyidaungsu, sans-serif'}}
                        content={                        
                            <ul>
                                <li onClick={()=> this.handleChangeNation('l','Myanmar Citizen', 'local','ntl')}>                                                                                                            
                                    <a href="#" title="Choose Myanmar citizen">
                                        <FormattedMessage id="menu.nationality.myanmar" />
                                    </a>
                                </li>             
                                <li onClick={()=> this.handleChangeNation('f','Foreigner', 'foreign', 'ntf')}>                                                                                                            
                                    <a href="#" title="Choose Foreigner">
                                        <FormattedMessage id="menu.nationality.foreigner" />
                                    </a>
                                </li>
                            </ul>                        
                        } 
                        trigger="click"
                        >                        
                            <li className="dropdown-menu">
                                <a href="#" title="Choose Nationality">
                                    {
                                        navbarOptions.nation.name == 'Foreigner' ?
                                        <FormattedMessage id="menu.nationality.foreigner" />
                                        :
                                        <FormattedMessage id="menu.nationality.myanmar" />
                                    }
                                </a>
                                <b>|</b>
                            </li>
                    </Popover>
                    <Popover                                   
                        visible={this.state.visibleLang}                                
                        onVisibleChange={this.handleLangVisible}
                        overlayClassName="top-header-dropdown"
                        overlayStyle={
                            this.props.locales.lang == 'en' ? 
                            {fontFamily:'Lato,sans-serif'} 
                                : 
                            {fontFamily:'Pyidaungsu, sans-serif'}}
                        content={                        
                            <ul>                            
                                <li onClick={()=>this.handleLangChange('my',messages_mm, 'mm')}>
                                    <a href="#" title="Choose Myanmar Language">
                                        <img src={require('../assests/images/svg/myanmar_language.svg')}/>
                                        <FormattedMessage id="menu.language.myanmar" />
                                    </a>
                                </li>             
                                <li onClick={()=>this.handleLangChange('en',messages_en, 'en')}>
                                    <a href="#" title="Choose English Language">
                                        <img src={require('../assests/images/svg/english_language.svg')}/>
                                        <FormattedMessage id="menu.language.english" />
                                    </a>
                                </li>
                            </ul>                        
                        } 
                        trigger="click"
                        >                        
                            <li className="dropdown-menu">
                                <a href="#" title="Choose Language">{
                                    locales.lang == 'my' ? 
                                    <span className='language-change'>
                                        <img src={require('../assests/images/svg/myanmar_language.svg')} alt="Choose Myanmar Language" />  
                                    </span>
                                        : locales.lang == 'en' ? 
                                    <span className='language-change'>
                                        <img src={require('../assests/images/svg/english_language.svg')} alt="Choose English Language" />  
                                    </span>
                                    : 'English'}
                                </a>
                                <b>|</b>
                            </li>
                    </Popover>   
                    <Popover                  
                        visible={this.state.visibleCurrency}
                        onVisibleChange={this.handleCurrencyVisible}
                        overlayClassName="top-header-dropdown"
                        overlayStyle={
                            this.props.locales.lang == 'en' ? 
                            {fontFamily:'Lato,sans-serif'} 
                                : 
                            {fontFamily:'Pyidaungsu, sans-serif'}}
                        content={                        
                            <ul>
                                <li onClick={()=>this.handleCurrencyChange('mmk','MMK')}>
                                    <a href="#" title="Change to Myanmar Kyat">
                                        <FormattedMessage id="menu.currency.MMK" />
                                    </a>
                                </li>             
                                <li onClick={()=>this.handleCurrencyChange('usd','USD')}>                                                                                                            
                                    <a href="#" title="Change to US Dollar">
                                        <FormattedMessage id="menu.currency.USD" />
                                    </a>
                                </li>
                            </ul>                        
                        } 
                        trigger="click"
                        >                        
                            <li className="dropdown-menu">
                                <a  href="#" title="Choose Currency">{
                                    navbarOptions.currency.name == 'MMK' ?
                                    <span className='language-change'>
                                        <img src={require('../assests/images/svg/mmk.svg')} alt="Currency Change Myanmar Kyat" />  
                                    </span> 
                                    :navbarOptions.currency.name == 'USD' ?
                                    <span className='language-change'>
                                        <img src={require('../assests/images/svg/usd.svg')} alt="Currency Change US Dollar" />  
                                    </span> 
                                    : 'usd'}
                                    </a>
                                <b>|</b>
                            </li>
                    </Popover>     
                    {
                        this.detectListing(router.location.pathname) ?
                        null
                        :
                        <li className="topup">
                            {
                            this.checkUserLogin() ?
                                this.checkAgentLogin() ?
                                    <Popover
                                        overlayClassName="top-header-dropdown top-topup" 
                                        content={
                                            <ul>
                                                <li>
                                                    <a href={`${DEV_URL}/add-top-up`} title="Add Top Up">MMK {parseInt(userInfo.mmkBalance).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</a>
                                                </li>
                                                <li>
                                                    <a href={`${DEV_URL}/add-top-up`} title="Add Top Up">USD {userInfo.balance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</a>                                                
                                                </li>
                                            </ul>
                                        }
                                        trigger="hover"
                                    >
                                        <a href={`${DEV_URL}/add-top-up`} title="Add Top Up">
                                            <img src={require('../assests/images/svg/topup-menu.svg')} alt="Topup" />
                                        </a>
                                    </Popover>                                                        
                                    :
                                    <a href={`${DEV_URL}/add-top-up`} title="Add Top Up">
                                        <img src={require('../assests/images/svg/topup-menu.svg')} alt="Topup" />
                                        <span>{!!userInfo.balance ? parseInt(userInfo.balance).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0'}</span>    
                                    </a>                                   
                            :
                            <a href={`${DEV_URL}/sign-in`} title="Top Up">
                                <img src={require('../assests/images/svg/topup-menu.svg')} alt="Topup" />
                            </a>
                            } 
                            <b>|</b>      
                        </li>
                    }                   
                    {
                    this.detectListing(router.location.pathname) ?
                    null
                    :                 
                    <Popover    
                        visible={this.state.visibleAccount}                                                                 
                        onVisibleChange={this.handleAccountVisible}
                        overlayClassName="top-header-dropdown"
                        placement="bottomRight"
                        overlayStyle={
                            this.props.locales.lang == 'en' ? 
                            {fontFamily:'Lato,sans-serif'} 
                                : 
                            {fontFamily:'Pyidaungsu, sans-serif'}}
                        content={                        
                            this.checkUserLogin() ?
                            <ul className="account-profile">
                                <li onClick={()=>this.handleAccountChange('profile')}>                                                                                                            
                                    <span title="Oway Profile"> <Avatar icon="user" className="usericon"/>
                                        <FormattedMessage id="menu.myprofile" />
                                    </span>
                                </li> 
                                <li onClick={()=>this.handleAccountChange('logout')}>                                                                                                            
                                    <span title="Oway Agent Login"> <img src={require('../assests/images/svg/logoutgray.svg')} alt="Oway Agent Logout" />
                                        <FormattedMessage id="menu.logout" />
                                    </span>
                                </li>
                            </ul>                        
                            :
                            <ul>
                                <li onClick={()=>this.handleAccountChange('login')}>                                                                                                            
                                    <span title="Oway Login"> <img src={require('../assests/images/svg/logingray.svg')} alt="Oway Login" />
                                        <FormattedMessage id="menu.login" />
                                    </span>
                                </li> 
                                <li onClick={()=>this.handleAccountChange('agent')}>                                                                                                            
                                    <span title="Oway Agent Login"> <img src={require('../assests/images/svg/agent_login.svg')} alt="Oway Agent Login" />
                                        <FormattedMessage id="menu.agentlogin" />
                                    </span>
                                </li>            
                                <li onClick={()=>this.handleAccountChange('register')}>                                                                                                            
                                    <span title="Oway Register"> <img src={require('../assests/images/svg/register.svg')} alt="Oway Register" />
                                        <FormattedMessage id="menu.register" />
                                    </span>
                                </li>                            
                            </ul>
                        } 
                        trigger="click"
                        >
                            <li className="dropdown-menu">
                                {
                                    this.checkUserLogin() ?
                                    <a  href="#" title="Oway Account" className="account-name">
                                        {
                                            this.checkProfileImg() ?
                                            <img src={`https://cdn-sandbox.owaytrip.com/user/${userInfo.profileImage}`} />
                                            :
                                            <Avatar icon="user" className="usericon"/>
                                        }                                    
                                        <span>{userInfo.userName}</span>
                                    </a> 
                                    : 
                                    <a href="#" title="Oway Account">
                                        <FormattedMessage id="menu.account" />
                                    </a>
                                }
                                <b>|</b>                            
                            </li>
                    </Popover>
                }   
            </ul>
        </div>
        )                                    
    }
}
const mapStateToProps = state => ({ 
    navbarOptions : state.navbarOptions,
    locales       : state.locales,
    router : state.router
 });
 const mapDispatchToProps = dispatch => {
    return{     
        handleLocaleChange  : (lang, messages, query)=> dispatch(handleLocaleChange(lang, messages, query)),
        changeNationalType  : (type, name, other, value) => dispatch(changeNationalType(type, name, other, value)),
        changeCurrencyUnit  : (type, name) => dispatch(changeCurrencyUnit(type, name)),
        updatePromotionShow : (date) => dispatch(updatePromotionShow(date)),
        closePromotionShow : (date) => dispatch(closePromotionShow(date)),
        fetchFlightHotDeals : (params) => dispatch(fetchFlightHotDeals(params)),
        fetchHotelHotDeals : (params) => dispatch(fetchHotelHotDeals(params)),
        fetchBusHotDeals : (params) => dispatch(fetchBusHotDeals(params)),
        fetchTourHotDeals : (params) => dispatch(fetchTourHotDeals(params)),
        fetchVisaDeals : (params) => dispatch(fetchVisaDeals(params)),
        fetchCarDeals : (params) => dispatch(fetchCarDeals(params)),
        sentUserSubscribe: (params)=> dispatch(sentUserSubscribe(params))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopHeaderMenuItem);