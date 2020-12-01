import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Select, Alert, Checkbox, AutoComplete, Tooltip } from 'antd';
import {
    changeFirstName,
    changeLastName,
    changeCountryName,
    changePassportNumber,
    changeExpireDate
} from '../../actions/tourCheckoutActions';
import VisaDatePicker from './VisaDatePicker';

const Option = Select.Option;
 
class AdultInfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getDataSource = () =>
        this.props.countryList 
            .map((country, index )=> (      
                    <Option key={index} text={country.name} onClick={()=> this.props.changeCountryName(country.name, this.props.id)}>
                        <p>{country.name}</p>
                    </Option>        
            ))
    handleSearch(value){
        
    }
    render() { 
        const { adult, id } = this.props;
        return (
            <div className="form-container" key={id}>
                <h5>Adult {id + 1}</h5>
                <div className="card form-card passenger-card">
                    <div className="form-group">
                        <div className="card input-card">
                            <label>First name</label>                            
                            <Input 
                                placeholder="enter your first name" 
                                type="text"
                                onChange={(e)=> this.props.changeFirstName(e.target.value, id)}/>
                            <span className="error-text">{!!adult.firstName && adult.firstName.length < 3 ? <small>enter valid 3 word</small> : null}</span>
                        </div>
                        <div className="card input-card">
                            <label>Last name</label>
                            <Input 
                                placeholder="enter your last name" 
                                type="text"
                                onChange={(e)=> this.props.changeLastName(e.target.value, id)}/>
                            <span className="error-text">{!!adult.lastName && adult.lastName.length < 3 ? <small>enter valid 3 word</small> : null}</span>
                        </div>
                        <div className="card input-card select-card">
                            <label>Passport issuing country</label>
                            <AutoComplete
                                dataSource={this.getDataSource()}                    
                                style={{ width: 200 }}
                                allowClear={true}
                                onChange={(value)=> this.handleSearch(value)}                                    
                                placeholder="Passport Issuing Country"
                                dropdownClassName="search-feature-tour"
                                filterOption={(inputValue, option) => {
                                    if(option.props.text != undefined){
                                        return option.props.text.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                }}            
                                optionLabelProp="text"
                             />
                             <span className="error-text">{!!adult.country && adult.country.length < 3 ? <small>select country</small> : null}</span>
                        </div>
                        <div className="card input-card select-card">
                            <label>Passport number</label>
                            <Input 
                                placeholder="Passport Number" 
                                type="number"
                                onChange={(e)=> this.props.changePassportNumber(e.target.value, id)}/>
                             <span className="error-text">{!!adult.passportNum && adult.passportNum.length < 3 ? <small>enter valid passport number</small> : null}</span>
                        </div>
                        <div className="card input-card select-card">
                            <label>Passport expiry</label>
                            {/* <Tooltip placement="top" title="Please make sure your ID is valid for at least six months after your date of travel.">
                                <img src={require(`../../assests/images/svg/info-icon.svg`)} alt="Information" className="info" />
                            </Tooltip> */}
                            <VisaDatePicker id={id.toString()} callbackFun={(date)=> this.props.changeExpireDate(date, id)}/>
                            {/* <div>{!!adult.passportExpire & adult.passportExpire.length < 3 ? <small>select valid date</small> : null}</div> */}
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {       
        tourTravellerInfo: state.tourTravellerInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeFirstName : (param, id)=> dispatch(changeFirstName(param, id)),
        changeLastName : (param, id)=> dispatch(changeLastName(param, id)),
        changeCountryName : (param, id)=> dispatch(changeCountryName(param, id)),
        changePassportNumber : (param, id)=> dispatch(changePassportNumber(param, id)),
        changeExpireDate : (param, id)=> dispatch(changeExpireDate(param, id))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AdultInfoForm)