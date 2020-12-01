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
  searchDestCities, 
  searchStartCities, 
  removeSearchResults,
  searchHotelDest 
} from '../actions/searchActions'

import { 
  autocompleteSelectFromValue, 
  autocompleteSelectToValue 
} from '../actions/searchComponentActions'; 

const location = require('../assests/images/svg/location.svg')
const airportImg= require('../assests/images/svg/airport.svg') 

import '../styles/search-input-autocomplete.scss';

const optSpinStyle = {
  position:"absolute",
  top:"0",
  left:"0",
  width:"100%",
  height:"100%",
  background:"#fff",
  opacity: "0.5",
  display:"flex",
  alignItems:"center"  
}

class SearchInputAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      visible: false,
      value:''
    }
  }  
   
  checkInputType = (title) => title == 'From';

  changeSelectValue = () => {    
      if(this.checkTripStart()){
        this.props.autocompleteSelectFromValue('', '');
      }else{
        this.props.autocompleteSelectToValue('', ''); 
      }
  }

  handleSearch = (event) => {      
    
    if(event == undefined){      
      this.changeSelectValue();      
      this.props.removeSearchResults();      
    }else
    if(event.length < 3){      
      this.changeSelectValue();      
      this.props.removeSearchResults();      
    } 
    if(this.state.value && this.state.value.length < 4){            
      // this.props.removeSearchResults();
    }
    this.setState(update(this.state,{$set:{value: event}}));
    const inputDom = document.querySelector(`#${this.props.title}`)        
      const source = fromEvent(inputDom, 'input');     
      this.props.requestCities();   
      const userinput = source.pipe(
            map(event => event.target.value.replace('(','').replace(')','')),
              filter( (text)=> text.length > 2),
                debounceTime(100),
                  distinctUntilChanged())        
            userinput.subscribe(val => 
              this.checkInputType(this.props.title) ?                   
                this.props.searchStartCities(val) 
                  : 
                this.props.searchDestCities(val)
            );    
  }

  // group array objects search results by country name
  groupByCountryName = (flights) => {            
    const groupBy = key => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});
    
    const countryName = groupBy('countryName');        

    var json = JSON.stringify({ flightSearch : countryName(flights)},null,2);
    var res = JSON.parse(json).flightSearch;        
    var sin_arr = [];
    if(res.Singapore){
      sin_arr[0] = ["Singapore",res.Singapore];
    }    
    var arr = [];    
    for(var i in res){      
      // if popular country is in results, set to the top
        if(i == 'Myanmar'){
          arr.unshift([i, res[i]])
        }else if(i == 'Thailand'){
          arr.unshift([i, res[i]])
        }else if(i == 'Australia'){
          arr.unshift([i, res[i]])        
        }else if(i == 'Indonesia'){
          arr.unshift([i, res[i]])
        }else if(i == 'India'){
          arr.unshift([i, res[i]])
        }else if(i == 'Cambodia'){
          arr.unshift([i, res[i]])
        }else if(i == 'Singapore'){
          // arr.unshift([i, res[i]])
        }else{
          arr.push([i, res[i]])

        }        
    }      
    if(sin_arr.length > 0){
      return sin_arr.concat(arr);
    }else{      
      return arr;
    }    
  }
  renderCity = (data) =>                                       
      this.groupByCountryName(data).map((item, index)=>
        <OptGroup 
          key={index} 
          label={
            <div className="location-label">
              <img src={location} />
              <div>{item[0]}</div>
            </div>
            }>
          {
            item[1].map( city => (
              <Option key={city.id} text={city.searchName} value={city.airportCode}>
                <div className="autocomplete-item">
                  <div className="overflow-fix">
                    <div className="title">
                      <img src={airportImg} className="airport-img" />
                      <p className="title-text">{city.airportCities[0].airportCity}</p>
                      <p className="title-text">,{city.countryName}</p>
                    </div>              
                    <p className="airport">{city.airportCities[0].airportName}</p>              
                  </div>
                  <div className="airport-code">
                    {city.airportCode}
                  </div>
                </div>
              </Option>
            )
            )
          }          
        </OptGroup>
      ).concat([
        <Option key="all" style={this.props.results.isFetching ? optSpinStyle: {display:"none"}}>
          <Spin tip="loading ....."/>          
        </Option>
      ])          
  recommendedCity = () => 
    this.props.mobileMode ?
      []
    :    
      this.props.myanmarCities
        .map(item => (      
          <OptGroup key={item.id} label={item.name}>         
            {
              item.cities.map((city, index )=> (
                <Option key={index} text={city.data_type} value={city.keyword}>
                  {city.title}   
                </Option>                                
              ))            
            }
          </OptGroup>          
        ))    
  showNotFound = (results)=>[<Option key="not found" disabled>{results.message}</Option>]
    
  getdataSource = () => {
    const { results } = this.props;      
      if(results.data.length > 0){        
            return this.renderCity(results.data)        
      }else{      
        return this.recommendedCity()
      }                
  }  
  checkTripStart = () => this.props.title == 'From';

  handleSelectValue = (value, opt) => {            
    if(this.checkTripStart()){
        this.props.autocompleteSelectFromValue(value, opt.props.text);
        setTimeout(() => {
          this.props.removeSearchResults();
        }, 300);      
    }else{
        this.props.autocompleteSelectToValue(value, opt.props.text);       
        setTimeout(() => {
          this.props.removeSearchResults();
        }, 300);
    }            
    if(this.props.mobileMode){
      this.props.removeSearchResults();
      setTimeout(() => {
        this.props.callbackHideMobileDrawer()  
      }, 100);      
    }else{
      setTimeout(() => {
        this.props.removeSearchResults();
      }, 300);
    }
    setTimeout(() => {
      this.props.removeSearchResults();
    }, 3000);
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
  render() { 
    const { results } = this.props;                 
    return (
      <div className="search-autocomplete flight">
        <AutoComplete          
          dataSource={this.getdataSource()}                       
          placeholder={this.getPlaceholderValue()}
          onSelect={(value,opt)=> this.handleSelectValue(value, opt)}                                    
          allowClear={true}                                
          defaultValue={this.getDefaultValue()}
          id={this.props.title}               
          onChange={this.handleSearch}
          dropdownClassName={results.data.length > 0 ? "city-list flight":"recommended-city flight"}          
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
    searchStartCities     : (value) => dispatch(searchStartCities(value)),
    searchDestCities      : (value) => dispatch(searchDestCities(value)),
    searchHotelDest       : (value) => dispatch(searchHotelDest(value)),
    requestCities         : ()=> dispatch(requestCities()),
    removeSearchResults   : ()=> dispatch(removeSearchResults()),
    autocompleteSelectFromValue: (keyword, title)=> dispatch(autocompleteSelectFromValue(keyword, title)),
    autocompleteSelectToValue: (keyword, title)=> dispatch(autocompleteSelectToValue(keyword, title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInputAutoComplete);