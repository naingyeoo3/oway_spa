import React, { Component } from 'react';
import update from 'react-addons-update'

import { AutoComplete } from 'antd';
const { Option, OptGroup } = AutoComplete

import { nationality } from '../../constants/visaPageConstants';       

class AutocompleteNation extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
        this.handleSearch = this.handleSearch.bind(this); 
    }
    handleSelectValue(value, opt) {           
        if(this.props.isMobile){
            this.props.callbackParent(value)
        }else{
            this.props.callbackSelect(value)
        }        
    }
    handleSearch(value){
        if(value == undefined){            
            this.setState({value: ''})
            if(this.props.isMobile){
                this.props.callbackParentClose('')
            }            
        }        
        this.setState(update(this.state,{$set:{value: value}}))
    }
    getdataSource = () =>         
        nationality.map((item, index )=> (      
            <OptGroup key={index} label={item.title}>         
            {
                item.countries.map(country => (
                <Option 
                    key={country.id} 
                    text={country.name} 
                    value={country.name}                 
                    >
                    {country.name}                            
                </Option>
                ))            
            }
            </OptGroup>
        ))        
    render() {
        return (
            <div>
                <AutoComplete          
                    dataSource={this.getdataSource()}                       
                    placeholder='Select Nationality'
                    onSelect={(value,opt)=> this.handleSelectValue(value, opt)}                          
                    allowClear={true}                                                                  
                    // value={this.state.value}             
                    onChange={this.handleSearch}
                    defaultValue={this.props.formReducer.nationality.value}
                    defaultActiveFirstOption={true}
                    defaultOpen={this.props.isMobile ? false : true}                    
                    dropdownClassName={this.state.value && this.state.value.length > 0 ? "city-list nationality":"recommended-city nationality"} 
                    optionLabelProp="text"                      
                    filterOption={(inputValue, option) => {
                            if(option.props.text != undefined){
                                return option.props.text.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        }}                                        
                    >        
                </AutoComplete>
            </div>
        );
    }
}

export default AutocompleteNation;