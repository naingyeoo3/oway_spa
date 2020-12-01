import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
import {
    requestBusReturnListing,
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
    requestOwayTier

} from '../../actions/busListingActions';
import './style.scss';
import { departureTimeRange } from '../../constants/constants';
import { checkAllFilter } from '../../constants/busListingHelper'
import SortableComponent from '../../components/SortableComponent';
import { sortItems } from '../../constants/busListingConstant';
import BusListItem from '../../components/BusListItem';
import FilterableComponent from '../../components/FilterableComponent';
import FilterSkeleton from '../../components/FilterSkeleton';
import Skeleton from '../../components/BusSkeleton';
import SortingSkeleton from '../../components/SortingSkeleton';
import { BUS_API_KEY } from '../../constants/credentials';
import { Button } from 'antd';
import SEOList from '../../components/SEOList';
import Newsletter from '../../components/Newsletter';
import history from '../../utils/history';
import CustomerCare from '../../components/CustomerCareCenter';
class BusReturn extends Component {
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
            isReload: false
        }
        this.handleClickBusItem = this.handleClickBusItem.bind(this);
    }
    componentDidMount() {
        this.loadBusData()
    }
    componentDidUpdate(prevProps, prevState) {
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
    formatedDate = (date) => moment(date).format(dateFormat)
    handleClickBusItem(busRoute){
        let {busListing,match,navbarOptions} = this.props;
        let selectedBusRoute = busListing.selectedBusRoute;
        let currencyCode = navbarOptions.currency.name;
        const payload = {
            tripType : Number(match.params.tripId),
            busRouteRateId : selectedBusRoute.busRouteRateId,
            seatType : selectedBusRoute.seatType,
            departureDate : this.formatedDate(match.params.fromDate),
            userType : (navbarOptions.nation.other_name == "foreign")?"F" :"C",
            userCode : "123",
            returnBusRoute:{
                busTripTypeId: 1,
                returnBusRouteRateId: busRoute.busRouteRateId,
                returnDate:this.formatedDate(match.params.toDate),
                seatType: busRoute.seatType
            },
            adults: 1,
            children: 0,
            fareType: navbarOptions.nation.other_name,
            currencyCode: currencyCode,
            apiKey: "dZIA6qy8Q4Sxfg/+IsCS44pwnkzp7se2bhQJJ8dLwzg=",
            endUserIp: "203.81.162.185",
            endUserBrowser: "Firefox",
            endUserOrigin: "Yangon"

        }

        this.props.confirmBus(payload,busRoute,match.params.tripType);

        
    }
    loadBusData() {
        const {
            match,
            busListing
        } = this.props;

        const busReturnPayload = {
            busRouteId: Number(match.params.busRouteId),
            busRouteRateId: Number(match.params.busRouteRateId),
            busTripTypeId: 1,
            cacheKey: busListing.cacheKey,
            sorting: {
                keyword: "base",
                order: "asc"
            },
            apiKey: BUS_API_KEY
        }

        this.props.requestBusReturnListing(busReturnPayload);

    }
    handleSortOperation(keyword) {
        console.log(keyword)
        const tripType = "3";
        switch (keyword) {
            case "expressBus": this.props.sortByBusExpressName(tripType); break;
            case "price": this.props.sortByBusPrice(tripType); break;
            case "duration": this.props.sortByBusDuration(tripType); break;
            case "departs": this.props.sortByBusDeparture(tripType); break;
            case "arrival": this.props.sortByBusArrival(tripType); break;
        }

    }
    getMaxPrice() {
        const { busListing} = this.props;
        let maxPrice=0;
        maxPrice = Math.max(...busListing.returnList.map(busRoute => busRoute.rates.deal.adult.base), 1);
        return Math.ceil(maxPrice);
    }
    render() {
        const { busListing, locales,navbarOptions } = this.props;
        const tripType = "3";
        console.log("checkAllFilter", checkAllFilter(busListing.filterBy));
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
                                                (!busListing.filteredList.length == 0 && !checkAllFilter(busListing.filterBy)) ?
                                                    <p className="found">
                                                        <span>{busListing.filteredList.length} Buses </span>found
                                                    </p>
                                                    :
                                                    <p className="found">
                                                        <span>{busListing.returnList.length} Buses </span>found
                                                    </p>
                                            }
                                            <span className="line">&nbsp;</span>
                                            <p className="call-info">Book online or call:<span>1-800-238-0767</span></p>
                                        </div>
                                        <ul>
                                            <li>
                                                <h4>Price </h4>
                                                <h5>{navbarOptions.currency.name} {busListing.filterBy.price}</h5>
                                                {
                                                    (busListing.returnList.length > 0 ) ?
                                                        (
                                                            <div>
                                                                <input
                                                                    name="price"
                                                                    type="range"
                                                                    min="0"
                                                                    max={this.getMaxPrice()}
                                                                    className="slider"
                                                                    id="myRange"
                                                                    onChange={(e) => this.props.addBusPriceFilter(e.target.value,tripType)} />
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
                                            </li>
                                            <li>
                                                <FilterableComponent
                                                    filter_name={'Classes'}
                                                    isBusClasses={true}
                                                    filterCallback={(e) => this.props.addBusClassFilter(e, tripType)}
                                                    resetCallback={() => this.props.resetBusClassFilter(tripType)}
                                                    checkedFilters={busListing.filterBy.classes}
                                                    filters={busListing.filters.classes}
                                                />
                                            </li>
                                            <li>
                                                <FilterableComponent
                                                    filter_name={'departureTime'}
                                                    isDeparts={true}
                                                    resetCallback={(e) => this.props.resetBusDeptFilter(tripType)}
                                                    filterCallback={(e) => this.props.addBusDeptFilter(e, tripType)}
                                                    checkedFilters={busListing.filterBy.depts}
                                                    filters={departureTimeRange}
                                                />
                                            </li>
                                            <li>
                                                <FilterableComponent
                                                    filter_name={'Operator'}
                                                    isBusOperator={true}
                                                    filterCallback={(e) => this.props.addBusOperatorFilter(e, tripType)}
                                                    resetCallback={() => this.props.resetBusOperatorFilter(tripType)}
                                                    checkedFilters={busListing.filterBy.operators}
                                                    filters={busListing.filters.operators} />
                                            </li>
                                            <li>
                                                <FilterableComponent
                                                    filter_name={'Amenities'}
                                                    isBusOperator={true}
                                                    filterCallback={(e) => this.props.addBusAmenitiesFilter(e, tripType)}
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
                                                        (busListing.returnList.length > 0) ?
                                                            busListing.paginatedListing.map(busRoute =>
                                                                <BusListItem
                                                                    key={busRoute.busRouteId}
                                                                    busRoute={busRoute}
                                                                    onClick={()=>this.handleClickBusItem(busRoute)}
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
                                                </div>
                                                :
                                                <div className="listing-container-01">
                                                    {
                                                        (busListing.filteredList.length > 0) ?
                                                            busListing.paginatedListing.map(busRoute =>
                                                                <BusListItem
                                                                    key={busRoute.busRouteId}
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
                                                </div>
                                        }
                                        {
                                            (busListing.total_page > 0 && !busListing.isFiltering) ?
                                                (busListing.cur_page != busListing.total_page) ?
                                                    <Button onClick={() => this.props.loadMoreBus(tripType)} className="pagination">Show More Results</Button> :
                                                    <div></div>
                                                :
                                                <div></div>
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
        requestBusReturnListing: (payload) => dispatch(requestBusReturnListing(payload)),
        addBusPriceFilter: (value, tripType) => dispatch(addBusPriceFilter(value, tripType)),
        resetBusPriceFilter: (tripType) => dispatch(resetBusPriceFilter(tripType)),
        addBusClassFilter: (value, tripType) => dispatch(addBusClassFilter(value, tripType)),
        resetBusClassFilter: (tripType) => dispatch(resetBusClassFilter(tripType)),
        addBusAmenitiesFilter: (value, tripType) => dispatch(addBusAmenitiesFilter(value, tripType)),
        resetBusAmenitiesFilter:(value,tripType)=> dispatch(resetBusAmenitiesFilter(value,tripType)),
        addBusOperatorFilter: (value, tripType) => dispatch(addBusOperatorFilter(value, tripType)),
        resetBusOperatorFilter: (tripType) => dispatch(resetBusOperatorFilter(tripType)),
        addBusDeptFilter: (value, tripType) => dispatch(addBusDeptFilter(value, tripType)),
        resetBusDeptFilter: (tripType) => dispatch(resetBusDeptFilter(tripType)),
        loadMoreBus: (tripId) => dispatch(loadMoreBus(tripId)),
        sortByBusExpressName: (tripType) => dispatch(sortByBusExpressName(tripType)),
        sortByBusArrival: (tripType) => dispatch(sortByBusArrival(tripType)),
        sortByBusDeparture: (tripType) => dispatch(sortByBusDeparture(tripType)),
        sortByBusPrice: (tripType) => dispatch(sortByBusPrice(tripType)),
        sortByBusDuration: (tripType) => dispatch(sortByBusDuration(tripType)),
        confirmBus :(payload,busRoute,tripType) => dispatch(confirmBus(payload,busRoute,tripType)),
        requestOwayTier :(payload)=> dispatch(requestOwayTier(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusReturn);