import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import TourListingFilter from './TourListingFilter';
import TourListingItem from './TourListingItem';
import TourListingSort from './TourListingSort';
import TourFilterCategories from './TourFilterCategories';
import SEOList from '../../components/SEOList';
import Newsletter from '../../components/Newsletter';

import { 
    requestTourListing, 
    loadFilter,
    addFilter,
    reduceFilter,
    requestPriceAsc,
    requestPriceDec,
    requestCategoryFilter,    
    requestSortRecommendedAce,
    requestSortRecommendedDec,
    requestSortDiscountAce,
    requestSortDiscountDec,
    addFilterCategory,
    removeFilterCategory,
    resetCatFilter,
    loadMoreTour,
    resetFilter,
    requestFilterTourSearch
} from '../../actions/toursListingActions';

import { TOUR_API_KEY, API_KEY } from '../../constants/credentials';
import { filters } from '../../constants/tourListingConstants';
import Skeleton from '../../components/ListingSkeleton';
import SortingSkeleton from '../../components/SortingSkeleton';
import SearchFeatureTour from './SearchFeatureTour';
import FilterSkeleton from '../../components/FilterSkeleton';
import CustomerCare from '../../components/CustomerCareCenter';

const dateFormat = 'YYYY-MM-DD';

class TourListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReload: false,
            isFakeLoad: true
        };
    }
    componentDidMount(){
        this.loadTour();
        this.loadCategoryFilter();
        setTimeout(() => {
            this.setState({isFakeLoad: false})
        }, 1000);
    } 
    componentDidUpdate() {
        if(this.state.isReload){
            this.loadTour();
            this.setState({isReload: false})
        }
    }
    getSnapshotBeforeUpdate(prevProps){
        if(prevProps.match.url != this.props.match.url){
            this.setIsReload();
            return null;
        }else{
            return null;
        }
    }    
    setIsReload = () => this.setState({isReload: true})

    loadTour(){
        const { 
            match, 
            searchComponentReducers, 
            navbarOptions,
            locales 
        } = this.props;
                
        const payload = {            
                "apiKey": TOUR_API_KEY,
                "city": match.params.cityName,
                "attraction": ['Tour'],
                "currencyCode": navbarOptions.currency.name,
                "fareType": navbarOptions.nation.other_name,
                "language": locales.queryName,
                "requestDate": {
                    "from": this.formatedDate(match.params.fromDate),
                    "to": this.formatedDate(match.params.toDate)
                },
                "traveler": {
                    "adult": 2,
                    "child": searchComponentReducers.travellers.child,
                    "infant": searchComponentReducers.travellers.infact
                },
                "duration":[],
                "categories":[]               
            }            
             
        this.props.requestTourListing(JSON.stringify(payload));        
    }
    loadCategoryFilter(){
        const payload = {
            "category": true,
            "apiKey": TOUR_API_KEY,
            "tourType": "tour",
            "endUserIp": "127.0.0.1",
            "endUserBrowser": ", unknown, ",
            "endUserOrigin": "Unknown City, Unknown Country"
        }
        this.props.requestCategoryFilter(JSON.stringify(payload))
    }
    formatedDate = (param) => moment(param).format(dateFormat);

    handleFilter(){
        const { 
            match,             
            tourListing 
        } = this.props;
        const payload = {
            "apiKey": TOUR_API_KEY,
                "city": match.params.cityName,
                "attraction": ['Tour'],
                "currencyCode": match.params.currency,
                "fareType": match.params.nation,
                "language": match.params.locale,
                "requestDate": {
                    "from": this.formatedDate(match.params.fromDate),
                    "to": this.formatedDate(match.params.toDate)
                },
                "traveler": {
                    "adult": 2,
                    "child": match.params.child,
                    "infant": match.params.infact
                },
                "duration": tourListing.filter, // pass by filters
                "categories":[],
                "sort":"price_desc"
        }

        this.props.requestTourListing(payload)
    }
    handleAddFilter(param){
        this.props.addFilter(param)
        setTimeout(() => {
            this.handleFilter()
        }, 100);
    }
    handleReducerFilter(param){
        this.props.reduceFilter(param)
        setTimeout(() => {
            this.handleFilter()    
        }, 100);
        
    }
    handleReload(){
        this.props.resetFilter()
    }
    getFilterComponent(){
        const { tourListing } = this.props;
        return (
            <div>
                {
                    this.state.isFakeLoad || tourListing.isLoadFilter ? 
                    <div>loading ....</div>
                    :
                    <TourListingFilter 
                        callbackAddFilter={(param)=> this.handleAddFilter(param)}
                        callbackRemoveFilter={(param)=> this.handleReducerFilter(param)}

                        filters={filters}
                        callbackUpdate={()=> this.loadTour()}/>
                }
            </div>
        )
    }

    getListingItem(){
        const { tourListing } = this.props;
        return (
            <div>
                {
                    tourListing.isFetching ? 
                    <div>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div>                    
                    :
                    <div>
                        {   
                            tourListing.data.length > 0 ?
                            <div>                         
                                {
                                    tourListing.data.map((item, index)=> (
                                        <TourListingItem item={item} key={index}/>
                                    ))    
                                }
                            </div>
                            :
                            <div className="card not-found">
                                <img src={require(`../../assests/images/svg/tour-not-found.svg`)} alt="Tour Not Found" />
                                <p>
                                    Sorry. No tour package(s) for the selected date range. Please search different date.
                                </p>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }

    showError(){
        const { tourListing } = this.props;
        return (
            <div className="card not-found">
                <img src={require(`../../assests/images/svg/tour-not-found.svg`)} alt="Tour Not Found" />
                <p>
                    {tourListing.error.message}
                </p>
            </div>
        )
    }
    addCategoryFilter(param){
        this.props.addFilterCategory(param);
        setTimeout(() => {
            this.loadDataByCatFiltered()
        }, 100);
        
    }
    removeCategoryFilter(param){
        this.props.removeFilterCategory(param);
        setTimeout(() => {
            this.loadDataByCatFiltered()
        }, 100);
    }
    loadDataByCatFiltered(){
        const { 
            match,             
            tourListing 
        } = this.props;
        const payload = {
            "apiKey": TOUR_API_KEY,
                "city": match.params.cityName,
                "attraction": ['Tour'],
                "currencyCode": match.params.currency,
                "fareType": match.params.nation,
                "language": match.params.locale,
                "requestDate": {
                    "from": this.formatedDate(match.params.fromDate),
                    "to": this.formatedDate(match.params.toDate)
                },
                "traveler": {
                    "adult": 2,
                    "child": match.params.child,
                    "infant": match.params.infact
                },
                "duration": tourListing.filter, // pass by filters
                "categories":tourListing.filterCat, // pass by categories filter
                "sort":"price_desc"
        }
        this.props.requestTourListing(payload)
    }
    getFilterCategories(){
        const { tourListing } = this.props;
        return (
            <div>
                <TourFilterCategories 
                    filters={tourListing.filterCategories}
                    callbackAddFilter={(param)=> this.addCategoryFilter(param)} 
                    callbackRemoveFilter={(param)=> this.removeCategoryFilter(param)}
                    resetCatFilter={()=> this.resetFilterCategory()}
                    callbackUpdate={()=> this.loadTour()}/>                                     
            </div>
        )
    }
    resetFilterCategory(){
        this.props.resetCatFilter();
        this.loadCategoryFilter();
    }
    getPagination(){
        const { tourListing } = this.props;
        if(tourListing.currentPage < tourListing.pageNum){
            return (
                <button onClick={()=> this.props.loadMoreTour(tourListing.currentPage + 1)} className="pagination">Show More Results</button>
            )    
        }
        
    }
    render() { 
        const { tourListing } = this.props;
        return (
            <div>
                <div className="app-container">
                    <div className="main-grid">
                        <div className="filter-block">
                            {/* {
                                tourListing.isFetching ?
                                <FilterSkeleton />
                                : */}
                                <div>
                                    <div className="card found-card">
                                        {
                                            <p className="found">
                                                <span>{tourListing.totalData.length > 0 ? tourListing.totalData.length : '...'} Tours </span>
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
                                                <SearchFeatureTour 
                                                    listingTours={tourListing.totalData}
                                                    callbackFun={(payload)=> this.props.requestFilterTourSearch(payload)}
                                                    updateListing={()=> this.loadTour()}/>
                                                {/* <input type="text"
                                                    placeholder="Search by Tour (To Do)" /> */}
                                                {/* <span className="search-icon">
                                                    <img src={require(`../../assests/images/svg/search.svg`)} alt="Search By Tour" />
                                                </span> */}
                                            </div>
                                        </li>
                                        <li>
                                            {this.getFilterCategories()}
                                        </li>
                                        <li>
                                            {this.getFilterComponent()}
                                        </li>
                                    </ul>
                                    <CustomerCare />
                                </div>
                            {/* } */}
                            </div>
                        <div className="listing-block">
                            {
                                tourListing.isFetching ? 
                                <SortingSkeleton />
                                :
                                <TourListingSort 
                                    callbackSortAce={()=> this.props.requestPriceAsc()}
                                    callbackSortDec={()=> this.props.requestPriceDec()}
                                    callbackSortDiscount={()=> this.props.requestSortDiscountAce()}
                                    callbackSortDiscountDec={()=> this.props.requestSortDiscountDec()}
                                    callbackSortRecommended={()=> this.props.requestSortRecommendedAce()}
                                    callbackSortRecommendedDec={()=> this.props.requestSortRecommendedDec()}
                                    sort={tourListing.sort}
                                />
                            }                        
                            <div className="listing-container">
                            {
                                tourListing.error != null ?
                                    this.showError()
                                    :
                                    this.getListingItem()
                            }
                            </div>
                            <div>
                                {this.getPagination()}
                            </div>
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
        searchComponentReducers : state.searchComponentReducers,
        navbarOptions : state.navbarOptions,
        locales : state.locales,
        tourListing: state.tourListing,
        router: state.router
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestTourListing : (value)=> dispatch(requestTourListing(value)),
        loadFilter : ()=> dispatch(loadFilter()),
        addFilter : (param)=> dispatch(addFilter(param)),
        reduceFilter : (param)=> dispatch(reduceFilter(param)),
        requestPriceAsc : ()=> dispatch(requestPriceAsc()),
        requestPriceDec : ()=> dispatch(requestPriceDec()),
        requestCategoryFilter : (payload)=> dispatch(requestCategoryFilter(payload)),
        requestSortDiscountAce : ()=> dispatch(requestSortDiscountAce()),
        requestSortRecommendedAce : ()=> dispatch(requestSortRecommendedAce()),
        requestSortRecommendedDec : ()=> dispatch(requestSortRecommendedDec()),
        requestSortDiscountDec : ()=> dispatch(requestSortDiscountDec()),
        addFilterCategory: (payload)=> dispatch(addFilterCategory(payload)),
        removeFilterCategory: (payload)=> dispatch(removeFilterCategory(payload)),
        resetCatFilter: ()=> dispatch(resetCatFilter()),
        loadMoreTour: (page)=> dispatch(loadMoreTour(page)),
        resetFilter: ()=> dispatch(resetFilter()),
        requestFilterTourSearch: (payload)=> dispatch(requestFilterTourSearch(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TourListing);