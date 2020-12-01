import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestHotelData, requestHotelFilter, filterHotelData, sortHotelData } from '../../actions/hotelsListingAction';
import FilterableComponent from '../../components/FilterableComponent';
import HotelListItem from '../../components/HotelListItem';
import SortableComponent from '../../components/SortableComponent';
import SortingSkeleton from '../../components/SortingSkeleton';
import FilterSkeleton from '../../components/FilterSkeleton';
import Skeleton from '../../components/ListingSkeleton';
import SEOList from '../../components/SEOList';
import Newsletter from '../../components/Newsletter';
import CustomerCare from '../../components/CustomerCareCenter';
import moment from 'moment';
import { HOTEL_API_KEY } from '../../constants/credentials';
import { PriceFilter } from '../../components/PriceFilter';
import { sortItems } from '../../constants/hotelListingConstants';
import { Pagination } from 'antd';
import './style.scss';
class HotelListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                price: 0,
                stars: [],
                amenities: [],
                hotelType: [],
                bedType: [],
                searchTerm: ''
            },
            cur_page: 1,
            sorts: {
                price: 0,//ascend,
                deals: 0,
                stars: 0,
                recommended: 0
            },
            sorting: {
                sort: null,
                order: 'desc'
            },
            sortable: [
                {
                    name: 'Price',
                    sorted: false,
                },
                {
                    name: 'Deals',
                    sorted: false,
                },
                {
                    name: 'Stars',
                    sorted: false,
                },
                {
                    name: 'Recommended',
                    sorted: false
                }
            ],
            searchParams: {},
            isReload: false

        }
        this.handleReset = this.handleReset.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchByHotel = this.handleSearchByHotel.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSortOperation = this.handleSortOperation.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.loadHotels();
    }

    handlePageChange(page) {
        this.loadHotels(page);
    }

    componentDidUpdate() {
        if (this.state.isReload) {
            this.loadHotels();
            this.setState({ isReload: false })
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

    loadHotels(page = 1) {
        
        let { match } = this.props;
        let checkinDate = moment(new Date(match.params.from)).format('YYYY-MM-DD');
        let checkoutDate = moment(new Date(match.params.to)).format('YYYY-MM-DD');
        
        const searchParams = {
            "criteria": {
                "term": match.params.slug,
                "raw": "Bshsdf",
                "scope": match.params.scope,
                "region" : match.params.country
                
            },
            "checkin": checkinDate,
            "checkout": checkoutDate,
            "nationality": (match.params.nationName === 'f') ? 'foreigner' : 'local',
            "enquiredRooms": "3",
            "adults": match.params.adult,
            "children": match.params.child_str,
            "currency": match.params.currency.toUpperCase(),
            "apiKey": HOTEL_API_KEY,
            "lang": match.params.locales,
            "limit": 30,
            "option": "recommend",
            "page": page
        }
        this.setState({
            searchParams: searchParams
        })
        this.props.requestHotelData(searchParams);
        this.props.requestHotelFilter(searchParams);
    }

    sortHotel(sortBy) {
        console.log(sortBy);
        switch (sortBy) {
            case "price": this.sortByPrices(); break;
            case "deals": this.sortByDeals(); break;
            case "stars": this.sortByStars(); break;
            case "recommended": this.sortByRecommened(); break;
            default: break;
        }
        this.filterAndSortHotel();
    }


    sortByPrices() {
        let sorting = this.state.sorting;
        if (this.state.sorting.sort === 'price') {
            sorting["sort"] = "price";
            sorting["order"] = "asc"
        }
        else {
            sorting["sort"] = "price";
            sorting["order"] = "desc";
        }

        this.setState({ sorting });

        const sorts = this.state.sorts;
        sorts["price"] = !this.state.sorts["price"];
        this.setState({
            sorts
        });
    }

    sortByStars() {
        let sorting = this.state.sorting;
        if (this.state.sorting.sort === 'star_rating') {
            sorting["sort"] = "star_rating";
            sorting["order"] = "asc"
        }
        else {
            sorting["sort"] = "star_rating";
            sorting["order"] = "desc";
        }

        this.setState({ sorting });

        const sorts = this.state.sorts;
        sorts["stars"] = !this.state.sorts["stars"];
        this.setState({
            sorts
        });
    }

    sortByRecommened() {
        let sorting = this.state.sorting;
        if (this.state.sorting.sort === 'rank') {
            sorting["sort"] = "rank";
            sorting["order"] = "asc"
        }
        else {
            sorting["sort"] = "rank";
            sorting["order"] = "desc";
        }

        this.setState({ sorting });

        const sorts = this.state.sorts;
        sorts["recommended"] = !this.state.sorts["recommended"];
        this.setState({
            sorts
        });
    }

    sortByDeals() {
        let sorting = this.state.sorting;
        if (this.state.sorting.sort === 'deals') {
            sorting["sort"] = "deals";
            sorting["order"] = "asc"
        }
        else {
            sorting["sort"] = "deals";
            sorting["order"] = "desc";
        }

        this.setState({ sorting });

        const sorts = this.state.sorts;
        sorts["deals"] = !this.state.sorts["deals"];
        this.setState({
            sorts
        });
    }


    handleClickOnStar(count) {
        let filters = this.state.filters;
        if (filters.stars.includes(count)) {
            console.log("count exist");
            let index = filters.stars.indexOf(count);
            filters.stars.splice(index, 1);
        } else {
            filters['stars'] = [...filters['stars'], count];
        }
        this.setState({ filters });
        this.filterAndSortHotel();
    }

    handleCheckBoxChange(e) {
        let filters = this.state.filters;
        if (e.target.checked)
            filters[e.target.name] = [...filters[e.target.name], e.target.value];
        else {
            let index = filters[e.target.name].indexOf(e.target.value);
            filters[e.target.name].splice(index, 1);
        }

        this.setState({
            filters
        });
        this.filterAndSortHotel();

    }

    handleSearchChange(e) {
        let filters = this.state.filters;
        filters['searchTerm'] = e.target.value;
        this.setState({
            filters
        })
    }




    filterAndSortHotel() {
        let filters = this.state.filters;
        let { searchComponentReducers, navbarOptions, hotelsListing } = this.props;
        let checkinDate = moment(new Date(searchComponentReducers.fromDate.date))
            .format('YYYY-MM-DD');
        let checkoutDate = '';
        (searchComponentReducers.fromDate.date === searchComponentReducers.toDate.date) ?
            checkoutDate = moment(new Date(searchComponentReducers.toDate.date)).add(1, 'days').format('YYYY-MM-DD')
            :
            checkoutDate = moment(new Date(searchComponentReducers.toDate.date)).format('YYYY-MM-DD')
        let filterType = {};
        let searchParams = {
            "criteria": {
                "term": searchComponentReducers.destination.slug,
                "raw": "Bshsdf",
                "scope": searchComponentReducers.destination.scope
            },
            "checkin": checkinDate,
            "checkout": checkoutDate,
            "nationality": (searchComponentReducers.nationType === 'f') ? 'foreigner' : 'local',
            "enquiredRooms": "3",
            "adults": searchComponentReducers.travellers.adult,
            "children": searchComponentReducers.travellers.child,
            "currency": navbarOptions.currency.name,
            "apiKey": HOTEL_API_KEY,
            "lang": navbarOptions.language,
            "limit": 30,
            "option": "recommend",
            "page": this.props.hotelsListing.meta.currentPage,
        }

        if (filters.stars.length > 0) {
            filterType = { ...filterType, starRating: filters.stars }
        }
        if (filters.amenities.length > 0) {
            filterType = { ...filterType, amenity: filters.amenities }
        }
        if (filters.bedType.length > 0) {
            filterType = { ...filterType, bed: filters.bedType }
        }
        if (filters.hotelType.length > 0) {
            filterType = { ...filterType, hotelType: filters.hotelType }
        }
        if (filters.searchTerm.length > 0) {
            filterType = { ...filterType, accommodationName: filters.searchTerm }
        }
        if (filters.price != 0) {
            filterType = { ...filterType, price: { min: filters.price, max: hotelsListing.prices.max } }
        }
        if (Object.entries(filterType).length != 0) {
            searchParams = { ...searchParams, filter: filterType };
        }


        if (this.state.sorting.sort != null) {
            searchParams = { ...searchParams, sorting: this.state.sorting }
        }
        this.props.filterHotelData(searchParams, this.state.filters);


    }

    handleSearchByHotel() {
        this.filterAndSortHotel();
    }


    handleReset(filter_name) {
        let filters = this.state.filters;
        filters[filter_name] = [];
        this.setState(filters);
        this.filterAndSortHotel();
    }

    handleKeyPress(event) {
        if (event.which == 13 || event.keyCode == 13) {
            this.filterAndSortHotel()
        }
    }

    handleSortOperation(keyword) {
        this.sortHotel(keyword)
    }

    handlePriceChange(e) {
        let filters = this.state.filters;
        filters['price'] = e.target.value;
        this.setState({ filters: filters });
        this.filterAndSortHotel();

    }


    render() {
        let { hotelsListing, navbarOptions } = this.props;
        return (
            <div>
                <div className="app-container">                
                    <div className="main-grid">
                        <div className="filter-block">
                            {
                                (this.props.hotelsListing.isFetching) ?
                                <FilterSkeleton />
                                :
                                <div>
                                    <div className="card found-card">
                                    {
                                        <p className="found">
                                            <span>{this.props.hotelsListing.hotelList.length} Hotels </span>
                                            found
                                        </p>
                                        }
                                        <span className="line">&nbsp;</span>
                                        <p className="call-info">
                                            Book online or call:
                                        <span>1-800-238-0767</span>
                                        </p>
                                    </div>
                                    <ul>
                                        <li>
                                            <div className="filter-search">
                                                <div className="bp3-input-group .modifier">
                                                    <input type="text"
                                                        value={this.state.filters.searchTerm}
                                                        placeholder="Search by hotel name"
                                                        onChange={this.handleSearchChange}
                                                        onKeyPress={this.handleKeyPress} />
                                                    <span className="search-icon" onClick={this.handleSearchByHotel}>
                                                        <img src={require(`../../assests/images/svg/search.svg`)} alt="Search By Hotel Name" />
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <h4>
                                                Price {this.state.filters.price}
                                            </h4>
                                            {
                                                (this.props.hotelsListing.hotelList.length > 0) ?
                                                    (
                                                        <PriceFilter min={this.state.filters.price} max={this.props.hotelsListing.prices.max} handleChange={(e) => this.handlePriceChange(e)} />
                                                    )
                                                    :
                                                    (
                                                        <PriceFilter min={0} max={100} handleChange={(e) => this.handlePriceChange(e)} />
                                                    )
                                            }
                                        </li>
                                        <li>
                                            <FilterableComponent
                                                filter_name={'stars'}
                                                filters={this.props.hotelsListing.stars}
                                                isStar={true}
                                                resetCallback={(filter_name) => this.handleReset(filter_name)}
                                                filterCallback={(stars) => this.handleClickOnStar(stars)}
                                                checkedFilters={(hotelsListing.filterType) ? hotelsListing.filterType.stars : []} />
                                        </li>                                        
                                        <li>
                                            <FilterableComponent
                                                filter_name={'bed type'}
                                                filters={this.props.hotelsListing.bedTypes}
                                                filterCallback={(e) => this.handleCheckBoxChange(e)}
                                                isBedType={true}
                                                resetCallback={(filter_name) => this.handleReset(filter_name)}
                                                checkedFilters={(hotelsListing.filterType) ? hotelsListing.filterType.bedType : []} />
                                        </li>
                                        <li>
                                            <FilterableComponent
                                                filter_name={'hotel type'}
                                                filters={this.props.hotelsListing.hotelTypes}
                                                filterCallback={(e) => this.handleCheckBoxChange(e)}
                                                isHotelType={true}
                                                resetCallback={(filter_name) => this.handleReset(filter_name)}
                                                checkedFilters={(hotelsListing.filterType) ? hotelsListing.filterType.hotelType : []} />
                                        </li>
                                        <li>
                                            <FilterableComponent
                                                filter_name={'amenities/facilities'}
                                                filters={this.props.hotelsListing.amenities}
                                                filterCallback={(e) => this.handleCheckBoxChange(e)}
                                                isAmenities={true} resetCallback={(filter_name) => this.handleReset(filter_name)}
                                                checkedFilters={(hotelsListing.filterType) ? hotelsListing.filterType.amenities : []} />
                                        </li>
                                    </ul>
                                    <CustomerCare />
                                </div>
                            }
                            
                        </div>
                        <div className="listing-block">
                            {
                                (this.props.hotelsListing.isFetching) ?
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
                                            <SortableComponent sortable={this.state.sortable}
                                                sortItems={sortItems}
                                                callbackParent={(keyword) => this.handleSortOperation(keyword)}
                                                sortOrder={this.state.sorts} />
                                        </div>
                                    </div>
                                    <div className="listing-container">
                                    {
                                        (!hotelsListing.isFetching) ?
                                            (!hotelsListing.isFiltering) ?
                                                (!hotelsListing.isNotFound)?
                                                <div>
                                                    {
                                                        this.props.hotelsListing.hotelList.map((hotel, index) => {
                                                            return <HotelListItem key={index} hotel={hotel} params={this.state.searchParams} currency={navbarOptions.currency} />
                                                        })
                                                    }
                                                    <Pagination
                                                        defaultCurrent={hotelsListing.meta.currentPage}
                                                        pageSize={hotelsListing.meta.perPage}
                                                        total={hotelsListing.meta.total}
                                                        onChange={(page, pageSize) => this.handlePageChange(page)}
                                                        className="list-pagination"
                                                    />
                                                </div>
                                                :
                                                <div className="card not-found">
                                                    <img src={require(`../../assests/images/svg/hotel-not-found.svg`)} alt="Hotels Not Found" />
                                                    <p>
                                                        Sorry. No hotel room(s) available for this date. Please search different date.
                                                    </p>
                                                </div>

                                                :
                                                <div>Filtering Hotels</div>
                                            :
                                            <div>Loading Hotels</div>
                                    }
                                </div>
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
const mapStateToProps = state => ({
    hotelsListing: state.hotelsListing,
    searchComponentReducers: state.searchComponentReducers,
    navbarOptions: state.navbarOptions,
    locales: state.locales,
    router: state.router
})

const mapDispatchToProps = dispatch => {
    return {
        requestHotelData: (data) => dispatch(requestHotelData(data)),
        requestHotelFilter: (data) => dispatch(requestHotelFilter(data)),
        filterHotelData: (data, filterType) => dispatch(filterHotelData(data, filterType)),
        sortHotelData: (data) => dispatch(sortHotelData(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelListing);