import React, { Component } from 'react'
import { connect } from 'react-redux'
import update from 'react-addons-update'
import { fromEvent } from 'rxjs'
import { 
  map,
  filter, 
  debounceTime, 
  distinctUntilChanged 
  } from 'rxjs/operators';

import { AutoComplete, Spin} from 'antd'
const { Option, OptGroup } = AutoComplete

import {   
  requestCities,
  searchHotelDest,
  removeHotelResults,
  requestHotelResults, 
  removeSearchResults,
  searchStartCities, 
} from '../actions/searchActions'

import { selectDestinationValue, autocompleteSelectFromValue } from '../actions/searchComponentActions'; 
   
const location = require('../assests/images/svg/location.svg')
const city = require('../assests/images/svg/city.svg')
const hotel = require('../assests/images/svg/hotel-autocomplete.svg')
const airportImg= require('../assests/images/svg/airport.svg') 

import '../styles/search-input-autocomplete.scss';

const optSpinStyle = {
  position:"absolute",
  top:"0",
  left:"0",
  width:"100%",
  height:"100%",
  background:"#fff",
  opacity: "0.6",
  display:"flex",
  alignItems:"center"  
}

class SearchInputHotelAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      visible: false,
      value:'',
      isRenderResult: false
    }
  }  
   
  checkInputType = (title) => title == 'From';  

  detectHotelRoute = (route) => route == '/hotels';

  handleSearch = (event) => {        
    const destination = {
      name: '',
      slug: '',
      scope: '',
      id: '',
      township_slug: '',
      hotel_slug: '' 
    }
    if(event == undefined){         
      this.props.selectDestinationValue(destination)
      this.props.removeHotelResults(); 
    }else if(event.length < 3){      
      this.props.selectDestinationValue(destination)
      this.props.removeHotelResults(); 
    } 
    this.setState(update(this.state,{$set:{value: event}}));
    const inputDom = document.querySelector(`#${'From'}`)            
      const source = fromEvent(inputDom, 'input');     
      this.props.requestHotelResults();   
      const userinput = source.pipe(
            map(event => event.target.value.replace('(','').replace(')','')),
              filter( (text)=> text.length > 2),
                debounceTime(100),
                  distinctUntilChanged())        
            userinput.subscribe(val =>               
                this.props.searchHotelDest(val)               
            );    
  }

reformatedValue = hotel =>{ 
  if(hotel.hasOwnProperty('location')) {
    return (hotel.name +', '+'Myanmar').toString();
  }else{
    return (hotel.name +', '+'Myanmar').toString();
  }
}
getHotelName = (hotel) => {  
  if(hotel.kind == 'city'){
    return hotel.name + ', ' + hotel.country;
  }else{
    return hotel.name + ', '+ hotel.city + ', ' + hotel.country; 
  }
}

groupByCountryName = (hotels) => {
  const groupBy = key => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});
    
    const country = groupBy('country');        

    var json = JSON.stringify({ hotelGpt : country(hotels)},null,2);

    var res = JSON.parse(json).hotelGpt;    
    
    var new_hotels = [];

    for(var i in res){
      if(i === 'Myanmar'){
        new_hotels.unshift([i, res[i]]);
      }else if(i === 'Thailand'){
        new_hotels.unshift([i, res[i]])
      }else if(i === 'Australia'){
        new_hotels.unshift([i, res[i]])        
      }else if(i === 'Indonesia'){
        new_hotels.unshift([i, res[i]])
      }else if(i === 'India'){
        new_hotels.unshift([i, res[i]])
      }else if(i === 'Cambodia'){
        new_hotels.unshift([i, res[i]])
      }else if(i === 'Singapore'){
        new_hotels.unshift([i, res[i]])
      }else{
        new_hotels.push([i, res[i]])
      }        
    }
    return new_hotels;
}

renderResults = (data) =>     
this.groupByCountryName(data).map((hotel, index)=> (
  <OptGroup 
      key={index}
      label={
        <div className="location-label">
          <img src={location} />
          <div>{hotel[0]}</div>
        </div>
        }>
    {
      hotel[1].map((hotel, index) => (                              
      <Option 
        className="something-data" 
        key={index} 
        text={hotel.name + ', ' + hotel.country} 
        value={hotel.name+','+hotel.city+','+hotel.id + ',' + hotel.country} 
        label={hotel.kind+','+hotel.id.toString()+','+hotel.city_slug+','+hotel.township_slug+','+''+','+hotel.hotel_slug}>          
          <div className="autocomplete-item">                  
              <div className="title">
                {this.getIcon(hotel)}
                <p className="title-text">{this.getHotelName(hotel)}</p>
              </div>                                                    
              <div className="airport-code">
                  {this.checkLocationType(hotel)}
              </div>
          </div>
      </Option>
    )).concat([
            <Option key="all" style={this.props.results.isFetching ? optSpinStyle: {display:"none"}}>
              <Spin tip="loading ....."/>          
            </Option>
          ])
    }    
  </OptGroup>
))       
            
getIcon = (type) => {  
    if(type.kind == 'city'){
        return (<img src={location} />)
    }else if(type.kind == 'hotel'){
        return (<img src={hotel} />)
    }else if(type.kind == 'township'){
        return (<img src={city} />)
    }
}           
checkLocationType = (type) => {
    if(type.kind === 'city'){
        return 'City'
    }else if(type.kind === 'hotel'){
        return 'Hotel'
    }else if(type.kind === 'township'){
        return 'Location'
    }
}
    
  recommendedCity = () =>   
    this.props.mobileMode ?
      []
    :    
      this.props.myanmarCities
        .map(item => (      
          <OptGroup key={item.id} label={item.name}>         
            {
              item.cities.map((city, index )=> (
                <Option 
                  key={index} 
                  text={city.keyword} 
                  value={city.name} 
                  label={city.scope+','+city.id.toString()+','+city.slug+','+""+','+city.region+','+''}>
                  {city.name}   
                </Option>                                
              ))            
            }
          </OptGroup>          
        ))    
  showNotFound = (results)=>[<Option key="not found" disabled>{results.data.message}</Option>]
  
  getdataSource = () => {
    const { results } = this.props;  
            
      if(results.data === null){
        return this.recommendedCity()
      }else{
        return this.renderResults(results.data)
      }            
      // if(results && results.data.hasOwnProperty('code') && results.data.code == '004'){
      //   return this.showNotFound(results)
      // }else if( results && (results.data.hasOwnProperty('cities') || results.data.hasOwnProperty('townships') || results.data.hasOwnProperty('hotels'))){      
      //   return this.renderResults(results.data)
      // }else{      
      //   return this.recommendedCity()
      // }
    }   
  checkTripStart = () => this.props.title == 'From';

  handleSelectValue = (value, opt) => {          
    
    const destination = {
        name: opt.props.text,                
        id: opt.props.label.split(',')[1],
        scope: opt.props.label.split(',')[0],
        slug: opt.props.label.split(',')[2],        
        township_slug: opt.props.label.split(',')[3],
        region: opt.props.label.split(',')[4],
        country: opt.props.text.split(',')[1].trim(),
        hotel_slug: opt.props.label.split(',')[5]
    }          
    this.props.selectDestinationValue(destination);           
    setTimeout(() => {
      this.props.removeHotelResults();
    }, 300);
        
    // this.props.removeHotelResults()    
    if(this.props.mobileMode){
      this.props.callbackHideMobileDrawer()  
    }
  }
  getDefaultValue = () => {
    const { searchComponentReducers } = this.props;    
      return searchComponentReducers.destination.name;    
  }
  handleFocus = (event) =>  {
    this.setState(update(this.state,{$set:{value: ''}}))
    const destination = {
      name: '',
      slug: '',
      scope: '',
      id: '',
      region: ''        
  }
  this.props.selectDestinationValue(destination)        
  };
  getClassName = () => this.props.results.data != null ? "city-list hotel":"recommended-city hotel"
    
  render() { 
    const { results } = this.props;                 
    return (
      <div className="search-autocomplete flight">
        <AutoComplete          
          dataSource={this.getdataSource()}                       
          placeholder={this.props.searchComponentReducers.destination.placeholder}
          onSelect={(value,opt)=> this.handleSelectValue(value, opt)}                                    
          allowClear={true}                                
          defaultValue={this.getDefaultValue()}
          id={'From'}               
          onChange={this.handleSearch}
          dropdownClassName={this.getClassName()}
          optionLabelProp="text"          
        >        
        </AutoComplete>                                           
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  searchResults: state.searchResults,
  router: state.router,
  searchComponentReducers: state.searchComponentReducers
});

const mapDispatchToProps = dispatch => {
  return{               
    searchHotelDest       : (value) => dispatch(searchHotelDest(value)),
    requestHotelResults   : ()=> dispatch(requestHotelResults()),
    removeHotelResults   : ()=> dispatch(removeHotelResults()),    
    selectDestinationValue: (destination) => dispatch(selectDestinationValue(destination)),
    autocompleteSelectFromValue: (keyword, title)=> dispatch(autocompleteSelectFromValue(keyword, title)),
    requestCities         : ()=> dispatch(requestCities()),
    removeSearchResults   : ()=> dispatch(removeSearchResults()),
    searchStartCities     : (value) => dispatch(searchStartCities(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInputHotelAutoComplete);