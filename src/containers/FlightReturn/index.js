import React, { Component,Suspense} from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import SortableComponent from '../../components/SortableComponent';
import FilterableComponent from '../../components/FilterableComponent';
import FlightListingItem from '../../components/FlightListItem';
import Skeleton from '../../components/FlightSkeleton';
import FilterSkeleton from '../../components/FilterSkeleton';
import SortingSkeleton from '../../components/SortingSkeleton';
import {checkAllFilter} from '../../constants/flightListingHelper';    
import { sortItems } from '../../constants/flightListingConstants';
import { FLIGHT_API_KEY,CONFIRM_API_KEY } from '../../constants/credentials';
import {verifyFlight,confirmFlight} from '../../actions/flightsListingAction';
import CustomerCare from '../../components/CustomerCareCenter';
import history from '../../utils/history';
import {saveState} from '../../localStorage';
import { Button } from 'antd';
import { 
    requestFlightData, 
    filterFlightData, 
    sortFilteredFlightData, 
    sortFlightData,
    selectFlight,
    addPriceFilter,
    resetPriceFilter,
    addStopFilter,
    resetStopFilter,
    addAirlineNameFilter,
    resetAirlineNameFilter,
    addClassFilter,
    resetClassFilter,
    addDepartFilter,
    resetDepartFilter,
    srotByAirline,
    sortByDepart,
    sortByDuration,
    sortByArrival,
    sortByPrice,
    loadMoreFlightReturn
} from '../../actions/flightsListingAction';
import SEOList from '../../components/SEOList';
import Newsletter from '../../components/Newsletter';
import './style.scss';

class FlightListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxPrice: 0,
            isSelected:false,
            departFilters: [
                {
                    name: "Early Moring",
                    time: "12:00 am - 6:00am"
                },
                {
                    name: "Morning",
                    time: "6:00 am - 12:00pm"
                },
                {
                    name: "Afternoon",
                    time: "12:00 pm - 6:00pm"
                },
                {
                    name: "Evening",
                    time: "6:00pm - 12:00 am"
                }
            ],
            filters: {
                price: 0,
                stops: [],
                airlineName: [],
                airlineType: [],
                classes: [],
                departureTime: []
            },
            sorts: {
                price: 0,//ascend,
                airlines: 0,
                arrival: 0,
                departs: 0,
                duration: 0

            },
            sortable: [
                {
                    name: 'Airlines',
                    sorted: false,
                },
                {
                    name: 'Duration',
                    sorted: false,
                },
                {
                    name: 'Departs',
                    sorted: false,
                },
                {
                    name: 'Arrival',
                    sorted: false
                },
                {
                    name: 'Price',
                    sorted: false
                }
            ]
        }
        this.handleOnClickItem = this.handleOnClickItem.bind(this);
    }
    componentDidMount() {
        //this.loadFlightData();
    }
    componentDidUpdate(prevProps, prevState) {
        if((prevProps.flightsListing.isVerified != this.props.flightsListing.isVerified) && this.props.flightsListing.isVerified){
            console.log("is Verified")
            this.confirmFlight()
            return null;
        }
        if((prevProps.flightsListing.isConfirmed != this.props.flightsListing.isConfirmed) && this.props.flightsListing.isConfirmed){
            console.log("Flight is Confirmed")
            saveState(this.props.flightsListing);
            let flightType = this.props.flightsListing.verifiedFlight.flightType;
            this.props.history.push(`/flights/search/detail/${flightType}/checkout`)
            return null;
        }
        else {
            return null;
        } 
    }

    getMaxPrice() {
        const flights = this.props.flightsListing.selectedReturnList;
        let maxPrice = Math.max(...flights.map(flight => flight.rates.deal.total.base), 1);
        return  Math.ceil(maxPrice);
    }
    
    handleSortOperation(keyword){
        const page_name = "flight_return";
        switch(keyword){
            case "airline" : return this.props.srotByAirline(page_name);
            case "departs" : return this.props.sortByDepart(page_name);
            case "duration": return this.props.sortByDuration(page_name);
            case "arrival" : return this.props.sortByArrival(page_name);
            case "price"   : return this.props.sortByPrice(page_name);
        }
      }



    handleOnClickItem(refId,referKey) {
        // console.log("refId",refId);
        let {flightsListing,searchComponentReducers,navbarOptions} = this.props;
        let returns = (this.props.flightsListing.returns)? this.props.flightsListing.returns : {};
        var keys = Object.keys(returns);

        if(searchComponentReducers.searchTab === 2){
          console.log("refId",refId);  
          console.log("referKey",flightsListing.referKey)
          const payload ={
            apiKey :"Kpp69BQ8ihwwLsPwSEexjqKAbf+fSSbQ\/qlz9Nuy\/O0=",
            currencyCode : navbarOptions.currency.name,
            referKey : flightsListing.referKey,
            cacheKey : flightsListing.cacheKey,
            returnReferKey:referKey,
        }
        console.log(payload)
        this.props.verifyFlight(payload)
        }
       
    }
    confirmFlight(){
        const { searchComponentReducers,match,flightsListing,navbarOptions} = this.props;
        let flightRates = [];
        if(flightsListing.verifiedFlight.outward){
            flightRates.push(flightsListing.verifiedFlight.outward.rates)
        }
        if(flightsListing.verifiedFlight.return){
            flightRates.push(flightsListing.verifiedFlight.return.rates)
        }
        let payload = {
            "source" : flightsListing.verifiedFlight.source,
            "adult": match.params.adult,
            "child": match.params.child,
            "infant": match.params.infant,
            "productId":2,
            "cacheKey":flightsListing.cacheKey,
            "channelType":1,
            "fareType":navbarOptions.nation.other_name,
            "apiKey":CONFIRM_API_KEY,
            "rates": flightRates,
            "flight_version": "4"
        }
        console.log("Requesting for flight Confirm",payload);
        this.props.confirmFlight(payload)

    }


    hasIsStopFilter = () => this.props.flightsListing.filters.stops.length > 0;

    hasIsAirline = () => this.props.flightsListing.filters.airlineNames.length > 0;

    hasShowDepart = () => this.props.flightsListing.showDepart.length > 0;

    hasClasses = () => this.props.flightsListing.filters.classes.length > 0;

    render() {
        const { flightsListing,navbarOptions} = this.props;
        const page_name = "flight_return";
        return (
            <div>
                <div className="app-container">
                {
                    // (this.props.flightsListing.isFetching) ?
                    //     <div>is Fetching</div> :
                        <div className="main-grid">
                            <div className="filter-block">
                            {
                                flightsListing.isFetching ? 
                                // <div>loading</div>
                                <FilterSkeleton />
                                :
                                <div>
                                {/* <h3>Filters</h3> */}
                                <div className="card found-card">
                                    {
                                        (this.props.flightsListing.filteredList.length == 0 && this.props.flightsListing.filterType == null) ?
                                            <p className="found">
                                                <span>{this.props.flightsListing.selectedReturnList.length} Flights </span>
                                                found
                                            </p> 
                                            :
                                            <p className="found">
                                                <span>{this.props.flightsListing.filteredList.length} Flights </span>
                                                found
                                            </p>
                                            
                                    }
                                    <p className="info">
                                        Prices are round trip per person and include all taxes and fees. All flight times 
                                        and dates are in local time.
                                    </p>
                                </div>
                                <ul>
                                    <li>
                                        <h4>
                                            Price 
                                        </h4>
                                        <h5>{navbarOptions.currency.name} {flightsListing.filterBy.price}</h5>
                                        {
                                            (flightsListing.selectedReturnList.length > 0) ?
                                                (
                                                    <div>
                                                        <input 
                                                            name="price" 
                                                            type="range" 
                                                            min="0" 
                                                            max={this.getMaxPrice()} 
                                                            className="slider" 
                                                            id="myRange" 
                                                            onChange={(e) => this.props.addPriceFilter(e.target.value,page_name)} />
                                                        <div className="price"> 
                                                            <div>{navbarOptions.currency.name} 0</div>
                                                            <div>{navbarOptions.currency.name} {this.getMaxPrice()}</div>
                                                        </div>
                                                    </div>
                                                ) :
                                                (
                                                    <div>
                                                        <input type="range" min="0" max="100" className="slider" id="myRange" />
                                                        <div className="price"> 
                                                            <div>{navbarOptions.currency.name} 0</div>
                                                            <div>{navbarOptions.currency.name} 100</div>
                                                        </div>                                                        
                                                    </div>

                                                )
                                        }
                                    </li>
                                    <li> 
                                        <FilterableComponent 
                                            filter_name={'stops'} 
                                            filters={flightsListing.filters.stops} 
                                            filterCallback={(e) => this.props.addStopFilter(e,page_name)} 
                                            isStop={this.hasIsStopFilter()} 
                                            resetCallback={() => this.props.resetStopFilter(page_name)} 
                                            checkedFilters={flightsListing.filterBy.stops} />                                      
                                    </li>                                    
                                    <li>
                                        <FilterableComponent 
                                            filter_name={'departureTime'} 
                                            filters={flightsListing.showDepart} 
                                            filterCallback={(e) => this.props.addDepartFilter(e,page_name)} 
                                            isDeparts={this.hasShowDepart()} 
                                            resetCallback={() => this.props.resetDepartFilter(page_name)}
                                            checkedFilters={flightsListing.filterBy.depart} />
                                    </li>
                                    <li>
                                        <FilterableComponent 
                                            filter_name={'airlines'} 
                                            filters={flightsListing.filters.airlineNames} 
                                            filterCallback={(e) => this.props.addAirlineNameFilter(e,page_name)} 
                                            isAirline={this.hasIsAirline()} 
                                            resetCallback={() => this.props.resetAirlineNameFilter(page_name)}
                                            checkedFilters={flightsListing.filterBy.airlineNames} />
                                    </li>
                                    <li>
                                        <FilterableComponent 
                                            filter_name={'classes'} 
                                            filters={flightsListing.filters.classes} 
                                            filterCallback={(e) => this.props.addClassFilter(e,page_name)} 
                                            isClass={this.hasClasses()} 
                                            resetCallback={(filter_name) => this.props.resetClassFilter(page_name)}
                                            checkedFilters={flightsListing.filterBy.classes} />
                                    </li>
                                </ul>
                                <CustomerCare />
                            </div>
                            }
                            </div>
                            <div className="listing-block">
                                {
                                    flightsListing.isFetching ?
                                    <div>
                                        <SortingSkeleton />
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
                                    </div>
                                    :
                                    <div>
                                        <div className="sorting-block">
                                            <div>
                                                <p className="sorted-by">Sorted by</p>
                                            </div>
                                            <div className="sorting-filter">
                                                <SortableComponent 
                                                    sortable={this.state.sortable}
                                                    sortFlight={(filter) => this.sortFlight(filter)} 
                                                    callbackParent={(keyword)=> this.handleSortOperation(keyword)}
                                                    sortItems={sortItems} />
                                            </div>
                                        </div>
                                        <div className="listing-container-01">
                                            {
                                            (this.props.flightsListing.filteredList.length == 0 && checkAllFilter(this.props.flightsListing.filterBy)) ?
                                                (this.props.flightsListing.selectedReturnList.length > 0)?
                                                    this.props.flightsListing.paginatedListing.map((outward) => {
                                                        return <FlightListingItem key={outward.referKey} 
                                                            outward={outward} onClick={(refId,referKey)=>this.handleOnClickItem(refId,referKey)} />
                                                    })
                                                :
                                                <div className="card not-found">
                                                    <img src={require(`../../assests/images/svg/flight-not-found.svg`)} alt="Flights Not Found" />
                                                    <p>
                                                        Sorry. No flight(s) schedule for this date. Please search different date.
                                                    </p>
                                                </div>
                                            :
                                                (this.props.flightsListing.filteredList.length > 0)?
                                                this.props.flightsListing.paginatedListing.map((outward) => {
                                                    return <FlightListingItem key={outward.referKey} 
                                                            outward={outward} onClick={(refId,referKey)=>this.handleOnClickItem(refId,referKey)}/>
                                                })
                                                :
                                                <div className="card not-found">
                                                    <img src={require(`../../assests/images/svg/flight-not-found.svg`)} alt="Flights Not Found" />
                                                    <p>
                                                        Sorry. No flight(s) schedule for this date. Please search different date.
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                        {
                                            (this.props.flightsListing.total_page > 1 && !flightsListing.isNotFound) ?
                                                (this.props.flightsListing.cur_page != this.props.flightsListing.total_page) ?
                                                    <Button onClick={() => this.props.loadMoreFlightReturn()} className="pagination">Show More Results</Button>
                                                    :
                                                    <div>Nothing to Load</div>
                                                :
                                                <div></div>
                                        }
                                    </div>
                                }
                                

                            </div>
                        </div>

                }


            </div>
                <Newsletter />
                <SEOList 
                isListing={true}
                route={this.props.router.location.pathname}/>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    flightsListing: state.flightsListing,
    searchComponentReducers: state.searchComponentReducers,
    navbarOptions: state.navbarOptions,
    locales: state.locales,
    router: state.router
})

const mapDispatchToProps = dispatch => {
    return {
        requestFlightData: (data) => dispatch(requestFlightData(data)),
        filterFlightData: (data, filterType) => dispatch(filterFlightData(data, filterType)),
        sortFlightData: (data) => dispatch(sortFlightData(data)),
        sortFilteredFlightData: (data) => dispatch(sortFlightData(data)),
        selectFlight : (data) => dispatch(selectFlight(data)),
        srotByAirline: (page) => dispatch(srotByAirline(page)),
        sortByDepart: (page) => dispatch(sortByDepart(page)),
        sortByDuration: (page) => dispatch(sortByArrival(page)),
        sortByPrice: (page) => dispatch(sortByPrice(page)),
        sortByArrival : (page)=>dispatch(sortByArrival(page)),
        addDepartFilter: (value,page) => dispatch(addDepartFilter(value,page)),
        resetDepartFilter: (page) => dispatch(resetDepartFilter(page)),
        addClassFilter: (value,page)=> dispatch(addClassFilter(value,page)),
        resetClassFilter: (page)=> dispatch(resetClassFilter(page)),
        addPriceFilter: (value,page)=> dispatch(addPriceFilter(value,page)),
        addAirlineNameFilter: (value,page)=> dispatch(addAirlineNameFilter(value,page)),
        resetAirlineNameFilter: (page)=> dispatch(resetAirlineNameFilter(page)),
        addStopFilter: (value,page)=> dispatch(addStopFilter(value,page)),        
        resetStopFilter: (page)=> dispatch(resetStopFilter(page)),
        loadMoreFlightReturn : ()=>dispatch(loadMoreFlightReturn()),
        verifyFlight :(payload)=> dispatch(verifyFlight(payload)),
        confirmFlight:(payload)=>dispatch(confirmFlight(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FlightListing);
