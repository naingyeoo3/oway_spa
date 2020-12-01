import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update'

import { AutoComplete } from 'antd';
const { Option, OptGroup } = AutoComplete


class CountryCodeSelect extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
        this.handleSearch = this.handleSearch.bind(this); 
    }
    handleSelectValue(value, opt) {                   
        this.props.input.onChange(value.split(' ')[1])
    }
    handleSearch(value){
        if(value == undefined){            
            this.props.input.onChange('')
            this.setState({value: ''})                     
        }        
        this.setState(update(this.state,{$set:{value: value}}))
    }
    getdataSource = () =>         
        this.props.countryListing.countryList.length > 1 && 
            this.props.countryListing.countryList.map((country, index )=> (                  
                <Option 
                    key={index} 
                    text={country.callingCode.toString() +' '+ country.name} 
                    value={country.name +' '+country.callingCode.toString()}  
                    >
                    <img src={country.flag} style={{width:"20px"}} />{country.name + country.callingCode}                            
                </Option>                                        
        ))        
    render() {
        return (
            <div>
                <AutoComplete          
                    dataSource={this.getdataSource()}                       
                    placeholder='Dial Code'
                    onSelect={(value,opt)=> this.handleSelectValue(value, opt)}                          
                    allowClear={true}                       
                    onChange={this.handleSearch}
                    defaultActiveFirstOption={true}
                    optionLabelProp="text"                      
                    filterOption={(inputValue, option) => {
                            if(option.props.text != undefined){
                                return option.props.text.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        }}                                        
                    >        
                </AutoComplete>
                { this.props.meta.error && <span>{this.props.meta.error}</span>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({    
    countryListing: state.countryListing
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(CountryCodeSelect);