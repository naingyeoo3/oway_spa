import React, { Component } from 'react'
import { connect } from 'react-redux'
import update from 'react-addons-update'

import { AutoComplete } from 'antd'
const { Option, OptGroup } = AutoComplete

import { 
  autocompleteSelectFromValue, 
  autocompleteSelectToValue 
} from '../actions/searchComponentActions'; 

import '../styles/search-input-autocomplete.scss';

const locationImg = require('../assests/images/svg/location.svg')

class SearchInputBusAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      visible: false,      
      fromValue: this.props.searchComponentReducers.from.fromCityTitle,
      toValue: this.props.searchComponentReducers.to.toCityTitle,
      fromValueType: false,
      toValueType: false
    }    
  }  
   
  checkInputType = (title) => title == 'From';
    
  showNotFound = (results)=>[<Option key="not found" disabled>{results.message}</Option>]
    
  getdataSource = () => {    
    if(this.state.fromValueType == true || this.state.toValueType == true){
      return this.getSearchDataSource()
    }else{
      return this.getSuggestSource()
    }
  }
  getSearchDataSource = () =>
    this.props.myanmarSearchCities
      .map(city => (      
              <Option key={city.cityName} text={city.cityName} value={city.cityName} label={city.cityId}>
                  <img src={locationImg} alt="Location" />
                  <p>{city.cityName}</p>
              </Option>        
      ))     
  getSuggestSource = () =>
    this.props.myanmarCities
        .map(item => (      
            <OptGroup key={item.id} label={item.name}>         
            {
                item.cities.map(city => (
                <Option key={city.id} text={city.title} value={city.keyword} label={city.cityId}>
                    <img src={locationImg} alt="Location" />
                    <p>{city.title}</p>
                </Option>
                ))            
            }
            </OptGroup>          
        ))     

checkTripStart = () => this.props.title == 'From';

handleSelectValue = (value, opt) => {                
  if(this.checkInputType(this.props.title)){
    this.props.autocompleteSelectFromValue(value, opt.props.text, opt.props.label);
    if(this.props.mobileMode){
      this.props.callbackHideMobileDrawer()
    }    
  }else{
    this.props.autocompleteSelectToValue(value, opt.props.text, opt.props.label); 
    if(this.props.mobileMode){
      this.props.callbackHideMobileDrawer()
    }        
  }      
}
  getDefaultValue = () => {
    const { searchComponentReducers } = this.props;
    if(this.checkTripStart()){
      return searchComponentReducers.from.fromCityTitle;
    }else{
      return searchComponentReducers.to.toCityTitle;
    }
  }
  getPlaceholderValue = () => {
    const { searchComponentReducers } = this.props;
    if(this.checkTripStart()){
      return searchComponentReducers.from.placeholder;
    }else{
      return searchComponentReducers.to.placeholder;
    }
  }

  changeSelectValue = () => {
    if(this.checkTripStart()){
      this.props.autocompleteSelectFromValue('', '', '');
    }else{
      this.props.autocompleteSelectToValue('', '', ''); 
    }
  }

  handleSearch = (value) => {
    this.checkInputType(this.props.title) ?      
      !!value && value.length >= 1 ? 
        setTimeout(() => {
          this.setState(update(this.state,{$set:{fromValue: value, fromValueType: true}}))  
        }, 50)      
        : 
        setTimeout(() => {
          this.setState(update(this.state,{$set:{fromValue: value, fromValueType: false}}))  
        }, 50)            
      :
      !!value && value.length >= 1 ?
        setTimeout(() => {
          this.setState(update(this.state,{$set:{toValue: value, toValueType: true}}))  
        }, 50)      
        :
        setTimeout(() => {
          this.setState(update(this.state,{$set:{toValue: value, toValueType: false}}))  
        }, 50)      
      
  }
  handleFocusFrom = (value) => {
    this.setState({fromValue: value})
    this.props.autocompleteSelectFromValue('','','')
  }
  handleFocusTo = (value) => {
    this.setState({toValue: value})
    this.props.autocompleteSelectToValue('','','')
  }

  handleFocus = (event) =>  {
    this.checkInputType(this.props.title) ? 
        this.handleFocusFrom(event)      
      : 
        this.handleFocusTo(event)        
  };
  handleChange = (event) => this.setState({value: event.target.value})
  getDropdrownClass(){
    if(this.props.title == 'From'){
      if(this.state.fromValue && this.state.fromValue.length > 0) {
        return 'city-list bus'
      }else{
        return 'recommended-city bus'
      }                        
    }else{
      if(this.state.toValue && this.state.toValue.length > 0) {
        return 'city-list bus';      
      }else{
        return 'recommended-city bus'
      }
    }
  }
  render() {         
    return (
      <div className="search-autocomplete">                                                                                                                       
        <AutoComplete          
          dataSource={this.getdataSource()}
          placeholder={this.getPlaceholderValue()}
          onSelect={(value,opt)=> this.handleSelectValue(value, opt)}                          
          allowClear={true}                        
          style={{width:"100%"}}                       
          value={this.checkInputType(this.props.title) ? this.state.fromValue : this.state.toValue}          
          id={this.props.title}               
          onChange={this.handleSearch}    
          dropdownClassName={this.getDropdrownClass()}                         
          optionLabelProp="text"
          filterOption={(inputValue, option) => {
                if(option.props.text != undefined){
                    return option.props.text.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            }}            
          onFocus={this.handleFocus}            
        >        
        </AutoComplete>                                                       
      </div>
    );
  }
}
  
const mapStateToProps = state => ({   
  searchComponentReducers: state.searchComponentReducers
});

const mapDispatchToProps = dispatch => {
  return{           
    searchStartCities     : (value) => dispatch(searchStartCities(value)),
    searchDestCities      : (value) => dispatch(searchDestCities(value)),    
    autocompleteSelectFromValue: (keyword, title, cityId)=> dispatch(autocompleteSelectFromValue(keyword, title, cityId)),
    autocompleteSelectToValue: (keyword, title, cityId)=> dispatch(autocompleteSelectToValue(keyword, title, cityId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInputBusAutoComplete);