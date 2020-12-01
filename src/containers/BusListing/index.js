import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
import {
    requestOnewayBusListing,
    requestRoundtripBusListing,
    addBusPriceFilter,
    resetBusPriceFilter,
    addBusClassFilter,
    resetBusClassFilter,
    addBusAmenitiesFilter,
    resetBusAmenitiesFilter,
    addBusOperatorFilter,
    resetBusOperatorFilter,
    addBusDeptFilter,
    resetBusDeptFilter,
    loadMoreBus,
    sortByBusArrival,
    sortByBusPrice,
    sortByBusDeparture,
    sortByBusExpressName,
    sortByBusDuration,
    confirmBus,
    requestOwayTier,
    selectOneWayBus

} from '../../actions/busListingActions';
import './style.scss';
import { departureTimeRange } from '../../constants/constants';
import { checkAllFilter } from '../../constants/busListingHelper';
import SortableComponent from '../../components/SortableComponent';
import BusListItem from '../../components/BusListItem';
import FilterableComponent from '../../components/FilterableComponent';
import { BUS_API_KEY } from '../../constants/credentials';
import { sortItems } from '../../constants/busListingConstant';
import FilterSkeleton from '../../components/FilterSkeleton';
import Skeleton from '../../components/BusSkeleton';
import SortingSkeleton from '../../components/SortingSkeleton';
import SEOList from '../../components/SEOList';
import Newsletter from '../../components/Newsletter';
import CustomerCare from '../../components/CustomerCareCenter';
import history from '../../utils/history';
import { Button, Slider } from 'antd';
class BusListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortable: [
                {
                    name: 'Express Bus',
                    sorted: false,
                },
                {
                    name: 'Departs',
                    sorted: false,
                },
                {
                    name: 'Duration',
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
            ],
            isReload: false,
            inputValue: 0
        }
        this.handleClickBusItem = this.handleClickBusItem.bind(this);

    }
    componentDidMount() {
        this.loadBusData()
    }

    handleSortOperation(keyword) {
        const {match} = this.props;
        const tripType = match.params.tripId;
        switch (keyword) {
            case "expressBus": this.props.sortByBusExpressName(tripType); break;
            case "price": this.props.sortByBusPrice(tripType); break;
            case "duration": this.props.sortByBusDuration(tripType); break;
            case "departs": this.props.sortByBusDeparture(tripType); break;
            case "arrival": this.props.sortByBusArrival(tripType); break;
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isReload) {
            this.loadBusData();
            this.setState({ isReload: false })
        }
        if(prevProps.busListing.isConfirmed !== this.props.busListing.isConfirmed && this.props.busListing.isConfirmed){
            const tierPayload = {
                productType: "9",
                userType: "1",
                RequestUserId: "",
                apiKey: "Kpp69BQ8ihwwLsPwSEexjqKAbf+fSSbQ\/qlz9Nuy\/O0="
            }
            this.props.requestOwayTier(tierPayload)
        } 
        if(prevProps.busListing.gotOwayTier !== this.props.busListing.gotOwayTier && this.props.busListing.gotOwayTier){
            const {busListing} = this.props;
            const busRoute = busListing.selectedBusRoute;
            history.push(`/bus/search/detail/${busRoute.busRouteRateId}/checkout`)
        }
    }
    getSnapshotBeforeUpdate(prevProps) {
        if (prevProps.match.url != this.props.match.url) {
            this.setIsReload();
            return null;
        } else {
            return null;
        }
    }
    setIsReload = () => this.setState({ isReload: true })

    formatedDate = (date) => moment(date).format(dateFormat)
    loadBusData() {
        const {
            match,
            searchComponentReducers,
            navbarOptions,
            locales
        } = this.props;
        const oneWayPayload = {
            "tripType": match.params.tripId,
            "origin": parseInt(match.params.fromCityId),
            "destination": parseInt(match.params.toCityId),
            "departureDate": this.formatedDate(match.params.fromDate),
            "adults": Number(match.params.adult),
            "children": Number(match.params.child),
            "fareType": match.params.nation,
            "currencyCode": match.params.currency,
            "apiKey": BUS_API_KEY,
            "sorting": {
                "keyword": "base",
                "order": "asc"
            }
        }

        const roundTripPayload = {
            "tripType": match.params.tripId,
            "origin": parseInt(match.params.fromCityId),
            "destination": parseInt(match.params.toCityId),
            "sorting": {
                "keyword": "base",
                "order": "asc"
            },
            "departureDate": this.formatedDate(match.params.fromDate),
            "returnDate": this.formatedDate(match.params.toDate),
            "adults": Number(match.params.adult),
            "children": Number(match.params.child),
            "fareType": match.params.nation,
            "currencyCode": match.params.currency,
            "apiKey": BUS_API_KEY,
            "endUserIp": "203.81.162.185",
            "endUserBrowser": "Firefox",
            "endUserOrigin": "Yangon"
        }

        if (match.params.tripId == 1) {
            this.props.requestOnewayBusListing(oneWayPayload);
        } else {
            this.props.requestRoundtripBusListing(roundTripPayload);
        }

    }

    handleClickBusItem(busRoute) {
        const {
            match,
            searchComponentReducers,
            navbarOptions,
            locales
        } = this.props;
        if (match.params.tripId == 2) {
        this.props.selectOneWayBus(busRoute);    
        history.push(`/buses/search/return/${searchComponentReducers.searchTab}/${searchComponentReducers.from.fromCity}/${busRoute.busRouteId}/${searchComponentReducers.to.toCity}/${busRoute.busRouteRateId}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${navbarOptions.currency.name}/${navbarOptions.nation.other_name}/${locales.queryName}`);
        }
        else {
            console.log("bus Route",busRoute);
            const payload = {
                tripType : Number(match.params.tripId),
                busRouteRateId : busRoute.busRouteRateId,
                seatType : busRoute.seatType,
                departureDate : this.formatedDate(match.params.fromDate),
                userType : (navbarOptions.nation.other_name == "foreign")?"F" :"C",
                userCode : "123",
                returnBusRoute:{},
                adults: 1,
                children: 0,
                fareType: navbarOptions.nation.other_name,
                currencyCode: "USD",
                apiKey: "dZIA6qy8Q4Sxfg/+IsCS44pwnkzp7se2bhQJJ8dLwzg=",
                endUserIp: "203.81.162.185",
                endUserBrowser: "Firefox",
                endUserOrigin: "Yangon"

            }

            this.props.confirmBus(payload,busRoute,match.params.tripType);

        }

    }

    getMaxPrice(tripId) {
        const { busListing} = this.props;
        let maxPrice=0;
        if(tripId == "1")
        maxPrice = Math.max(...busListing.oneWay.map(busRoute => busRoute.rates.deal.adult.base), 1);
        else
        maxPrice = Math.max(...busListing.roundTrip.map(busRoute => busRoute.rates.deal.adult.base), 1);
        return Math.ceil(maxPrice);
    }
    render() {
        const { busListing, navbarOptions, match } = this.props;
        const tripType = match.params.tripId;
        return (
            <div>
                <div className="app-container">
                    <div className="main-grid">
                        <div className="filter-block">
                            {
                                (busListing.isFetching) ?
                                    <FilterSkeleton />
                                    :
                                    <div>
                                        <div className="card found-card">
                                            {

                                                (!checkAllFilter(busListing.filterBy))?
                                                <p className="found">
                                                    <span>{ busListing.filteredList.length }  Buses </span>found
                                                </p>
                                                :
                                                <p className="found">
                                                    <span>{(tripType == "1")?busListing.oneWay.length : busListing.roundTrip.length} Buses </span>found
                                                </p>
                                            }
                                            <span className="line">&nbsp;</span>
                                            <p className="call-info">Book online or call:<span>1-800-238-0767</span></p>
                                        </div>
                                        <ul>
                                            <li>
                                                <div className="filter-section">
                                                    <div className="filter-title">
                                                        <div><h4>Price</h4></div>
                                                        <div className="filter-price">{navbarOptions.currency.name} {busListing.filterBy.price}</div>
                                                    </div>                                                                                        
                                                    {
                                                        (busListing.roundTrip.length > 0 || busListing.oneWay.length > 0) ?
                                                            (
                                                                <div className="price-slider">
                                                                    <Slider 
                                                                        min={0}
                                                                        max={this.getMaxPrice()}
                                                                        defaultValue={this.getMaxPrice()}
                                                                        onChange={(inputValue) => this.props.addBusPriceFilter(inputValue,tripType)}
                                                                        tooltipVisible={false}
                                                                    />
                                                                    {/* <input
                                                                        name="price"
                                                                        type="range"
                                                                        min="0"
                                                                        max={this.getMaxPrice()}
                                                                        className="slider"
                                                                        id="myRange"
                                                                        onChange={(e) => this.props.addBusPriceFilter(e.target.value,tripType)} /> */}
                                                                    <div className="price">
                                                                        <div>{navbarOptions.currency.name} 0</div>
                                                                        <div>{navbarOptions.currency.name} {this.getMaxPrice()}</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                            :
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
                                                </div>
                                            </li>
                                            <li>
                                                <FilterableComponent
                                                    filter_name={'Classes'}
                                                    isBusClasses={true}
                                                    filterCallback={(e) => this.props.addBusClassFilter(e,tripType)}
                                                    resetCallback={() => this.props.resetBusClassFilter(tripType)}
                                                    checkedFilters={busListing.filterBy.classes}
                                                    filters={busListing.filters.classes}
                                                />
                                            </li>
                                            <li>
                                                <FilterableComponent
                                                    filter_name={'departureTime'}
                                                    isDeparts={true}
                                                    resetCallback={() => this.props.resetBusDeptFilter(tripType)}
                                                    filterCallback={(e) => this.props.addBusDeptFilter(e,tripType)}
                                                    checkedFilters={busListing.filterBy.depts}
                                                    filters={departureTimeRange}
                                                />
                                            </li>
                                            <li>
                                                <FilterableComponent
                                                    filter_name={'Operator'}
                                                    isBusOperator={true}
                                                    filterCallback={(e) => this.props.addBusOperatorFilter(e,tripType)}
                                                    resetCallback={() => this.props.resetBusOperatorFilter(tripType)}
                                                    checkedFilters={busListing.filterBy.operators}
                                                    filters={busListing.filters.operators} />
                                            </li>
                                            <li>
                                                <FilterableComponent
                                                    filter_name={'Amenities'}
                                                    isBusOperator={true}
                                                    filterCallback={(e) => this.props.addBusAmenitiesFilter(e,tripType)}
                                                    resetCallback={() => this.props.resetBusAmenitiesFilter(tripType)}
                                                    checkedFilters={busListing.filterBy.amenities}
                                                    filters={busListing.filters.amenities} />
                                            </li>
                                        </ul>
                                        <CustomerCare />
                                    </div>
                            }                        
                        </div>
                        <div className="listing-block">
                            {
                                (busListing.isFetching || busListing.isFiltering) ?
                                    <div>
                                        <SortingSkeleton />
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
                                                    callbackParent={(keyword) => this.handleSortOperation(keyword)}
                                                    sortItems={sortItems} />
                                            </div>
                                        </div>
                                        {
                                            (busListing.filteredList.length === 0 && checkAllFilter(busListing.filterBy)) ?
                                                <div className="listing-container-01">
                                                    {
                                                        (match.params.tripId == 1)?
                                                        (busListing.oneWay.length > 0) ?
                                                            busListing.paginatedListing.map(busRoute =>
                                                                <BusListItem key={busRoute.busRouteId}
                                                                    onClick={() => this.handleClickBusItem(busRoute)}
                                                                    busRoute={busRoute} />
                                                            )
                                                            :
                                                            <div className="card not-found">
                                                                <img src={require(`../../assests/images/svg/bus-not-found.svg`)} alt="Bus Not Found" />
                                                                <p>
                                                                    Sorry, there are no buses found for the selected criteria.
                                                                </p>
                                                            </div>
                                                        :            
                                                        (busListing.roundTrip.length > 0) ?
                                                            busListing.paginatedListing.map(busRoute =>
                                                                <BusListItem key={busRoute.busRouteId}
                                                                    onClick={() => this.handleClickBusItem(busRoute)}
                                                                    busRoute={busRoute} />
                                                            )
                                                            :
                                                            <div className="card not-found">
                                                                <img src={require(`../../assests/images/svg/bus-not-found.svg`)} alt="Bus Not Found" />
                                                                <p>
                                                                    Sorry, there are no buses found for the selected criteria.
                                                                </p>
                                                            </div>
                                                    }
                                                    <div>
                                                        {
                                                            (busListing.cur_page != busListing.total_page) ?
                                                                <Button onClick={() => this.props.loadMoreBus(2)} className="pagination">Show More Results</Button> :
                                                                <div/>
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                <div className="listing-container-01">
                                                    {
                                                        (busListing.filteredList.length > 0) ?
                                                            busListing.paginatedListing.map(busRoute =>
                                                                <BusListItem key={busRoute.busRouteId}
                                                                    onClick={() => this.handleClickBusItem(busRoute)}
                                                                    busRoute={busRoute}
                                                                />
                                                            )
                                                            :
                                                            <div className="card not-found">
                                                                <img src={require(`../../assests/images/svg/bus-not-found.svg`)} alt="Bus Not Found" />
                                                                <p>
                                                                    Sorry, there are no buses found for the selected criteria.
                                                                </p>
                                                            </div>
                                                    }
                                                    <div>
                                                        {
                                                        (busListing.total_page > 0  && !busListing.isFiltering)?  
                                                            (busListing.cur_page != busListing.total_page) ?
                                                                <Button onClick={() => this.props.loadMoreBus(tripType)} className="pagination">Show More Results</Button> :
                                                                <div></div>
                                                            :
                                                            <div></div>    
                                                        }
                                                    </div>

                                                </div>
                                        }
                                    </div>
                            }
                        </div>
                    </div>                    
                </div>
                <Newsletter />
                <SEOList 
                isListing={true}
                route={this.props.router.location.pathname}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        searchComponentReducers: state.searchComponentReducers,
        navbarOptions: state.navbarOptions,
        locales: state.locales,
        busListing: state.busListing,
        router: state.router
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestOnewayBusListing: (value) => dispatch(requestOnewayBusListing(value)),
        requestRoundtripBusListing: (value) => dispatch(requestRoundtripBusListing(value)),
        addBusPriceFilter: (value,tripType) => dispatch(addBusPriceFilter(value,tripType)),
        resetBusPriceFilter: () => dispatch(resetBusPriceFilter()),
        addBusClassFilter: (value,tripType) => dispatch(addBusClassFilter(value,tripType)),
        resetBusClassFilter: (tripType) => dispatch(resetBusClassFilter(tripType)),
        addBusAmenitiesFilter: (value,tripType) => dispatch(addBusAmenitiesFilter(value,tripType)),
        resetBusAmenitiesFilter:(value,tripType)=> dispatch(resetBusAmenitiesFilter(value,tripType)),
        addBusOperatorFilter: (value,tripType) => dispatch(addBusOperatorFilter(value,tripType)),
        resetBusOperatorFilter :(tripType)=>dispatch(resetBusOperatorFilter(tripType)),
        addBusDeptFilter: (value,tripType) => dispatch(addBusDeptFilter(value,tripType)),
        resetBusDeptFilter: (tripType) => dispatch(resetBusDeptFilter(tripType)),
        loadMoreBus: (tripType) => dispatch(loadMoreBus(tripType)),
        sortByBusExpressName: (tripType) => dispatch(sortByBusExpressName(tripType)),
        sortByBusArrival: (tripType) => dispatch(sortByBusArrival(tripType)),
        sortByBusDeparture: (tripType) => dispatch(sortByBusDeparture(tripType)),
        sortByBusPrice: (tripType) => dispatch(sortByBusPrice(tripType)),
        sortByBusDuration: (tripType) => dispatch(sortByBusDuration(tripType)),
        confirmBus :(payload,busRoute,tripType) => dispatch(confirmBus(payload,busRoute,tripType)),
        requestOwayTier :(payload)=> dispatch(requestOwayTier(payload)),
        selectOneWayBus : (payload)=> dispatch(selectOneWayBus(payload))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BusListing);