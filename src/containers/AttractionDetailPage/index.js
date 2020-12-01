import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import AttrDetailTitle from './AttrDetailTitle';
import AttrDetailImage from './AttrDetailImage';
import AttrDetailOverview from './AttrDetailOverview';
import AttrOptionPricing from './AttrOptionPricing';
import AttrDetailInfo from './AttrDetailInfo';
import AttrDetailInclusion from './AttrDetailInclusion';
import AttrDetailExclusion from './AttrDetailExclusion';
import AttrDetailChildPolicy from './AttrDetailChildPolicy';
import AttrDetailCancellation from './AttrDetailCancellation';
import SEOList from '../../components/SEOList';
import Newsletter from '../../components/Newsletter';

import { 
    requestAttrDetail,
    requestAttrCategory, 
    clearCheckout 
} from '../../actions/attractionActions';
import { requestDailyRate } from '../../actions/toursListingActions'
import { selectTraveller } from '../../actions/searchComponentActions';

import { TOUR_API_KEY, API_KEY, CHECKOUT_API_KEY } from '../../constants/credentials';

import './attr-detail.scss'

const dateFormat = 'YYYY-MM-DD';

class AttractionDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        const { 
            match, 
            searchComponentReducers, 
            navbarOptions,
            locales,
            attrListing 
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
              "infant": searchComponentReducers.travellers.infant
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
        
        this.props.requestAttrDetail(payload)
        if(attrListing.filterCategories.data == 0){
            this.loadCategoryFilter();
        }
        this.loadDailyRate()
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

    render() { 
        const { attrListing, searchComponentReducers } = this.props;
        return (
            <div>
                <div className="app-container">
                    <div className="tour-detail">
                        <AttrDetailTitle 
                            title={attrListing.detail.data && attrListing.detail.data.title}
                            tickets={attrListing.detail.data && attrListing.detail.data.ticket}
                            price={attrListing.detail.data && attrListing.detail.data.rates }
                            data={attrListing.detail.data && attrListing.detail.data}
                        />
                        <AttrDetailImage 
                            images={attrListing.detail.data && attrListing.detail.data.images}
                        />
                        <div className="detail-section">
                            <div className="detail-block">
                                <AttrDetailOverview
                                    description={attrListing.detail.data && attrListing.detail.data.description}
                                    categories={attrListing.detail.data && attrListing.detail.data.categories}
                                    cities={attrListing.detail.data && attrListing.detail.data.cities}
                                    data={attrListing.detail.data && attrListing.detail.data}
                                    features={attrListing.detail.data && attrListing.detail.data.features}
                                />                        
                                <AttrDetailInfo 
                                    itineraries={attrListing.detail.data && attrListing.detail.data.itineraries}
                                />
                                <AttrDetailInclusion
                                    conditions={attrListing.detail.data && attrListing.detail.data.conditions} 
                                />
                                <AttrDetailExclusion 
                                    conditions={attrListing.detail.data && attrListing.detail.data.conditions} 
                                />
                                <AttrDetailChildPolicy 
                                    policies={attrListing.detail.data && attrListing.detail.data.policies} 
                                />
                                <AttrDetailCancellation 
                                    policies={attrListing.detail.data && attrListing.detail.data.policies} 
                                />
                            </div>
                            <div className="reservation-block">
                                <AttrOptionPricing 
                                    rates={attrListing.detail.data && attrListing.detail.data.rates} 
                                    detail={attrListing.detail.data && attrListing.detail.data}
                                    traveler={searchComponentReducers.travellers}
                                    countTraveler={(payload)=> this.props.selectTraveller(payload)}
                                    timeslots={attrListing.detail.data && attrListing.detail.data.timeslots}/>
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
        requestAttrDetail: (payload)=> dispatch(requestAttrDetail(payload)),
        selectTraveller: (payload)=> dispatch(selectTraveller(payload)),
        requestAttrCategory : (payload)=> dispatch(requestAttrCategory(payload)),
        requestDailyRate: (payload)=> dispatch(requestDailyRate(payload)),
        clearCheckout: ()=> dispatch(clearCheckout())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AttractionDetailPage);