import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import history from '../../utils/history'
import { Drawer } from 'antd';

import {
    changeFirstName,
    changeLastName,
    changeGender,
    changeNation,
    changeDateOfBirth,
    loadDefaultValues
} from '../../actions/formActions';

import { requestVisaSearch } from '../../actions/visaActions';

import FirstNameInput from './FirstNameInput';
import LastNameInput from './LastNameInput';
import SelectGender from './SelectGender';
import SelectNationality from './SelectNationality';
import SelectDateOfBirth from './SelectDateOfBirth';
import MobileDateOfBirth from './MobileDateOfBirth';

import { DEV_URL, VISA_API_KEY } from '../../constants/credentials';
import { nationality } from '../../constants/visaPageConstants';

import AutocompleteNation from './AutocompleteNation';
import './visa-search-form.scss'

class VisaSearchForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            drawerShow: false,
            current: 'mobile_gender',
            formSubmit: false
        }
    }
    componentWillMount(){
        
    }
    handleFirstName(value){
        const obj = {
            value : value,
            valid : !!value && value != undefined
        }        
        this.props.changeFirstName(obj)
    }

    handleLastName(value){
        const obj = {
            value : value,
            valid : !!value && value != undefined
        }
        this.props.changeLastName(obj)
    }
    handleChangeGender(value){
        const obj = {
            value : value,
            valid : !!value && value != undefined
        }
        this.props.changeGender(obj);
        this.onCloseDrawer()
    }
    handleChangegNation(value){
        const obj = {
            value : value,
            valid : !!value && value != undefined
        }
        this.props.changeNation(obj);
        this.onCloseDrawer()
    }
    handleChangeDate(value){
        const obj = {
            value : value,
            valid : !!value && value != undefined
        }
        this.props.changeDateOfBirth(obj);
    }
    handleChangeMobileDate(value){
        this.handleChangeDate(value);
        this.onCloseDrawer()
    }    
    handleMobileSelectDrawer(mobile_gender){
        this.setState({ drawerShow: true, current: mobile_gender, isLoading: true})
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 300);
    }
    onCloseDrawer(){
        this.setState({ drawerShow: false})
    }
    handleChangeNationValue(value){
        const obj = {
            value : value,
            valid : !!value && value != undefined
        }
        this.props.changeNation(obj);
    }
    getCurrentSelector(){
        switch (this.state.current) {
            case 'mobile_gender':
                return (
                    <ul>
                        <li onClick={()=> this.handleChangeGender('Male')}>Male</li>
                        <li onClick={()=> this.handleChangeGender('Female')}>Female</li>
                    </ul>
                )
                break;
            case 'mobile_nation':
                return (
                    <div className="mobile-nation">
                        {/* {
                            this.state.isLoading ?
                            <input className="fake-input" type="text" placeholder="Select Nationality" value={this.props.formReducer.nationality.value} readOnly/>
                            :
                            <AutocompleteNation 
                            isMobile={true} 
                            callbackParent={(value)=> this.handleChangegNation(value)}
                            callbackParentClose={(value)=> this.handleChangeNationValue(value)}
                            formReducer={this.props.formReducer}
                            />
                        }                                                 */}
                        <ul className="nationality-list">
                        {
                            nationality.map((item, index)=>
                            <div key={index}>
                                {
                                    item.countries.map((item, index)=>(
                                        <li onClick={()=> this.handleChangegNation(item.name)} key={index}>{item.name}</li>
                                    ))
                                }
                            </div>                                
                            )
                        }
                        </ul>
                    </div>
                )
            case 'mobile_visa_date':
                return (
                    <MobileDateOfBirth 
                        callbackParent={(date)=> this.handleChangeMobileDate(date)}
                    />
                )
            default:
                break;
        }        
    }
    validVisaInput=()=> 
        !!this.props.formReducer.firstName.valid &&
        !!this.props.formReducer.lastName.valid &&
        !!this.props.formReducer.nationality.valid

    handleSubmit(){
        const { navbarOptions, locales, formReducer } = this.props;
        this.setState({formSubmit: true})
        if(this.validVisaInput()){        
            const payload = {
                firstName: formReducer.firstName.value,
                lastName: formReducer.lastName.value,
                gender: formReducer.gender.value,
                nationality: formReducer.nationality.value
            }          
            
            // this.props.loadDefaultValues({
            //     firstName: formReducer.firstName.value,
            //     lastName: formReducer.lastName.value,
            //     gender: formReducer.gender.value,
            //     nationality: formReducer.nationality.value
            // })
            const data =  {                 
                "currencyCode": navbarOptions.currency.name,             
                "language": locales.queryName,             
                "fareType": "foreigner",             
                "apiKey": VISA_API_KEY,             
                "userType": "C",             
                "RequestUserId":""             
            } 
            const searchPayload = Object.assign(payload, data)
            this.props.loadDefaultValues(payload)       
            this.props.requestVisaSearch(searchPayload)            
            history.push('/myanmar_visa/apply')
        }
        setTimeout(() => {
            this.setState({formSubmit: false})
        }, 3000);
    }
    render() {
        const { formReducer } = this.props;
        const { drawerShow } = this.state;
        return (            
            <div className="search-section visa">
                <h2 className="mobile-title"><FormattedMessage id="mobile.visa.title" /></h2>
                <div className="customize-form">
                    <FirstNameInput 
                        firstName={formReducer.firstName}
                        formSubmit={this.state.formSubmit}
                        callbackParent={(data)=> this.handleFirstName(data)}
                    />                    
                    <div className="vertical-line">&nbsp;</div>
                    <LastNameInput 
                        lastName={formReducer.lastName}     
                        formSubmit={this.state.formSubmit}               
                        callbackParent={(data)=> this.handleLastName(data)}
                    />                    
                    <div className="vertical-line">&nbsp;</div>
                    <SelectGender 
                        gender={formReducer.gender}
                        formSubmit={this.state.formSubmit}
                        callbackParent={(data)=> this.handleChangeGender(data)}
                        callbackMobileDrawer={(mobile_gender)=> this.handleMobileSelectDrawer(mobile_gender)}
                    />                    
                    <div className="vertical-line">&nbsp;</div>
                    <SelectNationality 
                        nationality={formReducer.nationality}
                        formSubmit={this.state.formSubmit}
                        callbackParent={(data)=> this.handleChangegNation(data)}
                        callbackMobileDrawer={(mobile_nation)=> this.handleMobileSelectDrawer(mobile_nation)}
                    />                    
                    <div className="vertical-line">&nbsp;</div>
                    {/* <SelectDateOfBirth 
                        dob={formReducer.dob}
                        callbackParent={(data)=> this.handleChangeDate(data)}
                        callbackMobileDrawer={(mobile_visa_date)=> this.handleMobileSelectDrawer(mobile_visa_date)}
                    />
                    <div className="vertical-line">&nbsp;</div>     */}
                </div>
                <div className="button-block">
                    <button onClick={()=> this.handleSubmit()} className="btn-orange"><FormattedMessage id="search.btn.continue" /></button>
                </div> 
                <Drawer
                    title={<FormattedMessage id={this.state.current} />} 
                    placement='bottom'
                    closable={true}
                    onClose={()=> this.onCloseDrawer()}
                    visible={drawerShow}
                    style={
                        this.props.locales.lang == 'en' ? 
                        {fontFamily:'Lato,sans-serif'} 
                            : 
                        {fontFamily:'Pyidaungsu, sans-serif'}
                    }
                    className={this.state.current == 'mobile_gender' ? 'visa-drawer':'visa-drawer full-height'}
                    >
                    {this.getCurrentSelector()}
                </Drawer>     
            </div>
        );
    }
}

const mapStateToProps = state => ({     
    searchResults: state.searchResults,
    formReducer: state.formReducer,
    navbarOptions: state.navbarOptions,
    locales: state.locales 
 });

const mapDispatchToProps = dispatch => {
    return{                             
        changeFirstName : (data) => dispatch(changeFirstName(data)),
        changeLastName : (data) => dispatch(changeLastName(data)),
        changeGender : (data) => dispatch(changeGender(data)),
        changeNation : (data) => dispatch(changeNation(data)),
        changeDateOfBirth : (data) => dispatch(changeDateOfBirth(data)),
        loadDefaultValues : (data) => dispatch(loadDefaultValues(data)),
        requestVisaSearch : (data)=> dispatch(requestVisaSearch(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisaSearchForm);