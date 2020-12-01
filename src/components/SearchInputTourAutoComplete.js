import React, { Component } from 'react'
import { connect } from 'react-redux'
import update from 'react-addons-update'

import { AutoComplete } from 'antd'
const { Option, OptGroup } = AutoComplete

import { 
  autocompleteSelectFromValue, 
  autocompleteSelectToValue,
  selectTourDestinationValue 
} from '../actions/searchComponentActions'; 

import { tourCities, tourSearchCities } from '../constants/tourConstants';          

import '../styles/search-input-autocomplete.scss';
const locationImg = require('../assests/images/svg/location.svg') 

class SearchInputTourAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      visible: false,
      // value:''
      value: this.props.searchComponentReducers.tourDestination.name,
      isType: false
    }
  }  
   
  checkInputType = (title) => title == 'From';
    
  showNotFound = (results)=>[<Option key="not found" disabled>{results.message}</Option>]
    
  getdataSource = () => {
    if(this.state.isType){
      return this.getSearchSource();
    }else{
      return this.getRecommendedSource();
    }
  }        
  getSearchSource = () =>
    tourSearchCities.map(city => (            
          <Option 
              key={city.cityName} 
              text={city.cityName} 
              value={city.cityName} 
              label={city.cityId}
              >
              <img src={locationImg} alt="Location" />
              <p>{city.cityName}</p>
          </Option>
        ))            
          
  getRecommendedSource = () => 
    tourCities.map(item => (      
            <OptGroup key={item.id} label={item.name}>         
            {
                item.cities.map(city => (
                <Option 
                    key={city.id} 
                    text={city.cityName} 
                    value={city.cityName} 
                    label={city.cityId}
                    >
                    <img src={locationImg} alt="Location" />
                    <p>{city.cityName}</p>
                </Option>
                ))            
            }
            </OptGroup>          
        ))     

checkTripStart = () => this.props.title == 'From';

handleSelectValue = (value, opt) => {    
    const tourDestination={
        cityId: opt.props.label,
        name: opt.props.text
    }  
    this.props.selectTourDestinationValue(tourDestination)          
    if(this.props.mobileMode){
        this.props.callbackHideMobileDrawer()
    }    
}  

  changeSelectValue = () => {
    if(this.checkTripStart()){
      this.props.autocompleteSelectFromValue('', '');
    }else{
      this.props.autocompleteSelectToValue('', ''); 
    }
  }

  handleSearch = (value) => {   
    const tourDestination={
      cityId: '',
      name: ''
    }
    if(!!value && value.length >= 1){
      this.setState(update(this.state,{$set:{value: value, isType: true}}))
    }else{
      this.setState(update(this.state,{$set:{value: value, isType: false}}))
    }        
    if(value == undefined){
      this.props.selectTourDestinationValue(tourDestination)
    }else if(value.length < 3){
      this.props.selectTourDestinationValue(tourDestination)
    }        
  }
  
  handleFocus = (event) =>  {    
    this.setState(update(this.state,{$set:{value: ''}}))    
    const tourDestination={
        cityId: '',
        name: ''
    }
    this.props.selectTourDestinationValue(tourDestination)
  };
  
  render() {     
    return (
      <div className="search-autocomplete">                    
        <AutoComplete          
          dataSource={this.getdataSource()}                       
          placeholder={this.props.searchComponentReducers.tourDestination.placeholder}
          onSelect={(value,opt)=> this.handleSelectValue(value, opt)}                          
          allowClear={true}                        
          style={{width:"100%"}}
          id={this.props.title}  
          value={this.state.value}             
          onChange={this.handleSearch}    
          dropdownClassName={ this.state.value && this.state.value.length > 0 ? "city-list tour":"recommended-city tour"}          
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
    autocompleteSelectFromValue: (keyword, title)=> dispatch(autocompleteSelectFromValue(keyword, title)),
    autocompleteSelectToValue: (keyword, title)=> dispatch(autocompleteSelectToValue(keyword, title)),
    selectTourDestinationValue: (destination)=> dispatch(selectTourDestinationValue(destination))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInputTourAutoComplete);