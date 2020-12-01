import React, { Component } from 'react';

import { 
    hotelList,
    busList,
    tourList,
    flightList,
    carRentalList
} from '../constants/constants';

import List from './List.js'
import { FormattedMessage } from 'react-intl'

import '../styles/seo-lists.scss'

class SEOList extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { route, isLanding, isListing } = this.props;
        return (
            <div className="seo-list  hidden-xs"> 
                 <div className="app-container">
                    <div className="seo-title">
                        <h2><FormattedMessage id="footer.let.start" /></h2>
                        <p><FormattedMessage id="footer.let.start.inspirations" /></p>
                    </div>
                    {
                        isLanding && 
                        <div className="row">
                            <div className={route=='/hotels'?"disabled":"col-md-3"}> <List listname={hotelList} name={<FormattedMessage id="SEO.title.hotel" />} isSEO='true' /></div>
                            <div className={route=='/buses'?"disabled":"col-md-3"}> <List listname={busList} name={<FormattedMessage id="SEO.title.bus" />} isSEO='true' /></div>
                            <div className={route=='/tours' || route=="/attractions"?"disabled":"col-md-3"}> <List listname={tourList} name={<FormattedMessage id="SEO.title.tour" />} isSEO='true' /></div>
                            <div className={route=='/flights' || route=='/'?"disabled":"col-md-3"}> <List listname={flightList} name={<FormattedMessage id="SEO.title.flight" />} isSEO='true' /></div>
                            <div className={route=='/car_rental'?"disabled":"col-md-3"}> <List listname={carRentalList} name={<FormattedMessage id="SEO.title.carrental" />} isSEO='true'/></div>
                            {/* <div className={route=="/attractions"?"disabled":"col-md-3"}> <List listname={tourList} name={<FormattedMessage id="SEO.title.attraction" />} isSEO='true' /></div> */}
                        </div>
                    }
                    {
                        isListing && 
                        <div className="row">
                            <div className={route.includes('/hotels/search')?"disabled":"col-md-3"}> <List listname={hotelList} name={<FormattedMessage id="SEO.title.hotel" />} isSEO='true' /></div>
                            <div className={route.includes('/buses/search')?"disabled":"col-md-3"}> <List listname={busList} name={<FormattedMessage id="SEO.title.bus" />} isSEO='true' /></div>
                            <div className={route.includes('/tours/search') || route.includes('/attractions/search')?"disabled":"col-md-3"}> <List listname={tourList} name={<FormattedMessage id="SEO.title.tour" />} isSEO='true' /></div>
                            <div className={route.includes('/flights/search') || route=='/'?"disabled":"col-md-3"}> <List listname={flightList} name={<FormattedMessage id="SEO.title.flight" />} isSEO='true' /></div>
                            <div className={route.includes('/car_rental/search')?"disabled":"col-md-3"}> <List listname={carRentalList} name={<FormattedMessage id="SEO.title.carrental" />} isSEO='true'/></div>
                            {/* <div className={route.includes('/attractions/search')?"disabled":"col-md-3"}> <List listname={tourList} name={<FormattedMessage id="SEO.title.attraction" />} isSEO='true' /></div> */}
                        </div>
                    }
                    
                </div>               
            </div>
        );  
    }
}

export default SEOList;