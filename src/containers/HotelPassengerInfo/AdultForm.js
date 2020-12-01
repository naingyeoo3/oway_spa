import React, { Component } from 'react';
import { Input, AutoComplete, Select } from 'antd';
const Option = Select.Option;

class AdultForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getDataSource = () =>
        this.props.countryList 
            .map((country, index )=> (      
                    <Option key={index} text={country.name} onClick={()=> this.props.callbackCountry(country.name)}>
                        <p>{country.name}</p>
                    </Option>        
            ))
    render() { 
        const { formValue } = this.props;
        return (
            <div className="form-container">
                <h5>Adult </h5>
                <div className="card form-card passenger-card">
                    <div className="form-group">
                        <div className="card input-card">
                            <label>First name</label>                            
                            <Input 
                                placeholder="enter your first name" 
                                type="text"
                                value={formValue && formValue.firstname}
                                onChange={(e)=> this.props.callbackAdult(e.target.value)}/>
                            <span className="error-text">{!!formValue.firstname && formValue.firstname.length < 3 ? <small>enter valid 3 word</small> : null}</span>
                        </div>
                        <div className="card input-card">
                            <label>Last name</label>
                            <Input 
                                placeholder="enter your last name" 
                                type="text"
                                value={formValue && formValue.lastname}
                                onChange={(e)=> this.props.callbackAdultLast(e.target.value)}/>
                            <span className="error-text">{!!formValue.lastname && formValue.lastname.length < 3 ? <small>enter valid 3 word</small> : null}</span>
                        </div>
                        <div className="card input-card">
                            <label>Phone</label>
                            <Input 
                                placeholder="enter phone number" 
                                type="number"
                                value={formValue && formValue.phone}
                                onChange={(e)=> this.props.callbackPhone(e.target.value)}/>
                            <span className="error-text">{!!formValue.phone && formValue.phone.length < 5 ? <small>enter valid 3 word</small> : null}</span>
                        </div>
                        <div className="card input-card select-card">
                            <label>Passport issuing country</label>
                            <AutoComplete
                                dataSource={this.getDataSource()}                    
                                style={{ width: 200 }}
                                allowClear={true}
                                placeholder="Passport Issuing Country"
                                dropdownClassName="search-feature-tour"
                                filterOption={(inputValue, option) => {
                                    if(option.props.text != undefined){
                                        return option.props.text.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                }}            
                                optionLabelProp="text"
                             />
                             <span className="error-text">{!!formValue && !!formValue.country ? <small>select country</small> : null}</span>
                        </div>
                        <div className="card input-card select-card">
                            <label>Passport number</label>
                            <Input 
                                placeholder="Passport Number" 
                                type="number"
                                value={formValue && formValue.passport}
                                onChange={(e)=> this.props.callbackPassport(e.target.value)}/>
                             <span className="error-text">{!!formValue.passport && formValue.passport.length < 3 ? <small>enter valid passport number</small> : null}</span>
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}
 
export default AdultForm;