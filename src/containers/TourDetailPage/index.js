import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Affix } from 'antd';

import TourDetailTitle from './TourDetailTitle';
import TourDetailImage from './TourDetailImage';
import TourDetailOverview from './TourDetailOverview';
import TourOptionPricing from './TourOptionPricing';
import TourDetailInfo from './TourDetailInfo';
import TourDetailInclusion from './TourDetailInclusion';
import TourDetailExclusion from './TourDetailExclusion';
import TourDetailChildPolicy from './TourDetailChildPolicy';
import TourDetailCancellation from './TourDetailCancellation';
import SEOList from '../../components/SEOList';
import Newsletter from '../../components/Newsletter';

import { 
    requestTourDetail, 
    requestCategoryFilter, 
    requestDailyRate 
} from '../../actions/toursListingActions';
import {
    clearCheckout
} from '../../actions/attractionActions';
import { selectTraveller } from '../../actions/searchComponentActions';

import { TOUR_API_KEY, API_KEY } from '../../constants/credentials';

import './tour-detail.scss'

const dateFormat = 'YYYY-MM-DD';

class TourDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        this.loadTourDetail();        
        this.loadDailyRate();
        this.props.clearCheckout()
    }
    loadDailyRate(){
        const { 
            match, 
            searchComponentReducers, 
            navbarOptions,
            locales,
            tourListing 
        } = this.props;
        const payload = { 
            "code": match.params.tourId,           
            "date": this.formatedDate(searchComponentReducers.fromDate.date),           
            "traveler": {           
              "adult": 1,           
              "child": 0,           
              "infant": 0
            },           
            "language": locales.queryName,           
            "fareType": navbarOptions.nation.other_name,           
            "currencyCode": navbarOptions.currency.name,           
            "apiKey": TOUR_API_KEY,           
            "client": {           
              "ip": "123.123.123.123",           
              "name": "Mozilla",           
              "locality": "Yangon"           
            }           
          } 
        this.props.requestDailyRate(payload)
    }
    loadTourDetail(){
        const { 
            match, 
            searchComponentReducers, 
            navbarOptions,
            locales,
            tourListing 
        } = this.props;
        const payload = {
            "code": match.params.tourId,
            "requestDate": {
             "from": this.formatedDate(searchComponentReducers.fromDate.date),
              "to": this.formatedDate(searchComponentReducers.toDate.date)
            },
            "traveler": {
            //   "adult": searchComponentReducers.travellers.adult,
              "adult": 2,
              "child": searchComponentReducers.travellers.child,
              "infant": searchComponentReducers.travellers.infact
            },
            "language": locales.queryName,
            "fareType": navbarOptions.nation.other_name,
            "currencyCode": navbarOptions.currency.name,
            "apiKey": TOUR_API_KEY,
            "client": {
              "ip": "123.123.123.123",
              "name": "Mozilla",
              "locality": "Yangon"
            }
        }        
        
        this.props.requestTourDetail(payload)
        if(tourListing.filterCategories.data == 0){
            this.loadCategoryFilter();
        }
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

    render() { 
        const { tourListing, searchComponentReducers } = this.props;
        return (
            <div>
                <div className="app-container">                
                    <div className="tour-detail">                    
                        <TourDetailTitle 
                            title={tourListing.detail.data && tourListing.detail.data.title}
                            tickets={tourListing.detail.data && tourListing.detail.data.ticket}
                            price={tourListing.detail.data && tourListing.detail.data.rates }
                            data={tourListing.detail.data && tourListing.detail.data}
                        />                
                        <TourDetailImage 
                            images={tourListing.detail.data && tourListing.detail.data.images}
                        />
                        <div className="detail-section">
                            <div className="detail-block">
                                <TourDetailOverview
                                    description={tourListing.detail.data && tourListing.detail.data.description}
                                    categories={tourListing.detail.data && tourListing.detail.data.categories}
                                    cities={tourListing.detail.data && tourListing.detail.data.cities}
                                    data={tourListing.detail.data && tourListing.detail.data}
                                    features={tourListing.detail.data && tourListing.detail.data.features}
                                />                        
                                <TourDetailInfo 
                                    itineraries={tourListing.detail.data && tourListing.detail.data.itineraries}
                                />
                                <TourDetailInclusion
                                    conditions={tourListing.detail.data && tourListing.detail.data.conditions} 
                                />
                                <TourDetailExclusion 
                                    conditions={tourListing.detail.data && tourListing.detail.data.conditions} 
                                />
                                <TourDetailChildPolicy 
                                    policies={tourListing.detail.data && tourListing.detail.data.policies} 
                                />
                                <TourDetailCancellation 
                                    policies={tourListing.detail.data && tourListing.detail.data.policies} 
                                />
                            </div>
                            <div className="reservation-block">
                                <TourOptionPricing 
                                    rates={tourListing.detail.data && tourListing.detail.data.rates} 
                                    detail={tourListing.detail.data && tourListing.detail.data}
                                    traveler={searchComponentReducers.travellers}
                                    countTraveler={(payload)=> this.props.selectTraveller(payload)}
                                    timeslots={tourListing.detail.data && tourListing.detail.data.timeslots}
                                    />
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
        requestTourDetail: (payload)=> dispatch(requestTourDetail(payload)),
        selectTraveller: (payload)=> dispatch(selectTraveller(payload)),
        requestCategoryFilter : (payload)=> dispatch(requestCategoryFilter(payload)),
        requestDailyRate: (payload)=> dispatch(requestDailyRate(payload)),
        clearCheckout: ()=> dispatch(clearCheckout())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TourDetailPage);