import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import TourListingFilter from '../TourListing/TourListingFilter';
import AttrListingItem from './AttrListingItem';
import AttrListingSort from './AttrListingSort';
import TourFilterCategories from '../TourListing/TourFilterCategories';
import SortingSkeleton from '../../components/SortingSkeleton';
import Skeleton from '../../components/ListingSkeleton';
import SEOList from '../../components/SEOList';
import Newsletter from '../../components/Newsletter';
import FilterSkeleton from '../../components/FilterSkeleton';
import CustomerCare from '../../components/CustomerCareCenter';

import {
    requestAttrCategory,
    requestAttrListing,
    loadMoreAttr,
    requestAttrPriceAsc,
    requestAttrPriceDec,
    requestAttrSortDiscountAce,
    requestAttrSortDiscountDec,
    requestAttrSortRecommendedAce,
    requestAttrSortRecommendedDec,
    addAttrFilter,
    reduceAttrFilter,
    resetAttrFilter,
    addAttrFilterCategory,
    removeAttrFilterCategory,
    resetAttrCatFilter,
    requestFilterAttrSearch
} from '../../actions/attractionActions';

import { TOUR_API_KEY, API_KEY } from '../../constants/credentials';
import { filters } from '../../constants/tourListingConstants';
import SearchFeatureAttraction from './SearchFeatureAttraction';

const dateFormat = 'YYYY-MM-DD';

class AttractionListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReload: false,
            isFakeLoad: true
        };
    }
    componentDidMount(){
        this.loadAttraction();
        this.loadCategoryFilter();
        setTimeout(() => {
            this.setState({isFakeLoad: false})
        }, 1000);
    } 
    componentDidUpdate() {
        if(this.state.isReload){
            this.loadAttraction();
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

    loadAttraction(){
        const { 
            match, 
            searchComponentReducers, 
            navbarOptions,
            locales 
        } = this.props;
                
        const payload = {            
                "apiKey": TOUR_API_KEY,
                "city": match.params.cityName,
                "attraction": ['Attraction'],
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
             
        this.props.requestAttrListing(JSON.stringify(payload));        
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
        this.props.requestAttrCategory(JSON.stringify(payload))
    }
    formatedDate = (param) => moment(param).format(dateFormat);

    handleFilter(){
        const { 
            match,             
            attrListing 
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
                "duration": attrListing.filter, // pass by filters
                "categories":[],
                "sort":"price_desc"
        }

        this.props.requestAttrListing(payload)
    }
    handleAddFilter(param){
        this.props.addAttrFilter(param)
        setTimeout(() => {
            this.handleFilter()
        }, 100);
    }
    handleReducerFilter(param){
        this.props.reduceAttrFilter(param)
        setTimeout(() => {
            this.handleFilter()    
        }, 100);
        
    }
    handleFilterUpdate(){
        this.props.resetAttrFilter();
        this.loadAttraction();
    }
    getFilterComponent(){
        const { attrListing } = this.props;
        return (
            <div>
                {
                    this.state.isFakeLoad || attrListing.isLoadFilter ? 
                    <div>loading ....</div>
                    :
                    <div>
                        <TourListingFilter 
                            callbackAddFilter={(param)=> this.handleAddFilter(param)}
                            callbackRemoveFilter={(param)=> this.handleReducerFilter(param)}
                            filters={filters}
                            callbackUpdate={()=> this.handleFilterUpdate()}/>
                    </div>
                }
            </div>
        )
    }

    getListingItem(){
        const { attrListing } = this.props;
        return (
            <div>
                {
                    attrListing.isFetching ? 
                    <div>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div>
                    :
                    <div>
                        {   
                            attrListing.data.length > 0 ?
                            <div>                         
                                {
                                    attrListing.data.map((item, index)=> (
                                        <AttrListingItem item={item} key={index}/>
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
        const { attrListing } = this.props;
        return (
            <div className="card not-found">
                <img src={require(`../../assests/images/svg/tour-not-found.svg`)} alt="Tour Not Found" />
                <p>
                    {attrListing.error.message}
                </p>
            </div>
        )
    }
    addCategoryFilter(param){
        this.props.addAttrFilterCategory(param);
        setTimeout(() => {
            this.loadDataByCatFiltered()
        }, 100);
        
    }
    removeCategoryFilter(param){
        this.props.removeAttrFilterCategory(param);
        setTimeout(() => {
            this.loadDataByCatFiltered()
        }, 100);
    }
    loadDataByCatFiltered(){
        const { 
            match,             
            attrListing 
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
                "duration": [], // pass by filters
                "categories":attrListing.filterCat, // pass by categories filter
                "sort":"price_desc"
        }
        this.props.requestAttrListing(payload)
    }
    handleCateUpdate(){
        this.props.resetAttrCatFilter();
        this.loadAttraction();
    }
    getFilterCategories(){
        const { attrListing } = this.props;
        return (
            <div>
                <TourFilterCategories 
                    filters={attrListing.filterCategories}
                    callbackAddFilter={(param)=> this.addCategoryFilter(param)} 
                    callbackRemoveFilter={(param)=> this.removeCategoryFilter(param)}
                    resetCatFilter={()=> this.resetFilterCategory()}
                    callbackUpdate={()=> this.handleCateUpdate()}/>                                     
            </div>
        )
    }
    resetFilterCategory(){
        this.props.resetCatFilter();
        this.loadCategoryFilter();
    }
    getPagination(){
        const { attrListing } = this.props;
        if(attrListing.currentPage < attrListing.pageNum){
            return (
                <button onClick={()=> this.props.loadMoreAttr(attrListing.currentPage + 1)} className="pagination">Show More Results</button>
            )    
        }
        
    }
    render() { 
        const { attrListing } = this.props;
        return (
            <div>
                <div className="app-container">
                    <div className="main-grid">
                        <div className="filter-block">
                            {/* {
                                attrListing.isFetching ?
                                <FilterSkeleton />
                                : */}
                                <div>
                                    <div className="card found-card">
                                        {
                                            <p className="found">
                                                <span>{attrListing.totalData.length > 0 ? attrListing.totalData.length : '...'} Attractions </span>
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
                                                <SearchFeatureAttraction 
                                                    attrTours={attrListing.totalData}
                                                    callbackFilter={(payload)=> this.props.requestFilterAttrSearch(payload)}
                                                    updateListing={()=> this.loadAttraction()}/>
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
                                attrListing.isFetching ? 
                                <div>
                                    <SortingSkeleton />
                                </div>
                                :
                                <AttrListingSort 
                                    callbackSortAce={()=> this.props.requestAttrPriceAsc()}
                                    callbackSortDec={()=> this.props.requestAttrPriceDec()}
                                    callbackSortDiscount={()=> this.props.requestAttrSortDiscountAce()}
                                    callbackSortDiscountDec={()=> this.props.requestAttrSortDiscountDec()}
                                    callbackSortRecommended={()=> this.props.requestAttrSortRecommendedAce()}
                                    callbackSortRecommendedDec={()=> this.props.requestAttrSortRecommendedDec()}
                                    sort={attrListing.sort}
                                />
                            }                        
                            <div className="listing-container">
                            {
                                attrListing.error != null ?
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
        attrListing: state.attrListing,
        router: state.router
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestAttrCategory : (payload)=> dispatch(requestAttrCategory(payload)),
        requestAttrListing : (payload)=> dispatch(requestAttrListing(payload)),
        loadMoreAttr : (payload)=> dispatch(loadMoreAttr(payload)),
        requestAttrPriceAsc: ()=> dispatch(requestAttrPriceAsc()),
        requestAttrPriceDec: ()=> dispatch(requestAttrPriceDec()),
        requestAttrSortDiscountAce : ()=> dispatch(requestAttrSortDiscountAce()),
        requestAttrSortDiscountDec : ()=> dispatch(requestAttrSortDiscountDec()),
        requestAttrSortRecommendedAce : ()=> dispatch(requestAttrSortRecommendedAce()),
        requestAttrSortRecommendedDec : ()=> dispatch(requestAttrSortRecommendedDec()),
        addAttrFilter : (params)=> dispatch(addAttrFilter(params)),
        reduceAttrFilter : (params)=> dispatch(reduceAttrFilter(params)),
        addAttrFilterCategory : (params)=> dispatch(addAttrFilterCategory(params)),
        removeAttrFilterCategory : (params)=> dispatch(removeAttrFilterCategory(params)),
        resetAttrFilter : ()=> dispatch(resetAttrFilter()),
        resetAttrCatFilter : ()=> dispatch(resetAttrCatFilter()),
        requestFilterAttrSearch: (payload)=> dispatch(requestFilterAttrSearch(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AttractionListing);