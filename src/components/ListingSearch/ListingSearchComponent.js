import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';

import { Button, Input } from 'antd';

import SearchInputAutoComplete from '../SearchInputAutoComplete';
import SearchInputHotelAutoComplete from '../SearchInputHotelAutoComplete';
import SearchInputBusAutoComplete from '../SearchInputBusAutoComplete';
import SearchInputTourAutoComplete from '../SearchInputTourAutoComplete';
import AutocompletePlaceholder from '../AutocompletePlaceholder';
import DateRangeCalendar from '../DateRangeCalendar';
import SingleDateCalendar from '../SingleDateCalendar';
import HotelsDateRangeCalendar from '../HotelsDateRangeCalendar';
import BusDateRangeCalendar from '../BusDateRangeCalendar';
import TourDateRangeCalendar from '../TourDateRangeCalendar';

import { busCities } from '../../constants/busConstants';
import { flightCities } from '../../constants/flightConstants';
import { hotelCities } from '../../constants/hotelConstants';
import { busSearchCities } from '../../constants/busConstants';

import {
  autocompleteSelectFromValue,
  autocompleteSelectToValue,
  handlingSwapSearchValue,
  selectTravellerClass,
  handleRefreshState,
  selectDestinationValue,
  selectTourDestinationValue,
  searchDateFromValue,
  searchDateToValue,
  searchOneWayDate,
} from '../../actions/searchComponentActions';

import moment from 'moment';
const dateFormat = 'DD MMM YYYY';

import './listing-search-component.scss';

class ListingSearchComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isError: false
    }
  }
  componentDidUpdate(){
    // setTimeout(() => {
    //   this.setState({isError: false})  
    // }, 2000);    
  }
  //date input callback props fun
  handleSelectMobileDate = (startDate, endDate) => {
    const fromDate = moment(startDate).format(dateFormat);
    const toDate = moment(endDate).format(dateFormat);
    if (endDate != null) {
      this.props.searchDateFromValue(fromDate);
      this.props.searchDateToValue(toDate);
      // if(this.props.isMobileDept){
      //     this.props.callbackParentDrawerClose()
      // }
    } else {
      this.props.searchDateFromValue(fromDate);
      this.props.searchDateToValue(toDate);
    }
  };
  handleSelectMobileSingleDate = date => {
    const single_date = moment(date).format(dateFormat);
    this.props.searchOneWayDate(single_date);
    // if(this.props.isMobileDate){
    //     this.props.callbackParentDrawerClose()
    // }
  };
  //change origin - destination
  handleSwaptripPlan = () => {
    this.props.handleRefreshState();
    setTimeout(() => {
      this.props.handlingSwapSearchValue();
    }, 300);
  };
  // detect products lising page
  detectFlightListing = () =>
    this.props.router.location.pathname.includes('flights/search');

  detectBusListing = () =>
    this.props.router.location.pathname.includes('buses/search');

  detectHotelListing = () =>
    this.props.router.location.pathname.includes('hotels/search');

  detectTourListing = () =>
    this.props.router.location.pathname.includes('tours/search');
  
  detectAttrListing = () =>
    this.props.router.location.pathname.includes('attractions/search');
  // input render conditions
  getOriginInput() {
    const { searchResults, searchComponentReducers } = this.props;  
    const { isError } = this.state;  
    if (this.detectFlightListing()) {
      if(searchComponentReducers.isRefreshing){
        return (
          <AutocompletePlaceholder />
        )
      }else{
        return (
          <div>
            <SearchInputAutoComplete
              results={searchResults.startTrip}
              myanmarCities={flightCities}
              title="From"
            />
            {isError && searchComponentReducers.from.fromCity == '' ? <span className="listing-error">Please provide departure city</span> : null}            
          </div>
        );             
      }        
    }
    if (this.detectBusListing()) {
      if(searchComponentReducers.isRefreshing){
        return (
          <AutocompletePlaceholder />
        )
      }else{
        return (
          <div>
            <SearchInputBusAutoComplete
              myanmarCities={busCities}
              myanmarSearchCities={busSearchCities}
              title="From"
            />
            {isError && searchComponentReducers.from.fromCity == '' ? <span className="listing-error">Please provide departure city</span> : null}
          </div>          
        );
      }      
    }
    if (this.detectHotelListing()) {
      return (
        <div>
          <SearchInputHotelAutoComplete
            results={searchResults.hotelDest}
            myanmarCities={hotelCities}
            title="From"
          />
          {isError && searchComponentReducers.destination.slug == '' ? <span className="listing-error">Please search hotel or location</span> : null}
        </div>
      );
    }
    if (this.detectTourListing) {
      return (
        <div>
          <SearchInputTourAutoComplete title="From" />
          {isError && searchComponentReducers.tourDestination.name == '' ? <span className="listing-error">Please select city</span> : null}
        </div>
      ) 
    }
    if (this.detectAttrListing()) {
      return (
        <div>
          <SearchInputTourAutoComplete title="From" />
          {isError && searchComponentReducers.tourDestination.name == '' ? <span className="listing-error">Please select city</span> : null}
        </div>
      )
    }
  }
  //date input render conditons
  getDestinationInput() {
    const { searchResults, searchComponentReducers } = this.props;    
    const { isError } = this.state;
    if (this.detectFlightListing()) {
      if(searchComponentReducers.isRefreshing){
        return (
          <AutocompletePlaceholder />
        )
      }else{
        return (
          <div>
            <SearchInputAutoComplete
              results={searchResults.startTrip}
              myanmarCities={flightCities}
              title="To"
            />
            <div className="error">
            {isError && searchComponentReducers.to.toCity == '' ? <span className="listing-error">Please provided arrival city</span> : null}
            {isError && searchComponentReducers.from.fromCity == searchComponentReducers.to.toCity ? <span className="listing-error">Origin &amp; Destination cities must be different</span> : null}
            </div>
          </div>
          
        );
      }      
    }
    if (this.detectBusListing()) {
      if(searchComponentReducers.isRefreshing){
        return (
          <AutocompletePlaceholder />
        )
      }else{
        return (
          <div>
            <SearchInputBusAutoComplete
              myanmarCities={busCities}
              myanmarSearchCities={busSearchCities}
              title="To"
            />
            {isError && searchComponentReducers.to.toCity == '' ? <span className="listing-error">Please provided arrival city</span> : null}
            {isError && searchComponentReducers.from.fromCity == searchComponentReducers.to.toCity ? <span className="listing-error">Origin &amp; Destination cities must be different</span> : null}
          </div>
        );
      }      
    }
  }
  getDateInput() {
    if (this.detectFlightListing()) {
      return this.getFlightDateInput();
    }
    if (this.detectHotelListing()) {
      return this.getHotelDateInput();
    }
    if (this.detectBusListing()) {
      return this.getBusDateInput();
    }
    if (this.detectTourListing()) {
      return this.getTourDateInput();
    }
    if (this.detectAttrListing()) {
      return this.getAttrDateInput();
    }
  }
  getFlightDateInput() {
    const { searchComponentReducers } = this.props;
    const { isError } = this.state;
    if (searchComponentReducers.searchTab == 1) {
      return (
        <div className="single-date-picker">
          <SingleDateCalendar
            callbackMobileSelectDate={date =>
              this.handleSelectMobileSingleDate(date)
            }
            isListing={true}
            listingSearchDate={searchComponentReducers.onewayDate.date}
          />
          <div className="disabled-input">
            <Input disabled value={searchComponentReducers.onewayDate.date}/>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <DateRangeCalendar
            callbackMoibleSelectDate={(startDate, endDate) =>
              this.handleSelectMobileDate(startDate, endDate)
            }
            isListing={true}
            lisitngFromDate={searchComponentReducers.fromDate.date}
            listingToDate={searchComponentReducers.toDate.date}
          />
          {isError && (searchComponentReducers.fromDate.date == "Invalid date" || searchComponentReducers.toDate.date == "Invalid date") ? <div>Please Select Valid Date</div> : null}
        </div>
      );
    }
  }
  getHotelDateInput() {
    const { searchComponentReducers } = this.props;
    return (
      <HotelsDateRangeCalendar
        callbackMoibleSelectDate={(startDate, endDate) =>
          this.handleSelectMobileDate(startDate, endDate)
        }
        isListing={true}
        lisitngFromDate={searchComponentReducers.fromDate.date}
        listingToDate={searchComponentReducers.toDate.date}
      />
    );
  }
  getBusDateInput() {
    const { searchComponentReducers } = this.props;
    if (searchComponentReducers.searchTab == 1) {
      return (
        <div className="single-date-picker">
          <SingleDateCalendar
            callbackMobileSelectDate={date =>
              this.handleSelectMobileSingleDate(date)
            }
            isListing={true}
            listingSearchDate={searchComponentReducers.onewayDate.date}
          />
          <div className="disabled-input">
            <Input disabled value={searchComponentReducers.onewayDate.date}/>
          </div>
        </div>
      );
    } else {
      return (
        <BusDateRangeCalendar
          callbackMoibleSelectDate={(startDate, endDate) =>
            this.handleSelectMobileDate(startDate, endDate)
          }
          isListing={true}
          lisitngFromDate={searchComponentReducers.fromDate.date}
          listingToDate={searchComponentReducers.toDate.date}
        />
      );
    }
  }
  getTourDateInput() {
    const { searchComponentReducers } = this.props;
    return (
      <TourDateRangeCalendar
        callbackMoibleSelectDate={(startDate, endDate) =>
          this.handleSelectMobileDate(startDate, endDate)
        }
        isListing={true}
        lisitngFromDate={searchComponentReducers.fromDate.date}
        listingToDate={searchComponentReducers.toDate.date}
      />
    );
  }
  getAttrDateInput() {
    const { searchComponentReducers } = this.props;
    return (
      <TourDateRangeCalendar
        callbackMoibleSelectDate={(startDate, endDate) =>
          this.handleSelectMobileDate(startDate, endDate)
        }
        isListing={true}
        lisitngFromDate={searchComponentReducers.fromDate.date}
        listingToDate={searchComponentReducers.toDate.date}
      />
    );
  }
  // valid fun
  checkDate = (tripType) => tripType === 1 ? this.props.searchComponentReducers.fromDate.date != 'Invalid date' : this.props.searchComponentReducers.fromDate.date != "Invalid date" && this.props.searchComponentReducers.toDate.date != "Invalid date"
    
  busFormValid = () => !!this.props.searchComponentReducers.from.id &&
                        !!this.props.searchComponentReducers.to.id &&
                        this.props.searchComponentReducers.from.id != this.props.searchComponentReducers.to.id &&
                        this.checkDate(this.props.searchComponentReducers.searchTab)

  formValidTour = () => !!this.props.searchComponentReducers.tourDestination.name && 
                          !!this.props.searchComponentReducers.tourDestination.cityId &&
                          !!this.props.searchComponentReducers.fromDate.date != "Invalid date" &&
                          !!this.props.searchComponentReducers.toDate.date != "Invalid date"
  formValidationHotel = () => !!this.props.searchComponentReducers.destination.name &&
                          !!this.props.searchComponentReducers.destination.slug &&
                          !!this.props.searchComponentReducers.destination.scope &&
                          !!this.props.searchComponentReducers.fromDate.date &&
                          !!this.props.searchComponentReducers.toDate.date &&
                          this.props.searchComponentReducers.fromDate.date != "Invalid date" &&
                          this.props.searchComponentReducers.toDate.date != "Invalid date"
  // routes change when change on change search components
  handleChangeSearch() {
    const { searchComponentReducers, navbarOptions, locales } = this.props;
    if (this.detectFlightListing()) {
      if (this.formValidation()) {  
        console.info('valid')
        if(searchComponentReducers.searchTab == 1){
          history.push(`/flights/search/${searchComponentReducers.searchTab}/${searchComponentReducers.from.fromCity}/${searchComponentReducers.to.toCity}/${searchComponentReducers.onewayDate.date}/${'Invalid date'}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/${searchComponentReducers.travellerClass.key}/${navbarOptions.currency.name}/${locales.queryName}/`);
        }else{
          history.push(`/flights/search/${searchComponentReducers.searchTab}/${searchComponentReducers.from.fromCity}/${searchComponentReducers.to.toCity}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/${searchComponentReducers.travellerClass.key}/${navbarOptions.currency.name}/${locales.queryName}/`);
        }                      
      }else{
        console.info('form invalid')
        this.setState({isError: true})
      }
    }
    if (this.detectHotelListing()) {      
      var child_str = searchComponentReducers.travellers.childAge.length > 0 ? searchComponentReducers.travellers.childAge.map((child, index)=> `enquired_children[${index}]=${child.age}`).join('&') : '';        
        if(child_str){
            child_str = '&'+child_str;
        }
        if(this.formValidationHotel()){
          history.push(`/hotels/search/${searchComponentReducers.destination.name}/${searchComponentReducers.destination.slug}/${searchComponentReducers.destination.scope}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.room}/${searchComponentReducers.travellers.adult}/${navbarOptions.nation.other_name}/${navbarOptions.currency.name}/${navbarOptions.nation.type}/${locales.queryName}`)
        }else{
          this.setState({isError: true})
        }        
    }
    if (this.detectBusListing()) {
      const fromCityId = searchComponentReducers.from.id;
        const toCityId  = searchComponentReducers.to.id;
        const fromCity = searchComponentReducers.from.fromCity;
        const toCity = searchComponentReducers.to.toCity;
        const tripPlan = searchComponentReducers.searchTab;
        const fromDate = searchComponentReducers.fromDate.date;
        const toDate = searchComponentReducers.toDate.date;
        const onewayDate = searchComponentReducers.onewayDate.date;
        const adult = searchComponentReducers.travellers.adult;
        const child = searchComponentReducers.travellers.child;
        const currency = navbarOptions.currency.name;
        const nation = navbarOptions.nation.other_name;
        const locale = locales.queryName;

      if (this.busFormValid()) {
        if(tripPlan == 1){
          history.push(`/buses/search/${tripPlan}/${fromCity}/${fromCityId}/${toCity}/${toCityId}/${onewayDate}/${'Invalid date'}/${adult}/${child}/${currency}/${nation}/${locale}`);
        }else{
          history.push(`/buses/search/${tripPlan}/${fromCity}/${fromCityId}/${toCity}/${toCityId}/${fromDate}/${toDate}/${adult}/${child}/${currency}/${nation}/${locale}`);
        }        
      } else {
        this.setState({isError: true})
      }
    }
    if (this.detectTourListing()) {
      if (this.formValidTour()) {
        history.push(`/tours/search/${searchComponentReducers.tourDestination.name}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/${navbarOptions.currency.name}/${navbarOptions.nation.other_name}/${locales.queryName}`)
      }else{
        this.setState({isError: true})
      }
    }
    if (this.detectAttrListing()) {
      if (this.formValidTour()) {
        history.push(`/attractions/search/${searchComponentReducers.tourDestination.name}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/${navbarOptions.currency.name}/${navbarOptions.nation.other_name}/${locales.queryName}`)
      }else{
        this.setState({isError: true})
      }
    }
  }

  formValidation = () =>
    !!this.props.searchComponentReducers.from.fromCity &&
    !!this.props.searchComponentReducers.to.toCity &&
    !!this.props.searchComponentReducers.fromDate.date &&
    !!this.props.searchComponentReducers.toDate.date &&
    this.props.searchComponentReducers.from.fromCity !=
      this.props.searchComponentReducers.to.toCity &&
    this.checkDate(this.props.searchComponentReducers.searchTab);

  checkDate = tripType =>
    tripType === 1
      ? this.props.searchComponentReducers.onewayDate.date != 'Invalid date'
      : this.props.searchComponentReducers.fromDate.date != 'Invalid date' &&
        this.props.searchComponentReducers.toDate.date != 'Invalid date';

  formValidTour = () =>
    !!this.props.searchComponentReducers.tourDestination.name &&
    !!this.props.searchComponentReducers.tourDestination.cityId;
  getSwipIcon(){
    if(this.detectFlightListing() || this.detectBusListing()){
      return(
        <span
            onClick={() => this.handleSwaptripPlan()}
            className="swap-button"
          />
      )
    }
  }
  render() {
    const { router } = this.props;
    return (
      <div className="change-search">
        <div className={this.detectTourListing() || this.detectHotelListing() || this.detectAttrListing() ? "change-search-input one-input" : "change-search-input"}>
          {this.getOriginInput()}
        </div>
        <div className={this.detectTourListing() || this.detectHotelListing() || this.detectAttrListing() ? "swap-content none" : "swap-content"}>
          {this.getSwipIcon()}
        </div>
        <div className={this.detectTourListing() || this.detectHotelListing() || this.detectAttrListing() ? "change-search-input none" : "change-search-input"}>
          {this.getDestinationInput()}
        </div>
        <div className="change-search-date-input">{this.getDateInput()}</div>
        <div className="change-search-button">
          <Button onClick={() => this.handleChangeSearch()} className="btn btn-orange btn-block">Search</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults,
  searchComponentReducers: state.searchComponentReducers,
  router: state.router,
  navbarOptions: state.navbarOptions,
  locales: state.locales,
});

const mapDispatchToProps = dispatch => {
  return {
    autocompleteSelectFromValue: (keyword, title) =>
      dispatch(autocompleteSelectFromValue(keyword, title)),
    autocompleteSelectToValue: (keyword, title) =>
      dispatch(autocompleteSelectToValue(keyword, title)),
    handlingSwapSearchValue: () => dispatch(handlingSwapSearchValue()),
    selectTravellerClass: (title, keyword) =>
      dispatch(selectTravellerClass(title, keyword)),
    changeNationalType: (type, name, other, value) =>
      dispatch(changeNationalType(type, name, other, value)),
    handleRefreshState: () => dispatch(handleRefreshState()),
    requestFlightData: data => dispatch(requestFlightData(data)),
    selectDestinationValue: destination =>
      dispatch(selectDestinationValue(destination)),
    selectTourDestinationValue: destination =>
      dispatch(selectTourDestinationValue(destination)),
    searchDateFromValue: date => dispatch(searchDateFromValue(date)),
    searchDateToValue: date => dispatch(searchDateToValue(date)),
    searchOneWayDate: date => dispatch(searchOneWayDate(date)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingSearchComponent);
